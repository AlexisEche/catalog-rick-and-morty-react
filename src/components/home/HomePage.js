import React, { useState, useEffect } from "react";
import Card from "../card/Card";
import styles from "./home.module.css";
import { connect } from "react-redux";

import { removeCharacterAction, addToFavoritesAction } from "../../redux/chars";

const Home = ({ chars, removeCharacterAction, addToFavoritesAction }) => {
	function renderCharacter() {
		let char = chars[0];
		console.log(chars);
		return <Card rightClick={addFavChar} leftClick={nextChar} {...char} />;
	}
	function nextChar() {
		removeCharacterAction();
	}

	function addFavChar() {
		addToFavoritesAction();
	}
	return (
		<div className={styles.container}>
			<h2>Personajes de Rick y Morty</h2>
			<div>{renderCharacter()}</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		chars: state.chars.array,
	};
};

export default connect(mapStateToProps, {
	addToFavoritesAction,
	removeCharacterAction,
})(Home);
