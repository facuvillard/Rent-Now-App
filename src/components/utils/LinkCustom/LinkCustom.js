import React from "react";
import { Link } from "react-router-dom";

const LinkCustom = ({ children, to, style, ...rest }) => {
  return (
    <Link style={{ textDecoration: "none", color: "inherit", ...style }} to={to} {...rest}>
      {children}
    </Link>
  );
};

export default LinkCustom;
