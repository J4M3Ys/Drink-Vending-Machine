import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function PublicRoute() {
  const isLogin = localStorage.getItem("token");

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
}
