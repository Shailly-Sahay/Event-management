import React from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  buttonType?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  href?: string;
  label: string;
  onClick?: () => void;
  className?: string; // Allows extra custom classes
};

const Button: React.FC<ButtonProps> = ({
  buttonType = "primary",
  type = "button",
  children,
  href,
  onClick,
  label,
  className = "",
}) => {
  const baseClasses =
    "px-6 py-3  font-semibold rounded-full transition duration-300 ease-in-out";

  const primaryClasses = "bg-[var(--primary-color)] text-white  shadow-md";

  const secondaryClasses =
    "border-2 border-[var(--primary-color)] text-[var(--dark-text-color)] hover:bg-gray-200 ";

  return href ? (
    <Link
      to={href}
      className={`${baseClasses} ${
        buttonType === "primary" ? primaryClasses : secondaryClasses
      } ${className}`}
      onClick={onClick}
    >
      {children ? children : label}
    </Link>
  ) : (
    <button
      type={type}
      className={`${baseClasses} ${
        buttonType === "primary" ? primaryClasses : secondaryClasses
      } ${className}`}
      onClick={onClick}
    >
      {children ? children : label}
    </button>
  );
};

export default Button;
