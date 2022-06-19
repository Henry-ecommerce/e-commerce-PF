import { useState } from "react";
import {AiOutlineSend} from "react-icons/ai"
import { Box, Flex, FormControl, Input} from "@chakra-ui/react";
import { useRef } from "react";



const MensajesAutomaticos = () => {
    const [input, setInput] = useState("");
    const [nombre,setNombre] = useState("");
    const [hayOpciones, setHayOpciones] = useState(false);
    const [respuestasInteligentes, setRespuestasInteligentes] = useState([
        //si la pregunta que se hace incluye la palabra clave, se enviara esa respuesta. es un array de objetos
        {
         clave: "envios",
         respuesta: "los tiempos de envio tanto como los coste depende del lugar de destino y la empresa encargada del transporte"
        }
    ]);

    const [opciones, setOpciones] = useState([
        //esto renderizara las opciones, y cuando se le haga click, enviara la respuesta correspondiente. es un array de objetos
        {
        opcion: "¿Cuales son los metodos de pago disponibles?",
        respuesta: "Los pagos se realizan atravez de Mercado Pago, los medios disponibles los puede ver aqui: web"
        },
        {
            opcion: "¿Necesito residir en Argentina para realizar compras?",
            respuesta: "No, puedes comprar desde cualquier parte del mundo, *los precios pueden variar segun los aranceles correspondientes de cada pais"
        },
        {
            opcion: "¿Todos los componentes son nuevos?",
            respuesta: "Si, todos nuestros productos son nuevos y tienen garantia"
        },
        {
            opcion: "¿Que hago si tengo un problema con mi compra?",
            respuesta: "Puedes comunicarte con nuestro servicio de atencion al cliente para un mejor seguimiento del inconveniente, lamentamos las molestias"
        },

        {
            opcion: "¿Como se si hay stock del producto que quiero?",
            respuesta: "Si el producto se encuentra publicado, significa que contamos con stock del mismo"
        },
        {
            opcion: "¿Puedo comprar mas de una unidad del mismo producto?",
            respuesta: "Si, en caso de no contar con el stock suficiente se le informara antes de iniciar con el proceso de pago"
        },
        {
            opcion: "¿Cuentan con una tienda fisica?",
            respuesta: "Si, de momento contamos con una unica tienda fisica y esta ubicada en: calle falsa 1234"
        },
        {
            opcion: "¿Hacen servicio tecnico o reparacion de componentes de ordenador?",
            respuesta: "No, de momento no contamos con ese servicio, disculpe las molestias"
        },
    ]);
    const [respuesta, setRespuesta] = useState("");


    const handleOnChange = (e) => {
        setInput(e.target.value);
    }
    const handleOnSend = () => {
        if(input) setNombre(input); setHayOpciones(true); setInput("");
    }

    const selectOption = (e) => {
        let text = e.target.textContent;
        setRespuesta(opciones.find(e => e.opcion === text).respuesta)
        setHayOpciones(false);
    }

    const customQuestion = () => {
        
        if(input){
        let normalize = input.toLowerCase().split("").filter(e => e !== "," && e !== "?" && e !== "." ).join("").split(" ")
        let busqueda = respuestasInteligentes.find(e => normalize.includes(e.clave));
        
        if(busqueda?.clave) {
            setRespuesta(busqueda.respuesta) 
            setHayOpciones(false);}
        else {
            setRespuesta("lo siento, mi inteligencia es limitada, asi que aun no puedo responder esa pregunta"); 
            setHayOpciones(false);}

        setInput("");}
    }

    const goBack = () => {
        setRespuesta("");
        setHayOpciones(true);
    }


    return(
        <>
        <Box bg={"#242525"} h={"25px"} w={"350px"} textAlign="center" color={"white"} borderRadius={"10px 10px 0 0"}> Ventana de Ayuda </Box>
        <Flex flexDirection={"column"} justifyContent="space-between" h="400px" width={"350px"} textAlign={"center"} bg="white" p={"5px"} borderRadius={"0 0 10px 10px"}>
            <Box >
                {nombre && !respuesta ? <p>Hola <b>{nombre}</b>, ¿en que puedo ayudarte?</p> : !respuesta ? <p>Yo Soy <b>rOb0t 1.0</b>, ¿Cual es tu nombre?</p> : null}
    {hayOpciones?<Box h="330px" __css={{"&::-webkit-scrollbar":{w: "7px"}, "::-webkit-scrollbar-thumb":{bg:"#242525", borderRadius:"10px"}}} _hover={{"&::-webkit-scrollbar-thumb":{bg:"#505050"}}} overflowY={"scroll"}>
                    {opciones?.map((elem,index) => <Box key={index} onClick={e=> selectOption(e)} boxShadow='md' m="10px 5px 5px 10px" bg={"#EDEDED"} borderRadius="5px" border="1px solid #9a9a9a" cursor={"pointer"} _hover={{bg: "#9a9a9a"}}>
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
        </>
    )
}

export default MensajesAutomaticos;