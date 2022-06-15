import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Header from "../../helper/Header";
import Footer from "../../helper/Footer";

const HomeUser = () => {
  const { auth, cargando, setAuth } = useAuth();

  const esta = localStorage.getItem("info_user".json());

  console.log(`linea 888`, esta);
  if (esta) {
    console.log("Holaaaaaaaaaaaaaaaaaaaaaaaaa");
    if (cargando) return "Cargando...";
    return (
      <>
        {/* <Header /> */}
        {esta?.rol === "User" || esta?.rol === "Admin" ? (
          <main className="conteiner mx-auto mt-20">
            <Outlet />
          </main>
        ) : (
          <Navigate to="/login" />
        )}
        {/* <Footer /> */}
      </>
    );
  } else {
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
  }
};
export default HomeUser;
