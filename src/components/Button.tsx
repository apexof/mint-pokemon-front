import React, { FC, MouseEventHandler, PropsWithChildren } from "react";

export type ButtonProps = PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
}>;

export const Button: FC<ButtonProps> = (props) => {
  const { onClick, children } = props;

  return (
    <button
      className="text-lg w-96 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
