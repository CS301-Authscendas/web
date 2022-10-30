import { IDataType } from './types';

interface IProps {
  record: IDataType;
}

export const DeleteUser = ({ record }: IProps) => {
  return (
    <div className="flex w-full h-full">
      Do you want to delete {record.firstName} {record.lastName}?
    </div>
  );
};
