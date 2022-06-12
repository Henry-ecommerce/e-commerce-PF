import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Header from "../../helper/Header";
import Footer from "../../helper/Footer";

const HomeUser = () => {
	const { auth, cargando } = useAuth();

	if (cargando) return "Cargando...";
	return (
		<>
			{/* <Header /> */}
			{auth?.rol === "User" ? (
				<main className="conteiner mx-auto mt-20">
					<Outlet />
				</main>
			) : (
				<Navigate to="/login" />
			)}
			{/* <Footer /> */}
		</>
	);
};
export default HomeUser;
