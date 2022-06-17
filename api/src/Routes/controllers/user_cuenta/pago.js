const { Router } = require("express");
const { APP_USR } = process.env;

const router = Router();

const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: APP_USR,
});

router.post("/", async (req, res) => {
  const { user, producto, items } = req.body;
  console.log(user);
  console.log(producto);

  let preference = {
    items: producto?.map((e) => {
      return {
        id: producto.id,
        title: e.nombre,
        description: "",
        picture_url: e.img0,
        category_id: "",
        quantity: e.cantidad,
        unit_price: parseInt(e.precio.PesosArg),
      };
    }),
    payer: {
      phone: { area_code: "", number: parseInt(items.telefono) },
      address: {
        zip_code: items.CP,
        street_name: items.nombreCalle,
        street_number: parseInt(items.numeroCalle),
      },
      email: user.email,
      identification: {
        id: user.id,
        number: items.numeroDoc.toString(),
        type: items.tipoDoc,
      },
      name: user.name,
      surname: user.apellido,
      date_created: null,
      last_purchase: null,
    },

    shipments: {
      receiver_address: {
        zip_code: items.CP.toString(),
        street_name: items.nombreCalle,
        street_number: parseInt(items.numeroCalle),
        floor: items.piso.toString(),
        apartment: "",
        city_name: items.ciudad,
        state_name: items.provincia,
        country_name: items.pais,
      },
    },
    notication_url : "https://hookb.in/BYV2PJzWNRsknxZk3KPw",
    payment_methods: {
      excluded_payment_methods: [{}],
      excluded_payment_types: [{ id: "ticket" }],
    },

    back_urls: {
      failure: "http://localhost:3000/",
      pending: "",
      success: "http://localhost:3000/",
    },
    metadata: {
      id: user.id,
    },
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
