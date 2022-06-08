const { Router } = require("express");
const router = Router();
//const { Op } = require("sequelize");
//const { Categoria } = require("../../db");
//falta agregar el modelo a db.js para hacer un require, no lo hice porque no se
//si alguien manipulo el db.js y no quiero pisar sus cambios.

//tambie falta agragarlo a Routes/index.js no lo agregue por el mismo motivo.


let _categorias = [
    {nombre: "Tarjeta Grafica", id: 1},
    {nombre: "Mousepads", id: 2},
    {nombre: "Microfonos", id: 3},
    {nombre: "Audifonos", id: 4},
    {nombre: "Gabinetes", id: 5},
    {nombre: "Disipadores-para-CPU", id: 6},
    {nombre: "Ventiladores", id: 7},
    {nombre: "SSD", id: 8},
    {nombre: "Tarjetas-Madre", id: 9},
    {nombre: "PC-s-Gamer", id: 10},
    {nombre: "Procesadores", id: 11},
    {nombre: "Mouse", id: 12},
    {nombre: "Discos-Duros", id: 13},
    {nombre: "Fuentes-de-Poder-para-PC-s", id: 14},
    {nombre: "Teclados", id: 15},
    {nombre: "Monitores", id: 16},
];

/*
router.get("/", async (req,res)=> {
    const {nombre} = req.query;
    if(!nombre) return res.status(400).send("el nombres es un campo requerido");

    try {
        const listado_de_categorias = await Categoria.findAll();
        res.status(200).json(listado_de_categorias);
    } catch (err) {
        return res.status(404).send("ha ocurrido un error y no se pueden obtener los datos")
    }
})

router.post("/", async (req,res)=> {
    const {nombre} = req.body; //esto es el importante para crearlos
    try {
        _categorias?.map(elemento => { //este map hardcodea para probar con _categorias
            await Categoria.create({
                nombre: elemento.nombre,
            });
        });
        res.status(201).send("El array de prueba de categorias funciona correctamente");
    } catch (err) {
        res.status(400).send("ha ocurrido un error al intentar crear")
    }
})

router.put("/", async (req,res)=> {
    const {nombre_actualizar, id} = req.body
    if(!id) return res.status(400).send("el id es necesario para realizar la actualizacion");
    if(!nombre_actualizar) return res.status(400).send("el valor de actualizacion en necesario");
    try {
        const actualizacion = await Categoria.findByPk(id)
        actualizacion.name = nombre_actualizar;
        await actualizacion.save();
        return res.status(200).send(`actualizacion realizada el elemento ahora es: ${actualizacion}`)
    } catch(err){
        return res.status(400).send("error al actualizar")
    }
})

router.delete("/", async (req,res)=> {
    const { id } = req.query;
    if(!id) return res.status(400).send("el id es necesario para realizar la eliminacion");
    try {
        const elemento_eliminar = await Categoria.findByPk(id);
        if(!elemento_eliminar.id) return res.status(400).send("no se logro encontar la categoria");
        await elemento_eliminar.destroy();
        res.status(200).send("categoria eliminada con exito");
    } catch (err) {
        res.status(400).send("error al intentar eliminar la categoria")
    }
})
*/
module.exports = router;
    