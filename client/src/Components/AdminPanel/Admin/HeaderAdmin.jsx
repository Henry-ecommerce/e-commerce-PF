import { Box } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./difere.css";
const HeaderAdmin = () => {
  const { cerrarSesion } = useAuth();
  return (
    <Box my='30px' className="sidebar">

      <ul className="sidebar-ul">
        <li className="sidebar-li">
          <Link to="/admin">Panel</Link>
        </li>
        <li className="sidebar-li">
          <Link to="/admin/edit">Productos</Link>
        </li>
        <li className="sidebar-li">
          <Link to="/admin/agregar">Agregar Producto</Link>
        </li>
        <li className="sidebar-li">
          <Link to="/admin/categorias">Categorias</Link>
        </li>
        {/* <li className="sidebar-li">
          <Link to="/admin/ordenes">Ordenes</Link>
        </li> */}
        <li className="sidebar-li">
          <Link to="/admin/users">Usuarios</Link>
        </li>

        {/* <li>
          <Link to="/admin/ventas">Ventas</Link>
        </li> */}
        {/* <li>
          <Link to="/admin/transaciones">Transaciones</Link>
        </li> */}

        <li>
          <button type="button" onClick={cerrarSesion}>
            Cerrar sesion
          </button>
        </li>
      </ul>
    </Box>
  );
};

export default HeaderAdmin;
