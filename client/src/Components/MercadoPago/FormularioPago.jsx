import React, { useState } from "react";
import MercadoPago from "./MercadoPago";
import {
  FormLabel,
  Input,
  Button,
  Box,
  FormControl,
  Select,
  Flex,
} from "@chakra-ui/react";

export default function FormMercadoPago() {
  const [pagar, setPagar] = useState(true);
  const [errors, setErrors] = useState({
    pais: "Recuerde que algunos campos son obligatorios",
    provincia: "",
    ciudad: "",
    CP: "",
    nombreCalle: "",
    numeroCalle: "",
    tipoDoc: "",
    numeroDoc: "",
  });
  const [datos, setDatos] = useState({
    pais: "",
    provincia: "",
    ciudad: "",
    CP: "",
    nombreCalle: "",
    numeroCalle: "",
    piso: "",
    telefono: "",
    tipoDoc: "",
    numeroDoc: "",
  });

  const errorHandler = (propiedad) => {
    if (propiedad.name === "pais") {
      if (!propiedad.value)
        setErrors({ ...errors, [propiedad.name]: "Porfavor inserte un Pais" });
      else if (!/^[^\s]+(\s+[^\s]+)*$/.test(propiedad.value))
        setErrors({
          ...errors,
          [propiedad.name]:
            "Porfavor elemine los espacios ingresados al principio o al final",
        });
      else if (!/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(propiedad.value))
        setErrors({
          ...errors,
          [propiedad.name]: "El dato ingresado deberia ser una cadena de texto",
        });
      else if (/\b(^[a-z])/g.test(propiedad.value))
        setErrors({
          ...errors,
          [propiedad.name]: "La primera letra debe estar en mayusculas",
        });
      else setErrors({ ...errors, [propiedad.name]: "" });
    }

    if (propiedad.name === "provincia") {
      if (!propiedad.value)
        setErrors({
          ...errors,
          [propiedad.name]: "Porfavor inserte una provincia o estado",
        });
      else if (!/^[^\s]+(\s+[^\s]+)*$/.test(propiedad.value))
        setErrors({
          ...errors,
          [propiedad.name]:
            "Porfavor elemine los espacios ingresados al principio o al final",
        });
      else if (!/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(propiedad.value))
        setErrors({
          ...errors,
          [propiedad.name]: "El dato ingresado deberia ser una cadena de texto",
        });
      else if (/\b(^[a-z])/g.test(propiedad.value))
        setErrors({
          ...errors,
          [propiedad.name]: "La primera letra debe estar en mayusculas",
        });
      else setErrors({ ...errors, [propiedad.name]: "" });
    }

    if (propiedad.name === "ciudad") {
      if (!propiedad.value)
        setErrors({
          ...errors,
          [propiedad.name]: "Porfavor inserte una ciudad",
        });
      else if (!/^[^\s]+(\s+[^\s]+)*$/.test(propiedad.value))
        setErrors({
          ...errors,
          [propiedad.name]:
            "Porfavor elemine los espacios ingresados al principio o al final",
        });
      else if (!/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(propiedad.value))
        setErrors({
          ...errors,
          [propiedad.name]: "El dato ingresado deberia ser una cadena de texto",
        });
      else if (/\b(^[a-z])/.test(propiedad.value))
        setErrors({
          ...errors,
          [propiedad.name]: "La primera letra debe estar en mayusculas",
        });
      else setErrors({ ...errors, [propiedad.name]: "" });
    }

    if (propiedad.name === "CP") {
      if (!propiedad.value)
        setErrors({
          ...errors,
          [propiedad.name]: "Porfavor inserte un Codigo Postal",
        });
      else if (!/^[^\s]+(\s+[^\s]+)*$/.test(propiedad.value))
        setErrors({
          ...errors,
          [propiedad.name]:
            "Porfavor elemine los espacios ingresados al principio o al final",
        });
      else if (!/^[0-9]+$/.test(propiedad.value))
        setErrors({
          ...errors,
          [propiedad.name]: "El dato ingresado deberia ser un numero",
        });
      else setErrors({ ...errors, [propiedad.name]: "" });
    }

    if (propiedad.name === "nombreCalle") {
      if (!propiedad.value)
        setErrors({
          ...errors,
          [propiedad.name]: "Porfavor inserte un Nombre de Calle",
        });
      else if (!/^[^\s]+(\s+[^\s]+)*$/.test(propiedad.value))
        setErrors({
          ...errors,
          [propiedad.name]:
            "Porfavor elemine los espacios ingresados al principio o al final",
        });
      else if (!/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(propiedad.value))
        setErrors({
          ...errors,
          [propiedad.name]: "El dato ingresado deberia ser una cadena de texto",
        });
      else setErrors({ ...errors, [propiedad.name]: "" });
    }

    if (propiedad.name === "numeroCalle") {
      if (!propiedad.value)
        setErrors({
          ...errors,
          [propiedad.name]: "Porfavor inserte un Numero de Calle",
        });
      else if (!/^[^\s]+(\s+[^\s]+)*$/.test(propiedad.value))
        setErrors({
          ...errors,
          [propiedad.name]:
            "Porfavor elemine los espacios ingresados al principio o al final",
        });
      else if (!/^[0-9]+$/.test(propiedad.value))
        setErrors({
          ...errors,
          [propiedad.name]: "El dato ingresado deberia ser un numero",
        });
      else setErrors({ ...errors, [propiedad.name]: "" });
    }

    if (propiedad.name === "numeroDoc" && datos.tipoDoc === "DNI") {
      if (!propiedad.value)
        setErrors({
          ...errors,
          [propiedad.name]: "Porfavor inserte un Numero de Documento",
        });
      else if (!/^[^\s]+(\s+[^\s]+)*$/.test(propiedad.value))
        setErrors({
          ...errors,
          [propiedad.name]:
            "Porfavor elemine los espacios ingresados al principio o al final",
        });
      else if (!/^[0-9]+$/.test(propiedad.value))
        setErrors({
          ...errors,
          [propiedad.name]: "El dato ingresado deberia ser un numero",
        });
      else setErrors({ ...errors, [propiedad.name]: "" });
    }

    if (propiedad.name === "numeroDoc" && datos.tipoDoc === "Pasaporte") {
      if (!propiedad.value)
        setErrors({
          ...errors,
          [propiedad.name]: "Porfavor inserte un Pasaporte",
        });
      else if (!/^[^\s]+(\s+[^\s]+)*$/.test(propiedad.value))
        setErrors({
          ...errors,
          [propiedad.name]:
            "Porfavor elemine los espacios ingresados al principio o al final",
        });
      else setErrors({ ...errors, [propiedad.name]: "" });
    }
  };

  /*function formErrors(err) {
    let errors = {};
    if (!err.pais) errors.pais = "Porfavor inserte un Pais";
    else if (!/^[^\s]+(\s+[^\s]+)*$/.test(err.pais)) {
      errors.pais =
        "Porfavor elemine los espacios ingresados al principio o al final";
    } else if (/\b([a-z])/g.test(err.pais)) {
      errors.pais = "La primera letra debe estar en mayusculas";
    }

    if (!err.provincia)
      errors.provincia = "Porfavor inserte una provincia o estado";
    else if (!/^[^\s]+(\s+[^\s]+)*$/.test(err.provincia)) {
      errors.provicia =
        "Porfavor elemine los espacios ingresados al principio o al final";
    } else if (/\b([a-z])/g.test(err.provincia)) {
      errors.provincia = "La primera letra debe estar en mayusculas";
    }

    if (!err.ciudad) errors.ciudad = "Porfavor inserte una ciudad";
    else if (!/^[^\s]+(\s+[^\s]+)*$/.test(err.ciudad)) {
      errors.ciudad =
        "Porfavor elemine los espacios ingresados al principio o al final";
    } else if (/\b([a-z])/g.test(err.ciudad)) {
      errors.ciudad = "La primera letra debe estar en mayusculas";
    }

    if (!err.CP) errors.CP = "Porfavor inserte un Codigo Postal";
    else if (!/^[^\s]+(\s+[^\s]+)*$/.test(err.CP)) {
      errors.CP =
        "Porfavor elemine los espacios ingresados al principio o al final";
    }

    if (!err.nombreCalle)
      errors.nombreCalle = "Porfavor inserte un Nombre de Calle";
    else if (!/^[^\s]+(\s+[^\s]+)*$/.test(err.nombreCalle)) {
      errors.nombreCalle =
        "Porfavor elemine los espacios ingresados al principio o al final";
    }

    if (!err.numeroCalle)
      errors.numeroCalle = "Porfavor inserte un Numero de Calle";
    else if (!/^[^\s]+(\s+[^\s]+)*$/.test(err.numeroCalle)) {
      errors.numeroCalle = "Please remove the spaces";
    } else if (isNaN(err.numeroCalle)) {
      errors.numeroCalle = "Only numbers are allowed";
    }

    // if (!err.telefono) errors.telefono = "Porfavor inserte un Numero de Calle";
    // else if (!/^[^\s]+(\s+[^\s]+)*$/.test(err.telefono)) {
    //   errors.telefono = "Please remove the spaces";
    // } else if (isNaN(err.telefono)) {
    //   errors.telefono = "Only numbers are allowed";
    // }

    if (!err.numeroDoc)
      errors.numeroDoc = "Porfavor inserte un Numero de documento";
    else if (!/^[^\s]+(\s+[^\s]+)*$/.test(err.numeroDoc)) {
      errors.numeroDoc =
        "Porfavor elemine los espacios ingresados al principio o al final";
    }

    return errors;
  }*/

  function onInputChange(e) {
    setPagar(true);
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });

    errorHandler(e.target);
    /*setErrors(
      formErrors({
        ...datos,
        [e.target.name]: e.target.value,
      })
    );*/
  }

  console.log(datos);

  function onSubmit(e) {
    e.preventDefault();
    setPagar(false);
  }

  return (
    <>
      <Flex alignItems="center" justifyContent="center">
        <Box
          minWidth="350px"
          borderRadius="10px"
          w="60vw"
          position="relative"
          bg="#242525"
          h="1200px"
          display="flex"
          justifyItems="center"
          m="10px"
          p="20px"
        >
          <Box
            borderRadius="5px"
            minWidth="300px"
            display="flex"
            ml="auto"
            mr="auto"
            p="20px"
            justifyItems="center"
            flexDirection="column"
            bg="white"
            w="60vw"
          >
            <Box fontWeight="black">
              Porfavor completa los siguientes campos para continuar con la
              compra
            </Box>
            <br />
            <br />
            <form items={datos} onSubmit={onSubmit}>
              <FormControl isRequired>
                <FormLabel>Pais</FormLabel>
                <Input
                  autoComplete="on"
                  type="text"
                  placeholder="Pais"
                  name="pais"
                  value={datos.pais}
                  onChange={onInputChange}
                />
              </FormControl>

              {errors.pais ? (
                <Box bg="red.100" color="red">
                  {errors.pais}
                </Box>
              ) : null}
              <br />
              <FormControl isRequired>
                <FormLabel>Provincia o Estado</FormLabel>
                <Input
                  autoComplete="on"
                  type="text"
                  placeholder="Provincia o Estado"
                  name="provincia"
                  value={datos.provincia}
                  onChange={onInputChange}
                />
              </FormControl>

              {errors.provincia ? (
                <Box bg="red.100" color="red">
                  {errors.provincia}
                </Box>
              ) : null}
              <br />
              <FormControl isRequired>
                <FormLabel>Ciudad</FormLabel>
                <Input
                  autoComplete="on"
                  type="text"
                  placeholder="Ciudad"
                  name="ciudad"
                  value={datos.ciudad}
                  onChange={onInputChange}
                />
              </FormControl>

              {errors.ciudad ? (
                <Box bg="red.100" color="red">
                  {errors.ciudad}
                </Box>
              ) : null}
              <br />
              <FormControl isRequired>
                <FormLabel>Codigo Postal</FormLabel>
                <Input
                  autoComplete="on"
                  type="number"
                  placeholder="Codigo Postal"
                  name="CP"
                  value={datos.CP}
                  onChange={onInputChange}
                />
              </FormControl>

              {errors.CP ? (
                <Box bg="red.100" color="red">
                  {errors.CP}
                </Box>
              ) : null}
              <br />
              <FormControl isRequired>
                <FormLabel>Nombre calle</FormLabel>
                <Input
                  autoComplete="on"
                  type="text"
                  placeholder="Nombre calle"
                  name="nombreCalle"
                  value={datos.nombreCalle}
                  onChange={onInputChange}
                />
              </FormControl>

              {errors.nombreCalle ? (
                <Box bg="red.100" color="red">
                  {errors.nombreCalle}
                </Box>
              ) : null}
              <br />
              <FormControl isRequired>
                <FormLabel>Numero de calle</FormLabel>
                <Input
                  autoComplete="on"
                  type="number"
                  placeholder="Numero de calle"
                  name="numeroCalle"
                  value={datos.numeroCalle}
                  onChange={onInputChange}
                />
              </FormControl>

              {errors.numeroCalle ? (
                <Box bg="red.100" color="red">
                  {errors.numeroCalle}
                </Box>
              ) : null}
              <br />
              <FormControl>
                <FormLabel>Piso o departamento</FormLabel>
                <Input
                  autoComplete="on"
                  type="text"
                  placeholder="Piso o departamento"
                  name="piso"
                  value={datos.piso}
                  onChange={onInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Numero de telefono</FormLabel>
                <Input
                  autoComplete="on"
                  type="text"
                  placeholder="Numero de telefono"
                  name="telefono"
                  value={datos.telefono}
                  onChange={onInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Tipo de documento</FormLabel>
                <Select
                  name="tipoDoc"
                  value={datos.tipoDoc}
                  onChange={onInputChange}
                  type="number"
                  placeholder="Tipo de Documento"
                >
                  <option>DNI</option>
                  <option>Pasaporte</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Numero de documento</FormLabel>

                <Input
                  autoComplete="on"
                  type="text"
                  placeholder="Numero de Documento"
                  name="numeroDoc"
                  value={datos.numeroDoc}
                  onChange={onInputChange}
                />
              </FormControl>
              {errors.numeroDoc ? (
                <Box bg="red.100" color="red">
                  {errors.numeroDoc}
                </Box>
              ) : null}

              <Box
                m="15px"
                bg="#9a9a9a"
                width="fit-content"
                borderRadius="10px"
                _hover={{ bg: "#242525", cursor: "pointer" }}
              >
                <Button
                  type="submit"
                  disabled={
                    Object.values(errors)?.reduce((a, b) => a + b)
                      ? true
                      : false
                  }
                >
                  Pagar con MercadoPago
                </Button>
              </Box>
              {pagar ? null : <MercadoPago items={datos} />}
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

// payer: {
//   phone: { area_code: '', number: '' },
//   address: { zip_code: '', street_name: '', street_number: null },
//   email: '',
//   identification: { number: '', type: '' },
//   name: '',
//   surname: '',
//   date_created: null,
//   last_purchase: null
// },

// shipments: {
//   default_shipping_method: null,
//   receiver_address: {
//     zip_code: '',
//     street_name: '',
//     street_number: null,
//     floor: '',
//     apartment: '',
//     city_name: null,
//     state_name: null,
//     country_name: null
//   }
