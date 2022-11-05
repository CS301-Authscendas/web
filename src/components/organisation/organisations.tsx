import { Button, Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ENDPOINTS, LoginMethod, USER_ENDPOINTS } from '../../consts';
import { useAuth } from '../../providers';
import { getUserDetails } from '../../utils/utils';
import { OrganisationCard } from '../common/organisation-card';
import { OrgRole, RoleObj } from '../access-control-management/types';
import { useRouter } from 'next/router';

export const Organisation: React.FC = () => {
  const {
    jwtToken,
    setJwtToken,
    loginMethod,
    setLoginMethod,
    userDetails,
    setUserDetails,
    logout
  } = useAuth();
  const [roles, setRoles] = useState<OrgRole[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = router.query.jwtToken;
    if (token) {
      setJwtToken(token as string);
      localStorage.setItem('jwtToken', token as string);
      setLoginMethod(LoginMethod.SSO);
      localStorage.setItem('loginMethod', LoginMethod.SSO);
      router.replace('/organisations');
    }
  }, [router.query]);

  useEffect(() => {
    if (!jwtToken || !loginMethod) {
      return;
    }
    fetchUserDetails(jwtToken, loginMethod);
  }, [jwtToken, loginMethod]);

  const fetchUserDetails = async (token: string, method: LoginMethod) => {
    setLoading(true);
    const details = await getUserDetails(token, method);
    setUserDetails(details);

    let orgIds: string[] = [];
    details?.roles.map((role: RoleObj) => {
      orgIds.push(role.organizationId);
    });

    const orgDetails = await fetchOrgNames(orgIds, token, method);
    const orgRoles: OrgRole[] = await details.roles.map((role: RoleObj) => {
      return {
        organizationName: orgDetails[role.organizationId],
        organizationId: role.organizationId,
        permission: role.permission
      };
    });

    setRoles(orgRoles);
    setLoading(false);
  };

  const fetchOrgNames = async (
    orgIds: string[],
    token: string,
    method: LoginMethod
  ) => {
    const data = await axios.post(
      `${ENDPOINTS.GATEWAY}${USER_ENDPOINTS.FETCH_ORGANIZATIONS}`,
      { ids: orgIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'login-method': method
        }
      }
    );
    return data.data;
  };

  return (
    <div className="bg-custom-white-dark h-screen py-16 px-24">
      <div className="flex justify-between items-center mb-9">
        <div className="text-2xl font-medium">
          {loading || !userDetails
            ? 'Organisations'
            : `${userDetails.firstName} ${userDetails.lastName}'s Organisations`}
        </div>
        <Button type="primary" ghost onClick={logout}>
          Logout
        </Button>
      </div>

      {loading ? (
        <Spin />
      ) : (
        <div className="space-y-4">
          {roles?.map((role, i) => {
            return (
              <OrganisationCard
                key={i}
                organizationId={role.organizationId}
                organizationName={role.organizationName}
                permissions={role.permission}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
