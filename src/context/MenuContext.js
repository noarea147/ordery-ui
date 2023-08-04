"use client";
import React, { useContext, createContext } from "react";
import axiosFactory, { METHOD_POST } from "../helpers/AxiosFactory";
import { GET_BUSINESS_MENU } from "../helpers/urls";
const MenuContext = createContext();
export function useMenuContext() {
  return useContext(MenuContext);
}
export default function MenuProvider({ children }) {
  async function getBusinessMenu(data) {
    return await axiosFactory({
      url: GET_BUSINESS_MENU,
      method: METHOD_POST,
      data: data,
    });
  }

  const value = {
    getBusinessMenu,
  };
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}
