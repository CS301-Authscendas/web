import { Tag } from 'antd';
import { LoadingOutlined, RightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useAuth } from '../../../providers';
import { Role, RoleColor } from '../../access-control-management/types';
import { LabelUrls } from '../side-bar';
import axios from 'axios';
import { AUTH_ENDPOINTS, ENDPOINTS } from '../../../consts';
import { openNotification } from '../../../utils/utils';
import { useState } from 'react';

interface OrganisationCardProps {
  key: number;
  organisationId: string;
  permisions: Role[];
}

export const OrganisationCard: React.FC<OrganisationCardProps> = ({
  organisationId,
  permisions
}) => {
  const router = useRouter();
  const { jwtToken, loginMethod, logout, setOrganisationId, setRoles } =
    useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const onClick = async () => {
    setLoading(true);
    try {
      await axios.get(
        `${ENDPOINTS.GATEWAY}${AUTH_ENDPOINTS.VALIDATE_LOGIN_METHOD}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'login-method': loginMethod,
            'organization-id': organisationId
          }
        }
      );
    } catch (e) {
      openNotification(
        'top',
        `${loginMethod} login method not supported for organisation`
      );
      return;
    }

    setOrganisationId(organisationId);
    localStorage.setItem('organisationId', organisationId);
    setRoles(permisions);

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

    setLoading(false);
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
      className="cursor-pointer rounded-lg bg-white hover:bg-gray-50 h-14 flex items-center justify-between px-8"
    >
      {/* TODO: change name */}
      <p className="font-semibold text-base mr-8">{organisationId}</p>
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
          {loading ? (
            <LoadingOutlined className="my-auto" />
          ) : (
            <RightOutlined className="my-auto" />
          )}
        </>
      </div>
    </div>
  );
};
