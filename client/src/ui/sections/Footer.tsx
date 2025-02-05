import React from "react";
import { Link } from "react-router-dom";
import { PageLink } from "../";

const Footer = () => {
  return (
    <div className="bg-primary py-10">
      <div className="section-pd-x flex justify-between items-center">
        <Link to="/">
          <p className="fs-body-lg text-light tracking-tight">Havenly.com</p>
        </Link>
        <div className="flex flex-col gap-y-4">
          <PageLink text="Privacy Policy" href="/" />
          <PageLink text="Terms of Service" href="/" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
