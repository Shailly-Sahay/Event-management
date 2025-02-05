import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  text: string; // Button text
  href?: string; // Link target, optional
  size?: "small" | "medium" | "large"; // Button size
  className?: string; // Additional CSS classes
  type?: "button" | "submit" | "reset"; // Button type
  onClick?: () => void; // Function to trigger on click
}

const Button: React.FC<ButtonProps> = ({
  text,
  href,
  size = "medium", // Default size
  className = "",
  type = "button", // Default type
  onClick, // Click handler
}) => {
  const sizeClasses = {
    small: "py-1 px-3",
    medium: "py-2 px-4",
    large: "py-3 px-6",
  };

  const commonClasses = `button rounded inline-block font-semibold text-center hover:opacity-90 transition-opacity ${sizeClasses[size]} ${className}`;

  return href ? (
    <Link to={href} className={commonClasses} onClick={onClick}>
      {text}
    </Link>
  ) : (
    <button type={type} className={commonClasses} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
