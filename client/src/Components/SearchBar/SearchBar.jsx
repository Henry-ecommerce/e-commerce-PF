import React, { useState } from "react";
import { Box, Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
	get_product_by_name,
	get_product_name_to_render_in_input,
} from "../../Redux/Actions";
import { useSelector } from "react-redux";
import { useRef } from "react";

function SearchBar() {
	const input_ref = useRef();
	const { searched_product_name_to_render_in_input } = useSelector(
		(state) => state
	);
	const dispatch = useDispatch();
	const [inputValue, setInputValue] = useState("");
	const [_width, set_width] = useState(window.frames.innerWidth);

	window.addEventListener("resize", () => {
		set_width(window.frames.innerWidth);
	});

	// console.log(document.hasFocus(inputValue));
	function handleInputChange(e) {
		setInputValue(e.target.value);
		if (inputValue !== "") {
			dispatch(get_product_name_to_render_in_input(inputValue));
		}
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (inputValue !== "") {
			dispatch(get_product_by_name(inputValue));
			dispatch(get_product_name_to_render_in_input(inputValue));
		}
	}

	return (
		<form m="auto" onSubmit={handleSubmit}>
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
							p="8.5px"
							h="42px"
							w={["150px", "220px", "250px", "250px", "500px"]}
							// bg={["pink", "red", "green", "#1F2734",'#E28B00']}
							bg="#FFFF"
							type={"text"}
							value={inputValue}
							onChange={(e) => handleInputChange(e)}
							ref={input_ref}
						/>
						<Box
							bg="#FFFF"
							p="10px"
							borderRadius={"5px"}
							display={
								(inputValue === "" ||
									searched_product_name_to_render_in_input.length <= 1) &&
								"none"
							}
							position="absolute"
							zIndex={10}
							w={["150px", "220px", "250px", "250px", "500px"]}
						>
							{searched_product_name_to_render_in_input.length > 1 &&
								typeof searched_product_name_to_render_in_input !== "string" &&
								inputValue !== "" &&
								searched_product_name_to_render_in_input.map((elem, i) => {
									return (
										<Box
											key={i}
											cursor="pointer"
											onClick={(e) => {
												e.target.parentNode.style.display = 'none'
												setInputValue(elem);
											}}
										>
											{elem}
										</Box>
									);
								})}
						</Box>
					</Box>
					<Button
						bg="#242525"
						color="#ECEDEC"
						_hover={{ bg: "#242525", color: "#ECEDEC" }}
						borderRadius="3xl"
						mx="10px"
						type="submit"
					>
						<FiSearch />
						{_width > 687 && <Box mx="10px">Buscar</Box>}
					</Button>
				</Flex>
			</Center>
		</form>
	);
}

export default SearchBar;
