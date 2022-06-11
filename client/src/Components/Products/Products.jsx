import React from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_products } from "../../Redux/Actions";

import Product from "../Product/Product";

function Products() {
	const { products, searched_products } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(get_all_products());
	}, []);

	return (
		<SimpleGrid
			columns={[1, 1, 1, 2, 3]}
			spacing="20px"
			m="auto"
			maxW={"80%"}
			my="50px"
		>
			{
				/* searched_products.length > 0 && typeof searched_products !== "string" ? (
				searched_products?.map((product) => {
					return <Product key={product.id} {...product} />;
				})
			) : (searched_products.length === 0 ||
					typeof searched_products === "string") && */
				products.length > 0 ? (
					products?.map((product) => {
						return <Product key={product.id} {...product} />;
					})
				) : (
					<Box>Cargando...</Box>
				)
			}
		</SimpleGrid>
	);
}

export default Products;
