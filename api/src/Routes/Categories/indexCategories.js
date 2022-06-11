const { Router } = require("express");
const { Categoria } = require("../../db");
const Sequelize = require('sequelize');
const router = Router();

let _categorias = [
    { id:1, name: "Tarjeta Grafica"},
    { id:2, name: "Mousepads"},
    { id:3, name: "Microfonos"},
    { id:4, name: "Audifonos"},
    { id:5, name: "Gabinetes"},
    { id:6, name: "Disipadores para CPU"},
    { id:7, name: "Ventiladores"},
    { id:8, name: "SSD"},
    { id:9, name: "Tarjetas Madre"},
    { id:10, name: "PCs Gamer"},
    { id:11, name: "Procesadores"},
    { id:12, name: "Mouse"},
    { id:13, name: "Discos-Duros"},
    { id:14, name: "Fuentes de Poder para PCs"},
    { id:15, name: "Teclados"},
    { id:16, name: "Monitores"},
]

router.post("/create", async (req, res) => {
    try {
        _categorias?.map((el) => {
            Categoria.create({
                id: el.id,
                nombre: el.name,
            })
        })
        let categorias = await Categoria.findAll();
        categorias ? res.send("Categorias Creadas") : res.send("Categorias NO creadas")
        
    } catch (error) {
        console.log(error)
    }
})

router.get("/", async (req, res) => {
    try {
        let categorias = await Categoria.findAll();
        categorias ? res.send(categorias) : res.send("No hay categorias")
        
    } catch (error) {
        console.log(error)
    }
})

router.put("/update", async (req, res) =>{
    const { id, name} = req.params;
    console.log("id:"+ id + "  name: " + name) 
    if(!id) res.send("id nulo o inválido")
    if(!name) res.send("Pasame un name mostro")

    const idCategory = await Categoria.findOne({ where: { id } });
    idCategory.name = name;
    await idCategory.save();
    res.json(idCategory);
})

router.delete("/delete", async (req, res) => {
    const { id } = req.query;
    try {
        const deletCategory = await Categoria.destroy({ where: { id } });  
        if (deletCategory >= 1) {
        res.send("Producto eliminado con exito");
        } else {
            res.send("Hubo un error, no se eliminó");
        }
    } catch (error) {
        console.log(error);
    }
});




module.exports = router;