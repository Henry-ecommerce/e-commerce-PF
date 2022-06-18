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
  const { resource, topic } = req.body;

  if (!resource && topic !== "merchant_orders") {
    console.log(topic);
    return res.send("no es una merchant order");
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${APP_USR}`,
    },
  };
  try {
    const peticion = await axios.get(resource, config);
    let datos = peticion.data;
    const { payments, items, shipments, payer, preference_id } = datos;
    let [pedido, create] = await Pedido.findOrCreate({
      where: {
        preference_id: preference_id,
      },
      defaults: {
        preference_id: preference_id,
        payments: JSON.stringify(payments),
        items: JSON.stringify(items),
        shipments: JSON.stringify(shipments),
        payer: JSON.stringify(payer),
      },
      include: Usuario,
    });
    let preferencia = await axios.get(
      `https://api.mercadopago.com/checkout/preferences/${preference_id}`,
      config
    );
    meta = preferencia.data;
    pedido.setUsuario(meta.metadata.id);
    let json = JSON.stringify(pedido)
    
    res.send(JSON.parse(json));
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
