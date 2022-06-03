import React from "react";
import { useContext, useState, useEffect } from "react";
import { auth } from "../firebase.js";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();

	function signup(email, password) {
		return auth.createUserWithEmailAndPassword(email, password);
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function signout(email, password) {
		return auth.signOut();
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email)
	}

	useEffect(() => {
		const unsuscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
		});
		return unsuscribe;
	}, []);

	const value = {
		currentUser,
		signup,
		login,
		signout,
        resetPassword,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
