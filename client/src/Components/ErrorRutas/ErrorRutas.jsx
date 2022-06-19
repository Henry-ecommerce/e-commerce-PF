import React from "react";
import { Link } from "react-router-dom";

const ErrorRutas = () => {
  return (
    <div>
      <h1>Ruta no valida</h1>
      <img
        src="https://i.pinimg.com/170x/82/7c/dd/827cddff2c8ec85fbc05e63d38fa4dff.jpg"
        alt="error"
      />
      <Link to="/">Ve al home</Link>
    </div>
  );
};

export default ErrorRutas;
