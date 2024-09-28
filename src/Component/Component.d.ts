import { FormikErrors } from "formik";
import React from "react";

export type TextInputBoxProps = {
  title?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  errorText?:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | null
    | any;
  name?: string;
  onBlurs?: (event: React.FocusEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  isPassword?: boolean;
  isUser?: boolean;
};

export type PaginationProps = {
  current: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number, pageSize: number) => void;
};
export type CustomButtonProps = {
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
};
