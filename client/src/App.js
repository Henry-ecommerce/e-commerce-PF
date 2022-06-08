import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Logout from "./Components/Logout/Logout";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import Footer from "./Components/Footer/Footer";
import { Box } from "@chakra-ui/react";
import Products from "./Components/Products/Products";
import SearchBar from "./Components/SearchBar/SearchBar";
import ProductDetail from "./Components/ProductDetails/ProductDetail";

function App() {
  return (
    <Box bg="#EDEDED" className="App">
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Box>
              <SearchBar />
              <Products />
            </Box>
          }
        />
        <Route path="/:id" element={<ProductDetail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/newPassword" element={<ForgetPassword />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
