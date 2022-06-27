import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, Text} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { add_new_botclave, get_all_botclaves, delete_botclave, edit_botclave } from "../../Redux/Actions";

import { BsTrash, BsPencil } from "react-icons/bs";

const ChatbotForm = () => {
    const [clave, setClave] = useState({ clave: "", respuesta: "",});
    const [opcion, setOpcion] = useState({});
    const [enEdicion, setEnEdiocion] = useState(false);
    const [editId, setEditId] = useState("");
    const {botclaves} = useSelector(state => state);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(get_all_botclaves());
    },[dispatch])

    const handleOnChange = (e) => {
        setClave({...clave, [e.target.name]:e.target.value})
    }

    const handleOnSubmit = (id,clave,respuesta) => {
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

    const handleOnDelete = async (id) => {
        if(id) await dispatch(delete_botclave(id))
        window.location.reload();
    }

    const handleOnEdit = (elem) => {
        setEnEdiocion(true);
        setClave({clave: elem.clave, respuesta: elem.respuesta})
        setEditId(elem.id);
    }

    return (
    <>
    <Box w={"70vw"} maxW={"1440px"} minW={"340px"} ml="auto" mr="auto">
        <Text m={"5px"} textAlign={"center"} fontWeight={"bolder"}>Defina respuestas del chat</Text>
        <form onSubmit={e => handleOnSubmit(null,clave?.clave,clave?.respuesta)}>
            <FormControl>
                <FormLabel>Palabra clave</FormLabel>
                <Input value={clave.clave} name={"clave"} onChange={e => handleOnChange(e)} bg={"white"} required></Input>
                <FormLabel>Respuesta</FormLabel>
                <Textarea value={clave.respuesta} name={"respuesta"} onChange={e => handleOnChange(e)} bg={"white"} resize={"none"} required></Textarea>
                <Button m={"5px"} type="submit">{enEdicion ? "Guardar cambios" : "Agregar"}</Button>
                {enEdicion ? <Button m={"5px"} onClick={e => {setEnEdiocion(false); setClave({clave: "", respuesta: ""})}}>Descartar cambios</Button> : null}
            </FormControl>
        </form>
        
        <Box overflowY={"scroll"} maxH={"400px"}>
            {botclaves?.map( elem => 
                (
                <Box key={elem.id} position={"relative"} p={"10px"} m={"10px"} bg={"white"}>
                    <Box left={"calc(100% - 125px)"} position={"absolute"} py={"2px"}>
                        <Button disabled={enEdicion} bg={"#242525"} mx={"5px"} color={"white"} onClick={e => handleOnEdit(elem)}><BsPencil/></Button>
                        <Button bg={"#242525"} mx={"5px"} color={"white"} onClick={e => handleOnDelete(elem.id)}><BsTrash/></Button>
                    </Box>
                    <Text><b>Palabra clave:</b><br/>{elem.clave}</Text>
                    <Text><b>Respuesta a esa palabra:</b><br/>{elem.respuesta}</Text>
                </Box>
                )
            )}
        </Box>
        
        <Text fontWeight={"bolder"}>Preguntas y respuestas pre-definidas</Text>
    </Box>
    
    </>
    )
}

export default ChatbotForm;