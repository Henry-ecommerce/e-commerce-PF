const { Router } = require("express");
const { APP_USR } = process.env;
const axios = require("axios");
const router = Router();
const { Usuario, Pedido } = require("../../../db");

const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: APP_USR,
});

router.post("/", async (req, res) => {
  const { resource } = req.body;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${APP_USR}`,
    },
  };
  try {
    const peticion = await axios.get(resource, config);
    let datos = peticion.data;
    datos.payments[0].status;
    const { payments, items, shipments, payer,preference_id } = datos;
    console.log(payments)
    let [pedido, create] = await Pedido.findOrCreate({
      where: {
        preference_id: preference_id,
      },
      defaults: {
        payments: JSON.stringify(payments),
        items: JSON.stringify(items),
        shipments: JSON.stringify(shipments),
        payer: JSON.stringify(payer),
      },
    });



    // Usuario.addPedido()

    res.send(pedido);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
