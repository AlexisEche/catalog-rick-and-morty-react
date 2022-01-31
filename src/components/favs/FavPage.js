import React from "react";
import styles from "./favs.module.css";
import Card from "../card/Card";
import { connect } from "react-redux";

const FavPage = ({ favoriteList }) => {
	function renderCharacter(char, i) {
		return <Card hide {...char} key={i} />;
	}
	return (
		<div className={styles.container}>
			<h2>Favoritos</h2>
			{favoriteList.map(renderCharacter)}
			{!favoriteList.length && <h3>No hay personajes agregados</h3>}
		</div>
	);
};

const mapStateToProps = ({ chars }) => {
	return {
		favoriteList: chars.favorites,
	};
};

export default connect(mapStateToProps, {})(FavPage);
