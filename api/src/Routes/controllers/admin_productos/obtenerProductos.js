const { Router } = require("express");
const { Producto } = require("../../../db");
const { Categoria } = require("../../../db");
const { Op } = require("sequelize");
const router = require("./categoriasProduc");
const route = Router();

route.get("/", async (req, res) => {
	const { nombre } = req.query;
	try {
		if (nombre) {
			const producto = await Producto.findAll({
				where: {
					nombre: {
						[Op.iLike]: "%" + nombre + "%",
					},
				},
				include: Categoria,
			});
			if (!producto) {
				res.status(404).json({ msg: "Producto no encontrado" });
			}

			res.json(producto);
		} else {
			const productos = await Producto.findAll({ include: Categoria });

			if (!productos) {
				const error = new Error("No hay productos");
				return res.status(400).json({ msg: error.message });
			}
			res.json(productos);
		}
	} catch (error) {
		console.log({ msg: error.message });
	}
});

route.get("/filtro", async (req, res) => {
	const { marca, stock, precio } = req.query;
	console.log(marca);
	if (marca && !stock && !precio) {
		let productos = await Producto.findAll({ where: { marca } });
		if (productos.length > 0) {
			res.json(productos);
		} else {
			res.send("No encontrado");
		}
	} else if (!marca && stock && !precio) {
		let productos = await Producto.findAll({ order: [["stock", "DESC"]] });
		if (productos.length > 0) {
			res.json(productos);
		} else {
			res.send("No encontrado");
		}
	} else if (!marca && !stock && precio) {
		let productos = await Producto.findAll({ order: ["precio", "ASC"] });
		if (productos.length > 0) {
			res.json(productos);
		} else {
			res.send("No encontrado");
		}
	}
});

route.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const producto = await Producto.findByPk(id);
		if (!producto) {
			res.status(404).json({ msg: "Producto no encontrado" });
		}

		res.json(producto);
	} catch (error) {
		console.log({ msg: error.message });
	}
});

module.exports = route;
