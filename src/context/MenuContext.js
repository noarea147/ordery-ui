"use client";
import React, { useContext, createContext } from "react";
import axiosFactory, { METHOD_POST } from "../helpers/AxiosFactory";
import {
  CREATE_MENU,
  GET_BUSINESS_MENU,
  GET_MY_BUSINESS_MENUS,
  ADD_PRODUCT,
  GET_PRODUCTS,
  GET_CATEGORY,
  DELETE_MENU,
} from "../helpers/urls";
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
  async function createMenu(data) {
    return await axiosFactory({
      url: CREATE_MENU,
      method: METHOD_POST,
      data: data,
    });
  }
  async function getMyBusinessMenus(data) {
    return await axiosFactory({
      url: GET_MY_BUSINESS_MENUS,
      method: METHOD_POST,
      data: data,
    });
  }

  async function getMenuProducts(data) {
    return await axiosFactory({
      url: GET_PRODUCTS,
      method: METHOD_POST,
      data: data,
    });
  }
  async function addProduct(data) {
    return await axiosFactory({
      url: ADD_PRODUCT,
      method: METHOD_POST,
      data: data,
    });
  }

  async function getMenuCategories(data) {
    return await axiosFactory({
      url: GET_CATEGORY,
      method: METHOD_POST,
      data: data,
    });
  }

  async function deleteMenu(data) {
    return await axiosFactory({
      url: DELETE_MENU,
      method: METHOD_POST,
      data: data,
    });
  }

  const value = {
    getBusinessMenu,
    getMyBusinessMenus,
    createMenu,
    getMenuProducts,
    addProduct,
    getMenuCategories,
    deleteMenu
  };
  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}
