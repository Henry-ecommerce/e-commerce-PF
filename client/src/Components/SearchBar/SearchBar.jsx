import React, {useState} from "react";
import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	Input,
	Text,
} from "@chakra-ui/react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

function SearchBar() {
  const [_width, set_width] = useState(window.frames.innerWidth);
	window.addEventListener("resize", () => {
		set_width(window.frames.innerWidth);
	});
  
	return (
		<FormControl m="auto">
			<Center m="auto" my="20px" bg="#ECEDEC">
				<Flex>
					<Button
						bg="#242525"
						color="#ECEDEC"
						_hover={{ bg: "#242525", color: "#ECEDEC" }}
						borderTopLeftRadius="60px"
						borderBottomLeftRadius="60px"
						borderTopRightRadius="none"
						borderBottomRightRadius="none"
            >
						<AiOutlineUnorderedList />
            {_width > 687 && <Text ml="10px">Categorias</Text>}
					</Button>
					<Box ml="-2x">
						<Input
						borderTopLeftRadius="none"
						borderBottomLeftRadius="none"
            p='8.5px'
              h='42px'
							w={["150px", "220px", "250px","250px", "500px"]}
							// bg={["pink", "red", "green", "#1F2734",'#E28B00']}
							bg='#FFFF'
							type={"text"}
						/>
					</Box>
					<Button
						bg="#242525"
						color="#ECEDEC"
						_hover={{ bg: "#242525", color: "#ECEDEC" }}
						borderRadius="3xl"
						mx="10px"
					>
						<FiSearch />
						{_width > 687 && <Box mx="10px">Buscar</Box>}
					</Button>
				</Flex>
			</Center>
		</FormControl>
	);
}

export default SearchBar;
