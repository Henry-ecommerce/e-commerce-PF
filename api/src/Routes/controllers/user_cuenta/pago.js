const { Router } = require("express");
const { APP_USR } = process.env;

const router = Router();

const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: APP_USR,
});

router.post("/", async (req, res) => {
  const { user, producto } = req.body;
  console.log(user);
  console.log(producto);

  let preference = {
    items: producto?.map((e) => {
      return {
        title: e.nombre,
        description: "",
        picture_url: e.img0,
        category_id: "",
        quantity: e.cantidad,
        unit_price: parseInt(e.precio.PesosArg),
      };
    }),
    notification_url: "https://hookb.in/BYV2PJzWNRsknxZk3KPw",
    // payer: {
    //   name: user.name,
    //   phone: user.numero ? user.numero : "12345",
    //   identification: user.id,
    //   address: user.direccion ? user.direccion : "Calle Falsa 123",
    // },
    payment_methods: {
      excluded_payment_methods: [{}],
      excluded_payment_types: [{ id: "ticket" }],
    },
    shipments: {
      free_methods: [{}],
      receiver_address: {},
    },
    auto_return: "approved",
    back_urls: {
      failure: "http://localhost:3000/",
      pending: "",
      success: "http://localhost:3000/",
    },
    metadata: {},
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      console.log(response.body);
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
      res.send(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
