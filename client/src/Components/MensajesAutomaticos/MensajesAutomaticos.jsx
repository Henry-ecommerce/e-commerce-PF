import { useState, useEffect } from "react";
import { useSelector, useDispatch,} from "react-redux";
import {AiOutlineSend} from "react-icons/ai"
import { Box, Flex, FormControl, Input} from "@chakra-ui/react";
import { get_all_botclaves, get_all_botopciones } from "../../Redux/Actions";



const MensajesAutomaticos = () => {
    const [input, setInput] = useState("");
    const [nombre,setNombre] = useState("");
    const [hayOpciones, setHayOpciones] = useState(false);
    const {botclaves, botopciones} = useSelector(state => state);
    const [respuesta, setRespuesta] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(get_all_botclaves());
        dispatch(get_all_botopciones());
    },[dispatch])

    const handleOnChange = (e) => {
        setInput(e.target.value);
    }
    const handleOnSend = () => {
        if(input) setNombre(input); setHayOpciones(true); setInput("");
    }

    const selectOption = (e) => {
        let text = e.target.textContent;
        setRespuesta(botopciones.find(e => e.opcion === text).respuesta)
        setHayOpciones(false);
    }

    const customQuestion = () => {
        
        if(input){
        let normalize = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().split("").filter(e => e !== "," && e !== "?" && e !== "." ).join("").split(" ")
        let busqueda = botclaves?.find(e => normalize.includes(e.clave.normalize("NFD").replace(/[\u0300-\u036f]/g, "")));
        
        if(busqueda?.clave) {
            setRespuesta(busqueda.respuesta) 
            setHayOpciones(false);}
        else {
            setRespuesta("lo siento, mi inteligencia es limitada, asi que aun no puedo responder esa pregunta, podrias intentar ser mas claro o directo, tal vez asi pueda ayudarte, lamento las molestias"); 
            setHayOpciones(false);}

        setInput("");}
    }

    const goBack = () => {
        setRespuesta("");
        setHayOpciones(true);
    }


    return(
        <Box boxShadow='md'>
        <Box bg={"#242525"} h={"25px"} w={"350px"} textAlign="center" color={"white"} borderRadius={"10px 10px 0 0"}> Ventana de Ayuda </Box>
        <Flex flexDirection={"column"} justifyContent="space-between" h="400px" width={"350px"} textAlign={"center"} bg="white" p={"5px"} borderRadius={"0 0 10px 10px"}>
            <Box >
                {nombre && !respuesta ? <p>Hola <b>{nombre}</b>, ¿en que puedo ayudarte?</p> : !respuesta ? <p>Yo Soy <b>rOb0t 1.0</b>, ¿Cual es tu nombre?</p> : null}
    {hayOpciones?<Box h="330px" __css={{"&::-webkit-scrollbar":{w: "7px"}, "::-webkit-scrollbar-thumb":{bg:"#242525", borderRadius:"10px"}}} _hover={{"&::-webkit-scrollbar-thumb":{bg:"#505050"}}} overflowY={"scroll"}>
                    {botopciones?.map((elem,index) => <Box key={index} onClick={e=> selectOption(e)} boxShadow='md' m="10px 5px 5px 10px" bg={"#EDEDED"} borderRadius="5px" border="1px solid #9a9a9a" cursor={"pointer"} _hover={{bg: "#9a9a9a"}}>
                        {elem.opcion}
                    </Box>)}

                    <Box>
                        Si lo que buscas no esta aqui, puedes realizar una consulta personalizada.
                    </Box>

                </Box> : null}
                    {!hayOpciones && respuesta ? (<><Box m="5px 0px 10px 0px">{respuesta}</Box><Box fontSize={"13px"} p="2px 5px 2px 5px" borderRadius={"5px"} color="white" cursor={"pointer"} onClick={goBack} bg="#242525" w={"fit-content"} ml="auto" mr="auto" _hover={{bg: "#505050"}}>Preguntar algo mas</Box></>) : null}
            </Box>

            

            <FormControl display={"flex"} mt={"5px"} alignContent={"center"}>
                <Input value={input} onKeyUp={e => e.keyCode === 13 && input ? (nombre ? customQuestion() : handleOnSend()) : null} textAlign={"start"} minWidth={"240px"} w={"full"} h={"auto"} onChange={e => handleOnChange(e)} placeholder={nombre? "Hazme una pregunta" :"Como quieres que te llame?"}></Input>
                <Box  onClick={input ? (nombre ? customQuestion : handleOnSend) : null} ml="5px" bg={"#242525"} padding={"7px 6px 7px 8px"} textAlign="center" borderRadius={"50%"} color="white" cursor="pointer" _hover={{bg: "#505050"}}>
                    <AiOutlineSend></AiOutlineSend>
                </Box>
            </FormControl>

            

        </Flex>
        </Box>
    )
}

export default MensajesAutomaticos;