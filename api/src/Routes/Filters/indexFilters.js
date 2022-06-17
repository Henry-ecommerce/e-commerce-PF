const { Router } = require("express");
const { Producto, Categoria } = require("../../db");
const Sequelize = require('sequelize')

const router = Router();


router.get("/", async (req, res) => {
    let marca = req.query.marca;// filtro
    let precio = req.query.precio; // orden
    let caracteristicas = req.query.caracteristicas; // filtro
    let funciones = req.query.funciones; // filtro
    let stock = req.query.stock; // orden
    let categoria = req.query.categoria; // filtro
    const {categoryorsearch, order ,ascordesc, minmax} = req.query;

    
    try {
        
        if(categoryorsearch?.split("category=")[1]){
            let allProducts = await Producto.findAll({
                include: Categoria,
                order: [["nombre", "ASC"]]
            });
            allProducts = allProducts?.filter(elem => elem.Categoria[0].nombre === categoryorsearch?.split("category=")[1])
            
            if(marca) allProducts = allProducts?.filter(elem => Array.isArray(marca)? marca.includes(elem.marca) : elem.marca === marca);

            if(minmax) {
                let min_max = minmax.split("-")
                allProducts = allProducts?.filter(elem => elem.precio?.PesosArg >= parseInt(min_max[0]) && elem.precio?.PesosArg <= parseInt(min_max[1]));
            }
            
            if (order === "precio" && ascordesc === "ASC") allProducts = allProducts.sort((a,b) => parseFloat(a.precio?.PesosArg) - parseFloat(b.precio?.PesosArg));
            else if(order === "precio" && ascordesc === "DESC") allProducts = allProducts.sort((a,b) => parseFloat(b.precio?.PesosArg) - parseFloat(a.precio?.PesosArg));
            
            return res.send(allProducts)

        }


        let allProducts = await Producto.findAll({
            include: Categoria,
            where: {nombre: { [Sequelize.Op.iLike]: `%${categoryorsearch}%` }},
            order: [["nombre", "ASC"]]
        });
        // let colorFilter = await Producto.findAll({
        //     where: {color},
        //     order: [["nombre", "ASC"]]
        // })
        if(marca){
            let marcaFilter = await Producto.findAll({
               include: Categoria,
                where: {marca, nombre: { [Sequelize.Op.iLike]: `%${categoryorsearch}%` }},
                order: [["nombre", "ASC"]] 
            })
            if (order === "precio" && ascordesc === "ASC") marcaFilter = marcaFilter.sort((a,b) => parseFloat(a.precio?.PesosArg) - parseFloat(b.precio?.PesosArg));
            else if(order === "precio" && ascordesc === "DESC") marcaFilter = marcaFilter.sort((a,b) => parseFloat(b.precio?.PesosArg) - parseFloat(a.precio?.PesosArg));
            
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

        if (order === "precio" && ascordesc === "ASC") allProducts = allProducts.sort((a,b) => parseFloat(a.precio?.PesosArg) - parseFloat(b.precio?.PesosArg));
        else if(order === "precio" && ascordesc === "DESC") allProducts = allProducts.sort((a,b) => parseFloat(b.precio?.PesosArg) - parseFloat(a.precio?.PesosArg));

        res.send(allProducts) // si no entro en ninguno de los anteriores, devuelve todos ordenados

    } catch (error) {
        console.log(error)
    }
})

module.exports = router;