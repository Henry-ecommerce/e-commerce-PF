const { Router } = require("express");
const { Categoria } = require("../../db");
const Sequelize = require("sequelize");
const router = Router();

let _categorias = [
  {
    name: "Tarjeta Grafica",
    id: 1,
    imagen:
      "https://www.cyberpuerta.mx/out/pictures/master/category/icon/tdv(1).png",
  },
  {
    name: "Mousepads",
    id: 2,
    imagen: "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-MP2035-1.jpg",
  },
  {
    name: "Microfonos",
    id: 3,
    imagen:
      "https://www.cyberpuerta.mx/img/product/M/CP-RAZER-RZ19-02290400-R3M1-1.jpg",
  },
  {
    name: "Audifonos",
    id: 4,
    imagen:
      "https://www.cyberpuerta.mx/img/product/M/CP-NACEBTECHNOLOGY-NA-0317-1.jpg",
  },
  {
    name: "Gabinetes",
    id: 5,
    imagen:
      "https://www.cyberpuerta.mx/img/product/XL/CP-MSI-MPGGUNGNIR110R-3.jpg",
  },
  {
    name: "Disipadores-para-CPU",
    id: 6,
    imagen:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-931311-1.jpg",
  },
  {
    name: "Ventiladores",
    id: 7,
    imagen:
      "https://www.cyberpuerta.mx/img/product/M/CP-INWIN-ASL120FAN-3PK-1.jpg",
  },
  {
    name: "SSD",
    id: 8,
    imagen:
      "https://www.cyberpuerta.mx/out/pictures/master/category/icon/ssds.png",
  },
  {
    name: "Tarjetas-Madre",
    id: 9,
    imagen:
      "https://www.cyberpuerta.mx/out/pictures/master/category/icon/motherboard2.png",
  },
  {
    name: "PC-s-Gamer",
    id: 10,
    imagen:
      "https://www.cyberpuerta.mx/out/pictures/master/category/icon/pc-escritorio.png",
  },
  {
    name: "Procesadores",
    id: 11,
    imagen:
      "https://www.cyberpuerta.mx/out/pictures/master/category/icon/procesador-ryzen.png",
  },
  {
    name: "Mouse",
    id: 12,
    imagen:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-910-004284-1.jpg",
  },
  {
    name: "Discos-Duros",
    id: 13,
    imagen:
      "https://www.cyberpuerta.mx/out/pictures/master/category/icon/dd-nas.png",
  },
  {
    name: "Fuentes-de-Poder-para-PC-s",
    id: 14,
    imagen:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-GP-P750GM-1.jpg",
  },
  {
    name: "Teclados",
    id: 15,
    imagen: "https://www.cyberpuerta.mx/img/product/M/CP-VORAGO-KB-503-1.jpg",
  },
  {
    name: "Monitores",
    id: 16,
    imagen:
      "https://www.cyberpuerta.mx/out/pictures/master/category/icon/monitores(1).png",
  },
];

router.post("/create", async (req, res) => {
  try {
    _categorias?.map(async (el) => {
      await Categoria.create({
        nombre: el.name,
        imagen: el.imagen,
      });
    });
    let categorias = await Categoria.findAll();
    categorias
      ? res.send("Categorias Creadas")
      : res.send("Categorias NO creadas");
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    let categorias = await Categoria.findAll();
    categorias ? res.send(categorias) : res.send("No hay categorias");
  } catch (error) {
    console.log(error);
  }
});

router.put("/update", async (req, res) => {
  const { id, name } = req.params;
  console.log("id:" + id + "  name: " + name);
  if (!id) res.send("id nulo o inválido");
  if (!name) res.send("Pasame un name mostro");

  const idCategory = await Categoria.findOne({ where: { id } });
  idCategory.name = name;
  await idCategory.save();
  res.json(idCategory);
});

router.delete("/delete", async (req, res) => {
  const { id } = req.query;
  try {
    const deletCategory = await Categoria.destroy({ where: { id } });
    if (deletCategory >= 1) {
      res.send("Producto eliminado con exito");
    } else {
      res.send("Hubo un error, no se eliminó");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
