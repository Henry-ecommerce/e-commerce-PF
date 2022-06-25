const { Router } = require("express");
const { APP_USR, FRONTEND_URL } = process.env;
const axios = require("axios");
const router = Router();
const { Usuario, Pedido, Producto } = require("../../../db");
const { emailCompraUser } = require("../../../helpers/emailCompraUser");
const { emailCompraAdmin } = require("../../../helpers/emailCompraAdmin");
const { emailPagoDenegado } = require("../../../helpers/emailPagoDenegado");

const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: APP_USR,
});

router.get("/", async (req, res) => {
  const merchant_order_id = req.query.merchant_order_id;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${APP_USR}`,
    },
  };
  let urlmerchant = `https://api.mercadolibre.com/merchant_orders/${merchant_order_id}`;

  try {
    const peticion = await axios.get(urlmerchant, config);
    let datos = peticion.data;
    const { payments, items, shipments, payer, preference_id } = datos;
    let preferencia = await axios.get(
      `https://api.mercadopago.com/checkout/preferences/${preference_id}`,
      config
    );

    let [pedido, create] = await Pedido.findOrCreate({
      where: {
        preference_id: preference_id,
      },
      defaults: {
        preference_id: preference_id,
        payments: payments,
        items: items,
        shipments: preferencia.data.shipments.receiver_address,
        payer: preferencia.data.payer,
      },
      include: Usuario,
    });

    let product = await items.map(async (el) => {
      let product = await Producto.findByPk(el.id);
      product.decrement("stock", { by: el.quantity });
    });

    console.log(product);

    meta = preferencia.data;
    let user = await Usuario.findByPk(meta.metadata.id);

    user.addPedido(pedido.id);

    // console.log(pedido);

    console.log("LLEGUE HASTA ACA!");
    if (pedido.payments[0].status === "approved") {
      emailCompraUser({
        email: user.email,
        name: user.name,
      });

      emailCompraAdmin({
        email2: "sdmoreno51@gmail.com",
        email: user.email,
        name: user.name,
      });
      return res.redirect(`${FRONTEND_URL}/pagoss/aceptado`);
    } else {
      emailPagoDenegado({
        email: user.email,
        name: user.name,
      });
      return res.redirect(`${FRONTEND_URL}/pagoss/denegado`);
    }
  } catch (err) {
    console.log(err);
  }
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

    let preferencia = await axios.get(
      `https://api.mercadopago.com/checkout/preferences/${preference_id}`,
      config
    );

    let [pedido, create] = await Pedido.findOrCreate({
      where: {
        preference_id: preference_id,
      },
      defaults: {
        preference_id: preference_id,
        payments: payments,
        items: items,
        shipments: preferencia.data.shipments.receiver_address,
        payer: preferencia.data.payer,
      },
      include: Usuario,
    });

    let product = await items.map(async (el) => {
      let product = await Producto.findByPk(el.id);
      product.decrement("stock", { by: el.quantity });
    });

    meta = preferencia.data;
    let user = await Usuario.findByPk(meta.metadata.id);

    user.addPedido(pedido.id);

    if (pedido.payments[0].status === "approved") {
      emailCompraUser({
        email: user.email,
        name: user.name,
      });

      emailCompraAdmin({
        email2: "sdmoreno51@gmail.com",
        email: user.email,
        name: user.name,
      });
    } else {
      emailPagoDenegado({
        email: user.email,
        name: user.name,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
