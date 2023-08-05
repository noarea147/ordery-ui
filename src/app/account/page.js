"use client";
import Nav from "@/components/Dashboard/components/nav";
import Dashboard from "@/components/Dashboard/dashboard";
import Business from "@/components/Dashboard/business";
import Header from "@/components/Dashboard/components/header";
import React, { useState } from "react";

export default function Account() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const handleNav = (tab) => {
    switch (tab) {
      case DASHBOARD:
        return setCurrentTab("dashboard");
      case BUSINESS:
        return setCurrentTab("business");
      default:
        return setCurrentTab("dashboard");
    }
  };
  const headerHandler = () => {
    switch (currentTab) {
      case DASHBOARD:
        return "Account Information";
      case BUSINESS:
        return "Business Information";
      default:
        return "Account Information";
    }
  };

  return (
    <div className="min-h-full">
      <Nav handleNav={handleNav} currentTab={currentTab} />
      <Header title={headerHandler()}/>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {currentTab === DASHBOARD && <Dashboard/>}
          {currentTab === BUSINESS && <Business/>}
        </div>
      </main>
    </div>
  );
}

export const DASHBOARD = "dashboard",
  BUSINESS = "business";
