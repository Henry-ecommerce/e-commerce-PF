const { Router } = require("express");
const { APP_USR } = process.env;

const router = Router();

const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token:
    "APP_USR-5427338419689166-061217-770faea1759702d08bd6710fd467d28d-1141606392",
});

router.post("/", async (req, res) => {
  const { user, producto } = req.body;
  console.log(user);
  console.log(producto);

  if (!user) {
    res.send("No llego nada");
  }

  const cantidad = producto?.map((el) => Math.floor(el.precio.PesosArg)).join();

  let preference = {
    items: [
      {
        title: producto.map((el) => el.nombre).join(),
        description: "",
        picture_url: producto.map((el) => el.imagen0).join(),
        category_id: "",
        quantity: 5,
        unit_price: parseInt(cantidad),
      },
      {
        title: "Milanesa con papas",
        description: "",
        currency_id: "ARS",
        picture_url:
          "https://www.cyberpuerta.mx/img/product/XL/CP-GIGABYTE-GV-R66EAGLE-8GD-f750ed.jpg,https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YV0GP0-MTAA00-c7e36d.jpg",
        category_id: "",
        quantity: 1,
        unit_price: 50000,
      },
    ],

    // payer: {
    //   name: user.name,
    //   phone: user.numero ? user.numero : "12345",
    //   identification: user.id,
    //   address: user.direccion ? user.direccion : "Calle Falsa 123",
    // },
    payment_methods: {
      excluded_payment_methods: [{}],
      excluded_payment_types: [{}],
    },
    shipments: {
      free_methods: [{}],
      receiver_address: {},
    },
    redirect_urls: {
      succes: "http://localhost:3000/",
      pending: "",
      failure: "http://localhost:3000/",
    },
    metadata: {},
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      console.log(response.body);
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso

      res.redirect(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
});


module.exports = router;
