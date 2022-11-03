import { Form, Input, Select } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import { useEffect } from 'react';
import { Role, Status, IDataType, IEditUserReq } from './types';

interface IProps extends IDataType {
  form: FormInstance;
}

const validateMessages = {
  required: 'Required field',
  types: {
    email: 'Invalid email',
    number: 'Invalid number'
  }
};

export const EditDetails = ({ form, ...props }: IProps) => {
  const renderRoleOptions = () =>
    Object.values(Role).map(role => {
      return (
        <Select.Option color="black" key={role} value={role}>
          {role}
        </Select.Option>
      );
    });

  const renderStatusOptions = () =>
    Object.values(Status).map(status => {
      return (
        <Select.Option color="black" key={status} value={status}>
          {status}
        </Select.Option>
      );
    });

  useEffect(() => {
    form.setFieldsValue({
      ...props,
      phoneNumber: props.phoneNumber || undefined,
      roles: props.roles[0].permission
    });
  }, [props.email]);

  return (
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 19 }}
      form={form}
      validateMessages={validateMessages}
      initialValues={{ ...props, roles: props.roles[0].permission }}
    >
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true }]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
        <Input allowClear />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true }, { type: 'email' }]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item name="phoneNumber" label="Phone">
        <Input allowClear />
      </Form.Item>
      <Form.Item
        name="birthDate"
        label="Birth Date"
        rules={[{ required: true }]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item
        name="roles"
        label="Roles"
        hasFeedback
        rules={[{ required: true }]}
      >
        <Select allowClear mode="multiple" placeholder="Please select role(s)">
          {renderRoleOptions()}
        </Select>
      </Form.Item>
      <Form.Item
        name="status"
        label="Status"
        hasFeedback
        rules={[{ required: true }]}
      >
        <Select allowClear placeholder="Please select status">
          {renderStatusOptions()}
        </Select>
      </Form.Item>
    </Form>
  );
};
