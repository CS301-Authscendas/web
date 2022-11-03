import { message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ENDPOINTS, USER_ENDPOINTS } from '../../consts';
import { useAuth } from '../../providers';
import { RoleObj } from '../access-control-management/types';
import { OrganisationCard } from '../common/organisation-card';

export const Organisation: React.FC = () => {
  const { jwtToken, loginMethod } = useAuth();
  const [roles, setRoles] = useState<RoleObj[]>();

  const fetchUserDetails = async () => {
    try {
      const resp = await axios.get(
        `${ENDPOINTS.GATEWAY}${USER_ENDPOINTS.GET_USER}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'login-method': loginMethod
          }
        }
      );
      console.log(resp.data.data.userDetails);
      setRoles(resp.data.data.userDetails.roles);
    } catch (e) {
      message.error('Error occurred retrieving user roles');
    }
  };

  useEffect(() => {
    if (!jwtToken || !loginMethod) {
      return;
    }
    fetchUserDetails();
  }, [jwtToken, loginMethod]);

  return (
    <div className="bg-custom-white-dark h-screen p-24">
      <p className="text-2xl font-medium mb-5">Organisations</p>
      <div className="space-y-4">
        {roles?.map((role, i) => {
          return (
            <div key={i}>
              <OrganisationCard
                organisationId={role.organizationId}
                permisions={role.permission}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
