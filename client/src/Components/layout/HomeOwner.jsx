import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Box } from '@chakra-ui/react';
import _cargando from '../../Loading/loading.svg'

const HomeOwner = () => {
  const { auth, cargando } = useAuth();

  if (cargando) return <Box position='relative' ml='50%' w='100%' my='150px'><img src={_cargando} alt={'Cargando'} width='80px'/></Box>
  return (
    <>
      {auth?.rol === "Owner" ? (
        <main className="conteiner mx-auto mt-20">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
export default HomeOwner;
