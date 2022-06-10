import { useState, useEffect, createContext } from "react";
import axios from "axios";

const usuariosContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuarios, setusUarios] = useState([]);
  const [usuario, setusUario] = useState({});
  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        //toma token alamacenado
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/paciente/obtener`,
          config
        );

        setusUarios(data);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };
    obtenerPerfil();
  }, []);

  const guardarPerfil = async (paciente) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (usuario.id) {
      try {
        const { data } = await axios.put(
          `${import.meta.env.BACKEND_URL}/usuario/modificar/${usuario.id}`,
          usuario,
          config
        );
        const usuarioActualizado = usuarios.map((e) =>
          e._id === data._id ? data : e
        );
        setusUarios(usuarioActualizado);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    } else {
      try {
        const { data } = await axios.post(
          `${import.meta.env.BACKEND_URL}/usuario/crear`,
          usuario,
          config
        );
        const { createdAt, updatedAt, __v, ...usuariosAlmacenados } = data;
        setusUarios([usuariosAlmacenados, ...usuarios]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };
  const putUsuario = (e) => {
    setusUario(e);
  };

  const eliminarPaciente = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmar = confirm(
      "¿Confirmas que desas eliminar el siguiente registro ?"
    );
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (confirmar) {
      try {
        // eslint-disable-next-line no-unused-vars
        const { data } = await axios.delete(
          `${process.env.REACT_APP_API}/paciente/borrar/${id}`,
          config
        );
        const pacienteActualizado = usuarios.filter((e) => e._id !== id);
        setusUarios(pacienteActualizado);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <usuariosContext.Provider
      value={{
        usuarios,
        guardarPerfil,
        putUsuario,
        usuario,
        eliminarPaciente,
      }}
    >
      {children}
    </usuariosContext.Provider>
  );
};

export default usuariosContext;
