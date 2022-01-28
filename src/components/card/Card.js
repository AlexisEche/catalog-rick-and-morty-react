import React from "react";
import styles from "./card.module.css";
import FontAwesome from "react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { faThumbsDown, faHeart } from "@fortawesome/free-solid-svg-icons";

let rick = "https://rickandmortyapi.com/api/character/avatar/1.jpeg";

function onClick(side) {
	return () => console.log(side);
}

export default function Card({ name, image, rightClick, leftClick }) {
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<img alt="rick" src={image} />
				<p className={styles.name}>{name}</p>
				<div className={styles.actions}>
					<div onClick={leftClick || onClick("left")} className={styles.left}>
						<FontAwesomeIcon icon={faThumbsDown} size="2x" />
					</div>
					<div
						onClick={rightClick || onClick("right")}
						className={styles.right}
					>
						<FontAwesomeIcon icon={faHeart} size="2x" />
					</div>
				</div>
			</div>
		</div>
	);
}

Card.propTypes = {
	name: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	leftClick: PropTypes.func,
	rightClick: PropTypes.func,
};

Card.defaultProps = {
	name: "Rick Sanches",
	image: rick,
};
