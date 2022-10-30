import { Form, Input, Select } from 'antd';
import { Role, Status, IDataType } from './types';

interface IProps extends IDataType {
  form: any;
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

  return (
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 19 }}
      form={form}
      validateMessages={validateMessages}
      initialValues={props}
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
