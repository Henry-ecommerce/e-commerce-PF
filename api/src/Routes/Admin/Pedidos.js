const { Router } = require("express");
const router = Router();
const { Usuario, Pedido, Producto } = require("../../db");

router.get("/", async (req, res) => {
	let pedidos = await Pedido.findAll({
		include: Usuario,
		order: [["id", "DESC"]],
	});
	pedidos = await pedidos.map((e) => e.items).flat(Infinity);

	let productos = await Producto.findAll({
		where: { id: pedidos.map((e) => e.id) },
    order : [["id",'ASC']]
	});

	let obj = {};
	for (let i = 0; i < pedidos.length; i++) {
		if (obj.hasOwnProperty(pedidos[i].id)) {
			obj[pedidos[i].id] += pedidos[i].quantity;
		} else {
			obj[pedidos[i].id] = pedidos[i].quantity;
		}
	}

	let productos_y_cantidad_de_ventas = [];
	Object.entries(obj).map((e, i) => productos[i]?.id === Number(e[0]) && productos_y_cantidad_de_ventas.push({ ...productos[i].dataValues, total_en_ventas: e[1] })); //?
	
	res.json(productos_y_cantidad_de_ventas);
});

module.exports = router;
