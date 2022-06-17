const { Router } = require("express");
const { Producto, Categoria } = require("../../db");
const Sequelize = require('sequelize')
const {Op} = require('sequelize')
const router = Router();


router.get("/", async (req, res) => {
    let marca = req.query.marca;// filtro
    let precio = req.query.precio; // orden
    let caracteristicas = req.query.caracteristicas; // filtro
    let funciones = req.query.funciones; // filtro
    let stock = req.query.stock; // orden
    let categoria = req.query.categoria; // filtro
    const {categoryorsearch, order ,ascordesc} = req.query;

    
    try {
        
        if(categoryorsearch?.split("category=")[1]){
            let allProducts = await Producto.findAll({
                where : { stock : {[Op.gt] : 0} },
                include: Categoria,
                order: [["nombre", "ASC"]]
            });
            allProducts = allProducts?.filter(elem => elem.Categoria[0].nombre === categoryorsearch?.split("category=")[1])

            if (order === "precio" && ascordesc === "ASC") allProducts = allProducts.sort((a,b) => parseFloat(a.precio?.PesosArg) - parseFloat(b.precio?.PesosArg));
            else if(order === "precio" && ascordesc === "DESC") allProducts = allProducts.sort((a,b) => parseFloat(b.precio?.PesosArg) - parseFloat(a.precio?.PesosArg));

            if(!marca) return res.send(allProducts);

            allProducts = allProducts?.filter(elem => Array.isArray(marca)? marca.includes(elem.marca) : elem.marca === marca);

            return res.send(allProducts)

        }


        let allProducts = await Producto.findAll({
            include: Categoria,
            where: {nombre: { [Sequelize.Op.iLike]: `%${categoryorsearch}%` }, stock : {[Op.gt] : 0}},
            order: [["nombre", "ASC"]]
        });
        // let colorFilter = await Producto.findAll({
            // where : { stock : {[Op.gt] : 0} },
        //     where: {color},
        //     order: [["nombre", "ASC"]]
        // })
        if(marca){
            let marcaFilter = await Producto.findAll({
                include: Categoria,
                where: {marca, nombre: { [Sequelize.Op.iLike]: `%${categoryorsearch}%` }, stock : {[Op.gt] : 0}},
                order: [["nombre", "ASC"]] 
            })
            if (order === "precio" && ascordesc === "ASC") marcaFilter = marcaFilter.sort((a,b) => parseFloat(a.precio?.PesosArg) - parseFloat(b.precio?.PesosArg));
            else if(order === "precio" && ascordesc === "DESC") marcaFilter = marcaFilter.sort((a,b) => parseFloat(b.precio?.PesosArg) - parseFloat(a.precio?.PesosArg));
            
            return res.send(marcaFilter)
        }

        if (precio){
            let precioOrder = await Producto.findAll({ // precio debe ser "ASC" o "DESC", lo recibe del front
                where : { stock : {[Op.gt] : 0} },
            })
            precio === "ASC" ? precioOrder.sort((a,b) => parseFloat(a.precio?.PesosArg) - parseFloat(b.precio?.PesosArg)):
            precioOrder.sort((a,b) => parseFloat(b.precio?.PesosArg) - parseFloat(a.precio?.PesosArg))
            return res.send(precioOrder)
        }
        // let caractFilter = await Producto.findAll({
            // where : { stock : {[Op.gt] : 0} },
        //     where: {caracteristicas: caracteristicas},
        //     order: [["nombre", "ASC"]] 
        // })
        if(funciones){
            let funcionesFilter = await Producto.findAll({
                where: {funciones: {
                    [Sequelize.Op.iLike] : `%${funciones}%`, // operador que busca coincidencias y no es sensitive
                    stock : {[Op.gt] : 0}
                }}
            })
            
            return res.send(funcionesFilter)
        }
        // if(categoria){
        // let categoriaFilter = await Producto.findAll({
            // where : { stock : {[Op.gt] : 0} },
        //     where: {categoria}
        // })
        //    return res.send(categoriaFilter)
        // }
        
        if(stock){
            let stockOrder = await Producto.findAll({
                where : { stock : {[Op.gt] : 0} },
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