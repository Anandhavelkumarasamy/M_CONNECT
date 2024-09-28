import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import classes from "./Login.module.css";
import TextInputBox from "../../Component/TextInputBox";
import CustomButton from "../../Component/CustomButton";
import loginimage from "../../Assests/Png/loginimg-removebg-preview.png";
import logoimage from "../../Assests/Png/m-connect-logo.png";
import { signin } from "../../Services/Services";
import { message } from "antd";
interface LoginProps {
  organizationcode: string;
  userName: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const sha1 = require("sha1");
  const validationschema = Yup.object({
    organizationcode: Yup.string().required("Organization code is required"),
  });

  const { values, handleBlur, handleChange, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        organizationcode: "",
        userName: "",
        password: "",
      },
      validationSchema: validationschema,
      onSubmit: (values) => {
        handleLogin(values);

        console.log("Form Submitted", values);
      },
    });

  const handleLogin = (values: LoginProps) => {
    let formdata = new FormData();
    formdata.append("userName", values.userName);
    formdata.append("password", values.password);
    formdata.append("device_type", "3");
    formdata.append("organization_code", values.organizationcode);
    formdata.append(
      "authcode",
      sha1("A0322A@B&H@R!!akLLo012VSzXycAA1" + values.userName)
    );
    signin(formdata)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("logintoken", response.data.token);
          message.success(response.data.msg);
          navigate("/navbar/dashboard");
        } else {
          message.error(response.data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Row className={classes.logincontainer}>
        <Col lg={6} md={6} className={classes.imagecontainer}>
          <img
            src={loginimage}
            alt="Illustration"
            style={{ width: "70%", height: "60%" }}
            className={classes.loginimage}
          />
        </Col>

        <Col lg={6} md={6} className={classes.loginright}>
          <div className={classes.formsection}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <img
                src={logoimage}
                alt="logoimage"
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />

              <div style={{ marginLeft: 8 }}>
                <p
                  style={{ fontWeight: "500", margin: 0, textAlign: "center" }}
                >
                  CONNECT
                </p>
                <p className={classes.logotext} style={{ margin: 0 }}>
                  Industrial IOT
                </p>
              </div>
            </div>
            <h5 className="">M-POWER</h5>

            <form onSubmit={handleSubmit}>
              <h5>Login</h5>
              <TextInputBox
                title={"Organization Code"}
                value={values.organizationcode}
                onChange={handleChange("organizationcode")}
                onBlurs={handleBlur}
                placeholder="Enter Your Organization Code"
                errorText={touched.organizationcode && errors.organizationcode}
                isRequired={true}
                isPassword={false}
              />

              <TextInputBox
                title={"User Name"}
                value={values.userName}
                onChange={handleChange("userName")}
                onBlurs={handleBlur}
                placeholder="Enter userName"
                errorText={touched.userName && errors.userName}
                isRequired={true}
                isPassword={false}
                isUser={true}
              />

              <TextInputBox
                title={"Password"}
                value={values.password}
                onChange={handleChange("password")}
                onBlurs={handleBlur}
                placeholder="Enter password"
                errorText={touched.password && errors.password}
                isRequired={true}
                isPassword={true}
              />

              <p className="text-end">Forgot Password?</p>

              <CustomButton type="submit">Login</CustomButton>

              <p className={classes.signuptext}>
                Don't have an account? <span>Signup</span>
              </p>
            </form>
          </div>
        </Col>
      </Row>
    </>
  );
}
