import axios from "axios";
import { updateDB, getFavorites } from "../firebase";

let initialData = {
	fetching: false,
	array: [],
	favorites: localStorage.getItem("favorites")
		? JSON.parse(localStorage.getItem("favorites"))
		: [],
	current: {},
};

let URL = "https://rickandmortyapi.com/api/character";
let GET_CHARACTERS = "GET_CHARACTERS";
let GET_CHARACTERS_SUCESS = "GET_CHARACTERS_SUCESS";
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";
let REMOVE_CHARACTER = "REMOVE_CHARACTER";
let ADD_FAVORITE_CHARACTER = "ADD_FAVORITE_CHARACTER";

let GET_FAVS = "GET_FAVS";
let GET_FAVS_SUCCESS = "GET_FAVS_SUCCESS";
let GET_FAVS_ERROR = "GET_FAVS_ERROR";

const reducer = (state = initialData, action) => {
	switch (action.type) {
		case GET_FAVS_SUCCESS:
			return { ...state, fetching: false, favorites: action.payload };
		case GET_FAVS_ERROR:
			return { ...state, fetching: false, error: action.payload };
		case GET_FAVS:
			return { ...state, fetching: true };
		case REMOVE_CHARACTER:
			return { ...state, array: action.payload };
		case GET_CHARACTERS:
			return { ...state, fetching: true };
		case GET_CHARACTERS_SUCESS:
			return { ...state, array: action.payload, fetching: false };
		case GET_CHARACTERS_ERROR:
			return { ...state, fetching: false, error: action.payload };
		case ADD_FAVORITE_CHARACTER:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};

export default reducer;

//actions (thunks)
export const retreiveFavs = () => {
	return (dispatch, getState) => {
		dispatch({
			type: GET_FAVS,
		});
		let { user } = getState().user;

		return getFavorites(user)
			.then((favorites) => {
				dispatch({
					type: GET_FAVS_SUCCESS,
					payload: [...favorites],
				});
			})
			.catch((e) => {
				console.log(e);
				dispatch({
					type: GET_FAVS_ERROR,
					payload: e.message,
				});
			});
	};
};

export const addToFavoritesAction = () => {
	return (dispatch, getState) => {
		let { array, favorites } = getState().chars;
		console.log(getState().user);
		let { user } = getState().user;
		console.log(user);
		let char = array.shift();
		favorites.push(char);

		updateDB(favorites, user);

		dispatch({
			type: ADD_FAVORITE_CHARACTER,
			payload: { array: [...array], favorites: [...favorites] },
		});
	};
};

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
