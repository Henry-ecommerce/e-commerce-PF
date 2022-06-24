import { Box, Text } from "@chakra-ui/react";

const Alerta = ({ alerta }) => {
  return (
    <Box>
      <Text
        textAlign={"center"}
        p={"8px"}
        rounded={"xl"}
        text={"white"}
        fontSize={"20px"}
        fontWeight={"extrabold"}
        bg={"whitesmoke"} //#242524
        mb={"10px"}
        color={alerta.error ? "red.500" : "blue.900"}
      >
        {alerta.msg}
      </Text>
    </Box>
  );
};

export default Alerta;
