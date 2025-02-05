import React from "react";
import { Link } from "react-router-dom";

interface LinkProps {
  text: string; // Button text
  href?: string; // Link target, optional
  textColorClass?: string; // Optional text color class
}

const PageLink: React.FC<LinkProps> = ({
  text,
  href,
  textColorClass = "text-light", // Default value applied here
}) => {
  return (
    <Link to={href || "#"} className="group relative inline-block">
      <span
        className={`${textColorClass} relative z-10 group-hover:text-white transition-colors duration-300`}
      >
        {text}
      </span>
      <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
};

export default PageLink;
