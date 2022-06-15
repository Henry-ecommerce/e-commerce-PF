import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const HomeUser = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return "Cargando...";
  return (
    <>
      {/* <Header /> */}
      {auth?.rol === "User" || auth?.rol === "Admin" ? (
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