const { Router } = require("express");
const { Categoria } = require("../../../db");

const router = Router();

router.get("/", async (req, res) => {
	try {
		const getCategotias = await Categoria.findAll();
		if (!getCategotias) {
			const error = new Error("Categorias no disponibles");
			return res.status(400).json({ msg: error.message });
		}
		res.json(getCategotias.length > 0 ? getCategotias : "No hay categorias");
	} catch (error) {
		console.log(error.message);
	}
});

router.post("/", async (req, res) => {
	const { nombre } = req.body;

	await Categoria.create({ nombre });
	let new_category = await Categoria.findOne({ where: { nombre } });
	res.json(new_category);
});

router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { nombre } = req.body;

	let category_update = await Categoria.findOne({ where: { id } });
	category_update["nombre"] = nombre;
	await category_update.save();
	res.json(category_update);
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	let category_deleted = await Categoria.destroy({ where: { id } });
	category_deleted > 0
		? res.send("Caracteristica eliminada con exito")
		: res.send("Hubo un problema eliminando la categoria");
});

module.exports = router;
