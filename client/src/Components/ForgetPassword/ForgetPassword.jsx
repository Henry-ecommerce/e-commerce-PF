import React, { useState } from "react";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
// import { useAuth } from "../../Context/AuthContext";
import Alerta from "../../helper/Alerta";
import axios from "axios";

export default function ForgetPassword() {
  const [alerta, setAlerta] = useState({});
  const [email, setEmail] = useState("");
  // const { resetPassword, currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/registro/cambioPasss`,
        { email }
      );
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setEmail(" ");
      setTimeout(() => {
        setAlerta({});
      }, 5000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 5000);
    }
  };
  const { msg } = alerta;
  return (
    <Flex mt="30px" align={"center"} justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Forgot your password?
        </Heading>
        {/* {errors && (
          <Box textAlign={"center"} color="#FE0A01" fontWeight={"extrabold"}>
            {errors}
          </Box>
        )} */}
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You'll get an email with a reset link
        </Text>
        {msg && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <FormControl id="email">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              mt={4}
              type="submit"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Request Reset
            </Button>
          </Stack>
        </form>
        <Stack pt={3}>
          <Text align={"center"}>
            Already a user?
            <Link color={"blue.400"}>
              <RouterLink to="/login"> Login</RouterLink>
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Flex>
  );
}
