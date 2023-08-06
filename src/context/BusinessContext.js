"use client";
import React, { useContext, createContext } from "react";
import axiosFactory, { METHOD_POST } from "../helpers/AxiosFactory";
import {
  GET_BUSINESS,
  GET_BUSINESS_BY_USERNAME,
  CREATE_BUSINESS,
} from "../helpers/urls";
const BusinessContext = createContext();
export function useBusinessContext() {
  return useContext(BusinessContext);
}
export default function BusinessProvider({ children }) {
  async function getMyBusiness(data) {
    return await axiosFactory({
      url: GET_BUSINESS,
      method: METHOD_POST,
      data: data,
    });
  }
  async function getBusinessByUsername(data) {
    return await axiosFactory({
      url: GET_BUSINESS_BY_USERNAME,
      method: METHOD_POST,
      data: data,
    });
  }
  async function createBusiness(data) {
    return await axiosFactory({
      url: CREATE_BUSINESS,
      method: METHOD_POST,
      data: data,
    });
  }

  const value = {
    getMyBusiness,
    getBusinessByUsername,
    createBusiness,
  };
  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
}
