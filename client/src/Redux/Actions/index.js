import axios from "axios";
import {
	GET_ALL_PRODUCTS,
	GET_PRODUCT,
	GET_PRODUCT_DETAIL,
} from "./actions_types";

export function get_all_products() {
	return async (dispatch) => {
		let all_products = await axios("/productos");
		return dispatch({ type: GET_ALL_PRODUCTS, payload: all_products.data });
	};
}

// export function get_product() {
//     return async dispatch => {

//     }
// }

// export function get_product_detail() {
//     return async dispatch => {

//     }
// }
