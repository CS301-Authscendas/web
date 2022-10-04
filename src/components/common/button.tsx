import classnames from 'classnames';

interface IButtonProps {
  onSubmit: () => void;
  text: string;
  isDisabled?: boolean;
}

export const Button = ({ onSubmit, text, isDisabled }: IButtonProps) => {
  const buttonStyle = classnames({
    'flex w-full h-12 items-center justify-center rounded-lg bg-custom-blue-light cursor-pointer':
      true,
    'cursor-not-allowed bg-custom-blue-lighter': isDisabled
  });

  const handleOnSubmit = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className={buttonStyle} onClick={handleOnSubmit}>
      <div className="text-white">{text}</div>
    </div>
  );
};
