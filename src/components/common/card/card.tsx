interface CardProps {
  title: string;
  description: string;
  imgSrc: string;
}
export const Card: React.FC<CardProps> = ({ title, description, imgSrc }) => {
  return (
    <>
      <div className="h-72 bg-white w-1/5 rounded-lg">
        <img className="h-min-1/2 w-full rounded-lg" src={imgSrc} />
        <p className="text-center font-semibold mt-2">{title}</p>
        <p className="text-center mt-2 mx-3">{description}</p>
      </div>
    </>
  );
};
