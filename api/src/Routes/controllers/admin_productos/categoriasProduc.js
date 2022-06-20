const { Router } = require("express");
const { Categoria } = require("../../../db");
const { Producto } = require("../../../db");

const router = Router();

router.get("/", async (req, res) => {
	const { category_name } = req.query;
	if (category_name) {
		try {
			const getCategotias = await Categoria.findAll({
				where: { nombre: category_name },
				include: Producto,
			});
			if (!getCategotias) {
				const error = new Error("Categorias no disponibles");
				return res.status(400).json({ msg: error.message });
			}
			res.json(getCategotias.length > 0 ? getCategotias : "No hay categorias");
		} catch (error) {
			console.log(error.message);
		}
	} else {
		try {
			const getCategotias = await Categoria.findAll({ include: Producto });
			if (!getCategotias) {
				const error = new Error("Categorias no disponibles");
				return res.status(400).json({ msg: error.message });
			}
			res.json(getCategotias.length > 0 ? getCategotias : "No hay categorias");
		} catch (error) {
			console.log(error.message);
		}
	}
});

router.post("/", async (req, res) => {
	const { nombre, productos } = req.body;

	if (nombre && !productos) {
		await Categoria.create({ nombre });
		let new_category = await Categoria.findOne({ where: { nombre } });
		res.json(new_category);
	} else if (nombre && productos) {
		let categoria = await Categoria.create({ nombre });
		let _productos = await Producto.findAll({
			where: { nombre: productos.map((e) => e) },
		});
		await categoria.addProducto(_productos);
		let new_category = await Categoria.findOne({
			where: { nombre },
			include: Producto,
		});
		res.json(new_category);
	}
});

router.put('/:id/cambiar_nombre',  async (req,res) => {
	const { id } = req.params;
	const { nombre } = req.body;
if (id && nombre ) {
		let category_update = await Categoria.findOne({
			where: { id },
			include: Producto,
		});
		category_update["nombre"] = nombre;
		await category_update.save();
		res.json(category_update);
	}
})

router.put('/:id/eliminar_relacion', async (req,res) => {
	const { id } = req.params;
	const { nombre, productos_a_eliminar } = req.body;
		let category_update = await Categoria.findOne({
			where: { id },
			include: Producto,
		});
		category_update["nombre"] = nombre;
		let find_productos_a_eliminar = await Producto.findAll({
			where: { nombre: productos_a_eliminar.map((e) => e) },
		});
		await category_update.removeProducto(find_productos_a_eliminar);
		await category_update.save();
		res.json(category_update);
})

router.put('/:id/agregar_relacion', async (req,res) => {
	const { id } = req.params;
	const { nombre, productos_a_agregar } = req.body;
		let category_update = await Categoria.findOne({
			where: { id },
			include: Producto,
		});
		/*  */
		let nombres_productos = await category_update.Productos.length > 0 && category_update.Productos.map(({ nombre }) => nombre);

		category_update["nombre"] = nombre
		if (
			productos_a_eliminar
				.map((e) => !nombres_productos.includes(e) && e)
				.filter((e) => e !== false).lenght > 0
		) {
			let find_productos_a_agregar = await Producto.findAll({
				where: { nombre: productos_a_agregar.map((e) => e) },
			});
			await category_update.addProducto(find_productos_a_agregar);
			await category_update.save();
			res.json(category_update);
		}
})

router.put('/:id/agregar_eliminar_relacion',  async (req,res) => {
	const { id } = req.params;
	const { nombre, productos_a_eliminar, productos_a_agregar } = req.body;

	let category_update = await Categoria.findOne({
			where: { id },
			include: Producto,
		});
		let nombres_productos = await category_update.Productos.length > 0 && category_update.Productos.map(({ nombre }) => nombre);
		category_update["nombre"] = nombre;

		if (productos_a_eliminar.map((e) => !nombres_productos.includes(e) && e).filter((e) => e !== false)) {
			let find_productos_a_eliminar = await Producto.findAll({
				where: { nombre: productos_a_eliminar.map((e) => e) },
			});
			let find_productos_a_agregar = await Producto.findAll({
				where: { nombre: productos_a_agregar.map((e) => e) },
			});
			await category_update.removeProducto(find_productos_a_eliminar);
			await category_update.addProducto(find_productos_a_agregar);
			await category_update.save();
			res.json(category_update);
		} else {
			await category_update.save();
			res.json(category_update);
		}
})

// router.put("/:id", async (req, res) => {
// 	const { id } = req.params;
// 	const { nombre, productos_a_eliminar, productos_a_agregar } = req.body;

// /* 	if (id && nombre && productos_a_agregar.length === 0 && productos_a_eliminar.length === 0) {
// 		let category_update = await Categoria.findOne({
// 			where: { id },
// 			include: Producto,
// 		});
// 		category_update["nombre"] = nombre;
// 		await category_update.save();
// 		res.json(category_update);
// 	}  *//* else */ if (id && nombre && productos_a_agregar.length > 0 && productos_a_eliminar.length > 0) {
// 		let category_update = await Categoria.findOne({
// 			where: { id },
// 			include: Producto,
// 		});
// 		let nombres_productos =
// 		await category_update.Productos.length > 0 &&
// 		category_update.Productos.map(({ nombre }) => nombre);
// 		category_update["nombre"] = nombre;

