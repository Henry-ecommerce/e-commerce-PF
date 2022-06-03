import { GET_ALL_PRODUCTS } from "../Actions/actions_types";

const initialState = {
	products: [],
	product: {},
};

function reducer(state = initialState, { type, payload }) {
	switch (type) {
		case GET_ALL_PRODUCTS :
			return {
				...state,
				products : payload
			}
		default:
			return state;
	}
}

export default reducer;
