import { v1 as uuid } from "uuid";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "../actions/types";

const initialState = {
	items: [
		{ id: uuid(), name: "Milk" },
		{ id: uuid(), name: "Dahi" },
		{ id: uuid(), name: "Cheese" },
		{ id: uuid(), name: "Reduce" },
	],
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_ITEMS:
			return {
				...state,
			};
		case DELETE_ITEM:
			console.log("delete called");
			return {
				...state,
				items: state.items.filter((item) => item.id !== action.payload),
			};
		case ADD_ITEM:
			return {
				...state,
				items: [action.payload, ...state.items],
			};

		default:
			return state;
	}
}
