import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { Provider } from "react-redux"
import store from "./Redux/Store";

const breakpoints = {
	sm: "320px",
	ms: "688px",
	md: "768px",
	ml: "798px",
	lg: "960px",
	xl: "1200px",
	"2xl": "1536px",
};

const theme = extendTheme({
	fonts: {
		heading: `'Montserrat', sans-serif`,
		body: `'Montserrat', sans-serif`,
	},
	breakpoints,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<AuthProvider>
					<App />
				</AuthProvider>
			</ChakraProvider>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
