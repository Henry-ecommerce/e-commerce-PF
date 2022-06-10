import { Box, Text } from "@chakra-ui/react";

const Alerta = ({ alerta }) => {
  return (
    <Box>
      <Text color={alerta.error ? "red" : "blue"}>{alerta.msg}</Text>
    </Box>
  );
};

export default Alerta;
