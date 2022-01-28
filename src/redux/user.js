import { loginWithGoogle, signOutGoogle } from "../firebase";

let initialData = {
	loggedIn: false,
	fetching: false,
};

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOG_OUT = "LOG_OUT";

const reducer = (state = initialData, action) => {
	switch (action.type) {
		case LOG_OUT:
			return { ...initialData };
		case LOGIN_SUCCESS:
			return { ...state, fetching: false, ...action.payload, loggedIn: true };
		case LOGIN_ERROR:
			return { ...state, fetching: false, error: action.payload };
		case LOGIN:
			return { ...state, fetching: true };
		default:
			return state;
	}
};

const saveStorage = (storage) => {
	localStorage.storage = JSON.stringify(storage);
};

export const restoreSessionAction = () => {
	return (dispatch, getState) => {
		let storage = localStorage.getItem("storage");
		storage = JSON.parse(storage);
		if (storage && storage.user) {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: storage.user,
			});
		}
	};
};

export const logoutAction = () => {
	return (dispatch, getState) => {
		signOutGoogle();
		dispatch({
			type: LOG_OUT,
		});
		localStorage.removeItem("storage");
	};
};

export const doGoogleLoginAction = () => {
	return (dispatch, getState) => {
		dispatch({
			type: LOGIN,
		});

		loginWithGoogle()
			.then((user) => {
				dispatch({
					type: LOGIN_SUCCESS,
					payload: {
						user: user.uid,
						image: user.photoURL,
						name: user.displayName,
						email: user.email,
					},
				});

				saveStorage(getState());
			})
			.catch((error) => {
				dispatch({
					type: LOGIN_ERROR,
					payload: error.message,
				});
			});
	};
};

export default reducer;
