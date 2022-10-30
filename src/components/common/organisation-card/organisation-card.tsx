import { Tag } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useAuth } from '../../../providers';
import { Role, RoleColor } from '../../access-control-management/types';
import { LabelUrls } from '../side-bar';

interface OrganisationCardProps {
  organisation: string;
  role: Role;
}

export const OrganisationCard: React.FC<OrganisationCardProps> = ({
  organisation,
  role
}) => {
  const router = useRouter();
  const { logout } = useAuth();

  const redirectUser = () => {
    if (role === Role.USER) {
      router.push(LabelUrls.REWARDS);
    } else if (
      role === Role.ADMIN_DELETE ||
      role === Role.ADMIN_READ ||
      role === Role.ADMIN_WRITE
    ) {
      router.push(LabelUrls.ACCESS_CONTROL);
    } else {
      logout();
    }
  };

  return (
    <div
      onClick={redirectUser}
      className="rounded-lg bg-white h-14 flex items-center justify-between px-8"
    >
      <p className="font-semibold mr-8">{organisation}</p>
      <div className="flex space-x-8">
        <Tag
          color={RoleColor[role.toLocaleUpperCase() as keyof typeof RoleColor]}
        >
          {role === Role.USER ? Role.USER : role.split('-')[0]}
        </Tag>
        <RightOutlined className="my-auto" />
      </div>
    </div>
  );
};
