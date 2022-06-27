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
	GET_USER_FAVORITES,
	GET_ALL_CATEGORIES,
	GET_ALL_BOTCLAVES,
	GET_ALL_BOTOPCIONES,
  
  
  
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
			productoId: [data.productoId],
			usuarioId: data.usuarioId,
			userName: data.userName,
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

export function get_filter_products(categoryorsearch,filter,order,tipo,minmax) {
	let marca = "";
	filter.forEach(e => { marca += "marca=" + e + "&"
	})
	return async (dispatch) => {
		let filter_products = await axios.get(
			`/filter?categoryorsearch=${categoryorsearch}&order=${order}&ascordesc=${tipo}&${marca}minmax=${minmax}`
			);
		return dispatch({
			type: GET_FILTER_PRODUCTS,
			payload: filter_products.data,
		});
	};
}


export function get_user_favorites(id) {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
				console.log('no hay token')
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const favorites = await axios.get(`/user/favoritos/${id}`, config);
      return dispatch({
        type: GET_USER_FAVORITES,
        payload: favorites.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function get_all_categories(){
	return async (dispatch) => {
		let all_categories = await axios.get("/categorias")
		return dispatch({type: GET_ALL_CATEGORIES, payload: all_categories.data})
	}
}

export function get_all_botclaves(){
	return async (dispatch) => {
		let all_botclaves = await axios.get("/chatbot/BotClaves")
		return dispatch ({type: GET_ALL_BOTCLAVES, payload: all_botclaves.data})
	}
}

export function add_new_botclave (clave,respuesta){
	return async () => { await axios.post("/chatbot/BotClaves", {clave: clave, respuesta: respuesta}) }
}

export function delete_botclave (id) {
	return async () => { await axios.delete("/chatbot/BotClaves", { data : {id:id} })}
}

export function edit_botclave (id,clave,respuesta){
	return async () => {await axios.put("/chatbot/BotClaves", {id: id, clave: clave, respuesta: respuesta})}
}

export function get_all_botopciones(){
	return async (dispatch) => {
		let all_botopciones = await axios.get("/chatbot/BotOpciones")
		return dispatch ({type: GET_ALL_BOTOPCIONES, payload: all_botopciones.data})
	}
}

export function add_new_botopciones (clave,respuesta){
	return async () => { await axios.post("/chatbot/BotOpciones", {opcion: clave, respuesta: respuesta}) }
}

export function delete_botopciones (id) {
	return async () => { await axios.delete("/chatbot/BotOpciones", { data : {id:id} })}
}

export function edit_botopciones (id,clave,respuesta){
	return async () => {await axios.put("/chatbot/BotOpciones", {id: id, opcion: clave, respuesta: respuesta})}
}