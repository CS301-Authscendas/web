import classnames from 'classnames';

interface IButtonProps {
  onSubmit?: () => void;
  width?: string;
  text: string;
  isDisabled?: boolean;
}

export const Button = ({ onSubmit, width, text, isDisabled }: IButtonProps) => {
  const buttonStyle = classnames({
    'flex h-10 items-center justify-center rounded-md bg-custom-blue-light cursor-pointer':
      true,
    'cursor-not-allowed bg-custom-blue-lighter': isDisabled
  });

  const handleOnSubmit = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!isDisabled && onSubmit) {
      onSubmit();
    }
  };

  return (
    <div
      className={buttonStyle + ' ' + (width ? width : 'w-full')}
      onClick={handleOnSubmit}
    >
      <div className="text-white">{text}</div>
    </div>
  );
};
