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
  const { id } = req.query;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${APP_USR}`,
    },
  };
  try {
    let pagos = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`);
    let info = pagos.data
    let orderId = info.order.id

    const peticion = await axios.get(
      `https://api.mercadopago.com/merchant_orders/${orderId}`,
      config
    );
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
    });
    let preferencia = await axios.get(`https://api.mercadopago.com/checkout/preferences/${preference_id}`)
    meta = preferencia.data 
    pedido.addUsuario(meta.metadata.id)

    res.send(pedido);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
