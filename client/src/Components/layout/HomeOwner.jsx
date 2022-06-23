import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const HomeOwner = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return "Cargando...";
  return (
    <>
      {auth?.rol === "Owner" ? (
        <main className="conteiner mx-auto mt-20">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
export default HomeOwner;
