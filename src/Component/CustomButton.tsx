import React from "react";
import { Button } from "react-bootstrap";
import { CustomButtonProps } from "./Component";
import classes from "./Component.module.css";
export default function CustomButton({
  type = "button",
  style,
  onClick,
  children,
}: CustomButtonProps) {
  return (
    <Button
      type={type}
      style={style}
      onClick={onClick}
      className={classes.custombtn}
    >
      {children}
    </Button>
  );
}
