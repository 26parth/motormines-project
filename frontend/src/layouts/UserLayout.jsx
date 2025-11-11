import React from "react";
import Navbar from "../components/Navbar";

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default UserLayout;
