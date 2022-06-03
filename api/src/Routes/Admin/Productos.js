const { default: axios } = require("axios");
const { Router } = require("express");
const router = Router();
const { Producto } = require("../../db");

router.get("/", async (req, res) => {
	try {
		const all_products = await Producto.findAll();
		console.log(all_products)
		if (all_products.length > 0) {
			res.json(all_products);
		} else {
			res.send("No hay productos");
		}
	} catch (error) {
		console.log(error);
	}
});

// router.post("/create", async (req, res) => {
// 	const { name, active, completed } = req.body;
// 	try {
// 		/* ESTAMOS USANDO DATA DE PRUBA PARA PODER TRABAJARO CON ALGO DE INFORMACIÓN */
// 		let products = await axios("https://fakestoreapi.com/products");
// 		let data_modificada = products.data?.map((elem) => {
// 			let a = {
// 				name: elem.title,
// 				precio: Math.floor(elem.price),
// 				caracteristicas: elem.description,
// 				funcionalidades: elem.description,
// 				categories: elem.category,
// 			};
// 			return a
// 		});
// 		// console.log(data_modificada)
// 		let db_products = await data_modificada?.map((elem) => {
// 			// console.log(elem)
// 			Producto.create({
// 				name: elem.name,
// 				precio: elem.precio,
// 				caracteristicas: elem.caracteristicas,
// 				funcionalidades: elem.funcionalidades,
// 				categories: elem.categories,
// 			});
// 		});
// 		res.json(data_modificada);
// 	} catch (error) {
// 		console.log(error);
// 	}
// });

router.put("/update", async (req, res) => {
	const { id, name, completed, active } = req.body;
	if (!id) {
		res.send("Falto el id!");
	} else if (id && !name && !completed && !active) {
		res.send("Falto informacion!");
	} else if (id && name && !completed && !active) {
		const todo = await Producto.findOne({ where: { id } });
		todo.name = name;
		await todo.save();
		res.json(todo);
	} else if (id && name && completed && !active) {
		const todo = await Producto.findOne({ where: { id } });
		todo.name = name;
		todo.completed = completed;
		await todo.save();
		res.json(todo);
	} else if (id && !name && completed && !active) {
		const todo = await Producto.findOne({ where: { id } });
		todo.completed = completed;
		await todo.save();
		res.json(todo);
	} else if (id && !name && !completed && active) {
		const todo = await Producto.findOne({ where: { id } });
		todo.active = active;
		await todo.save();
		res.json(todo);
	} else if (id && name && completed && active) {
		const todo = await Producto.findOne({ where: { id } });
		todo.name = name;
		todo.completed = completed;
		todo.active = active;
		await todo.save();
		res.json(todo);
	}
});

router.delete("/delete", async (req, res) => {
	const { id } = req.query;
	try {
		const deleted_todo = await Producto.destroy({ where: { id } });
		if (deleted_todo >= 1) {
			res.send("Producto eliminado con exito");
		} else {
			res.send("Hubo un error");
		}
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
