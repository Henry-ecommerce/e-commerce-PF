import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import HeaderAdmin from "../AdminPanel/Admin/HeaderAdmin";
import FooterAdmin from "../AdminPanel/Admin/FooterAdmin";

const HomeAdmin = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return "Cargando...";
  return (
    <>
      <HeaderAdmin />

      {auth?.rol === "Admin" ? (
        <main className="conteiner mx-auto mt-20">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/login" />
      )}

      <FooterAdmin />
    </>
  );
};
export default HomeAdmin;
