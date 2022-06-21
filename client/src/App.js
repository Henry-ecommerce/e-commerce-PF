import { Route, Routes } from "react-router-dom";
import HomeOwner from "./Components/layout/HomeOwner";
import HomeAdmin from "./Components/layout/HomeAdmin";
import HomeUser from "./Components/layout/HomeUser";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Logout from "./Components/Logout/Logout";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import Footer from "./Components/Footer/Footer";
import { Box } from "@chakra-ui/react";
import Products from "./Components/Products/Products";
import SearchBar from "./Components/SearchBar/SearchBar";
import Registro from "./Components/Registro/Registro";
import ConfirmarCuenta from "./Components/ConfirmarCuenta/ConfirmarCuenta";
import AdministrarProductos from "./Components/AdminPanel/AdministrarProductos/AdministrarProductos";
import EditarPerfil from "./Components/EditarPerfil/EditarPerfil";
import CambiasPassw from "./Components/CambiasPassw/CambiasPassw";
import Pruevas from "./Components/Pruevas/Pruevas";
import NewPass from "./Components/NewPass/NewPass";
import ProductDetail from "./Components/ProductDetails/ProductDetail";
import TermsAndConditions from "./Components/TermsAndConditions/TermsAndConditions";
import WishList from "./Components/WishList/WishList.jsx";
import Review from "./Components/Review/Review.jsx";
import Map from "./Components/Map/Map";
import Tienda from "./Components/Tienda/Tienda";
import EditProductos from "./Components/AdminPanel/EditProductos/EditProductos";
import ObtenerProductosAdmin from "./Components/AdminPanel/ObtenerProductosAdmin/ObtenerProductosAdmin";
import AgregarProducto from "./Components/AdminPanel/AgregarProducto/AgregarProducto";
import Categoriass from "../src/Components/AdminPanel/Categoriass/Categoriass";
import Ordenes from "./Components/AdminPanel/Ordenes/Ordenes";
import Users from "./Components/AdminPanel/Users/Users";
import Ventas from "./Components/AdminPanel/Ventas/Ventas";
import Transacciones from "./Components/AdminPanel/Transacciones/Transacciones";
import Home from "./Components/Home/Home";
import Banner from "./Components/Banner/Banner";
import Carrito from "./Components/Carrito/Carrito";
import MisCompras from "./Components/MisCompras/MisCompras";
import FormMercadoPago from "./Components/MercadoPago/FormularioPago";
import ErrorRutas from "./Components/ErrorRutas/ErrorRutas";
import PagoConfirmado from "./Components/PagoMercadiLibre/PagoAprevado/PagoConfirmado";
import PagoDenegado from "./Components/PagoMercadiLibre/PagoDenegado/PagoDenegado";
import EditProctoOwner from "./Components/OwnerPanel/EditProctoOwner/EditProctoOwner";
import AgregarProductoOwner from "./Components/OwnerPanel/AgregarProductoOwner/AgregarProductoOwner";
import CategoriasOwner from "./Components/OwnerPanel/CategoriasOwner/CategoriasOwner";
import OrdenesOwner from "./Components/OwnerPanel/OrdenesOwner/OrdenesOwner";
import UserOwner from "./Components/OwnerPanel/UserOwner/UserOwner";
import VentasOwner from "./Components/OwnerPanel/VentasOwner/VentasOwner";
import TransacionesOwner from "./Components/OwnerPanel/Transaciones/TransacionesOwner";
import UpdateRangos from "./Components/OwnerPanel/UpdateRango/UpdateRango";
import Baneos from "./Components/OwnerPanel/Baneos/Baneos";
import ObtenerProductosOwner from "./Components/OwnerPanel/ObtenerProductosOwner/ObtenerProductosOwner";
import AdministrarProductosOwner from "./Components/OwnerPanel/PanelOwner/AdministrarProductosOwner";

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
              <Banner />
              <SearchBar />
              <Home />
            </Box>
          }
        />

        <Route path="/login" element={<Registro />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="logout" element={<Logout />} />
          <Route path="newPassword" element={<ForgetPassword />} />
          <Route path="newPassword/:token" element={<NewPass />} />
          <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
        </Route>

        <Route path="/admin" element={<HomeAdmin />}>
          <Route index element={<AdministrarProductos />} />
          <Route path="edit" element={<ObtenerProductosAdmin />} />
          <Route path="edit/producto" element={<EditProductos />} />
          <Route path="agregar" element={<AgregarProducto />} />
          <Route path="categorias" element={<Categoriass />} />
          <Route path="ordenes" element={<Ordenes />} />
          <Route path="users" element={<Users />} />
          <Route path="ventas" element={<Ventas />} />
          <Route path="transaciones" element={<Transacciones />} />
          <Route path="perfil" element={<EditarPerfil />} />
        </Route>

        <Route path="/user" element={<HomeUser />}>
          <Route path="formMercadoPago" element={<FormMercadoPago />} />
          <Route path="perfil" element={<EditarPerfil />} />
          <Route path="perfil" element={<Pruevas />} />
          <Route path="wishList" element={<WishList />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="misCompras" element={<MisCompras />} />
        </Route>

        <Route path="/owner" element={<HomeOwner />}>
          <Route index element={<AdministrarProductosOwner />} />
          <Route path="edit" element={<ObtenerProductosOwner />} />
          <Route path="edit/producto" element={<EditProctoOwner />} />
          <Route path="agregar" element={<AgregarProductoOwner />} />
          <Route path="categorias" element={<CategoriasOwner />} />
          <Route path="ordenes" element={<OrdenesOwner />} />
          <Route path="users" element={<UserOwner />} />
          <Route path="ventas" element={<VentasOwner />} />
          <Route path="transaciones" element={<TransacionesOwner />} />
          <Route path="UpdateRol" element={<UpdateRangos />} />
          <Route path="Baneos" element={<Baneos />} />
          <Route path="perfil" element={<EditarPerfil />} />
        </Route>

        <Route path="/map" element={<Map />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/detail/:id" element={<ProductDetail />} />

        <Route path="/review" element={<Review />} />
        <Route path="/products/:categoriaobusqueda" element={<Tienda />} />
        <Route
          path="/products/:categoriaobusqueda/:page"
          element={<Tienda />}
        />
        <Route path="/pagoss/denegado" element={<PagoDenegado />} />
        <Route path="/pagoss/aceptado" element={<PagoConfirmado />} />

        <Route path="*" element={<ErrorRutas />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
