const { Router } = require("express");
const { Producto } = require("../../db");
const Sequelize = require('sequelize')

const router = Router();

router.get("/", async (req, res) => {
    let marca = req.query.marca;// filtro
    let precio = req.query.precio; // orden
    let caracteristicas = req.query.caracteristicas; // filtro
    let funciones = req.query.funciones; // filtro
    let stock = req.query.stock; // orden
    let categoria = req.query.categoria; // filtro

    try {
        let allProducts = await Producto.findAll({
            order: [["nombre", "ASC"]]
        });
        // let colorFilter = await Producto.findAll({
        //     where: {color},
        //     order: [["nombre", "ASC"]]
        // })
        if(marca){
            let marcaFilter = await Producto.findAll({
                where: {marca},
                order: [["nombre", "ASC"]] 
            })
            return res.send(marcaFilter)
        }

        if (precio){
            let precioOrder = await Producto.findAll({ // precio debe ser "ASC" o "DESC", lo recibe del front
            })
            precio === "ASC" ? precioOrder.sort((a,b) => parseFloat(a.precio?.PesosArg) - parseFloat(b.precio?.PesosArg)):
            precioOrder.sort((a,b) => parseFloat(b.precio?.PesosArg) - parseFloat(a.precio?.PesosArg))
            return res.send(precioOrder)
        }
        // let caractFilter = await Producto.findAll({
        //     where: {caracteristicas: caracteristicas},
        //     order: [["nombre", "ASC"]] 
        // })
        if(funciones){
            let funcionesFilter = await Producto.findAll({
                where: {funciones: {
                    [Sequelize.Op.iLike] : `%${funciones}%` // operador que busca coincidencias y no es sensitive
                }}
            })
            
            return res.send(funcionesFilter)
        }
        // if(categoria){
        // let categoriaFilter = await Producto.findAll({
        //     where: {categoria}
        // })
        //    return res.send(categoriaFilter)
        // }
        
        if(stock){
            let stockOrder = await Producto.findAll({
                order: [["stock", stock]] // igual que precio, mandar "ASC" o "DESC"
            })
            return res.status(200).json(stockOrder)}

        res.send(allProducts) // si no entro en ninguno de los anteriores, devuelve todos ordenados

    } catch (error) {
        console.log(error)
    }
})

module.exports = router;