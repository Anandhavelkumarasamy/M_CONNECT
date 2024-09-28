import React, { useState } from "react";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  UserOutlined,
  LockOutlined, // Import the lock icon from Ant Design
} from "@ant-design/icons";
import classes from "./Component.module.css";
import { TextInputBoxProps } from "./Component";

export default function TextInputBox({
  title,
  value,
  onChange,
  placeholder,
  errorText,
  onBlurs,
  isRequired = false,
  isPassword = false,
  isUser = false,
}: TextInputBoxProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev: boolean) => !prev);
  };

  return (
    <div>
      {title && (
        <p className="text-start mt-2">
          {title} {isRequired && <span className="text-danger">*</span>}
        </p>
      )}

      <div
        className={classes.inputboxcontainer1}
        style={{ display: "flex", alignItems: "center" }}
      >
        {/* User icon if isUser is true */}
        {isUser && (
          <div
            className={classes.inputboxcontainer5}
            style={{ marginRight: "10px" }}
          >
            <UserOutlined className={classes.eyecolor} />
          </div>
        )}

        {/* Lock icon (if isPassword is true) */}
        {isPassword && (
          <div
            className={classes.inputboxcontainer5}
            style={{ marginRight: "10px" }}
          >
            <LockOutlined className={classes.eyecolor} />
          </div>
        )}

        {/* Input field */}
        <div
          style={{
            flexGrow: 1,
            // backgroundColor: "green",
            display: "flex",
          }}
        >
          <input
            type={
              isPassword ? (isPasswordVisible ? "text" : "password") : "text"
            }
            value={value}
            onChange={(event) => onChange(event)}
            placeholder={placeholder}
            onBlur={onBlurs}
            className={classes.inputboxcontainer3}
          />

          {/* Password visibility toggle */}
          {isPassword && (
            <div
              className={classes.inputboxcontainer4}
              style={{ marginLeft: "10px" }}
            >
              <div onClick={togglePasswordVisibility} role="button">
                {isPasswordVisible ? (
                  <EyeInvisibleOutlined className={classes.eyecolor} />
                ) : (
                  <EyeOutlined className={classes.eyecolor} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error text */}
      {errorText && (
        <p
          className={`text-danger mt-2 text-start ${classes.errortext} ${
            errorText ? classes.showError : ""
          }`}
        >
          {errorText}
        </p>
      )}
    </div>
  );
}
