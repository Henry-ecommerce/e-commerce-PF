import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./difere.css";
const HeaderAdmin = () => {
	const { cerrarSesion } = useAuth();
	return (
		<Box my="30px" className="sidebar">
			<ul className="sidebar-ul">
				<li className="sidebar-li">
					<Link to="/admin">
						<Text fontWeight="extrabold">Panel</Text>
					</Link>
				</li>
				<li className="sidebar-li">
					<Link to="/admin/edit">
						<Text fontWeight="extrabold">Productos</Text>
					</Link>
				</li>
				<li className="sidebar-li">
					<Link to="/admin/agregar">
						<Text fontWeight="extrabold">Agregar Producto</Text>
					</Link>
				</li>
				<li className="sidebar-li">
					<Link to="/admin/categorias">
						<Text fontWeight="extrabold">Categorias</Text>
					</Link>
				</li>
				<li className="sidebar-li">
					<Link to="/admin/ordenes">
						<Text fontWeight="extrabold">Ordenes</Text>
					</Link>
				</li>
				<li className="sidebar-li">
					<Link to="/admin/users">
						<Text fontWeight="extrabold">Usuarios</Text>
					</Link>
				</li>
				<li>
					<button
						style={{ fontWeight: "bolder" }}
						type="button"
						onClick={cerrarSesion}
					>
						Cerrar sesion
					</button>
				</li>
			</ul>
		</Box>
	);
};

export default HeaderAdmin;
