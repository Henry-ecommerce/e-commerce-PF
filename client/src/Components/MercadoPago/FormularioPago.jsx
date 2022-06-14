import React, { useState } from "react";
import MercadoPago from "./MercadoPago";
import { FormControl, FormLabel, Input, Button, Flex } from "@chakra-ui/react";
import { useParams } from "react-router";
export default function FormMp() {
  const { id } = useParams();

  const [pagar, setPagar] = useState(true);
  const [datos, setDatos] = useState({
    nombre: "",
    numero: "",
    DNI: "",
    direccion: "",
  });

  function onInputChange(e) {
    setPagar(true);
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmit() {
    setPagar(false);
  }

  return (
    <form
      action={`http://localhost:3001/productos/checkout/${id}`}
      method="POST"
      items={datos}
    >
      <FormLabel>Nombre</FormLabel>
      <Input
        autoComplete="off"
        type="text"
        placeholder="Nombre"
        name="nombre"
        value={datos.nombre}
        onChange={onInputChange}
      />
      <FormLabel>Telefono</FormLabel>
      <Input
        autoComplete="off"
        type="text"
        placeholder="Numero de telefono"
        name="numero"
        value={datos.numero}
        onChange={onInputChange}
      />
      <FormLabel>DNI</FormLabel>
      <Input
        autoComplete="off"
        type="text"
        placeholder="DNI"
        name="DNI"
        value={datos.DNI}
        onChange={onInputChange}
      />
      <FormLabel>Direccion</FormLabel>
      <Input
        autoComplete="off"
        type="text"
        placeholder="Direccion"
        name="direccion"
        value={datos.direccion}
        onChange={onInputChange}
      />
      <Button type="submit">Pagar con MercadoPago</Button>
    </form>
  );
}
