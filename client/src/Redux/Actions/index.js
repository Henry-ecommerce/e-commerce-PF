import axios from "axios";
import {
	GET_ALL_PRODUCTS,
	GET_PRODUCT_BY_NAME,
	GET_PRODUCT,
	GET_PRODUCT_DETAIL,
	GET_PRODUCT_NAME_TO_RENDER_IN_INPUT,
} from "./actions_types";

export function get_all_products() {
	return async (dispatch) => {
		let all_products = await axios("/productos");
		return dispatch({ type: GET_ALL_PRODUCTS, payload: all_products.data });
	};
}

export function get_product_by_name(name) {
	return async (dispatch) => {
		let search_products = await axios.get(`/productos?name=${name}`);
		return dispatch({
			type: GET_PRODUCT_BY_NAME,
			payload: search_products.data,
		});
	};
}

export function get_product_name_to_render_in_input(name) {
	return async (dispatch) => {
		let search_products = await axios.get(`/productos/${name}`);
		return dispatch({
			type: GET_PRODUCT_NAME_TO_RENDER_IN_INPUT,
			payload: search_products.data,
		});
	};
}

// export function get_product_detail() {
//     return async dispatch => {

//     }
// }
