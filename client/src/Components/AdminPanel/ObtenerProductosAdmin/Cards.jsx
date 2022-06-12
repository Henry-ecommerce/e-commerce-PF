import useAuthAd from "../../../hooks/useAuthAd";
import { useNavigate } from "react-router-dom";

const Cards = ({ e }) => {
  const { putProducto, eliminarProducto } = useAuthAd();
  const {
    nombre,
    marca,
    precio,
    caracteristicas,
    funciones,
    stock,
    descuento,
    imagen0,
    imagen1,
    imagen2,
    id,
  } = e;
  const navegates = useNavigate();
  const handleOnclick = () => {
    putProducto(e);
    navegates("producto");
  };
  return (
    <div>
      <hr />
      <p>
        id: <span>{id}</span>
      </p>
      <p>
        Nombre: <span>{nombre}</span>
      </p>
      <p>
        Marca: <span>{marca}</span>
      </p>
      <p>
        Precio en dolares: <span>{precio.Dolares}</span>
      </p>
      <p>
        Precio en Pesos Mexicanos: <span>{precio.PesosMX}</span>
      </p>
      <p>
        Precio en Pesos Argentinos: <span>{precio.PesosArg}</span>
      </p>

      <p>
        Funciones: <span>{funciones}</span>
      </p>
      <p>
        Stock: <span>{stock}</span>
      </p>
      <p>
        Descuento: <span>{descuento}</span>
      </p>
      <p>
        Imagen1: <img src={imagen0} alt="" />
      </p>
      <p>
        Imagen2: <img src={imagen1} alt="" />
      </p>
      <p>
        Imagen3: <img src={imagen2} alt="" />
      </p>

      <div>
        <button type="button" onClick={handleOnclick}>
          Editar producto
        </button>
        <hr />
        <button type="button" onClick={() => eliminarProducto(id)}>
          Eliminar producto
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Cards;
