const express = require('express');
const router = express.Router();
const  { Review, Producto, Usuario } = require("../../db");

router.get('/', async (req, res) => {
    try {
        //En findAll Agregar el producto y usuario { include: Producto y Usuario }
        const reviews = await Review.findAll()
        return res.json(reviews)
    } catch (error) {
        console.log(error);
    }
})

router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      let realId = id.substring(1);
      const review_detail = await Review.findAll({
        where: { ProductoId: realId },
      });
      review_detail ? res.json(review_detail) : res.send("No hay Review Aun Se el Primero!");
    } catch (error) {
      console.log(error);
    }
  });

router.post('/', async (req, res) => {
try {
    const { titulo, text, rating, productoId, usuarioId, userName} = req.body;
    const review = await Review.create({
        titulo: titulo,
        text: text,
        rating: rating,
        userName: userName,
    });
    
        let act = await Producto.findOne({
            where: {
                id: productoId
            }
        })
        let usr = await Usuario.findOne({
            where: {
                id: usuarioId
            }
        })
        //console log para ver que id nos esta llegando
        // console.log("Id del Producto",usuarioId); 
        await review.setProducto(act);
        await review.setUsuario(usr);
   
    return res.json("Review Agregado Exitosamente")
} catch (error) {
    console.log(error);
}
})

module.exports = router;