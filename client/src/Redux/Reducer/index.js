import {
	GET_ALL_PRODUCTS,
	GET_PRODUCT_BY_NAME,
	GET_PRODUCT_NAME_TO_RENDER_IN_INPUT,
	SET_PRODUCTS_IN_CART_LOCAL_STORAGE,
	ADD_QUANTITY_IN_CART_LOCAL_STORAGE,
	SUBTRACT_QUANTITY_IN_CART_LOCAL_STORAGE,
	DELETE_PRODUCT_IN_CART_LOCAL_STORAGE,
	GET_USER_INFO,
} from "../Actions/actions_types";

const initialState = {
	products: [],
	searched_products: [],
	searched_product_name_to_render_in_input: [],
	product: {},
	products_in_cart_local_storage: [],
	user_info: {},
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
		case SET_PRODUCTS_IN_CART_LOCAL_STORAGE:
			let findRepeated = state.products_in_cart_local_storage.find(
				(elem) => elem.nombre === payload.nombre
			);

			if (findRepeated !== undefined) {
				findRepeated = findRepeated.cantidad++;
				return {
					...state,
				};
			} else {
				return {
					...state,
					products_in_cart_local_storage: [
						...state.products_in_cart_local_storage,
						{ ...payload, cantidad: 1 },
					],
				};
			}
		case ADD_QUANTITY_IN_CART_LOCAL_STORAGE:
			let find_roduct = state.products_in_cart_local_storage.find(
				(elem) => elem.nombre === payload.nombre
			);
			find_roduct.cantidad++;
			return {
				...state,
			};
		case SUBTRACT_QUANTITY_IN_CART_LOCAL_STORAGE:
			let find_roduct_ = state.products_in_cart_local_storage.find(
				(elem) => elem.nombre === payload.nombre
			);
			find_roduct_.cantidad >= 2 && find_roduct_.cantidad--;
			return {
				...state,
			};
		case DELETE_PRODUCT_IN_CART_LOCAL_STORAGE:
			let delete_roduct = state.products_in_cart_local_storage.filter(
				(elem) => elem.nombre !== payload.nombre
			);

			return {
				...state,
				products_in_cart_local_storage: delete_roduct,
			};
		case GET_USER_INFO:
			return {
				...state,
				user_info: payload,
			};
		default:
			return state;
	}
}

export default reducer;
