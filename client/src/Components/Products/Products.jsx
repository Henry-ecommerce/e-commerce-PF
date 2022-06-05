import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_products } from "../../Redux/Actions";

import Product from "../Product/Product";

function Products() {
	const { products } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(get_all_products());
	}, []);

	return (
		<SimpleGrid
			// bg={["pink", "red", "green", "#1F2734",'#E28B00']}
			columns={[1, 1, 1, 2, 3]}
			spacing="20px"
			m="auto"
			maxW={"80%"}
			my="50px"
		>
			{products?.map((product) => {
				return <Product key={product.id} {...product} />;
			})}
		</SimpleGrid>
	);
}

export default Products;
