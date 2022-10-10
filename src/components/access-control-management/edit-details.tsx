import { Form, Input, Select } from 'antd';
import { ERoles, EStatus, IDataType } from './types';

interface IProps extends IDataType {
  setFormData: (data: IDataType) => void;
  form: any;
}

const validateMessages = {
  required: '${label} is required',
  types: {
    email: 'Not a valid email',
    number: 'Not a valid number'
  }
};

export const EditDetails = ({ setFormData, form, ...props }: IProps) => {
  const renderRoleOptions = () =>
    Object.keys(ERoles).map(role => {
      return (
        <Select.Option color="black" key={role} value={role}>
          {role.toUpperCase()}
        </Select.Option>
      );
    });

  const renderStatusOptions = () =>
    Object.keys(EStatus).map(status => {
      return (
        <Select.Option color="black" key={status} value={status}>
          {status.toUpperCase()}
        </Select.Option>
      );
    });

  const handleOnFinish = (values: IDataType) => {
    setFormData(values);
  };

  return (
    <Form
      form={form}
      onFinish={handleOnFinish}
      validateMessages={validateMessages}
      initialValues={props}
    >
      <Form.Item name="name" label="Name">
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="roles" label="Roles" hasFeedback>
        <Select mode="multiple" placeholder="Please select the role(s)">
          {renderRoleOptions()}
        </Select>
      </Form.Item>
      <Form.Item name="status" label="Status" hasFeedback>
        <Select placeholder="Please select a status">
          {renderStatusOptions()}
        </Select>
      </Form.Item>
    </Form>
  );
};
