import axios from "axios";
import {
	GET_ALL_PRODUCTS,
	GET_PRODUCT_BY_NAME,
	GET_PRODUCT,
	GET_PRODUCT_DETAIL,
	SET_PRODUCTS_IN_CART_LOCAL_STORAGE,
	GET_PRODUCT_NAME_TO_RENDER_IN_INPUT,
	ADD_QUANTITY_IN_CART_LOCAL_STORAGE,
	SUBTRACT_QUANTITY_IN_CART_LOCAL_STORAGE,
	DELETE_PRODUCT_IN_CART_LOCAL_STORAGE,
	GET_USER_INFO,
	PRODUCT_TO_REVIEW,
	GET_FILTER_PRODUCTS,
	GET_ALL_CATEGORIES,
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

export function set_products_in_cart_local_storage(product) {
	return { type: SET_PRODUCTS_IN_CART_LOCAL_STORAGE, payload: product };
}

export function add_quantity_in_cart_local_storage(product_id) {
	return { type: ADD_QUANTITY_IN_CART_LOCAL_STORAGE, payload: product_id };
}

export function subtract_quantity_in_cart_local_storage(product) {
	return { type: SUBTRACT_QUANTITY_IN_CART_LOCAL_STORAGE, payload: product };
}

export function delete_product_in_cart_local_storage(product) {
	return { type: DELETE_PRODUCT_IN_CART_LOCAL_STORAGE, payload: product };
}

export function get_user_info() {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				return;
			}

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const user = await axios("/user/perfil", config);
			console.log(user,'<--- soy la ction')
			return dispatch({
				type: GET_USER_INFO,
				payload: user.data,
			});
		} catch (error) {
			console.log(error)
		}
	};
}

export function post_review(data) {
	return async () => {
		await axios.post('/review', {
			titulo: data.titulo,
			text: data.text,
			rating: data.rating,
			productoId: [data.productoId]
		})
		  .then(function (response) {
			console.log("Success:", response);
		  })
		  .catch(function (error) {
			console.log(error);
		  });
	}
}
export function product_to_review(product){
	return { type: PRODUCT_TO_REVIEW, payload: product}
}
// export function get_product_detail() {
//     return async dispatch => {

//     }
// }

export function get_filter_products(categoryorsearch,filter,order,tipo) {
	let marca = "";
	filter.forEach(e => { marca += "marca=" + e + "&"
	})
	return async (dispatch) => {
		let filter_products = await axios.get(`/filter?categoryorsearch=${categoryorsearch}&order=${order}&ascordesc=${tipo}&${marca}`);
		return dispatch({
			type: GET_FILTER_PRODUCTS,
			payload: filter_products.data,
		});
	};
}


export function get_all_categories(){
	return async (dispatch) => {
		let all_categories = await axios.get("/categorias")
		return dispatch({type: GET_ALL_CATEGORIES, payload: all_categories.data})
	}
}