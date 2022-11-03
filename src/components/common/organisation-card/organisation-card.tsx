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
  organizationName: string;
  organizationId: string;
  permissions: Role[];
}

export const OrganisationCard: React.FC<OrganisationCardProps> = ({
  organizationId,
  organizationName,
  permissions
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
            'organization-id': organizationId
          }
        }
      );
    } catch (e) {
      openNotification(
        'top',
        `${loginMethod} login method not supported for organisation`
      );
      setLoading(false);
      return;
    }

    setOrganisationId(organizationId);
    localStorage.setItem('organisationId', organizationId);
    localStorage.setItem('organisationName', organizationName);
    setRoles(permissions);

    let isAdmin = false;
    let isUser = false;
    permissions.forEach(permission => {
      if (
        permission === Role.ADMIN_DELETE ||
        permission === Role.ADMIN_READ ||
        permission === Role.ADMIN_WRITE
      ) {
        isAdmin = true;
      } else if (permission === Role.USER) {
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
      <p className="font-semibold text-base mr-8">{organizationName}</p>
      <div className="flex space-x-4">
        <>
          {permissions.map((permission, i) => {
            return (
              <Tag
                key={i}
                color={
                  RoleColor[
                    permission.toLocaleUpperCase() as keyof typeof RoleColor
                  ]
                }
              >
                {permission}
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
