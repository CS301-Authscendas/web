import type { NextPage } from 'next';
import { ELabels, UploadFile } from '../components';
import { HomeLayout } from '../components/common/home-layout';

const UploadFilePage: NextPage = () => {
  return (
    <HomeLayout defaultKey={ELabels.UPLOAD_FILE}>
      <UploadFile />
    </HomeLayout>
  );
};

export default UploadFilePage;
