import { useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthProviderProducContext = createContext();

export const AdminProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({});
  const [users, setUsers] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [pagos, setPagos] = useState([]);
  console.log(producto);
  useEffect(() => {
    const pagos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/admin/transacciones`,
          config
        );

        setPagos(data);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };
    pagos();
    const ventas = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/admin/ventas`,
          config
        );

        setVentas(data);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };
    ventas();
    const ordenes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/admin/ordenes`,
          config
        );

        setOrdenes(data);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };
    ordenes();
    const obtenerCategorias = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/admin/categorias`,
          config
        );

        setCategorias(data);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };
    obtenerCategorias();

    const obtenerUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/admin/users`,
          config
        );

        setUsers(data);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };
    obtenerUsers();
    const obtenerProducto = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/admin/obtener`,
          config
        );

        setProductos(data);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };
    obtenerProducto();
  }, []);

  const guardarProducto = async (producto) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(producto);
    console.log(producto.id);
    if (producto.id) {
      try {
        const { data } = await axios.put(
          `${process.env.REACT_APP_API}/admin/modificar/${producto.id}`,
          producto,
          config
        );
        const productoActualizado = productos.map((e) =>
          e._id === data._id ? data : e
        );
        setProductos(productoActualizado);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    } else {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API}/producto/crear`,
          producto,
          config
        );
        const { createdAt, updatedAt, ...productosAlmacenados } = data;
        setProductos([productosAlmacenados, ...productos]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };
  const putProducto = (e) => {
    console.log(e);
    setProducto(e);
  };

  const eliminarProducto = async (id) => {
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
          `${process.env.REACT_APP_API}/admin/borrar/${id}`,
          config
        );
        const pacienteActualizado = productos.filter((e) => e._id !== id);
        setProductos(pacienteActualizado);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <AuthProviderProducContext.Provider
      value={{
        guardarProducto,
        putProducto,
        eliminarProducto,
        users,
        ordenes,
        categorias,
        ventas,
        productos,
        producto,
        pagos,
      }}
    >
      {children}
    </AuthProviderProducContext.Provider>
  );
};

export default AuthProviderProducContext;
