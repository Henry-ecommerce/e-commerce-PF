const { Router } = require("express");
const { Usuario } = require("../../../db");

const router = Router();

router.get("/", async (req, res) => {
	let usuario = await Usuario.findOne({attributes: {
        exclude: ['password']
    }});
	res.json(usuario);
});

module.exports = router;