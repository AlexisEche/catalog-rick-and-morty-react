import React from "react";
import { Routes as Rout, Route, Navigate } from "react-router-dom";
import Home from "./components/home/HomePage";
import FavPage from "./components/favs/FavPage";
import LoginPage from "./components/login/LoginPage";

const PrivateRoute = ({ children }) => {
	let storage = localStorage.getItem("storage");
	storage = JSON.parse(storage);
	const isLogged = storage && storage.user;

	return isLogged ? children : <Navigate to="/login" />;
};

export default function Routes() {
	return (
		<Rout>
			<Route path="/" element={<Home />} />
			<Route
				path="/favs"
				element={
					<PrivateRoute>
						<FavPage />
					</PrivateRoute>
				}
			/>
			<Route path="/login" element={<LoginPage />} />
		</Rout>
	);
}
