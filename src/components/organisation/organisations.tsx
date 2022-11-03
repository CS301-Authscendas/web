import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { LoginMethod } from '../../consts';
import { useAuth } from '../../providers';
import { getUserDetails } from '../../utils/utils';
import { RoleObj } from '../access-control-management/types';
import { OrganisationCard } from '../common/organisation-card';

export const Organisation: React.FC = () => {
  const { jwtToken, loginMethod } = useAuth();
  const [roles, setRoles] = useState<RoleObj[]>();
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserDetails = async (token: string, method: LoginMethod) => {
    setLoading(true);
    const details = await getUserDetails(token, method);
    setRoles(details.roles);
    setName(`${details.firstName} ${details.lastName}`);
    setLoading(false);
  };

  useEffect(() => {
    if (!jwtToken || !loginMethod) {
      return;
    }
    fetchUserDetails(jwtToken, loginMethod);
  }, [jwtToken, loginMethod]);

  return (
    <div className="bg-custom-white-dark h-screen py-16 px-24">
      <p className="text-2xl font-medium mb-9">
        {loading ? 'Organisations' : `${name}'s Organisations`}
      </p>
      {loading ? (
        <Spin />
      ) : (
        <div className="space-y-4">
          {roles?.map((role, i) => (
            <OrganisationCard
              key={i}
              organisationId={role.organizationId}
              permisions={role.permission}
            />
          ))}
        </div>
      )}
    </div>
  );
};
