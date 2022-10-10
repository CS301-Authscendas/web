interface IProps {
  renderText?: boolean;
}

export const Logo = ({ renderText = true }: IProps) => {
  return (
    <div className={`flex flex-col ${renderText && 'mb-6'}`}>
      <div className="flex justify-center items-center">
        <img src="/assets/authcendas.png" />
      </div>
      {renderText && (
        <div className="text-xl text-center">
          Customer Engagement. Made Simple.
        </div>
      )}
    </div>
  );
};
