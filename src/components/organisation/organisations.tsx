import { ERoles } from '../access-control-management/types';
import { OrganisationCard } from '../common/organisation-card';

export const Organisation: React.FC = () => {
  return (
    <div className="bg-custom-white-dark h-screen p-24">
      <p className="text-2xl font-medium mb-5">Organisations</p>
      <OrganisationCard organisation="Klook" role={ERoles.ADMIN} />
    </div>
  );
};
