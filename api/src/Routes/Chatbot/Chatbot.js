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

//OPCIONES
router.get("/BotOpciones", async (req,res)=>{
    try {
        const allBotOpciones = await BotOpcion.findAll();
        res.status(200).json(allBotOpciones);
    } catch (error) {
        res.status(404).json("un error ocurrio en el proceso");
    }
});

module.exports = router;