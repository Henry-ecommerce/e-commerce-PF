import useAuthAd from "../../../hooks/useAuthAd";
import Cards from "./Cards";
const ObtenerProductosAdmin = () => {
  const { productos } = useAuthAd();
  return (
    <>
      {productos.length ? (
        <>
          <h2 className="font-black text-3xl text-center">
            Listado de productos
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus productos{" "}
            <span className="text-indigo-600 font-bold">y citas</span>
          </p>
          {productos.map((e) => (
            <Cards key={e.id} e={e} />
          ))}
        </>
      ) : (
        <>
          <h2>No hay productos</h2>
          <p>
            Comienza agregando productos{" "}
            <span> y apareceran en este lugar</span>
          </p>
        </>
      )}
    </>
  );
};

export default ObtenerProductosAdmin;
