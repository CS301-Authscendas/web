export enum ColorScheme {
  LIGHT = 'light',
  DARK = 'dark'
}

interface IProps {
  renderText?: boolean;
  width?: string;
  colorScheme?: ColorScheme;
}

export const Logo = ({
  renderText = true,
  width = 'full',
  colorScheme = ColorScheme.LIGHT
}: IProps) => {
  return (
    <div className={`flex flex-col ${renderText && 'mb-6'}`}>
      <div className="flex justify-center items-center">
        <div className={`${width && width}`}>
          <img src={`/assets/authcendas-${colorScheme}.png`} />
        </div>
      </div>
      {renderText && (
        <div className="text-xl text-center">
          Customer Engagement. Made Simple.
        </div>
      )}
    </div>
  );
};
