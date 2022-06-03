// import React from "react";
// import { Route, useNavigate } from "react-router-dom";
// import { useAuth } from "../../Context/AuthContext";
// // import Admin from "../Admin/Admin";

// function PrivateRoute({ component: Component, ...rest }) {
// 	const navigate = useNavigate();
// 	const { currentUser } = useAuth();
// 	return (
// 		<Route
// 			{...rest}
// 			render={(props) => {
// 				return currentUser?.email === "tshmg@hotmail.com" ? (
// 					<Component {...props} />
// 				) : (
// 					navigate("/")
// 				);
// 			}}
// 		/>
// 	);
// }

// export default PrivateRoute;
