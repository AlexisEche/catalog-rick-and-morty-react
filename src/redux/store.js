import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import user, { restoreSessionAction } from "./user";
import chars, { getCharacterAction } from "./chars";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
	user: user,
	chars: chars,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const generateStore = () => {
	let store = createStore(
		rootReducer,
		composeEnhancers(applyMiddleware(thunk))
	);
	getCharacterAction()(store.dispatch, store.getState);
	restoreSessionAction()(store.dispatch);
	return store;
};
export default generateStore;
