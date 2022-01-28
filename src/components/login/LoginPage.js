import React from "react";
import styles from "./login.module.css";
import { doGoogleLoginAction, logoutAction } from "../../redux/user";
import { connect } from "react-redux";

const LoginPage = ({
	loggedIn,
	isFetching,
	doGoogleLoginAction,
	logoutAction,
}) => {
	if (isFetching) return <h1>Cargando ....</h1>;
	return (
		<div className={styles.container}>
			{loggedIn ? <h1>Cierra tu sesión</h1> : <h1>Inicia Sesión con Google</h1>}
			{loggedIn ? (
				<button onClick={() => logoutAction()}>Cerrar Sesión</button>
			) : (
				<button onClick={() => doGoogleLoginAction()}>Iniciar</button>
			)}
		</div>
	);
};

const mapStateToProps = ({ user: { fetching, loggedIn } }) => {
	return {
		fetching,
		loggedIn,
	};
};

export default connect(mapStateToProps, { doGoogleLoginAction, logoutAction })(
	LoginPage
);

// https://www.facebook.com/ElpapuPedrolopez/videos/270902465139901
