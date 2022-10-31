import type { NextPage } from 'next';
import { ELabels } from '../components';
import { HomeLayout } from '../components/common/home-layout';
import { Rewards } from '../components/rewards';

const RewardsPage: NextPage = () => {
  return (
    <HomeLayout defaultKey={ELabels.REWARDS}>
      <Rewards />
    </HomeLayout>
  );
};

export default RewardsPage;
