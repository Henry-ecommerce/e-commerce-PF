import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, Text} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { add_new_botclave, get_all_botclaves, delete_botclave, edit_botclave, get_all_botopciones, add_new_botopciones, edit_botopciones, delete_botopciones } from "../../Redux/Actions";

import { BsTrash, BsPencil } from "react-icons/bs";

const ChatbotForm = () => {
    const [clave, setClave] = useState({ clave: "", respuesta: "",});
    const [opcion, setOpcion] = useState({ opcion: "", respuesta: "",});
    const [enOpciones, setEnOpciones] = useState(false);
    const [enEdicion, setEnEdiocion] = useState(false);
    const [editId, setEditId] = useState("");
    const [inputError, setInputError] = useState(false);
    const {botclaves, botopciones} = useSelector(state => state);

    const [popUp, setPopUp] = useState({id: "", estado: false});

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(get_all_botclaves());
        dispatch(get_all_botopciones());
    },[dispatch])

    const handleOnChange = (e) => {
        if(e.target.name === "clave" && e.target.value.includes(" ")) setInputError(true);
        else if(e.target.name === "clave" && !e.target.value.includes(" ")) setInputError(false);

        if(enOpciones) setOpcion({...opcion, [e.target.name]:e.target.value});
        else setClave({...clave, [e.target.name]:e.target.value});
    }

    const handleOnSubmit = (e,clave,respuesta) => {

        if(enOpciones){
            if(!enEdicion) {
                if(clave && respuesta) {
                    dispatch(add_new_botopciones(clave,respuesta)) 
                }
            } else {
                if(clave && respuesta) {
                    dispatch(edit_botopciones(editId,clave,respuesta))
                }
            }
        } else {
            if(!enEdicion) {
                if(clave && respuesta) {
                    dispatch(add_new_botclave(clave,respuesta)) 
                }
            } else {
                if(clave && respuesta) {
                    dispatch(edit_botclave(editId,clave,respuesta))
                }
            }
        }
    }

    const alerta = (id) => {
        setPopUp({id: id, estado: true});
    }

    const handleOnDelete = async (id) => {
        if(id) {
            if(enOpciones) await dispatch(delete_botopciones(id))
            else await dispatch(delete_botclave(id))}
        window.location.reload();
    }

    const handleOnEdit = (elem) => {
        setEnEdiocion(true);
        if(enOpciones) setOpcion({opcion: elem.opcion, respuesta: elem.opcion})
        else setClave({clave: elem.clave, respuesta: elem.respuesta})
        setEditId(elem.id);
    }

    return (
    <>
        <Box position={"relative"} w={"50vw"} h="fit-content" maxW={"1440px"} minW={"340px"} ml="auto" mr="auto">
    
            {popUp?.estado ? <Box position={"absolute"} zIndex="2000" w={"100%"} h={"100%"}>
                <Box position={"relative"} left="calc(50% - 100px)" top="calc(50% - 50px)" bg={"white"} w={"200px"} h={"100px"} border="solid 2px #242525" borderRadius="10px">
                    <Text textAlign={"center"} mt="5px" position={"absolute"}>¿Quieres borrar este elemento?</Text>
                    <Box position={"relative"} textAlign="center" top="calc(100% - 40px)" >
                        <Button w="40px" h="30px" bg={"#242525"} color="white" m="5px" onClick={e => handleOnDelete(popUp?.id)}>SI</Button>   
                        <Button w="40px" h="30px" m="5px" bg={"#242525"} color="white" onClick={e => setPopUp({id: "", estado: false})}>NO</Button>
                    </Box>
                </Box>
             </Box> : null}
    
            <Box position={"relative"} textAlign={"center"}>
                <Button disabled={enEdicion} h="fit-content" py="5px" m={"5px"} bg={enOpciones? "white" : "#242525"} color={enOpciones? "#242525" : "white"} onClick={e=> setEnOpciones(enOpciones? false : true)}>{enOpciones? "Cambiar a palabra clave" : "Cambiar a opciones"}</Button>
            </Box>
            <Text mb={"5px"} bg={!enOpciones? "white" : "#242525"} color={!enOpciones? "#242525" : "white"} p={"5px"} textAlign={"center"} fontWeight={"bolder"}>{enOpciones? "Definiendo Opciones y respuestas" : "Definiendo palabras clave y respuestas"}</Text>
            <form onSubmit={e => enOpciones? handleOnSubmit(null,opcion?.opcion,opcion?.respuesta) :  handleOnSubmit(null,clave?.clave,clave?.respuesta)}>
                <FormControl>
                    <FormLabel ml={"5px"}>{enOpciones? "Opcion" : "Palabra clave"}</FormLabel>
                    <Input isInvalid={!enOpciones && inputError} value={enOpciones? opcion.opcion : clave.clave} name={enOpciones? "opcion" :"clave"} onChange={e => handleOnChange(e)} bg={"white"} required></Input>
                    {!enOpciones && inputError ? <Text color={"red"}> Por favor elimine los espacios en blanco </Text> : null}
                    <FormLabel ml={"5px"}>Respuesta</FormLabel>
                    <Textarea value={enOpciones? opcion.respuesta : clave.respuesta} name={"respuesta"} onChange={e => handleOnChange(e)} bg={"white"} resize={"none"} required></Textarea>
                    <Button disabled={!enOpciones && inputError} m={"5px"} type="submit">{enEdicion ? "Guardar cambios" : "Agregar"}</Button>
                    {enEdicion ? <Button m={"5px"} onClick={e => {setEnEdiocion(false); setClave({clave: "", respuesta: ""})}}>Descartar cambios</Button> : null}
                </FormControl>
            </form>
            
            <Box overflowY={"scroll"} maxH={"400px"}>
                {(enOpciones ? botopciones : botclaves)?.map( elem => 
                    (
                    <Box borderRadius={"10px"} key={elem.id} position={"relative"} p={"10px"} m={"10px"} bg={enOpciones? "#242525" : "white"}>
                        <Box left={"calc(100% - 125px)"} position={"absolute"} py={"2px"}>
                            <Button disabled={enEdicion} bg={enOpciones? "white" : "#242525"} mx={"5px"} color={enOpciones? "#242525" : "white"} onClick={e => handleOnEdit(elem)}><BsPencil/></Button>
                            <Button bg={enOpciones? "white" : "#242525"} mx={"5px"} color={enOpciones? "#242525" : "white"} onClick={e => alerta(elem.id)}><BsTrash/></Button>
                        </Box>
                        <Text color={enOpciones? "white" : "#242525"}><b>{enOpciones? "Opcion" : "Palabra clave"}:</b><br/>{enOpciones? elem.opcion :elem.clave}</Text>
                        <Text color={enOpciones? "white" : "#242525"}><b>{enOpciones? "Respuesta a esa opcion" : "Respuesta a esa palabra clave"}:</b><br/>{elem.respuesta}</Text>
                    </Box>
                    )
                ).reverse()}
                {enOpciones && !botopciones?.length ? <Box textAlign={"center"} fontSize="30px" fontWeight={"bolder"}>Aun no hay opciones.</Box> : null}
                {!enOpciones && !botclaves?.length ? <Box textAlign={"center"} fontSize="30px" fontWeight={"bolder"}>Aun no hay palabras claves.</Box> : null}
            </Box>
            
        </Box>
    </>
    )
}

export default ChatbotForm;