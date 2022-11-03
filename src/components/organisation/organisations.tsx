import { useEffect, useState } from 'react';
import { LoginMethod } from '../../consts';
import { useAuth } from '../../providers';
import { getUserDetails } from '../../utils/utils';
import { RoleObj } from '../access-control-management/types';
import { OrganisationCard } from '../common/organisation-card';

export const Organisation: React.FC = () => {
  const { jwtToken, loginMethod } = useAuth();
  const [roles, setRoles] = useState<RoleObj[]>();

  const fetchUserDetails = async (token: string, method: LoginMethod) => {
    const details = await getUserDetails(token, method);
    setRoles(details.roles);
  };

  useEffect(() => {
    if (!jwtToken || !loginMethod) {
      return;
    }
    fetchUserDetails(jwtToken, loginMethod);
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
