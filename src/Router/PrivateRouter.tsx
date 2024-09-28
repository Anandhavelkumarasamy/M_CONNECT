import { Outlet, Navigate } from "react-router-dom";
export const AuthPrivate = () => {
  const username = localStorage.getItem("logintoken");
  return !username ? <Outlet /> : <Navigate to="/navbar/dashboard" />;
};
export const HomePrivate = () => {
  const username = localStorage.getItem("logintoken");
  return username ? <Outlet /> : <Navigate to="/login" />;
};
