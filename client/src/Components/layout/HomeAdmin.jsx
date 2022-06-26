import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import HeaderAdmin from "../AdminPanel/Admin/HeaderAdmin";
import FooterAdmin from "../AdminPanel/Admin/FooterAdmin";
import _cargado from '../../Loading/loading.svg'
import { Box } from '@chakra-ui/react';

const HomeAdmin = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return <Box position='relative' ml='50%' w='100%' my='150px'><img src={_cargado} alt={'Cargando'} width='80px'/></Box>;
  return (
    <>
      {auth?.rol === 'Admin' ? (
        <main className="conteiner mx-auto mt-20">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/login" />
      )}

      {/* <FooterAdmin /> */}
    </>
  );
};
export default HomeAdmin;
