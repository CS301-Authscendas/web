import { Tag } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useAuth } from '../../../providers';
import { Role, RoleColor } from '../../access-control-management/types';
import { LabelUrls } from '../side-bar';

interface OrganisationCardProps {
  organisationId: string;
  permisions: Role[];
}

export const OrganisationCard: React.FC<OrganisationCardProps> = ({
  organisationId,
  permisions
}) => {
  const router = useRouter();
  const { logout, setOrganisationId } = useAuth();

  const onClick = () => {
    setOrganisationId(organisationId);
    localStorage.setItem('organisationId', organisationId);

    let isAdmin = false;
    let isUser = false;
    permisions.forEach(permision => {
      if (
        permision === Role.ADMIN_DELETE ||
        permision === Role.ADMIN_READ ||
        permision === Role.ADMIN_WRITE
      ) {
        isAdmin = true;
      } else if (permision === Role.USER) {
        isUser = true;
      }
    });

    if (isAdmin) {
      router.push(LabelUrls.ACCESS_CONTROL);
    } else if (isUser) {
      router.push(LabelUrls.REWARDS);
    } else {
      logout();
    }
  };

  return (
    <div
      onClick={onClick}
      className="rounded-lg bg-white h-14 flex items-center justify-between px-8"
    >
      {/* TODO: change name */}
      <p className="font-semibold mr-8">{organisationId}</p>
      <div className="flex space-x-4">
        <>
          {permisions.map((permision, i) => {
            return (
              <Tag
                key={i}
                color={
                  RoleColor[
                    permision.toLocaleUpperCase() as keyof typeof RoleColor
                  ]
                }
              >
                {permision === Role.USER ? Role.USER : permision.split('-')[0]}
              </Tag>
            );
          })}
          <RightOutlined className="my-auto" />
        </>
      </div>
    </div>
  );
};
