import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const HeaderOwner = () => {
  const { cerrarSesion } = useAuth();
  return (
    <Box my="30px" className="sidebar">
      <ul className="sidebar-ul">
        <li className="sidebar-li">
          <Link to="/owner">Panel</Link>
        </li>
        <li className="sidebar-li">
          <Link to="/owner/edit">Productos</Link>
        </li>
        <li className="sidebar-li">
          <Link to="/owner/agregar">Agregar Producto</Link>
        </li>
        <li className="sidebar-li">
          <Link to="/owner/categorias">Categorias</Link>
        </li>
        <li className="sidebar-li">
          <Link to="/owner/ordenes">Ordenes</Link>
        </li>
        <li className="sidebar-li">
          <Link to="/owner/users">Usuarios</Link>
        </li>

        <li>
          <Link to="/owner/ventas">Ventas</Link>
        </li>
        <li>
          <Link to="/owner/transaciones">Transaciones</Link>
        </li>

        <li>
          <Link to="/owner/baneos">Baneos</Link>
        </li>
        <li>
          <Link to="/owner/UpdateRol">UpdateRol</Link>
        </li>
        <li>
          <button type="button" onClick={cerrarSesion}>
            Cerrar sesion
          </button>
        </li>
      </ul>
    </Box>
  );
};

export default HeaderOwner;
