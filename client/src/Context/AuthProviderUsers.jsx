import { useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthProviderUserContext = createContext();
///
const AuthProviderUser = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const autenteicarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios(
          `${process.env.REACT_APP_API}/registro/perfil`,
          config
        );

        setAuth(data);
      } catch (error) {
        setAuth({});
      }
      setCargando(false);
    };
    autenteicarUsuario();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_direction");
    localStorage.removeItem("info_user");
    setAuth({});
  };
  const actualizarPerfil = async (datos) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(`soy congi`, config);

    const obj = {
      name: datos.name,
      apellido: datos.apellido,
      img: datos.img,
      fecha_nacimiento: datos.fecha_nacimiento,
      direccion: datos.direccion,
      email: datos.email,
    };
    console.log(`dasdasdasd`, obj.img);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/user/perfil/update/info/${datos.id}`,
        obj,
        config
      );
      setAuth(data);
    } catch (error) {
      console.log(error.message);
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  const guardarPasswor = async (datos) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = axios.put(
        `${process.env.REACT_APP_API}/registro/cambioPasss`,
        datos,
        config
      );

      return {
        msg: data.msg,
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };
  return (
    <AuthProviderUserContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarPerfil,
        guardarPasswor,
      }}
    >
      {children}
    </AuthProviderUserContext.Provider>
  );
};

export { AuthProviderUser };

export default AuthProviderUserContext;
