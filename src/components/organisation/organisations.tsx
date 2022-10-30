import axios from 'axios';
import { useEffect, useState } from 'react';
import { ENDPOINTS, USER_ENDPOINTS } from '../../consts';
import { useAuth } from '../../providers';
import { Role, RoleObj } from '../access-control-management/types';
import { OrganisationCard } from '../common/organisation-card';

export const Organisation: React.FC = () => {
  const { jwtToken } = useAuth();
  const [roles, setRoles] = useState<RoleObj[]>();

  const fetchUserDetails = async () => {
    const resp = await axios.get(
      `${ENDPOINTS.GATEWAY}${USER_ENDPOINTS.GET_USER}`,
      {
        headers: { Authorization: `Bearer ${jwtToken}` }
      }
    );
    console.log(resp.data.data.userDetails.roles);
    setRoles(resp.data.data.userDetails.roles);
  };

  useEffect(() => {
    if (!jwtToken) {
      return;
    }
    fetchUserDetails();
  }, [jwtToken]);

  return (
    <div className="bg-custom-white-dark h-screen p-24">
      <p className="text-2xl font-medium mb-5">Organisations</p>
      <div className="space-y-4">
        {roles?.map((role, i) => {
          return (
            <div key={i}>
              <OrganisationCard
                organisation={role.organizationId}
                permisions={role.permission as Role[]}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
