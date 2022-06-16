const { Router } = require("express");
const { Producto } = require("../../../db");
const { Categoria } = require("../../../db");

const router = Router();

//   { --> ESTO RECIBE DEL FRONT
//   "name": "Tomas Shanahan",
//   "precio": "1000",
//   "stock": "111",
//   "descuento": "",
//   "marca": "Tomas",
//   "caracteristicas_texto": "descripcion de la caracteristica 1",
//   "caracteristicas": {},
//   "caracteristicas_titulo": "caracteristica 1",
//   "categorias": [ "Mousepads" ],
//   "imagenes": [ "http://qnimate.com/wp-content/uploads/2014/03/images2.jpg" ]
// }

router.post("/", async (req, res) => {
	let {
		name,
		precio,
		stock,
		descuento,
		marca,
		caracteristicas_texto,
		caracteristicas,
		caracteristicas_titulo,
		categorias,
		imagenes,
	} = req.body;
	console.log(imagenes)

	if (Object.keys(precio)[0] === "Mxs") {
		precio = {
			Dolares: precio["Mxs"] / 20,
			PesosMX: precio["Mxs"],
			PesosArg: precio["Mxs"] * 6,
		};
	} else if (Object.keys(precio)[0] === "Ars") {
		precio = {
			Dolares: precio["Ars"] / 130,
			PesosMX: precio["Ars"] / 6,
			PesosArg: precio["Ars"],
		};
	} else if (Object.keys(precio)[0] === "Usd") {
		precio = {
			Dolares: precio["Usd"],
			PesosMX: precio["Usd"] * 20,
			PesosArg: precio["Usd"] * 130,
		};
	}

	try {
		const categorias_db = await Categoria.findAll({
			where: { nombre: categorias.map((e) => e) },
		});

		const addNewProducto = await Producto.create({
			nombre: name,
			marca,
			precio,
			caracteristicas,
			stock,
			imagen0: imagenes[0],
			imagen1: imagenes[1],
			imagen2: imagenes[2],
			descuento,
		});

		await addNewProducto.addCategoria(categorias_db);
		res.json(addNewProducto);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
