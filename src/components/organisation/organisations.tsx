import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { LoginMethod } from '../../consts';
import { useAuth } from '../../providers';
import { getUserDetails } from '../../utils/utils';
import { OrganisationCard } from '../common/organisation-card';

export const Organisation: React.FC = () => {
  const { jwtToken, loginMethod, userDetails, setUserDetails } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserDetails = async (token: string, method: LoginMethod) => {
    setLoading(true);
    const details = await getUserDetails(token, method);
    setUserDetails(details);
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
        {loading
          ? 'Organisations'
          : `${userDetails!.firstName} ${
              userDetails!.lastName
            }'s Organisations`}
      </p>
      {loading ? (
        <Spin />
      ) : (
        <div className="space-y-4">
          {userDetails!.roles.map((role, i) => (
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
