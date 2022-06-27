import React from "react";
import { SimpleGrid, Box } from "@chakra-ui/react";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_products } from "../../Redux/Actions";
import _cargando from '../../Loading/loading.svg'

import Product from "../Product/Product";

function Products() {
	const { products, searched_products } = useSelector((state) => state);
	const dispatch = useDispatch();

	useLayoutEffect(() => {
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
				products.length > 0 ? (
					products?.map((product) => {
						return <Product key={product.id} {...product} />;
					})
				) : (
					<Box position='relative' ml='50%' w='100%' my='150px'><img src={_cargando} alt={'Cargando'} width='80px'/></Box>
				)
			}
		</SimpleGrid>
	);
}

export default Products;
