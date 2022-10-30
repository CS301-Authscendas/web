import { HomeContent } from '../common';
import { Card } from '../common/card';

export const Rewards: React.FC = () => {
  return (
    <HomeContent title="Rewards">
      <div className="flex space-x-8">
        <Card
          imgSrc="./assets/united.png"
          title="United Airline"
          description="Discover exciting destinations around the world. United flight
          specials are a great reason to experience new places."
        />
        <Card
          imgSrc="./assets/klook.jpg"
          title="Klook"
          description="Travel, shop and eat: We’ve got the scoop on rewards (worth up to $1,098) and amazing travel deals with HSBC Credit Cards"
        />
      </div>
    </HomeContent>
  );
};
