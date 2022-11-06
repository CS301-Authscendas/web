import { DatePicker, DatePickerProps, Form, Input, Select } from 'antd';
import { FormInstance } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { useAuth } from '../../providers/auth';
import { Role, Status, IDataType, IEditUserForm } from './types';
import moment from 'moment';

interface IProps extends IDataType {
  form: FormInstance<IEditUserForm>;
}

const validateMessages = {
  required: 'Required field',
  types: {
    email: 'Invalid email',
    number: 'Invalid number'
  }
};

export const EditDetails = ({ form, ...props }: IProps) => {
  const { userDetails } = useAuth();
  const [birthDate, setBirthDate] = useState<string>('');

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

  const onChangeBirthday: DatePickerProps['onChange'] = (_, dateString) => {
    setBirthDate(dateString);
    form.setFieldValue('birthDate', dateString);
  };

  useEffect(() => {
    form.setFieldsValue({
      ...props,
      phoneNumber: props.phoneNumber || undefined,
      roles: props.roles[0].permission
    });
    setBirthDate(props.birthDate);
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
        name="email"
        label="Email"
        rules={[{ required: true }, { type: 'email' }]}
      >
        <Input disabled />
      </Form.Item>
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
        name="roles"
        label="Roles"
        hasFeedback
        rules={[{ required: true }]}
      >
        <Select
          disabled={userDetails?.id === props.id}
          allowClear
          mode="multiple"
          placeholder="Please select role(s)"
        >
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
      <Form.Item label="Birth Date">
        <DatePicker
          value={moment(birthDate, 'YYYY-MM-DD')}
          style={{ width: '100%' }}
          onChange={onChangeBirthday}
        />
      </Form.Item>
      <Form.Item name="phoneNumber" label="Phone">
        <Input allowClear />
      </Form.Item>
      <Form.Item name="birthDate" hidden>
        <Input value={birthDate} />
      </Form.Item>
    </Form>
  );
};
