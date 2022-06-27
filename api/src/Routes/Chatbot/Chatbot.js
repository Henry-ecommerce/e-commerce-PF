const {Router} = require("express");
const { BotOpcion } = require("../../db");
const { BotClave } = require("../../db");

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

router.post("/BotClaves", async (req,res)=>{
    const {clave, respuesta} = req.body;
    try {
        if(clave && respuesta) {
            const newBotClave = await BotClave.create({
                clave: clave,
                respuesta: respuesta,
            });
            return res.status(201).json({creado: newBotClave});
        } else return res.status(400).send("envie los datos correctamente");
    } catch (error) {
        res.status(404).json("un error ocurrio en el proceso");
    }
});

router.put("/BotClaves", async (req,res)=>{
    const {id, clave, respuesta} = req.body;
    try {
        if(!id) return res.status(400).send("se necesita un id para realizar el cambio");
        if(clave || respuesta) {
            const actualizar = await BotClave.findByPk(id);
            if(clave) actualizar.clave = clave;
            if(respuesta) actualizar.respuesta = respuesta;
            await actualizar.save();

            return res.status(200).json({actualizado: actualizar})
        } else return res.status(400).send("envie los datos correctamente");
    } catch (error) {
        res.status(400).send("un error ocurrio en el proceso");
    }
});

router.delete("/BotClaves", async (req,res)=>{
    const {id} = req.body;
    try {
        if(!id) return res.status(400).send("se necesita un id para realizar el cambio");
        const destruir = await BotClave.findByPk(id);
        await destruir.destroy();
        return res.status(200).send("objeto eliminado con exito");
    } catch (error) {
        res.status(400).send("un error ocurrio en el proceso");
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

router.post("/BotOpciones", async (req,res)=>{
    const {opcion, respuesta} = req.body;
    try {
        if(opcion && respuesta) {
            const newBotOpcion = await BotOpcion.create({
                opcion: opcion,
                respuesta: respuesta,
            });
            return res.status(201).json({creado: newBotOpcion});
        } else return res.status(400).send("envie los datos correctamente");
    } catch (error) {
        res.status(404).json("un error ocurrio en el proceso");
    }
});

router.put("/BotOpciones", async (req,res)=>{
    const {id, opcion, respuesta} = req.body;
    try {
        if(!id) return res.status(400).send("se necesita un id para realizar el cambio");
        if(opcion || respuesta) {
            const actualizar = await BotOpcion.findByPk(id);
            if(opcion) actualizar.opcion = opcion;
            if(respuesta) actualizar.respuesta = respuesta;
            await actualizar.save();

            return res.status(200).json({actualizado: actualizar})
        } else return res.status(400).send("envie los datos correctamente");
    } catch (error) {
        res.status(400).send("un error ocurrio en el proceso");
    }
});

router.delete("/BotOpciones", async (req,res)=>{
    const {id} = req.body;
    try {
        if(!id) return res.status(400).send("se necesita un id para realizar el cambio");
        const destruir = await BotOpcion.findByPk(id);
        await destruir.destroy();
        return res.status(200).send("objeto eliminado con exito");
    } catch (error) {
        res.status(400).send("un error ocurrio en el proceso");
    }
});

module.exports = router;