// 		if (productos_a_eliminar.map((e) => !nombres_productos.includes(e) && e).filter((e) => e !== false)) {
// 			let find_productos_a_eliminar = await Producto.findAll({
// 				where: { nombre: productos_a_eliminar.map((e) => e) },
// 			});
// 			let find_productos_a_agregar = await Producto.findAll({
// 				where: { nombre: productos_a_agregar.map((e) => e) },
// 			});
// 			await category_update.removeProducto(find_productos_a_eliminar);
// 			await category_update.addProducto(find_productos_a_agregar);
// 			await category_update.save();
// 			res.json(category_update);
// 		} else {
// 			await category_update.save();
// 			res.json(category_update);
// 		}
// 	} else if (id && nombre && productos_a_agregar.length > 0 && productos_a_eliminar.length === 0) {
// 		let category_update = await Categoria.findOne({
// 			where: { id },
// 			include: Producto,
// 		});

// 		let nombres_productos = await category_update.Productos.length > 0 && category_update.Productos.map(({ nombre }) => nombre);

// 		category_update["nombre"] = nombre
// 		if (
// 			productos_a_eliminar
// 				.map((e) => !nombres_productos.includes(e) && e)
// 				.filter((e) => e !== false)
// 		) {
// 			let find_productos_a_agregar = await Producto.findAll({
// 				where: { nombre: productos_a_agregar.map((e) => e) },
// 			});
// 			await category_update.addProducto(find_productos_a_agregar);
// 			await category_update.save();
// 			res.json(category_update);
// 		}

// 	}/*  else if (id && nombre && productos_a_agregar.length === 0 && productos_a_eliminar.length > 0) {
// 		let category_update = await Categoria.findOne({
// 			where: { id },
// 			include: Producto,
// 		});
// 		category_update["nombre"] = nombre;
// 		let find_productos_a_eliminar = await Producto.findAll({
// 			where: { nombre: productos_a_eliminar.map((e) => e) },
// 		});
// 		await category_update.removeProducto(find_productos_a_eliminar);
// 		await category_update.save();
// 		res.json(category_update);
// 	} */
// });

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	let category_deleted = await Categoria.destroy({ where: { id } });
	category_deleted > 0
		? res.send("Caracteristica eliminada con exito")
		: res.send("Hubo un problema eliminando la categoria");
});

module.exports = router;


// router.put("/:id", async (req, res) => {
// 	const { id } = req.params;
// 	const { nombre, productos_a_eliminar, productos_a_agregar } = req.body;

// 	if (id && nombre && productos_a_agregar.length === 0 && productos_a_eliminar.length === 0) {
// 		let category_update = await Categoria.findOne({
// 			where: { id },
// 			include: Producto,
// 		});
// 		category_update["nombre"] = nombre;
// 		await category_update.save();
// 		res.json(category_update);
// 	} else if (id &&nombre &&productos_a_agregar.length > 0 &&productos_a_eliminar.length > 0) {
// 		let category_update = await Categoria.findOne({
// 			where: { id },
// 			include: Producto,
// 		});
// 		category_update["nombre"] = nombre;
// 		let nombres_productos =
// 			category_update.Productos.length > 0 &&
// 			category_update.Productos.map(({ nombre }) => nombre);

// 		if (
// 			productos_a_eliminar
// 				.map((e) => !nombres_productos.includes(e) && e)
// 				.filter((e) => e !== false)
// 		) {
// 			let find_productos_a_eliminar = await Producto.findAll({
// 				where: { nombre: productos_a_eliminar.map((e) => e) },
// 			});
// 			let find_productos_a_agregar = await Producto.findAll({
// 				where: { nombre: productos_a_agregar.map((e) => e) },
// 			});
// 			await category_update.removeProducto(find_productos_a_eliminar);
// 			await category_update.addProducto(find_productos_a_agregar);
// 			await category_update.save();
// 			res.json(category_update);
// 		} else {
// 			await category_update.save();
// 			res.json(category_update);
// 		}
// 	} else if (id &&nombre &&productos_a_agregar.length > 0 &&productos_a_eliminar.length === 0) {
// 		let category_update = await Categoria.findOne({
// 			where: { id },
// 			include: Producto,
// 		});
// 		category_update["nombre"] = nombre;
// 		let nombres_productos =
// 			category_update.Productos.length > 0 &&
// 			category_update.Productos.map(({ nombre }) => nombre);

// 		if (
// 			productos_a_eliminar
// 				.map((e) => !nombres_productos.includes(e) && e)
// 				.filter((e) => e !== false)
// 		) {
// 			let find_productos_a_agregar = await Producto.findAll({
// 				where: { nombre: productos_a_agregar.map((e) => e) },
// 			});
// 			await category_update.addProducto(find_productos_a_agregar);
// 			await category_update.save();
// 			res.json(category_update);
// 		} else {
// 			await category_update.save();
// 			res.json(category_update);
// 		}
// 	} else if (id &&nombre &&productos_a_agregar.length === 0 &&productos_a_eliminar.length > 0) {
// 		let category_update = await Categoria.findOne({
// 			where: { id },
// 			include: Producto,
// 		});
// 		category_update["nombre"] = nombre;
// 		let find_productos_a_eliminar = await Producto.findAll({
// 			where: { nombre: productos_a_eliminar.map((e) => e) },
// 		});
// 		await category_update.removeProducto(find_productos_a_eliminar);
// 		await category_update.save();
// 		res.json(category_update);
// 	}
// });