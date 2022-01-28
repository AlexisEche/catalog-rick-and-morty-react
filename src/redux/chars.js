import axios from "axios";

let initialData = {
	fetching: false,
	array: [],
	current: {},
};

let URL = "https://rickandmortyapi.com/api/character";
let GET_CHARACTERS = "GET_CHARACTERS";
let GET_CHARACTERS_SUCESS = "GET_CHARACTERS_SUCESS";
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";
let REMOVE_CHARACTER = "REMOVE_CHARACTER";

const reducer = (state = initialData, action) => {
	switch (action.type) {
		case REMOVE_CHARACTER:
			return { ...state, array: action.payload };
		case GET_CHARACTERS:
			return { ...state, fetching: true };
		case GET_CHARACTERS_SUCESS:
			return { ...state, array: action.payload, fetching: false };
		case GET_CHARACTERS_ERROR:
			return { ...state, fetching: false, error: action.payload };
		default:
			return state;
	}
};

export default reducer;

//actions (thunks)

export const removeCharacterAction = () => {
	return (dispatch, getState) => {
		let { array } = getState().chars;
		array.shift();
		dispatch({
			type: REMOVE_CHARACTER,
			payload: [...array],
		});
	};
};

export const getCharacterAction = () => {
	return async (dispatch, getState) => {
		dispatch({
			type: GET_CHARACTERS,
		});
		return await axios
			.get(URL)
			.then((res) => {
				dispatch({
					type: GET_CHARACTERS_SUCESS,
					payload: res.data.results,
				});
			})
			.catch((error) => {
				dispatch({
					type: GET_CHARACTERS_ERROR,
					payload: error.response.message,
				});
			});
	};
};