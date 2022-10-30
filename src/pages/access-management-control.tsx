import type { NextPage } from 'next';
import { AccessControlManagement, ELabels } from '../components';
import { HomeLayout } from '../components/common/home-layout';

const AccessControlManagementPage: NextPage = () => {
  return (
    <HomeLayout defaultKey={ELabels.ACCESS_CONTROL}>
      <AccessControlManagement />
    </HomeLayout>
  );
};

export default AccessControlManagementPage;
