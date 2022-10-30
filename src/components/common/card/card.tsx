interface CardProps {
  title: string;
  description: string;
  imgSrc: string;
}
export const Card: React.FC<CardProps> = ({ title, description, imgSrc }) => {
  return (
    <>
      <div className="pb-4 bg-white w-1/5 rounded-lg">
        <img className="w-full rounded-lg" src={imgSrc} />
        <p className="text-center font-semibold pt-4">{title}</p>
        <p className="text-center mt-2 mx-3">{description}</p>
      </div>
    </>
  );
};
