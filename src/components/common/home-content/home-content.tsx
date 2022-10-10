import { Fragment } from 'react';

interface IProps {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export const HomeContent = ({ title, children }: IProps) => {
  return (
    <Fragment>
      <div className="text-2xl font-medium mb-8">{title}</div>
      {children}
    </Fragment>
  );
};
