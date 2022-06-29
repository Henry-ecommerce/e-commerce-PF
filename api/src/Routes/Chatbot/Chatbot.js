const {Router} = require("express");
const { BotOpcion } = require("../../db");
const { BotClave } = require("../../db");

const _arrClaves = [
    //si la pregunta que se hace incluye la palabra clave, se enviara esa respuesta. es un array de objetos
    {
     clave: "envios",
     respuesta: "los tiempos de envio tanto como los coste depende del lugar de destino y la empresa encargada del transporte"
    },
    {
        clave: "envio",
        respuesta: "los tiempos de envio tanto como los coste depende del lugar de destino y la empresa encargada del transporte"
    },
    {
        clave: "vida",
        respuesta: "42"
    },
    {
        clave: "universo",
        respuesta: "42"
    },
    {
        clave: "pago",
        respuesta: "Los pagos se realizan atravez de Mercado Pago, los medios disponibles los puede ver aqui: web, si has tenido un problema con el pago puedes comunicarte con atencion al cliente"
    },
    {
        clave: "pagos",
        respuesta: "Los pagos se realizan atravez de Mercado Pago, los medios disponibles los puede ver aqui: web, si has tenido un problema con el pago puedes comunicarte con atencion al cliente"
    },
    {
        clave: "tiempo",
        respuesta: "los tiempos de envio tanto como los coste depende del lugar de destino y la empresa encargada del transporte"
    },
    {
        clave: "tiempos",
        respuesta: "los tiempos de envio tanto como los coste depende del lugar de destino y la empresa encargada del transporte"
    },
    {
        clave: "problema",
        respuesta: "si has tenido algun problema con el pago del producto, el envio, o recibiste un producto equivocado puedes comunicarte con atencion al cliente para una mejor resolucion del problema"
    },
    {
        clave: "problemas",
        respuesta: "si has tenido algun problema con el pago del producto, el envio, o recibiste un producto equivocado puedes comunicarte con atencion al cliente para una mejor resolucion del problema"
    },
    {
        clave: "henry",
        respuesta: "estudiar en soyhenry es lo mejor"
    },
    {
        clave: "soyhenry",
        respuesta: "estudiar en soyhenry es lo mejor"
    },
    {
        clave: "humano",
        respuesta: "si quieres hablar con un humano, puedes comunicarte con servicio de atencion al cliente perdon las molestias"
    },
    {
        clave: "persona",
        respuesta: "si quieres hablar con un humano, puedes comunicarte con servicio de atencion al cliente perdon las molestias"
    },
    {
        clave: "retirar",
        respuesta: "puedes retirar tus compras en nuestros locales adheridos, en cualquier horario habil, recuerda consultar antes si hay stock del producto en el local"
    },
    {
        clave: "horario",
        respuesta: "los horarios de atencion al cliente tanto como los de retiro de productos son de xxAm a xxPm"
    },
    {
        clave: "horarios",
        respuesta: "los horarios de atencion al cliente tanto como los de retiro de productos son de xxAm a xxPm"
    },
    {
        clave: "contacto",
        respuesta: "puedes contactarnos a este numero xxxxxxx email xxxxxx direccion xxxxxx"
    },
    {
        clave: "direccion",
        respuesta: "puedes contactarnos a este numero xxxxxxx email xxxxxx direccion xxxxxx"
    },
    {
        clave: "telefono",
        respuesta: "puedes contactarnos a este numero xxxxxxx email xxxxxx direccion xxxxxx"
    },
    {
        clave: "email",
        respuesta: "puedes contactarnos a este numero xxxxxxx email xxxxxx direccion xxxxxx"
    },
    {
        clave: "contactarme",
        respuesta: "puedes contactarnos a este numero xxxxxxx email xxxxxx direccion xxxxxx"
    },
    {
        clave: "registo",
        respuesta: "puedes registarte con tu email completando los datos correspondientes, o hacerlo mas rapido vinculando tu cuenta de google"
    },
    {
        clave: "registrarme",
        respuesta: "puedes registarte con tu email completando los datos correspondientes, o hacerlo mas rapido vinculando tu cuenta de google"
    },
    {
        clave: "roto",
        respuesta: "si el producto te llego roto o en mal estado, puedes comunicarte con atencion al cliente para mejor seguimiento del inconveninete, lamentamos las molestias"
    },
    {
        clave: "rotos",
        respuesta: "si el producto te llego roto o en mal estado, puedes comunicarte con atencion al cliente para mejor seguimiento del inconveninete, lamentamos las molestias"
    },
    {
        clave: "mal",
        respuesta: "si el producto te llego roto o en mal estado, puedes comunicarte con atencion al cliente para mejor seguimiento del inconveninete, lamentamos las molestias"
    },
    {
        clave: "tienda",
        respuesta: "De momento contamos con una unica tienda fisica y esta ubicada en: calle falsa 1234"
    },
    {
        clave: "local",
        respuesta: "De momento contamos con una unica tienda fisica y esta ubicada en: calle falsa 1234"
    },
    {
        clave: "ubicacion",
        respuesta: "De momento contamos con una unica tienda fisica y esta ubicada en: calle falsa 1234"
    },
    {
        clave: "ubicado",
        respuesta: "De momento contamos con una unica tienda fisica y esta ubicada en: calle falsa 1234"
    },
    
    
];

const _arrOpciones = [
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
];


const router = Router();

//CLAVE
router.get("/BotClaves", async (req,res)=>{
    try {
        const allBotClaves = await BotClave.findAll();
        res.status(200).json(allBotClaves);
    } catch (error) {
        res.status(404).json("un error ocurrio en el proceso");
    }
});

//OPCIONES
router.get("/BotOpciones", async (req,res)=>{
    try {
        const allBotOpciones = await BotOpcion.findAll();
        res.status(200).json(allBotOpciones);
    } catch (error) {
        res.status(404).json("un error ocurrio en el proceso");
    }
});

//hardcodeo para llenar el bot con una sola ruta
router.post("/create", async (req,res)=>{
    try {
        _arrClaves?.map( async elem => {
                await BotClave.create({
                clave: elem.clave,
                respuesta: elem.respuesta,
            });
        })
        _arrOpciones.map( async elem => {
                await BotOpcion.create({
                opcion : elem.opcion,
                respuesta: elem.respuesta,
            })
        })
        
        res.status(200).send("harcodeado con exito");
    } catch (error) {
        res.status(404).json("un error ocurrio en el proceso");
    }
});

module.exports = router;