/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Button = ({
  to,
  text,
  type,
  variant = "fill",
  size = "md",
  disabled = false,
  className = "",
  onClick= ()=>{}
}) => {
  const baseClasses =
    "btn font-semibold rounded focus:outline-none focus:ring-2 focus:ring-opacity-50";
  const sizeClasses = {
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };
  const variantClasses = {
    fill: "bg-main text-white hover:bg-teal-700",
    outline: "btn-outline border-main text-main hover:bg-main hover:text-white",
  };

  const disabledClasses = disabled

    ? "opacity-50 cursor-not-allowed pointer-events-none bg-main "
    : "";

  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabledClasses}
    ${className}
  `.trim();

  if (to && !disabled) {
    return (
      <Link to={to} className={buttonClasses}>
        {text}
      </Link>
    );
  }

  return (
    <button type={type} className={buttonClasses} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
