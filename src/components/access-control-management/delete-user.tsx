interface IProps {
  username: string;
}

export const DeleteUser = ({ username }: IProps) => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      Do you want to delete {username}?
    </div>
  );
};
