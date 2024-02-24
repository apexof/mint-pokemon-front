import React, { FC, MouseEventHandler, PropsWithChildren } from "react";
import loaderIcon from "@/assets/loader.svg";
import Image from "next/image";
import s from "./button.module.scss";

export type ButtonProps = PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
}>;

export const Button: FC<ButtonProps> = (props) => {
  const { isLoading, onClick, children } = props;

  return (
    <button className={s.button} onClick={onClick} disabled={isLoading}>
      {isLoading && <Image width={25} src={loaderIcon} alt="" />}
      {children}
    </button>
  );
};
