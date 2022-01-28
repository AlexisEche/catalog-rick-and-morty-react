import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import generateStore from "./redux/store";
import { BrowserRouter } from "react-router-dom";

let store = generateStore();

let WithRouter = () => (
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
let WithStore = () => (
	<Provider store={store}>
		<WithRouter />
	</Provider>
);

ReactDOM.render(<WithStore />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
