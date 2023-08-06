"use client";
import React, { useContext, createContext } from "react";
import axiosFactory, { METHOD_POST } from "../helpers/AxiosFactory";
import { LOGIN, REGISTER, VERIFY_ACCOUNT } from "../helpers/urls";
const AuthContext = createContext();
export function useAuthContext() {
  return useContext(AuthContext);
}
export default function AuthProvider({ children }) {
  async function login(data) {
    return await axiosFactory({
      url: LOGIN,
      method: METHOD_POST,
      data: data,
    });
  }
  async function register(data) {
    return await axiosFactory({
      url: REGISTER,
      method: METHOD_POST,
      data: data,
    });
  }
  async function verifyAccount(data) {
    return await axiosFactory({
      url: VERIFY_ACCOUNT,
      method: METHOD_POST,
      data: data,
    });
  }

  const value = {
    login,
    register,
    verifyAccount,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
