import { Tag } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { ERoles } from '../../access-control-management/types';

interface OrganisationCardProps {
  organisation: string;
  role: ERoles;
}

export const OrganisationCard: React.FC<OrganisationCardProps> = ({
  organisation,
  role
}) => {
  return (
    <div className="rounded-lg bg-white h-14 flex items-center justify-between px-8">
      <p className="font-semibold mr-8">{organisation}</p>
      <div className="flex space-x-8">
        <Tag color="magenta">{role}</Tag>
        <RightOutlined className="my-auto" />
      </div>
    </div>
  );
};
