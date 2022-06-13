import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Alerta from "../../helper/Alerta";

function ConfirmarCuenta() {
  const { id } = useParams();

  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `${process.env.REACT_APP_API}/registro/confirmar/${id}`;
        const { data } = await axios.get(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
          error: false,
        });
        return;
      } catch (error) {}
      setCargando(false);
    };
    confirmarCuenta();
  }, []);

  const { msg } = alerta;
  console.log(msg);
  console.log("holaa");
  return (
    <>
      <div>
        <h1 className="text-indigo-600  font-black text-6xl">
          Cuenta confirmada correctamente
          <span className="text-black">ve al login</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg === "Vuelva a intentar tokenn no valido" ? (
          <Alerta alerta={alerta} />
        ) : (
          <>Esta</>
        )}
        {cuentaConfirmada === true ? (
          <Link
            to="/login"
            className="block text-center my-5 text-gray-500 text-xl"
          >
            Ya esta todo listo 🙌
            <span className="font-bold text-slate-700 text-lg">
              {" "}
              inicia sesion
            </span>
          </Link>
        ) : (
          <Link
            to="/login/signup"
            className="block text-center my-5 text-gray-500 text-xl"
          >
            Registrate para obtener una
            <span className="font-bold text-slate-700 text-lg"> cueta</span>
          </Link>
        )}
      </div>
    </>
  );
}

export default ConfirmarCuenta;
