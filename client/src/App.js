import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Logout from "./Components/Logout/Logout";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import Footer from "./Components/Footer/Footer";
// import { AuthProvider } from "./Context/AuthContext";
// import { AuthProvider } from "./Context/AuthContext";
// import Admin from "./Components/Admin/Admin";
import { Text } from "@chakra-ui/react";
import Products from './Components/Products/Products';

function App() {
	// const { currentUser } = useAuth();
	// const navigate = useNavigate();
	// const [privateRoute, setPrivateRoute] = useState('');
	// // function privateRoute() {
	// 	// }
		
	// 	useEffect(()=>{
	// 	currentUser?.email === "tshmg@hotmail.com" ? (
	// 						setPrivateRoute(<Admin />)
	// 					) : (
	// 						navigate("/")
	// 					)
	// 	// privateRoute()
	// },[])
	
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route exact path="/" element={<Products />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/newPassword" element={<ForgetPassword />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
