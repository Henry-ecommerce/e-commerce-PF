import {
	GET_ALL_PRODUCTS,
	GET_PRODUCT_BY_NAME,
	GET_PRODUCT_NAME_TO_RENDER_IN_INPUT,
} from "../Actions/actions_types";

const initialState = {
	products: [],
	searched_products : [],
	searched_product_name_to_render_in_input : [],
	product: {},
};

function reducer(state = initialState, { type, payload }) {
	switch (type) {
		case GET_ALL_PRODUCTS:
			return {
				...state,
				products: payload,
			};
		case GET_PRODUCT_BY_NAME:
			return {
				...state,
				searched_products: payload,
			};
		case GET_PRODUCT_NAME_TO_RENDER_IN_INPUT:
			return {
				...state,
				searched_product_name_to_render_in_input: payload,
			};
		default:
			return state;
	}
}

export default reducer;
