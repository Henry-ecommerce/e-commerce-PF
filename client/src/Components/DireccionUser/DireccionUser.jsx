import {Link} from "react-router-dom";
import { Box, Button, MenuItem, MenuList, Menu, MenuButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";



let info = JSON.parse(localStorage?.getItem("user_direction"));


const DireccionUser = () => {


    return (
        <Box borderRadius={"full"} width="11vw" height="2vw" bg="#242525" color="#FFFF" mb="5px" ml="30%" _hover={{ bg:"gray.300"  }} >
            <Menu>
                <MenuButton ml="12%" mt="2%">Datos de envio <HamburgerIcon w={6} h={5}/> </MenuButton >
                <MenuList  placeholder='Envio a:' color="#242525">
                    <MenuItem>Pais: {info?.items.pais ? info.items.pais : "No especificado" }</MenuItem>
                    <MenuItem>Provincia/Estado: {info?.items.provincia ? info.items.provincia : "No especificado" }</MenuItem>
                    <MenuItem>Ciudad: {info?.items.ciudad ? info.items.ciudad : "No especificado" }</MenuItem>
                    <MenuItem>Calle: {info?.items.nombreCalle ? info.items.nombreCalle : "No especificado" }</MenuItem>
                    <MenuItem>Numero: {info?.items.numeroCalle ? info.items.numeroCalle : "No especificado" }</MenuItem>
                    <MenuItem>Piso/Dpto: {info?.items.piso ? info.items.piso : "No especificado" }</MenuItem>
                    <MenuItem>Codigo Postal: {info?.items.CP ? info.items.CP : "No especificado" }</MenuItem>
                    <MenuItem>Telefono: {info?.items.telefono ? info.items.telefono : "No especificado" }</MenuItem>
                    <Link to="/user/formMercadoPago">
                        <Button bg="gray.300">Cambiar datos de envio</Button>
                    </Link>
                </MenuList>
            </Menu>
            
        </Box>
        
    )
}

export default DireccionUser;