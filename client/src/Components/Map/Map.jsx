import { Box, useMediaQuery } from "@chakra-ui/react";
import React from "react";

function Map() {
  const [mayor1200w,mayor800w] = useMediaQuery(['(min-width: 1200px)','(min-width: 800px)']);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin={20}
      borderBlockEndColor="blackAlpha.500"
    >
      <Box fontWeight="black" fontSize="x-large">
        UBICACION
      </Box>
      <br />
      <br />
      <Box fontWeight="normal" fontSize="medium" minW={"350px"} maxWidth="1000">
        <b>Henry E-Commerce</b> se encuentra ubicado en 📍 Corrientes 2510 Local
        19, 1006 Buenos Aires, Argentina, entre la calles Larrea y Paso, en el
        barrio de Almagro de la Ciudad Autonoma de Buenos Aires.-
        <b>
          Nuestro horario de atención es de Lunes a Viernes de 9:00 a 18hs. y
          Sábado de 9.00 a 13hs.
        </b>
      </Box>
      <br />
      <br />
      <Box>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.9666164577234!2d-58.404569684174874!3d-34.60500566507436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccaece609814d%3A0x72b3794b9eafcf20!2sPaseo%20Imperial%2C%20Av.%20Corrientes%202510%2C%20C1046%20CABA%2C%20Argentina!5e0!3m2!1ses!2sus!4v1654736663021!5m2!1ses!2sus"
          width={mayor1200w ? "1200" : mayor800w ? "800" : "350"}
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>
    </Box>
  );
}

export default Map;
