const { default: axios } = require("axios");
const { Router } = require("express");
const { Op } = require("sequelize");
const router = Router();
const { Producto, Categoria } = require("../../db");

let _productos = [
  {
    id: 1,
    nombre:
      "Tarjeta de Video Gigabyte NVIDIA GeForce GTX 1660 Ti OC, 6GB 192-bit GDDR6, PCI Express x16 3.0",
    marca: "Nvidia",
    precio: {
      Dolares: "366.86",
      PesosMX: "7229.00",
      PesosArg: "1184.38",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1800 MHz",
      "Núcleos CUDA": "1536",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-GV-N166TOC-6GD-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-GIGABYTE-GV-N166TOC-6GD-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-GIGABYTE-GV-N166TOC-6GD-3.jpg",
  },
  {
    id: 2,
    nombre:
      "Tarjeta de Video ASUS NVIDIA GeForce RTX 2060 Dual OC EVO, 6GB 192-bit GDDR6, PCI Express 3.0",
    marca: "Nvidia",
    precio: {
      Dolares: "412.53",
      PesosMX: "8129.00",
      PesosArg: "49616.45",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1365 MHz",
      "Frecuencia boost": "1755 MHz",
      "Núcleos CUDA": "1920",
      "Cantidad de puertos HDMI": "2",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "1",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/XL/CP-ASUS-90YV0CH2-M0AA00-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-ASUS-90YV0CH2-M0AA00-1.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-ASUS-90YV0CH2-M0AA00-1.jpg",
  },
  {
    id: 3,
    nombre:
      "Tarjeta de Video MSI NVIDIA GeForce GTX 1660 SUPER VENTUS XS OC, 6GB 192-bit GDDR6, PCI Express x16 3.0",
    marca: "Nvidia",
    precio: {
      Dolares: "478.00",
      PesosMX: "9,419.00",
      PesosArg: "57490.14",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1815 MHz",
      "Núcleos CUDA": "1408",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0: "https://www.cyberpuerta.mx/img/product/XL/CP-MSI-V375-279R-1.jpg",
    imagen1: "https://www.cyberpuerta.mx/img/product/XL/CP-MSI-V375-279R-2.jpg",
    imagen2: "https://www.cyberpuerta.mx/img/product/XL/CP-MSI-V375-279R-3.jpg",
  },
  {
    id: 4,
    nombre:
      "Tarjeta de Video Gigabyte AMD Radeon RX 6600 Eagle 8G, 8GB 128-bit GDDR6, PCI Express x8 4.0",
    marca: "AMD",
    precio: {
      Dolares: "523.67",
      PesosMX: "10319.00",
      PesosArg: "62983.41",
    },
    caracteristicas: {
      "Frecuencia del procesador": "2491 MHz",
      "Cantidad de puertos HDMI": "2",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "2",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/XL/CP-GIGABYTE-GV-R66EAGLE-8GD-f750ed.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-GIGABYTE-GV-R66EAGLE-8GD-44700d.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-GIGABYTE-GV-R66EAGLE-8GD-8533fc.jpg",
  },
  {
    id: 5,
    nombre:
      "Tarjeta de Video ASUS AMD Radeon RX 6600 8GB 128 bit GDDR6, PCI Express 4.0",
    marca: "AMD",
    precio: {
      Dolares: "594.21",
      PesosMX: "11,709.00",
      PesosArg: "71467.46",
    },
    caracteristicas: {
      "Frecuencia del procesador": "2044 MHz",
      "Frecuencia boost": "2491 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YV0GP0-MTAA00-c7e36d.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-ASUS-90YV0GP0-MTAA00-1bddd5.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-ASUS-90YV0GP0-MTAA00-c38acb.jpg",
  },
  {
    id: 6,
    nombre:
      "Tarjeta de Video EVGA NVIDIA GeForce RTX 2060 XC Gaming, 12GB 192-bit GDDR6, PCI Express 3.0",
    marca: "NVIDIA",
    precio: {
      Dolares: "497.79",
      PesosMX: "9,809.00",
      PesosArg: "59870.55",
    },
    caracteristicas: {
      "Frecuencia del procesador": "2044 MHz",
      "Frecuencia boost": "2491 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-EVGA-12G-P4-2263-KR-f25521.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-EVGA-12G-P4-2263-KR-34b873.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-EVGA-12G-P4-2263-KR-f25521.jpg",
  },
  {
    id: 7,
    nombre:
      "Tarjeta de Video ZOTAC NVIDIA GeForce GTX 1660 SUPER AMP, 6GB 192-bit GDDR6, PCI Express 3.0",
    marca: "NVIDIA",
    precio: {
      Dolares: "321.69",
      PesosMX: "6339.00",
      PesosArg: "38690.94",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1845 MHz",
      "Frecuencia boost": "1408 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ZOTAC-ZT-T16620D-10M-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-ZOTAC-ZT-T16620D-10M-6.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-ZOTAC-ZT-T16620D-10M-5.jpg",
  },
  {
    id: 8,
    nombre:
      "Tarjeta de Video ASUS NVIDIA GeForce GTX 1650 Dual, 4GB 128-bit GDDR5, PCI Express 3.0",
    marca: "NVIDIA",
    precio: {
      Dolares: "280.08",
      PesosMX: "5,519.00",
      PesosArg: "33685.96",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1485 MHz",
      "Frecuencia boost": "1725 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "1",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YV0CV3-MVAA00-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-ASUS-90YV0CV3-MVAA00-4.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-ASUS-90YV0CV3-MVAA00-6.jpg",
  },
  {
    id: 9,
    nombre:
      "Tarjeta de Video Gigabyte NVIDIA GeForce GTX 1650 OC, 4GB 128-bit GDDR5, PCI Express 3.0 x16",
    marca: "NVIDIA",
    precio: {
      Dolares: "284.14",
      PesosMX: "5,599.00",
      PesosArg: "34174.25",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1665 MHz",
      "Frecuencia boost": "1710 MHz",
      "Cantidad de puertos HDMI": "2",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "1",
    },
    funciones: "Video",
    stock: 15,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-GV-N1650OC-4GD-6.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-GIGABYTE-GV-N1650OC-4GD-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-GIGABYTE-GV-N1650OC-4GD-1.jpg",
  },
  {
    id: 10,
    nombre:
      "Tarjeta de Video Zotac NVIDIA GeForce GTX 1660 Super Gaming Twin Fan, 6GB 192-bit GDDR6, PCI Express 3.0",
    marca: "NVIDIA",
    precio: {
      Dolares: "316.62",
      PesosMX: "6,239.00",
      PesosArg: "38080.58",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1785 MHz",
      "Frecuencia boost": "1408 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 56,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ZOTAC-ZT-T16620J-10M-e6de26.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-ZOTAC-ZT-T16620J-10M-48ab20.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-ZOTAC-ZT-T16620J-10M-8c2fd3.jpg",
  },
  {
    id: 11,
    nombre:
      "Tarjeta de Video Gigabyte NVIDIA GeForce GTX 1660 OC, 6GB 192-bit GDDR5, PCI Express x16 3.0",
    marca: "NVIDIA",
    precio: {
      Dolares: "362.29",
      PesosMX: "7139.00",
      PesosArg: "43573.85",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1785 MHz",
      "Frecuencia boost": "1830 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 36,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-GV-N1660OC-6GD-1.png",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-GIGABYTE-GV-N1660OC-6GD-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-GIGABYTE-GV-N1660OC-6GD-5.jpg",
  },
  {
    id: 12,
    nombre:
      "Tarjeta de Video PNY NVIDIA GeForce GTX 1650 Dual Fan, 4GB 128-bit GDDR6, PCI Express x16",
    marca: "NVIDIA",
    precio: {
      Dolares: "244.05",
      PesosMX: "4809.00",
      PesosArg: "29352.38",
    },
    caracteristicas: {
      "Frecuencia del procesador": "485 MHz",
      "Frecuencia boost": "1590 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "2",
    },
    funciones: "Video",
    stock: 36,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-PNY-VCG16504D6DFPPB-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-PNY-VCG16504D6DFPPB-4.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-PNY-VCG16504D6DFPPB-3.jpg",
  },
  {
    id: 13,
    nombre:
      "Tarjeta de Video MSI NVIDIA GeForce RTX 2060 VENTUS GP OC, 6GB 192-bit DDR6, PCI Express x16 3.0",
    marca: "NVIDIA",
    precio: {
      Dolares: "388.68",
      PesosMX: "7659.00",
      PesosArg: "46747.74",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1920 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 26,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-RTX2060VENTUSGPOC-a53ff4.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-MSI-RTX2060VENTUSGPOC-df552c.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-MSI-RTX2060VENTUSGPOC-471e3a.jpg",
  },
  {
    id: 14,
    nombre:
      "Tarjeta de Vídeo ASUS TUF Gaming NVIDIA GeForce GTX 1650 OC Edition, 4GB 128 bit GDDR6, PCI Express x16 3.0",
    marca: "NVIDIA",
    precio: {
      Dolares: "345.04",
      PesosMX: "6,799.00",
      PesosArg: "41498.61",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1410 MHz",
      "Frecuencia boost": "1755 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "1",
    },
    funciones: "Video",
    stock: 326,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YV0EZ2-M0AA00-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-ASUS-90YV0EZ2-M0AA00-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-ASUS-90YV0EZ2-M0AA00-3.png",
  },
  {
    id: 15,
    nombre:
      "Tarjeta de Video Gigabyte NVIDIA GeForce RTX 2060 WINDFORCE OC 12G, 12GB 192-bit GDDR6, PCI Express x16 3.0",
    marca: "NVIDIA",
    precio: {
      Dolares: "457.70",
      PesosMX: "9,019.00",
      PesosArg: "55048.68",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1650 MHz",
      "Frecuencia boost": "1680 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 56,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-GV-N2060WF2OC-12GD-fd3f59.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-GIGABYTE-GV-N2060WF2OC-12GD-44f39a.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-GIGABYTE-GV-N2060WF2OC-12GD-bcfdd6.jpg",
  },
  {
    id: 16,
    nombre:
      "Tarjeta de Video MSI NVIDIA GeForce RTX 3080 Ti Gaming X TRIO, 12GB 384-bit GDDR6X, PCI Express 4.0",
    marca: "NVIDIA",
    precio: {
      Dolares: "1804.05",
      PesosMX: "35549",
      PesosArg: "216978.11",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1770 MHz",
      "Frecuencia boost": "10240 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 6,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-RTX3080TIGAMINGXTRIO12G-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-MSI-RTX3080TIGAMINGXTRIO12G-3.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-MSI-RTX3080TIGAMINGXTRIO12G-2.jpg",
  },
  {
    id: 17,
    nombre:
      "Tarjeta de Video AORUS NVIDIA GeForce RTX 3080 Ti Master Gaming, 12GB 384-bit GDDR6X, PCI Express x16 4.0",
    marca: "NVIDIA",
    precio: {
      Dolares: "2060.33",
      PesosMX: "40,599.00",
      PesosArg: "247801.47",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1665 MHz",
      "Frecuencia boost": "1770 MHz",
      "Cantidad de puertos HDMI": "3",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 12,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-GV-N308TAORUSM-12GD-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-GV-N308TAORUSM-12GD-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-GV-N308TAORUSM-12GD-3.jpg",
  },
  {
    id: 18,
    nombre:
      "Tarjeta de Video ASUS AMD Radeon RX 6800 XT TUF Gaming OC, 16GB 256-bit GDDR6, PCI Express 4.0",
    marca: "NVIDIA",
    precio: {
      Dolares: "1310.27",
      PesosMX: "25,819.00",
      PesosArg: "157589.75",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1665 MHz",
      "Frecuencia boost": "1770 MHz",
      "Cantidad de puertos HDMI": "3",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 13,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-TUF-RX6800XT-O16G-GAMING-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-TUF-RX6800XT-O16G-GAMING-3.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-TUF-RX6800XT-O16G-GAMING-2.jpg",
  },
  {
    id: 19,
    nombre:
      "Tarjeta de Video ASUS AMD Radeon RX 6800 XT TUF Gaming OC, 16GB 256-bit GDDR6, PCI Express 4.0",
    marca: "AMD",
    precio: {
      Dolares: "1310.27",
      PesosMX: "25,819.00",
      PesosArg: "157589.75",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1665 MHz",
      "Frecuencia boost": "1770 MHz",
      "Cantidad de puertos HDMI": "3",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 13,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-TUF-RX6800XT-O16G-GAMING-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-TUF-RX6800XT-O16G-GAMING-3.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-TUF-RX6800XT-O16G-GAMING-2.jpg",
  },
  {
    id: 20,
    nombre:
      "Tarjeta de Video MSI NVIDIA GeForce RTX 3090 VENTUS 3X 24G OC, 24GB 384-bit GDDR6X, PCI Express 4.0",
    marca: "NVIDIA",
    precio: {
      Dolares: "2107.53",
      PesosMX: "41,529.00",
      PesosArg: "253477.85",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1725 MHz",
      "Núcleos CUDA": "10496",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-GEFORCERTX3090VENTUS3X24GOC-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-GEFORCERTX3090VENTUS3X24GOC-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-GEFORCERTX3090VENTUS3X24GOC-3.jpg",
  },
  {
    id: 21,
    nombre:
      "Tarjeta de Video EVGA NVIDIA GeForce RTX 3080 Ti XC3 Ultra Gaming, 12GB 384-bit GDDR6X, PCI Express 4.0",
    marca: "NVIDIA",
    precio: {
      Dolares: "1593.95",
      PesosMX: "31409.00",
      PesosArg: "191709.07",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1725 MHz",
      "Núcleos CUDA": "10240",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-EVGA-12G-P5-3955-KR-034bd8.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-EVGA-12G-P5-3955-KR-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-EVGA-12G-P5-3955-KR-2.jpg",
  },
  {
    id: 22,
    nombre:
      "Tarjeta de Video Gigabyte NVIDIA GeForce GTX 1650 D6 OC rev. 2.0, 4GB 128-bit GDDR6, PCI Express x16 3.0",
    marca: "NVIDIA",
    precio: {
      Dolares: "323.22",
      PesosMX: "6369.00",
      PesosArg: "38874.05",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1635 MHz",
      "Núcleos CUDA": "896",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "1",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-GV-N1656OC-4GDREV20-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-GIGABYTE-GV-N1656OC-4GDREV20-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-GIGABYTE-GV-N1656OC-4GDREV20-3.jpg",
  },
  {
    id: 23,
    nombre:
      "Tarjeta de Video Sapphire Pulse AMD Radeon RX 6600, 8GB 128-bit DDR6, PCI Express 4.0",
    marca: "AMD",
    precio: {
      Dolares: "462.77",
      PesosMX: "9,119.00",
      PesosArg: "55659.05",
    },
    caracteristicas: {
      "Frecuencia del procesador": "2491 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-SAPPHIRE-11310-01-20G-45e6aa.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-SAPPHIRE-11310-01-20G-77179b.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-SAPPHIRE-11310-01-20G-9140ad.jpg",
  },
  {
    id: 24,
    nombre:
      "Tarjeta de Video PowerColor Fighter AMD Radeon RX 6600, 8GB 128-bit GDDR6, PCI Express 4.0",
    marca: "AMD",
    precio: {
      Dolares: "652.57",
      PesosMX: "12,859.00",
      PesosArg: "78486.64",
    },
    caracteristicas: {
      "Frecuencia del procesador": "2044 MHz",
      "Frecuencia boost": "2491 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-POWERCOLOR-AXRX66008GBD6-3DH-d31522.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-POWERCOLOR-AXRX66008GBD6-3DH-085f77.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-POWERCOLOR-AXRX66008GBD6-3DH-eb0d1b.jpg",
  },
  {
    id: 25,
    nombre:
      "Tarjeta de Video PowerColor Fighter AMD Radeon RX 6600, 8GB 128-bit GDDR6, PCI Express 4.0",
    marca: "AMD",
    precio: {
      Dolares: "652.57",
      PesosMX: "12,859.00",
      PesosArg: "78486.64",
    },
    caracteristicas: {
      "Frecuencia del procesador": "2044 MHz",
      "Frecuencia boost": "2491 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-POWERCOLOR-AXRX66008GBD6-3DH-d31522.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-POWERCOLOR-AXRX66008GBD6-3DH-085f77.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-POWERCOLOR-AXRX66008GBD6-3DH-eb0d1b.jpg",
  },
  {
    id: 26,
    nombre:
      "Tarjeta de Video ASUS Dual AMD Radeon RX 6700 XT, 12GB 192-bit GDDR6, PCI Express 4.0",
    marca: "AMD",
    precio: {
      Dolares: "971.27",
      PesosMX: "19,139.00",
      PesosArg: "116817.47",
    },
    caracteristicas: {
      "Cantidad de puertos HDMI": "1",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YV0G82-M0NA00-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YV0G82-M0NA00-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YV0G82-M0NA00-3.jpg",
  },
  {
    id: 27,
    nombre:
      "Tarjeta de Video ASUS Dual AMD Radeon RX 6700 XT, 12GB 192-bit GDDR6, PCI Express 4.0",
    marca: "AMD",
    precio: {
      Dolares: "971.27",
      PesosMX: "19,139.00",
      PesosArg: "116817.47",
    },
    caracteristicas: {
      "Cantidad de puertos HDMI": "1",
      "Cantidad de puertos DVI-I": "0",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YV0G82-M0NA00-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YV0G82-M0NA00-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YV0G82-M0NA00-3.jpg",
  },
  {
    id: 28,
    nombre:
      "Tarjeta de Video Gigabyte AMD Radeon RX 6600 Eagle 8G, 8GB 128-bit GDDR6, PCI Express x8 4.0",
    marca: "AMD",
    precio: {
      Dolares: "523.67",
      PesosMX: "10,319.00",
      PesosArg: "62983.41",
    },
    caracteristicas: {
      "Frecuencia del procesador": "2491 MHz",
      "Cantidad de puertos HDMI": "2",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-GV-R66EAGLE-8GD-689c41.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-GIGABYTE-GV-R66EAGLE-8GD-87d74f.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-GIGABYTE-GV-R66EAGLE-8GD-c81bcb.jpg",
  },
  {
    id: 29,
    nombre:
      "Tarjeta de Video ASUS AMD Radeon RX 6900 XT Gaming, 16GB 256-bit GDDR6, PCI Express 4.0",
    marca: "AMD",
    precio: {
      Dolares: "2025.31",
      PesosMX: "39,909.00",
      PesosArg: "243589.96",
    },
    caracteristicas: {
      "Frecuencia del procesador": "2375 MHz",
      "Frecuencia boost": "2525 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de DisplayPorts": "2",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YV0GF0-M0AA00-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YV0GF0-M0AA00-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YV0GF0-M0AA00-3.jpg",
  },
  {
    id: 30,
    nombre:
      "Tarjeta de Video PowerColor AMD Radeon RX 6800 XT OC, 16GB 256-bit GDDR6, PCI Express 4.0",
    marca: "AMD",
    precio: {
      Dolares: "1546.76",
      PesosMX: "30,479.00",
      PesosArg: "186032.69",
    },
    caracteristicas: {
      "Frecuencia del procesador": "2015 MHz",
      "Frecuencia boost": "2250 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-POWERCOLOR-AXRX6800XT16GBD6-3DHROC-c6e078.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-POWERCOLOR-AXRX6800XT16GBD6-3DHROC-34cca4.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-POWERCOLOR-AXRX6800XT16GBD6-3DHROC-887dc6.jpg",
  },
  {
    id: 31,
    nombre:
      "Tarjeta de Video ASUS AMD Radeon RX 6600 8GB 128 bit GDDR6, PCI Express 4.0",
    marca: "AMD",
    precio: {
      Dolares: "594.21",
      PesosMX: "11,709.00",
      PesosArg: "71467.46",
    },
    caracteristicas: {
      "Frecuencia del procesador": "2044 MHz",
      "Frecuencia boost": "2491 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YV0GP0-MTAA00-c7e36d.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-ASUS-90YV0GP0-MTAA00-c7e36d.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-ASUS-90YV0GP0-MTAA00-3b366b.jpg",
  },
  {
    id: 32,
    nombre:
      "Tarjeta de Video Sapphire NITRO+ AMD Radeon RX 6600 XT Gaming OC, 8GB 128-bit GDDR6, PCI Express x16 4.0",
    marca: "AMD",
    precio: {
      Dolares: "714.99",
      PesosMX: "14089.00",
      PesosArg: "85994.11",
    },
    caracteristicas: {
      "Frecuencia del procesador": "2428 MHz",
      "Frecuencia boost": "2607 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-SAPPHIRE-11309-01-20G-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-SAPPHIRE-11309-01-20G-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-SAPPHIRE-11309-01-20G-3.jpg",
  },
  {
    id: 33,
    nombre:
      "Tarjeta de Video Sapphire NITRO+ AMD Radeon RX 6600 XT Gaming OC, 8GB 128-bit GDDR6, PCI Express x16 4.0",
    marca: "AMD",
    precio: {
      Dolares: "714.99",
      PesosMX: "14089.00",
      PesosArg: "85994.11",
    },
    caracteristicas: {
      "Frecuencia del procesador": "2428 MHz",
      "Frecuencia boost": "2607 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-SAPPHIRE-11309-01-20G-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-SAPPHIRE-11309-01-20G-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-SAPPHIRE-11309-01-20G-3.jpg",
  },
  {
    id: 34,
    nombre:
      "Tarjeta de Video PowerColor AMD Radeon RX 6700 XT, 12GB 192-bit GDDR6, PCI Express 4.0",
    marca: "AMD",
    precio: {
      Dolares: "1077.34",
      PesosMX: "21,229.00",
      PesosArg: "129574.06",
    },
    caracteristicas: {
      "Frecuencia del procesador": "2428 MHz",
      "Frecuencia boost": "2607 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-POWERCOLOR-AXRX6700XT12GBD6-3DHEOC-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-POWERCOLOR-AXRX6700XT12GBD6-3DHEOC-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-POWERCOLOR-AXRX6700XT12GBD6-3DHEOC-3.jpg",
  },
  {
    id: 35,
    nombre:
      "Tarjeta de Video Gigabyte AMD Radeon RX 6800 Gaming OC, 16GB 256-bit GDDR6, PCI Express x16 4.0",
    marca: "AMD",
    precio: {
      Dolares: "1197.10",
      PesosMX: "23,589.00",
      PesosArg: "143978.64",
    },
    caracteristicas: {
      "Frecuencia del procesador": "2155 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-GV-R68GAMINGOC-16GD-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-GV-R68GAMINGOC-16GD-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-GV-R68GAMINGOC-16GD-3.jpg",
  },
  {
    id: 36,
    nombre:
      "Tarjeta de Video MSI AMD Radeon RX 6700 XT Mech 2X 12G, 12GB 192-bit GDDR6, PCI Express 4.0",
    marca: "AMD",
    precio: {
      Dolares: "971.27",
      PesosMX: "19,139.00",
      PesosArg: "116817.47",
    },
    caracteristicas: {
      "Cantidad de puertos HDMI": "1",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-RX6700XTMECH2X12G-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-RX6700XTMECH2X12G-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-RX6700XTMECH2X12G-3.jpg",
  },
  {
    id: 37,
    nombre:
      "Tarjeta de Video PowerColor Hellhound AMD Radeon RX 6600 XT OC, 8GB 128-bit GDDR6, PCI Express 4.0",
    marca: "AMD",
    precio: {
      Dolares: "785.53",
      PesosMX: "15,479.00",
      PesosArg: "94478.16",
    },
    caracteristicas: {
      "Frecuencia del procesador": "2589 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-POWERCOLOR-AXRX6600XT8GBD6-3DHLOC-51e171.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-POWERCOLOR-AXRX6600XT8GBD6-3DHLOC-d120a9.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-POWERCOLOR-AXRX6600XT8GBD6-3DHLOC-d6b116.jpg",
  },
  {
    id: 38,
    nombre:
      "Tarjeta de Video ASUS TUF Gaming AMD Radeon RX 6800, 16GB, 256-bit GDDR6, PCI Express 4.0",
    marca: "AMD",
    precio: {
      Dolares: "1228.57",
      PesosMX: "24,209.00",
      PesosArg: "147762.90",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1980 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-TUF-RX6800-O16G-GAMING-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-TUF-RX6800-O16G-GAMING-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-TUF-RX6800-O16G-GAMING-3.jpg",
  },
  {
    id: 39,
    nombre:
      "Tarjeta de Video ASUS AMD TUF Gaming Radeon RX 6700 XT OC, 12GB 256-bit GDDR6, PCI Express 4.0",
    marca: "AMD",
    precio: {
      Dolares: "1066.68",
      PesosMX: "21,019.00",
      PesosArg: "128292.30",
    },
    caracteristicas: {
      "Frecuencia del procesador": "2514 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YV0G80-M0AA00-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YV0G80-M0AA00-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YV0G80-M0AA00-3.jpg",
  },
  {
    id: 40,
    nombre:
      "Tarjeta de Video Gigabyte AMD Radeon RX 6700 XT Gaming OC, 12GB 192-bit GDDR6, PCI Express x16 4.0",
    marca: "AMD",
    precio: {
      Dolares: "1012.38",
      PesosMX: "19,949.00",
      PesosArg: "121761.41",
    },
    caracteristicas: {
      "Cantidad de puertos HDMI": "2",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-GV-R67XTGAMINGOC-12GD-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-GV-R67XTGAMINGOC-12GD-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-GV-R67XTGAMINGOC-12GD-3.jpg",
  },
  {
    id: 41,
    nombre:
      "Tarjeta de Video AORUS AMD Radeon RX 6800 Master 16G, 16GB 256-bit GDDR6, PCI Express x16 4.0",
    marca: "AMD",
    precio: {
      Dolares: "1275.76",
      PesosMX: "25,139.00",
      PesosArg: "153439.28",
    },
    caracteristicas: {
      "Cantidad de puertos HDMI": "2",
      "Cantidad de DisplayPorts": "2",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-GV-R68AORUSM-16GD-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-GV-R68AORUSM-16GD-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-GV-R68AORUSM-16GD-3.jpg",
  },
  {
    id: 42,
    nombre:
      "Tarjeta de Video ASUS ROG Strix AMD Radeon RX 6600 XT OC, 8GB 128-bit GDDR6, PCI Express 4.0",
    marca: "AMD",
    precio: {
      Dolares: "630.75",
      PesosMX: "12,429.00",
      PesosArg: "75862.08",
    },
    caracteristicas: {
      "Cantidad de puertos HDMI": "1",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YV0GN0-M0NA00-ce069d.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-ASUS-90YV0GN0-M0NA00-da0635.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-ASUS-90YV0GN0-M0NA00-a8663b.jpg",
  },
  {
    id: 43,
    nombre:
      "Tarjeta de Video Sapphire NITRO+ AMD Radeon RX 6700 XT, 12GB 192-bit GDDR6, PCI Express x16 4.0",
    marca: "AMD",
    precio: {
      Dolares: "1242.27",
      PesosMX: "24,479.00",
      PesosArg: "149410.88",
    },
    caracteristicas: {
      "Frecuencia del procesador": "2622 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-SAPPHIRE-11306-01-20G-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-SAPPHIRE-11306-01-20G-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-SAPPHIRE-11306-01-20G-3.jpg",
  },
  {
    id: 44,
    nombre:
      "Tarjeta de Video Palit NVIDIA GeForce RTX 3070 Ti GamingPro, 8GB 256-bit GDDR6X, PCI Express x16 4.0",
    marca: "NVIDIA",
    precio: {
      Dolares: "973.81",
      PesosMX: "19189.00",
      PesosArg: "117122.65",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1575 MHz",
      "Frecuencia boost": "1770 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-PALIT-NED307T019P2-1046A-854e9d.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-PALIT-NED307T019P2-1046A-e796f5.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-PALIT-NED307T019P2-1046A-522c31.jpg",
  },
  {
    id: 45,
    nombre:
      "Tarjeta de Video ZOTAC NVIDIA GeForce RTX 3060 Ti Twin Edge LHR, 8GB 256-bit GDDR6, PCI Express x16 4.0",
    marca: "NVIDIA",
    precio: {
      Dolares: "882.97",
      PesosMX: "17,399.00",
      PesosArg: "106197.14",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1665 MHz",
      "Núcleos CUDA": "1665 MHz",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ZOTAC-ZT-A30610E-10MLHR-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ZOTAC-ZT-A30610E-10MLHR-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ZOTAC-ZT-A30610E-10MLHR-3.jpg",
  },
  {
    id: 46,
    nombre:
      "Tarjeta de Video MSI NVIDA GeForce RTX 3080 VENTUS 3X PLUS 12G OC LHR, 12GB 384-bit GDDR6X, PCI Express 4.0",
    marca: "NVIDIA",
    precio: {
      Dolares: "1226.03",
      PesosMX: "24,159.00",
      PesosArg: "147458.69",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1740 MHz",
      "Núcleos CUDA": "8960",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-GEFORCERTX3080VENTUS3XPLUS12GOCLHR-7c4b19.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-MSI-GEFORCERTX3080VENTUS3XPLUS12GOCLHR-f68703.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-MSI-GEFORCERTX3080VENTUS3XPLUS12GOCLHR-599a69.jpg",
  },
  {
    id: 47,
    nombre:
      "Tarjeta de Video Zotac NVIDIA GeForce GTX 1650 AMP Core, 4GB 128-bit GDDR6, PCI Express 3.0",
    marca: "NVIDIA",
    precio: {
      Dolares: "424.20",
      PesosMX: "8,359.00",
      PesosArg: "51020.28",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1650 MHz",
      "Núcleos CUDA": "896",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ZOTAC-ZT-T16520J-10L-1af9f5.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-ZOTAC-ZT-T16520J-10L-1dd613.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-ZOTAC-ZT-T16520J-10L-286091.jpg",
  },
  {
    id: 48,
    nombre:
      "Tarjeta de Video EVGA NVIDIA GeForce GTX 1660 SUPER SC ULTRA GAMING, 6GB 192-bit GDDR6, PCI Express 3.0",
    marca: "NVIDIA",
    precio: {
      Dolares: "701.80",
      PesosMX: "13,829.00",
      PesosArg: "84407.17",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1830 MHz",
      "Núcleos CUDA": "1408",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de DisplayPorts": "1",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-EVGA-06G-P4-1068-KR-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-EVGA-06G-P4-1068-KR-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-EVGA-06G-P4-1068-KR-3.jpg",
  },
  {
    id: 49,
    nombre:
      "Tarjeta de Video AORUS NVIDIA GeForce RTX 3060 Ti Elite 8G (rev. 2.0), 8GB 256-bit GDDR6, PCI-E 4.0 x 16",
    marca: "NVIDIA",
    precio: {
      Dolares: "888.04",
      PesosMX: "17,499.00",
      PesosArg: "106807.51",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1665 MHz",
      "Frecuencia boost": "1785 MHz",
      "Núcleos CUDA": "1408",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de DisplayPorts": "1",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-GV-N306TAORUSE-8GDREV20-6323c1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-AORUS-GV-N306TAORUSE-8GDREV20-0ef355.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-AORUS-GV-N306TAORUSE-8GDREV20-bbd019.jpg",
  },
  {
    id: 50,
    nombre:
      "Tarjeta de Video ASUS NVIDIA Dual GeForce GTX 1650 OC MINI, 4GB 128-bit GDDR6, PCI Express 3.0",
    marca: "NVIDIA",
    precio: {
      Dolares: "284.14",
      PesosMX: "5,599.00",
      PesosArg: "34181.33",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1410 MHz",
      "Frecuencia boost": "1620 MHz",
      "Núcleos CUDA": "896",
      "Cantidad de puertos HDMI": "1",
      "Cantidad de DisplayPorts": "1",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YV0EH8-M0AA00-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YV0EH8-M0AA00-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YV0EH8-M0AA00-3.jpg",
  },
  {
    id: 51,
    nombre:
      "Tarjeta de Video ASUS NVIDIA KO GeForce RTX 3070 V2 LHR, 8GB 256-bit GDDR6, PCI Express 4.0",
    marca: "NVIDIA",
    precio: {
      Dolares: "963.66",
      PesosMX: "18,989.00",
      PesosArg: "115901.92",
    },
    caracteristicas: {
      "Frecuencia del procesador": "1725 MHz",
      "Núcleos CUDA": "5888",
      "Cantidad de puertos HDMI": "2",
      "Cantidad de DisplayPorts": "3",
    },
    funciones: "Video",
    stock: 0,
    categoria: [{ nombre: "Tarjeta Grafica", id: 1 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-KO-RTX3070-8G-V2-GAMING-6c4ed5.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-ASUS-KO-RTX3070-8G-V2-GAMING-b71827.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-ASUS-KO-RTX3070-8G-V2-GAMING-f4bc7c.jpg",
  },
  {
    id: 53,
    nombre: "Mousepad Gamer Yeyian Krieg 2035, 44.4x35.5cm, Grosor 3mm, Negro",
    marca: "Yeyian",
    precio: {
      Dolares: "10.10",
      PesosMX: "199.00",
      PesosArg: "1214.62",
    },
    caracteristicas: {
      Ancho: "444 mm",
      Grosor: "3 mm",
      "Color del producto": "Negro",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0: "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-MP2035-1.jpg",
    imagen1: "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-MP2035-1.jpg",
    imagen2: "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-MP2035-1.jpg",
  },
  {
    id: 54,
    nombre:
      "Mousepad Gamer Primus Arena L, 39 x 31cm, Grosor 3mm, Negro/Morado",
    marca: "Gamer Primus",
    precio: {
      Dolares: "5",
      PesosMX: "100",
      PesosArg: "610.36",
    },
    caracteristicas: {
      Ancho: "399 mm",
      Grosor: "3 mm",
      "Color del producto": "Negro",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0: "https://www.cyberpuerta.mx/img/product/M/CP-PRIMUS-PMP-10L-1.jpg",
    imagen1: "https://www.cyberpuerta.mx/img/product/M/CP-PRIMUS-PMP-10L-1.jpg",
    imagen2: "https://www.cyberpuerta.mx/img/product/M/CP-PRIMUS-PMP-10L-1.jpg",
  },
  {
    id: 56,
    nombre: "Mousepad Gamer HyperX FURY S Pro XL, 90x42cm, Grosor 4mm, Negro",
    marca: "HyperX",
    precio: {
      Dolares: "24.36",
      PesosMX: "480.00",
      PesosArg: "2929.74",
    },
    caracteristicas: {
      Ancho: "900 mm",
      Grosor: "4 mm",
      "Color del producto": "Negro",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-HYPERX-HX-MPFS-XL-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-HYPERX-HX-MPFS-XL-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-HYPERX-HX-MPFS-XL-3.jpg",
  },
  {
    id: 57,
    nombre: "Mousepad Logitech Desk Mat, 70 x 30cm, 2mm, Lavanda",
    marca: "Logitech",
    precio: {
      Dolares: "16.65",
      PesosMX: "328.00",
      PesosArg: "2001.99",
    },
    caracteristicas: {
      Ancho: "700 mm",
      Grosor: "2 mm",
      "Color del producto": "Lavanda",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-956-000036-f815df.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-LOGITECH-956-000036-8d3e67.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-LOGITECH-956-000036-7a1da0.jpg",
  },
  {
    id: 58,
    nombre: "Mousepad Gamer Ocelot Gaming OMP01, 35 x 25cm, Grosor 3mm, Negro",
    marca: "Logitech",
    precio: {
      Dolares: "14.56",
      PesosMX: "287.00",
      PesosArg: "1751.74",
    },
    caracteristicas: {
      "Color del producto": "Lavanda",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OMP01-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OMP01-1.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OMP01-1.jpg",
  },
  {
    id: 59,
    nombre: "Mousepad Gamer Ocelot Gaming OMP01, 35 x 25cm, Grosor 3mm, Negro",
    marca: " Gamer Ocelot",
    precio: {
      Dolares: "14.56",
      PesosMX: "287.00",
      PesosArg: "1751.74",
    },
    caracteristicas: {
      Ancho: "700 mm",
      Grosor: "2 mm",
      "Color del producto": "Lavanda",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OMP01-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OMP01-1.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OMP01-1.jpg",
  },
  {
    id: 60,
    nombre: "Mousepad Gamer Trust GXT 758, 93 x 30cm, Grosor 3mm, Negro",
    marca: "Trust",
    precio: {
      Dolares: "15.99",
      PesosMX: "315.00",
      PesosArg: "1922.64",
    },
    caracteristicas: {
      Ancho: "930 mm",
      Grosor: "3 mm",
      "Color del producto": "Lavanda",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-TRUST-21569-372626.png",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-TRUST-21569-bddcfe.png",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-TRUST-21569-306fd0.png",
  },
  {
    id: 61,
    nombre: "Mousepad Yeyian Krieg Serie 1081, 80 x 40cm, 3mm, Negro",
    marca: "Yeyian",
    precio: {
      Dolares: "11.06",
      PesosMX: "218.00",
      PesosArg: "1330.59",
    },
    caracteristicas: {
      Ancho: "800 mm",
      Grosor: "3 mm",
      "Color del producto": "Lavanda",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YSS-MP1081N-e3fc11.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-YEYIAN-YSS-MP1081N-75d61b.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-YEYIAN-YSS-MP1081N-2a61de.jpg",
  },
  {
    id: 62,
    nombre: "Mousepad NZXT MXL900, 90 x 35cm, Grosor 3mm, Negro",
    marca: "NZXT",
    precio: {
      Dolares: "30.91",
      PesosMX: "609.00",
      PesosArg: "3717.11",
    },
    caracteristicas: {
      Ancho: "900 mm",
      Grosor: "3 mm",
      "Color del producto": "Negro",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-NZXT-MM-XXLSP-BL-e21835.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-NZXT-MM-XXLSP-BL-a99d59.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-NZXT-MM-XXLSP-BL-17513d.jpg",
  },
  {
    id: 63,
    nombre:
      "MMousepad Gamer Ocelot Gaming OMPXL01, 80 x 30cm, Grosor 4mm, Negro",
    marca: "Ocelot",
    precio: {
      Dolares: "19.64",
      PesosMX: "387.00",
      PesosArg: "2362.11",
    },
    caracteristicas: {
      Ancho: "900 mm",
      Grosor: "3 mm",
      "Color del producto": "Negro",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OMPXL01-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OMPXL01-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OMPXL01-2.jpg",
  },
  {
    id: 64,
    nombre: "Binden Descansa Muñecas AC4101L, 44 x 9.5cm, Negro",
    marca: "Binden",
    precio: {
      Dolares: "11.47",
      PesosMX: "226.00",
      PesosArg: "1379.42",
    },
    caracteristicas: {
      Ancho: "900 mm",
      Grosor: "3 mm",
      "Color del producto": "Negro",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-BINDEN-FAN-AC4101L-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-BINDEN-FAN-AC4101L-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-BINDEN-FAN-AC4101L-3.jpg",
  },
  {
    id: 65,
    nombre:
      "Mousepad Gamer Nextep Dragon XT RGB XL, 80 x 35cm, Grosor 4mm, Negro/Rojo",
    marca: "Nextep",
    precio: {
      Dolares: "11.47",
      PesosMX: "226.00",
      PesosArg: "1379.42",
    },
    caracteristicas: {
      Ancho: "900 mm",
      Grosor: "3 mm",
      "Color del producto": "Negro",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0: "https://www.cyberpuerta.mx/img/product/M/CP-NEXTEP-NE-483-1.jpg",
    imagen1: "https://www.cyberpuerta.mx/img/product/M/CP-NEXTEP-NE-483-1.jpg",
    imagen2: "https://www.cyberpuerta.mx/img/product/M/CP-NEXTEP-NE-483-1.jpg",
  },
  {
    id: 66,
    nombre:
      "Mousepad Gamer Naceb con Carga Inalámbrica NA-0926, 31x40cm, Grosor 3mm, Negro",
    marca: "Naceb",
    precio: {
      Dolares: "28.88",
      PesosMX: "569.00",
      PesosArg: "3472.97",
    },
    caracteristicas: {
      Ancho: "310 mm",
      Grosor: "3 mm",
      "Color del producto": "Negro",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-NACEBTECHNOLOGY-NA-0926-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-NACEBTECHNOLOGY-NA-0926-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-NACEBTECHNOLOGY-NA-0926-3.jpg",
  },
  {
    id: 67,
    nombre: "Mousepad NZXT MXL900, 90 x 35cm, Grosor 3mm, Gris",
    marca: "NZXT",
    precio: {
      Dolares: "30.91",
      PesosMX: "609.00",
      PesosArg: "3717.11",
    },
    caracteristicas: {
      Ancho: "900 mm",
      Grosor: "3 mm",
      "Color del producto": "Gris",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-NZXT-MM-XXLSP-GR-de72c3.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-NZXT-MM-XXLSP-GR-e58866.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-NZXT-MM-XXLSP-GR-295685.jpg",
  },
  {
    id: 68,
    nombre: "Mousepad Gigabyte MP100, 35 x 26cm, Grosor 3mm, Negro",
    marca: "Gigabyte",
    precio: {
      Dolares: "9.79",
      PesosMX: "193.00",
      PesosArg: "1178.00",
    },
    caracteristicas: {
      Ancho: "350 mm",
      Grosor: "3 mm",
      "Color del producto": "Negro",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-GP-MP100-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-GP-MP100-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-GP-MP100-3.jpg",
  },
  {
    id: 69,
    nombre: "Mousepad VSG ARMAGEDON L, 35 x 32cm, Grosor 3mm, Negro/Verde",
    marca: "VSG",
    precio: {
      Dolares: "13.14",
      PesosMX: "259.00",
      PesosArg: "1581.82",
    },
    caracteristicas: {
      Ancho: "350 mm",
      Grosor: "3 mm",
      "Color del producto": "Negro",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-VSG-VG-MP67-29cda7.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-VSG-VG-MP67-29cda7.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-VSG-VG-MP67-29cda7.jpg",
  },
  {
    id: 70,
    nombre:
      "Mousepad Trust GXT 765 Glide-Flex RGB, 25x35cm, Grosor 3mm, Negro, con Hub USB de 4 Puertos",
    marca: "Trust",
    precio: {
      Dolares: "20.15",
      PesosMX: "397.00",
      PesosArg: "2423.14",
    },
    caracteristicas: {
      Ancho: "250 mm",
      Grosor: "3 mm",
      "Color del producto": "Negro",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0: "https://www.cyberpuerta.mx/img/product/M/CP-TRUST-23646-1.jpg",
    imagen1: "https://www.cyberpuerta.mx/img/product/M/CP-TRUST-23646-2.jpg",
    imagen2: "https://www.cyberpuerta.mx/img/product/M/CP-TRUST-23646-3.jpg",
  },
  {
    id: 71,
    nombre: "Mousepad Gamer Nextep Dragon XT XL, 80 x 35cm, Grosor 4mm, Negro",
    marca: "Nextep",
    precio: {
      Dolares: "16.19",
      PesosMX: "319.00",
      PesosArg: "1947.06",
    },
    caracteristicas: {
      Ancho: "250 mm",
      Grosor: "3 mm",
      "Color del producto": "Negro",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0: "https://www.cyberpuerta.mx/img/product/M/CP-NEXTEP-NE-483R-1.jpg",
    imagen1: "https://www.cyberpuerta.mx/img/product/M/CP-NEXTEP-NE-483R-1.jpg",
    imagen2: "https://www.cyberpuerta.mx/img/product/M/CP-NEXTEP-NE-483R-1.jpg",
  },
  {
    id: 73,
    nombre: "Mousepad Game Factor MPG500 XL RGB, 80 x 30cm, Grosor 4mm, Negro",
    marca: "Game Factor",
    precio: {
      Dolares: "15.73",
      PesosMX: "310.00",
      PesosArg: "1892.13",
    },
    caracteristicas: {
      Ancho: "800 mm",
      Grosor: "4 mm",
      "Color del producto": "Negro",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-GAMEFACTOR-MPG500-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-GAMEFACTOR-MPG500-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-GAMEFACTOR-MPG500-3.jpg",
  },
  {
    id: 74,
    nombre:
      "Mousepad Gamer Vorago MPG-200, 35 x 44.4cm, Grosor 3mm, Negro/Azul",
    marca: "Game Factor",
    precio: {
      Dolares: "4.31",
      PesosMX: "85.0",
      PesosArg: "518.81",
    },
    caracteristicas: {
      Ancho: "350 mm",
      Grosor: "4 mm",
      "Color del producto": "Negro",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0: "https://www.cyberpuerta.mx/img/product/M/CP-VORAGO-MPG-200-1.jpg",
    imagen1: "https://www.cyberpuerta.mx/img/product/M/CP-VORAGO-MPG-200-2.jpg",
    imagen2: "https://www.cyberpuerta.mx/img/product/M/CP-VORAGO-MPG-200-3.jpg",
  },
  {
    id: 75,
    nombre: "HyperX Micrófono QuadCast, Alámbrico, Negro/Rojo",
    marca: "HyperX",
    precio: {
      Dolares: "130.37",
      PesosMX: "2,569.00",
      PesosArg: "15680.24",
    },
    caracteristicas: {
      "Frecuencia de micrófono": "20 - 20000 Hz",
      "Tecnología de conectividad": "Alámbrico",
      "Longitud de cable": "3 m",
      "Color del producto": "Negro, Rojo",
    },
    funciones: "Microfonos",
    stock: 0,
    categoria: [{ nombre: "Microfonos", id: 3 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-HYPERX-HX-MICQC-BK-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-HYPERX-HX-MICQC-BK-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-HYPERX-HX-MICQC-BK-3.jpg",
  },
  {
    id: 76,
    nombre: "HyperX Micrófono SoloCast, Alámbrico, 100mA, para PS4/PC/MAC",
    marca: "HyperX",
    precio: {
      Dolares: "52.73",
      PesosMX: "1,039.00",
      PesosArg: "6341.68",
    },
    caracteristicas: {
      "Frecuencia de micrófono": "20 - 20000 Hz",
      "Tecnología de conectividad": "Alámbrico",
      "Longitud de cable": "2 m",
      "Color del producto": "Negro",
    },
    funciones: "Microfonos",
    stock: 0,
    categoria: [{ nombre: "Microfonos", id: 3 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-HYPERX-HMIS1X-XX-BKG-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-HYPERX-HMIS1X-XX-BKG-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-HYPERX-HMIS1X-XX-BKG-3.jpg",
  },
  {
    id: 77,
    nombre: "Ocelot Gaming Micrófono OGMIC-02, Alámbrico, 100mA, 94dB",
    marca: "Ocelot",
    precio: {
      Dolares: "31.41",
      PesosMX: "619.00",
      PesosArg: "3778.15",
    },
    caracteristicas: {
      "Frecuencia de micrófono": "30 - 18000 Hz",
      "Tecnología de conectividad": "Alámbrico",
      "Longitud de cable": "2 m",
      "Color del producto": "Negro",
    },
    funciones: "Microfonos",
    stock: 0,
    categoria: [{ nombre: "Microfonos", id: 3 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGMIC-02-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGMIC-02-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGMIC-02-1.jpg",
  },
  {
    id: 78,
    nombre: "Blue Microphones Micrófono Yeti Nano, Alámbrico, USB, 150mA, Gris",
    marca: "Blue",
    precio: {
      Dolares: "71.50",
      PesosMX: "1,409.00",
      PesosArg: "8600.02",
    },
    caracteristicas: {
      "Frecuencia de micrófono": "20 - 20000 Hz",
      "Tecnología de conectividad": "Alámbrico",
      "Longitud de cable": "2 m",
      "Color del producto": "Gris",
    },
    funciones: "Microfonos",
    stock: 0,
    categoria: [{ nombre: "Microfonos", id: 3 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-BLUEMICROPHONES-988-000088-a0720c.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-BLUEMICROPHONES-988-000088-a0720c.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-BLUEMICROPHONES-988-000088-33020e.jpg",
  },
  {
    id: 79,
    nombre: "Razer Micrófono Seiren X, Alámbrico, USB, Rosa",
    marca: "Razer",
    precio: {
      Dolares: "72.52",
      PesosMX: "1,429.00",
      PesosArg: "8722.09",
    },
    caracteristicas: {
      "Frecuencia de micrófono": "20 - 20000 Hz",
      "Tecnología de conectividad": "Alámbrico",
      "Longitud de cable": "2 m",
      "Color del producto": " Rosa",
    },
    funciones: "Microfonos",
    stock: 0,
    categoria: [{ nombre: "Microfonos", id: 3 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-RAZER-RZ19-02290300-R3M1-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-RAZER-RZ19-02290300-R3M1-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-RAZER-RZ19-02290300-R3M1-3.jpg",
  },
  {
    id: 80,
    nombre: "Balam Rush Micrófono Gamer Stelar MC970, Alámbrico, 160 Ohmio",
    marca: "Balam Rush",
    precio: {
      Dolares: "29.38",
      PesosMX: "579.00",
      PesosArg: "3534.00",
    },
    caracteristicas: {
      "Frecuencia de micrófono": "20 - 20000 Hz",
      "Tecnología de conectividad": "Alámbrico",
      "Longitud de cable": "2 m",
      "Color del producto": " Rosa",
    },
    funciones: "Microfonos",
    stock: 0,
    categoria: [{ nombre: "Microfonos", id: 3 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-932967-b4b05a.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-932967-b4b05a.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-932967-b4b05a.jpg",
  },
  {
    id: 81,
    nombre: "OEM Micrófono KM-21, Alámbrico, Negro",
    marca: "OEM ",
    precio: {
      Dolares: "10.86",
      PesosMX: "214.00",
      PesosArg: "1306.18",
    },
    caracteristicas: {
      "Frecuencia de micrófono": "50 - 16000 Hz",
      "Tecnología de conectividad": "Alámbrico",
      "Longitud de cable": "1,8 m",
      "Color del producto": " Rosa",
    },
    funciones: "Microfonos",
    stock: 0,
    categoria: [{ nombre: "Microfonos", id: 3 }],
    imagen0: "https://www.cyberpuerta.mx/img/product/M/CP-OEM-KM-21-4fb532.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-OEM-KM-21-140465.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-OEM-KM-21-140465.jpg",
  },
  {
    id: 82,
    nombre:
      "Game Factor Micrófono KIT MCG601 + MAG500, Alámbrico, Negro, incluye Micrófono Profesional/Soporte de Movimiento 360",
    marca: "Game Factor",
    precio: {
      Dolares: "84.70",
      PesosMX: "1,669.00",
      PesosArg: "10186.97",
    },
    caracteristicas: {
      "Frecuencia de micrófono": "20 - 20000 Hz",
      "Tecnología de conectividad": "Alámbrico",
      "Longitud de cable": "1,7 m",
      "Color del producto": " Rosa",
    },
    funciones: "Microfonos",
    stock: 0,
    categoria: [{ nombre: "Microfonos", id: 3 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-GAMEFACTOR-KITMCG601+MAG500-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-GAMEFACTOR-KITMCG601+MAG500-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-GAMEFACTOR-KITMCG601+MAG500-3.jpg",
  },
  {
    id: 83,
    nombre: "Razer Micrófono Seiren X, Alámbrico, USB, Blanco",
    marca: "Razer",
    precio: {
      Dolares: "69.47",
      PesosMX: "1369.00",
      PesosArg: "8355.88",
    },
    caracteristicas: {
      "Frecuencia de micrófono": "20 - 20000 Hz",
      "Tecnología de conectividad": "Alámbrico",
      "Longitud de cable": "1,7 m",
      "Color del producto": "Blanco",
    },
    funciones: "Microfonos",
    stock: 0,
    categoria: [{ nombre: "Microfonos", id: 3 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-RAZER-RZ19-02290400-R3M1-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-RAZER-RZ19-02290400-R3M1-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-RAZER-RZ19-02290400-R3M1-3.jpg",
  },
  {
    id: 84,
    nombre:
      "Blue Microphone Micrófono Snowball Ice, Alámbrico, USB, Negro - incluye Webcam AVvermedia PW313",
    marca: "Razer",
    precio: {
      Dolares: "138.49",
      PesosMX: "2,729.00",
      PesosArg: "16656.82",
    },
    caracteristicas: {
      "Frecuencia de micrófono": "20 - 20000 Hz",
      "Tecnología de conectividad": "Alámbrico",
      "Longitud de cable": "1,7 m",
      "Color del producto": "Negro",
    },
    funciones: "Microfonos",
    stock: 0,
    categoria: [{ nombre: "Microfonos", id: 3 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-BLUEMICROPHONES-SNOWBALLICE+AVERMEDIAPW313-818d02.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-BLUEMICROPHONES-SNOWBALLICE+AVERMEDIAPW313-818d02.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-BLUEMICROPHONES-SNOWBALLICE+AVERMEDIAPW313-818d02.jpg",
  },
  {
    id: 85,
    nombre:
      "Logitech Audífonos Gamer G733 7.1 para PS4/PC, Inalámbrico, USB, Azul",
    marca: "Logitech",
    precio: {
      Dolares: "102.46",
      PesosMX: "2,019.00",
      PesosArg: "12323.24",
    },
    caracteristicas: {
      "Interfaz del dispositivo": "USB",
      "Frecuencia de auricular": "20 - 20000 Hz",
      "Tecnología de conectivida": "inalámbrico",
      "Color del producto": " Azul",
    },
    funciones: "Audifonos",
    stock: 0,
    categoria: [{ nombre: "Audifonos", id: 4 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-981-000942-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-981-000942-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-981-000942-3.jpg",
  },
  {
    id: 52,
    nombre: "Mousepad Balam Rush Narok XL, 90 x 40cm, 4mm, Negro/Rojo",
    marca: "Balam Rush",
    precio: {
      Dolares: "9.95",
      PesosMX: "196.00",
      PesosArg: "1196.31",
    },
    caracteristicas: {
      Ancho: "900 mm",
      Grosor: "4 mm",
      "Color del producto": "Negro",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-931441-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-931441-1.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-931441-1.jpg",
  },
  {
    id: 55,
    nombre: "Mousepad Gamer HyperX FURY S Pro XL, 90x42cm, Grosor 4mm, Negro",
    marca: "Gamer Primus",
    precio: {
      Dolares: "24.36",
      PesosMX: "480.00",
      PesosArg: "2929.74",
    },
    caracteristicas: {
      Ancho: "900 mm",
      Grosor: "4 mm",
      "Color del producto": "Negro",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-HYPERX-HX-MPFS-XL-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-HYPERX-HX-MPFS-XL-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-HYPERX-HX-MPFS-XL-3.jpg",
  },
  {
    id: 72,
    nombre:
      "Mousepad Gamer BRobotix 497288, 79.2 x 30cm, Grosor 4mm, Planisferio",
    marca: "BRobotix",
    precio: {
      Dolares: "16.19",
      PesosMX: "319.00",
      PesosArg: "1947.06",
    },
    caracteristicas: {
      Ancho: "792 mm",
      Grosor: "4 mm",
      "Color del producto": "Multicolor",
    },
    funciones: "Mousepads",
    stock: 0,
    categoria: [{ nombre: "Mousepads", id: 2 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-BROBOTIX-497288-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-BROBOTIX-497288-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-BROBOTIX-497288-3.jpg",
  },
  {
    id: 86,
    nombre:
      "Logitech Audífonos Gamer G733 7.1 para PS4/PC, Inalámbrico, USB, Lila",
    marca: "Logitech",
    precio: {
      Dolares: "102.46",
      PesosMX: "2,019.00",
      PesosArg: "12323.24",
    },
    caracteristicas: {
      "Interfaz del dispositivo": "USB",
      "Frecuencia de auricular": "20 - 20000 Hz",
      "Tecnología de conectivida": "inalámbrico",
      "Color del producto": " Lila",
    },
    funciones: "Audifonos",
    stock: 0,
    categoria: [{ nombre: "Audifonos", id: 4 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-981-000889-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-981-000889-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-981-000889-3.jpg",
  },
  {
    id: 87,
    nombre:
      "Naceb Audífonos Gamer Black Mamba, Alámbrico, 2 Metros, 3.5mm, Negro",
    marca: "Naceb",
    precio: {
      Dolares: "10.10",
      PesosMX: "199.00",
      PesosArg: "1214.62",
    },
    caracteristicas: {
      "Interfaz del dispositivo": "3.5 mm (1/8 '')",
      "Frecuencia de auricular": "20 - 20000 Hz",
      "Tecnología de conectivida": " Alámbrico",
      "Color del producto": " Negro",
    },
    funciones: "Audifonos",
    stock: 0,
    categoria: [{ nombre: "Audifonos", id: 4 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-NACEBTECHNOLOGY-NA-0317-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-981-000889-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-981-000889-3.jpg",
  },
  {
    id: 88,
    nombre:
      "Corsair Audífonos Gamer HS50 PRO STEREO, Alámbrico, 1.8 Metros, 3.5mm, Negro",
    marca: "Naceb",
    precio: {
      Dolares: "47.15",
      PesosMX: "929.00",
      PesosArg: "5670.28",
    },
    caracteristicas: {
      "Interfaz del dispositivo": "3.5 mm (1/8 '')",
      "Frecuencia de auricular": "20 - 20000 Hz",
      "Tecnología de conectivida": " Alámbrico",
      "Color del producto": " Negro",
    },
    funciones: "Audifonos",
    stock: 0,
    categoria: [{ nombre: "Audifonos", id: 4 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-CORSAIR-CA-9011215-NA-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-CORSAIR-CA-9011215-NA-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-CORSAIR-CA-9011215-NA-3.jpg",
  },
  {
    id: 89,
    nombre:
      "Ocelot Gaming Audífonos Gamer OGEH02, Alámbrico, 2.2 Metros, 3.5mm, Negro",
    marca: "Naceb",
    precio: {
      Dolares: "15.12",
      PesosMX: "298.00",
      PesosArg: "1818.88",
    },
    caracteristicas: {
      "Interfaz del dispositivo": "20 - 20000 Hz",
      "Frecuencia de auricular": "20 - 20000 Hz",
      "Tecnología de conectivida": " Alámbrico",
      "Color del producto": " Negro",
    },
    funciones: "Audifonos",
    stock: 0,
    categoria: [{ nombre: "Audifonos", id: 4 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGEH02-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGEH02-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGEH02-3.jpg",
  },
  {
    id: 90,
    nombre:
      "Ocelot Gaming Audífonos Gamer OGMH02, Alámbrico, 2.2 Metros, 3.5mm/USB, Negro",
    marca: "Naceb",
    precio: {
      Dolares: "19.34",
      PesosMX: "381.00",
      PesosArg: "2325.48",
    },
    caracteristicas: {
      "Frecuencia de auricular": "20 - 20000 Hz",
      "Tecnología de conectivida": " Alámbrico",
      "Color del producto": " Negro",
    },
    funciones: "Audifonos",
    stock: 0,
    categoria: [{ nombre: "Audifonos", id: 4 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGMH02-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGMH02-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGMH02-3.jpg",
  },
  {
    id: 91,
    nombre: "Naceb Audífonos Gamer Naja 7.1, Alámbrico, 2 Metros, USB, Negro",
    marca: "Naceb",
    precio: {
      Dolares: "25.32",
      PesosMX: "499.00",
      PesosArg: "3045.71",
    },
    caracteristicas: {
      "Frecuencia de auricular": "3.5 mm (1/8 '')",
      "Tecnología de conectivida": " Alámbrico",
      "Color del producto": " Negro",
    },
    funciones: "Audifonos",
    stock: 0,
    categoria: [{ nombre: "Audifonos", id: 4 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-NACEBTECHNOLOGY-NA-0315-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-NACEBTECHNOLOGY-NA-0315-1.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-NACEBTECHNOLOGY-NA-0315-1.jpg",
  },
  {
    id: 92,
    nombre:
      "Logitech Audífonos Gamer G733 7.1 para PS4/PC, Inalámbrico, USB, Negro",
    marca: "Logitech",
    precio: {
      Dolares: "129.36",
      PesosMX: "2549.00",
      PesosArg: "15558.17",
    },
    caracteristicas: {
      "Frecuencia de auricular": "20 - 20000 Hz",
      "Tecnología de conectivida": " Alámbrico",
      "Color del producto": " Negro",
    },
    funciones: "Audifonos",
    stock: 0,
    categoria: [{ nombre: "Audifonos", id: 4 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-981-000863-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-981-000863-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-981-000863-3.jpg",
  },
  {
    id: 93,
    nombre: "Logitech Audífonos Gamer G Pro, Alámbrico, 2 Metros, 3.5mm, Negro",
    marca: "Logitech",
    precio: {
      Dolares: "88.25",
      PesosMX: "1739.00",
      PesosArg: "10614.22",
    },
    caracteristicas: {
      "Frecuencia de auricular": "20 - 20000 Hz",
      "Tecnología de conectivida": " Alámbrico",
      "Color del producto": " Negro",
    },
    funciones: "Audifonos",
    stock: 0,
    categoria: [{ nombre: "Audifonos", id: 4 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-981-000811-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-981-000811-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-981-000811-3.jpg",
  },
  {
    id: 94,
    nombre:
      "Yeyian Audífonos Gamer Proud Series 3500 para Xbox One/PS4, Alámbrico, 1.8 Metros, 3.5 mm, Negro",
    marca: "Yeyian",
    precio: {
      Dolares: "28.88",
      PesosMX: "569.00",
      PesosArg: "3472.97",
    },
    caracteristicas: {
      "Frecuencia de auricular": "20 - 20000 Hz",
      "Tecnología de conectivida": " Alámbrico",
      "Color del producto": " Negro",
    },
    funciones: "Audifonos",
    stock: 0,
    categoria: [{ nombre: "Audifonos", id: 4 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YDG-33405-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YDG-33405-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YDG-33405-3.jpg",
  },
  {
    id: 95,
    nombre:
      "Logitech Audífonos Gamer G733 7.1 para PS4/PC, Inalámbrico, USB, Blanco",
    marca: "Logitech",
    precio: {
      Dolares: "126.82",
      PesosMX: "2,499.00",
      PesosArg: "15252.98",
    },
    caracteristicas: {
      "Frecuencia de auricular": "20 - 20000 Hz",
      "Tecnología de conectivida": " Alámbrico",
      "Color del producto": "Blanco",
    },
    funciones: "Audifonos",
    stock: 0,
    categoria: [{ nombre: "Audifonos", id: 4 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-981-000882-5.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-981-000882-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-981-000882-1.jpgg",
  },
  {
    id: 96,
    nombre:
      "ASUS Audífonos Gamer TUF Gaming H3 7.1, Alámbrico, 1.3 Metros + 1.3 Metros de Extensión, 3.5mm, Negro/Gris",
    marca: "ASUS",
    precio: {
      Dolares: "40.04",
      PesosMX: "789.00",
      PesosArg: "4815.77",
    },
    caracteristicas: {
      "Frecuencia de auricular": "20 - 20000 Hz",
      "Tecnología de conectivida": " Alámbrico",
      "Color del producto": "Negro, Gris",
    },
    funciones: "Audifonos",
    stock: 0,
    categoria: [{ nombre: "Audifonos", id: 4 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YH028G-B1UA00-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YH028G-B1UA00-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YH028G-B1UA00-3.jpg",
  },
  {
    id: 97,
    nombre:
      "Balam Rush Audífonos Gamer Hesix 7.1, Alámbrico, 2.1 Metros, USB-A, Negro",
    marca: "Balam Rush",
    precio: {
      Dolares: "18.98",
      PesosMX: "374.00",
      PesosArg: "2282.76",
    },
    caracteristicas: {
      "Frecuencia de auricular": "20 - 20000 Hz",
      "Tecnología de conectivida": " Alámbrico",
      "Color del producto": "Negro, Gris",
    },
    funciones: "Audifonos",
    stock: 0,
    categoria: [{ nombre: "Audifonos", id: 4 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-929776-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-929776-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-929776-3.jpg",
  },
  {
    id: 98,
    nombre:
      "Corsair Audífonos Gamer VIRTUOSO RGB WIRELESS 7.1, Inalámbrico, USB + 3.5mm, Blanco",
    marca: "Corsair",
    precio: {
      Dolares: "144.07",
      PesosMX: "2,839.00",
      PesosArg: "17328.22",
    },
    caracteristicas: {
      "Frecuencia de auricular": "20 - 20000 Hz",
      "Tecnología de conectivida": " Alámbrico",
      "Color del producto": "Blanco",
    },
    funciones: "Audifonos",
    stock: 0,
    categoria: [{ nombre: "Audifonos", id: 4 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-CORSAIR-CA-9011186-NA-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-CORSAIR-CA-9011186-NA-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-CORSAIR-CA-9011186-NA-3.jpg",
  },
  {
    id: 99,
    nombre: "orsair Audífonos Gamer HS35, Alámbrico, 1.1 Metros, 3.5mm, Negro",
    marca: "Corsair",
    precio: {
      Dolares: "144.07",
      PesosMX: "2,839.00",
      PesosArg: "17328.22",
    },
    caracteristicas: {
      "Frecuencia de auricular": "20 - 20000 Hz",
      "Tecnología de conectivida": " Alámbrico",
      "Color del producto": "Negro",
    },
    funciones: "Audifonos",
    stock: 0,
    categoria: [{ nombre: "Audifonos", id: 4 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-CORSAIR-CA-9011195-NA-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-CORSAIR-CA-9011195-NA-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-CORSAIR-CA-9011195-NA-3.jpg",
  },
  {
    id: 100,
    nombre:
      "Gabinete Cooler Master Box TD500 Mesh con Ventana Midi Tower, ATX/EATX/micro ATX/Mini-ITX/SSI CEB, USB 3.0, sin Fuente, Blanco",
    marca: "Cooler Master",
    precio: {
      Dolares: "144.07",
      PesosMX: "2,839.00",
      PesosArg: "17328.22",
    },
    caracteristicas: {
      "Factor de forma": "Midi-Tower",
      "Tarjetas madre soportada": "ATX, EATX, Micro ATX, Mini-ITX, SSI CEB",
      "Cantidad de puertos USB 3.0": "0",
      "Disco duro soportado": "2.5",
      "Ventiladores frontales instalados": " 3x 120 mm",
      "Color del producto": "Blanco",
    },
    funciones: "Gabinetes",
    stock: 0,
    categoria: [{ nombre: "Gabinetes", id: 5 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-COOLERMASTER-MCB-D500D-WGNN-S01-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-COOLERMASTER-MCB-D500D-WGNN-S01-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-COOLERMASTER-MCB-D500D-WGNN-S01-3.jpg",
  },
  {
    id: 101,
    nombre:
      "Gabinete Corsair SPEC-05 con Ventana LED Rojo, Midi-Tower, ATX, USB 3.0, incluye Fuente de 550W, Negro",
    marca: "Corsair",
    precio: {
      Dolares: "83.68",
      PesosMX: "1,649.00",
      PesosArg: "10064.89",
    },
    caracteristicas: {
      "Factor de forma": "Midi-Tower",
      "Tarjetas madre soportada": "ATX",
      "Cantidad de puertos USB 3.0": "1",
      "Disco duro soportado": "2.5",
      "Ventiladores frontales instalados": " 3x 120 mm",
      "Color del producto": "Negro",
    },
    funciones: "Gabinetes",
    stock: 0,
    categoria: [{ nombre: "Gabinetes", id: 5 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-CORSAIR-CC-9020126-NA-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-CORSAIR-CC-9020126-NA-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-CORSAIR-CC-9020126-NA-3.jpg",
  },
  {
    id: 102,
    nombre:
      "abinete NZXT H510 con Ventana, Midi-Tower, ATX,Micro-ATX,Mini-ATX, USB 3.1, sin Fuente, Blanco",
    marca: "NZXT",
    precio: {
      Dolares: "87.24",
      PesosMX: "1,719.00",
      PesosArg: "10492.15",
    },
    caracteristicas: {
      "Factor de forma": "Midi-Tower",
      "Tarjetas madre soportada": "ATX,Micro ATX,Mini-ATX",
      "Cantidad de puertos USB 3.0": "0",
      "Disco duro soportado": "2.5",
      "Ventiladores frontales instalados": "1x 120 mm",
      "Color del producto": "Blanco",
    },
    funciones: "Gabinetes",
    stock: 0,
    categoria: [{ nombre: "Gabinetes", id: 5 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-NZXT-CA-H510B-W1-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-NZXT-CA-H510B-W1-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-NZXT-CA-H510B-W1-3.jpg",
  },
  {
    id: 103,
    nombre:
      "Gabinete Ocelot Gaming OGEC02 con Ventana, Tower, ATX/Micro ATX/Mini-ITX, USB 2.0/3.0, sin Fuente, Negro",
    marca: "Ocelot",
    precio: {
      Dolares: "41.06",
      PesosMX: "809.00",
      PesosArg: "4937.84",
    },
    caracteristicas: {
      "Tarjetas madre soportada": "ATX,Micro ATX,Mini-ITX",
      "Cantidad de puertos USB 3.0": "2",
      "Disco duro soportado": "2.5",
      "Ventiladores frontales instalados": "1x 120 mm",
      "Color del producto": "Negro",
    },
    funciones: "Gabinetes",
    stock: 0,
    categoria: [{ nombre: "Gabinetes", id: 5 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGEC02-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGEC02-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGEC02-3.jpg",
  },
  {
    id: 104,
    nombre:
      "Gabinete Naceb Hydra con Ventana RGB, Full-Tower, ATX, USB 2.0/3.0, sin Fuente, Negro",
    marca: "Naceb",
    precio: {
      Dolares: "60.34",
      PesosMX: "1,189.00",
      PesosArg: "7257.22",
    },
    caracteristicas: {
      "Tarjetas madre soportada": "Full-Tower",
      "Cantidad de puertos USB 3.0": "2",
      "Disco duro soportado": "2.5",
      "Ventiladores frontales instalados": "3x 120 mm",
      "Color del producto": "Negro",
    },
    funciones: "Gabinetes",
    stock: 0,
    categoria: [{ nombre: "Gabinetes", id: 5 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-NACEBTECHNOLOGY-NA-0602-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-NACEBTECHNOLOGY-NA-0602-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-NACEBTECHNOLOGY-NA-0602-3.jpg",
  },
  {
    id: 105,
    nombre:
      "Gabinete Yeyian Shadow 2200 con Ventana RGB, Full-Tower, ATX, USB 3.0, sin Fuente, Negro",
    marca: "Naceb",
    precio: {
      Dolares: "78.10",
      PesosMX: "1,539.00",
      PesosArg: "9393.49",
    },
    caracteristicas: {
      "Tarjetas madre soportada": "Full-Tower",
      "Cantidad de puertos USB 3.0": "2",
      "Disco duro soportado": "2.5",
      "Ventiladores frontales instalados": "3x 120 mm",
      "Color del producto": "Negro",
    },
    funciones: "Gabinetes",
    stock: 0,
    categoria: [{ nombre: "Gabinetes", id: 5 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YGS-68808-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YGS-68808-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YGS-68808-3.jpg",
  },
  {
    id: 106,
    nombre:
      "Gabinete Acteck Ultron X RGB, Micro Tower, micro ATX/Mini-ITX, USB 3.2, incluye Fuente de 500W, Negro",
    marca: "Naceb",
    precio: {
      Dolares: "38.01",
      PesosMX: "749.00",
      PesosArg: "4571.62",
    },
    caracteristicas: {
      "Tarjetas madre soportada": "Full-Tower",
      "Cantidad de puertos USB 3.0": "2",
      "Disco duro soportado": "2.5",
      "Ventiladores frontales instalados": "3x 120 mm",
      "Color del producto": "Negro",
    },
    funciones: "Gabinetes",
    stock: 0,
    categoria: [{ nombre: "Gabinetes", id: 5 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ACTECK-AC-929547-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ACTECK-AC-929547-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ACTECK-AC-929547-3.jpg",
  },
  {
    id: 107,
    nombre:
      "Gabinete Acteck Ultron X RGB, Micro Tower, micro ATX/Mini-ITX, USB 3.2, incluye Fuente de 500W, Negro",
    marca: "Naceb",
    precio: {
      Dolares: "38.01",
      PesosMX: "749.00",
      PesosArg: "4571.62",
    },
    caracteristicas: {
      "Tarjetas madre soportada": "Full-Tower",
      "Cantidad de puertos USB 3.0": "2",
      "Disco duro soportado": "2.5",
      "Ventiladores frontales instalados": "3x 120 mm",
      "Color del producto": "Negro",
    },
    funciones: "Gabinetes",
    stock: 0,
    categoria: [{ nombre: "Gabinetes", id: 5 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ACTECK-AC-929547-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ACTECK-AC-929547-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ACTECK-AC-929547-3.jpg",
  },
  {
    id: 108,
    nombre:
      "Gabinete Acteck Ultron X RGB, Micro Tower, micro ATX/Mini-ITX, USB 3.2, incluye Fuente de 500W, Negro",
    marca: "Acteck",
    precio: {
      Dolares: "38.01",
      PesosMX: "749.00",
      PesosArg: "4571.62",
    },
    caracteristicas: {
      "Tarjetas madre soportada": "Full-Tower",
      "Cantidad de puertos USB 3.0": "2",
      "Disco duro soportado": "2.5",
      "Ventiladores frontales instalados": "3x 120 mm",
      "Color del producto": "Negro",
    },
    funciones: "Gabinetes",
    stock: 0,
    categoria: [{ nombre: "Gabinetes", id: 5 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ACTECK-AC-929547-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ACTECK-AC-929547-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ACTECK-AC-929547-3.jpg",
  },
  {
    id: 109,
    nombre:
      "Gabinete Ocelot Gaming OGEC01 con Ventana RGB, Tower, ATX/Micro ATX/Mini-ITX, USB 2.0/3.0, sin Fuente, Negro - No Incluye Ventiladores",
    marca: "Ocelot",
    precio: {
      Dolares: "32.94",
      PesosMX: "649.00",
      PesosArg: "3961.26",
    },
    caracteristicas: {
      "Tarjetas madre soportada": "ATX,Micro ATX,Mini-ITX",
      "Cantidad de puertos USB 3.0": "2",
      "Disco duro soportado": "2.5",
      "Ventiladores frontales instalados": "3x 120 mm",
      "Color del producto": "Negro",
    },
    funciones: "Gabinetes",
    stock: 0,
    categoria: [{ nombre: "Gabinetes", id: 5 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGEC01-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGEC01-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGEC01-3.jpg",
  },
  {
    id: 111,
    nombre:
      "Gabinete Yeyian Vortex 1200 con Ventana Lateral Acrilico y Cristal Templado Frontal, Midi-Tower, ATX, USB 2.0/3.1, sin Fuente, Negro",
    marca: "Corsair",
    precio: {
      Dolares: "38.52",
      PesosMX: "759",
      PesosArg: "4632.66",
    },
    caracteristicas: {
      "Tarjetas madre soportada": "ATX,Micro ATX,Mini-ITX",
      "Cantidad de puertos USB 3.0": "2",
      "Disco duro soportado": "2.5",
      "Ventiladores frontales instalados": "3x 120 mm",
      "Color del producto": "Negro",
    },
    funciones: "Gabinetes",
    stock: 0,
    categoria: [{ nombre: "Gabinetes", id: 5 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YGV-68811-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YGV-68811-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YGV-68811-3.jpg",
  },
  {
    id: 110,
    nombre:
      "Gabinete Yeyian Vortex 1200 con Ventana Lateral Acrilico y Cristal Templado Frontal, Midi-Tower, ATX, USB 2.0/3.1, sin Fuente, Negro",
    marca: "Yeyian",
    precio: {
      Dolares: "38.52",
      PesosMX: "759",
      PesosArg: "4632.66",
    },
    caracteristicas: {
      "Tarjetas madre soportada": "ATX,Micro ATX,Mini-ITX",
      "Cantidad de puertos USB 3.0": "2",
      "Disco duro soportado": "2.5",
      "Ventiladores frontales instalados": "3x 120 mm",
      "Color del producto": "Negro",
    },
    funciones: "Gabinetes",
    stock: 0,
    categoria: [{ nombre: "Gabinetes", id: 5 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YGV-68811-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YGV-68811-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YGV-68811-3.jpg",
  },
  {
    id: 112,
    nombre:
      "Gabinete Yeyian Vortex 1200 con Ventana Lateral Acrilico y Cristal Templado Frontal, Midi-Tower, ATX, USB 2.0/3.1, sin Fuente, Negro",
    marca: "Yeyian",
    precio: {
      Dolares: "38.52",
      PesosMX: "759",
      PesosArg: "4632.66",
    },
    caracteristicas: {
      "Tarjetas madre soportada": "ATX,Micro ATX,Mini-ITX",
      "Cantidad de puertos USB 3.0": "2",
      "Disco duro soportado": "2.5",
      "Ventiladores frontales instalados": "3x 120 mm",
      "Color del producto": "Negro",
    },
    funciones: "Gabinetes",
    stock: 0,
    categoria: [{ nombre: "Gabinetes", id: 5 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YGV-68811-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YGV-68811-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YGV-68811-3.jpg",
  },
  {
    id: 113,
    nombre:
      "Gabinete ASUS TUF Gaming GT301 con Ventana, Midi-Tower, ATX/Micro-ATX/Mini-ATX, USB 3.2, sin Fuente, Negro",
    marca: "ASUSn",
    precio: {
      Dolares: "130.37",
      PesosMX: "2,569.00",
      PesosArg: "15680.24",
    },
    caracteristicas: {
      "Tarjetas madre soportada": "ATX,Micro ATX,Mini-ITX",
      "Cantidad de puertos USB 3.0": "2",
      "Disco duro soportado": "2.5",
      "Ventiladores frontales instalados": "3x 120 mm",
      "Color del producto": "Negro",
    },
    funciones: "Gabinetes",
    stock: 0,
    categoria: [{ nombre: "Gabinetes", id: 5 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90DC0040-B49000-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90DC0040-B49000-1.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90DC0040-B49000-1.jpg",
  },
  {
    id: 114,
    nombre:
      "Gabinete Balam Rush DragonFly con Ventana, Midi-Tower, ATX/Micro ATX/Mini-ATX, USB 3.0, sin Fuente, Negro",
    marca: "Balam Rush",
    precio: {
      Dolares: "44.10",
      PesosMX: "2,569.00",
      PesosArg: "15304.06",
    },
    caracteristicas: {
      "Tarjetas madre soportada": "ATX,Micro ATX,Mini-ITX",
      "Cantidad de puertos USB 3.0": "2",
      "Disco duro soportado": "2.5",
      "Ventiladores frontales instalados": "3x 120 mm",
      "Color del producto": "Negro",
    },
    funciones: "Gabinetes",
    stock: 0,
    categoria: [{ nombre: "Gabinetes", id: 5 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-929561-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-929561-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-929561-3.jpg",
  },
  {
    id: 115,
    nombre:
      "Gabinete DeepCool MATREXX 50 ADD-RGB 4F con Ventana, Midi-Tower/ATX/EATX/Micro ATX/Mini-ITX, USB 2.0/3.0, sin Fuente, Negro",
    marca: "DeepCool",
    precio: {
      Dolares: "80.13",
      PesosMX: "1,579.00",
      PesosArg: "9637.64",
    },
    caracteristicas: {
      "Tarjetas madre soportada": "ATX,Micro ATX,Mini-ITX",
      "Cantidad de puertos USB 3.0": "2",
      "Disco duro soportado": "2.5",
      "Ventiladores frontales instalados": "3x 120 mm",
      "Color del producto": "Negro",
    },
    funciones: "Gabinetes",
    stock: 0,
    categoria: [{ nombre: "Gabinetes", id: 5 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-DEEPCOOL-DP-ATX-MATREXX50-AR-4F-NE-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-DEEPCOOL-DP-ATX-MATREXX50-AR-4F-NE-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-DEEPCOOL-DP-ATX-MATREXX50-AR-4F-NE-3.jpg",
  },
  {
    id: 116,
    nombre:
      "Gabinete Yeyian Haizen 2500 con Ventana, Midi-Tower, Micro ATX/Mini-ATX, USB 3.0, sin Fuente, Blanco",
    marca: "DeepCool",
    precio: {
      Dolares: "50",
      PesosMX: "1000",
      PesosArg: "6103.63",
    },
    caracteristicas: {
      "Tarjetas madre soportada": "ATX,Micro ATX,Mini-ITX",
      "Cantidad de puertos USB 3.0": "2",
      "Disco duro soportado": "2.5",
      "Ventiladores frontales instalados": "3x 120 mm",
      "Color del producto": "Blamco",
    },
    funciones: "Gabinetes",
    stock: 0,
    categoria: [{ nombre: "Gabinetes", id: 5 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YCH-042820-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YCH-042820-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YCH-042820-3.jpg",
  },
  {
    id: 117,
    nombre:
      "Gabinete Yeyian Haizen 2500 con Ventana, Midi-Tower, Micro ATX/Mini-ATX, USB 3.0, sin Fuente, Blanco",
    marca: "Yeyian",
    precio: {
      Dolares: "50",
      PesosMX: "1000",
      PesosArg: "6103.63",
    },
    caracteristicas: {
      "Tarjetas madre soportada": "ATX,Micro ATX,Mini-ITX",
      "Cantidad de puertos USB 3.0": "2",
      "Disco duro soportado": "2.5",
      "Ventiladores frontales instalados": "3x 120 mm",
      "Color del producto": "Blamco",
    },
    funciones: "Gabinetes",
    stock: 0,
    categoria: [{ nombre: "Gabinetes", id: 5 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YCH-042820-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YCH-042820-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YCH-042820-3.jpg",
  },
  {
    id: 118,
    nombre:
      "Gabinete XPG Starker con Ventana ARGB, Midi-Tower, ATX/Micro ATX/Mini-ATX, USB 3.0, incluye Fuente de 600W, Negro",
    marca: "XPG",
    precio: {
      Dolares: "195.33",
      PesosMX: "3849",
      PesosArg: "23492.89",
    },
    caracteristicas: {
      "Tarjetas madre soportada": "ATX,Micro ATX,Mini-ITX",
      "Cantidad de puertos USB 3.0": "2",
      "Disco duro soportado": "2.5",
      "Ventiladores frontales instalados": "3x 120 mm",
      "Color del producto": "Blamco",
    },
    funciones: "Gabinetes",
    stock: 0,
    categoria: [{ nombre: "Gabinetes", id: 5 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-STARKERCP-BKCUS-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-STARKERCP-BKCUS-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-STARKERCP-BKCUS-3.jpg",
  },
  {
    id: 119,
    nombre: "Disipador para CPU Corsair A500 Dual Fan, 120mm, 2400RPM",
    marca: "Corsair",
    precio: {
      Dolares: "84.70",
      PesosMX: "1,669.00",
      PesosArg: "10186.97",
    },
    caracteristicas: {
      "Número de ventiladores": "2 Ventilador(es)",
    },
    funciones: "Disipadores-para-CPU",
    stock: 0,
    categoria: [{ nombre: "Disipadores-para-CPU", id: 6 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-CORSAIR-CT-9010003-WW-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-CORSAIR-CT-9010003-WW-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-CORSAIR-CT-9010003-WW-3.jpg",
  },
  {
    id: 120,
    nombre: "Disipador CPU AeroCool Cylon 4F RGB, 120mm, 800 - 1800RPM, Negro",
    marca: "AeroCool",
    precio: {
      Dolares: "40.55",
      PesosMX: "799.00",
      PesosArg: "4876.80",
    },
    caracteristicas: {
      "Número de ventiladores": "1 Ventilador(es)",
    },
    funciones: "Disipadores-para-CPU",
    stock: 0,
    categoria: [{ nombre: "Disipadores-para-CPU", id: 6 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-AEROCOOL-CYLON4F-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-AEROCOOL-CYLON4F-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-AEROCOOL-CYLON4F-3.jpg",
  },
  {
    id: 121,
    nombre: "Disipador CPU Balam Rush Eolox ASX10 RGB, 120mm, 800 - 1800RPM",
    marca: "Balam Rush",
    precio: {
      Dolares: "24.92",
      PesosMX: "491.00",
      PesosArg: "2996.88",
    },
    caracteristicas: {
      "Número de ventiladores": "1 Ventilador(es)",
    },
    funciones: "Disipadores-para-CPU",
    stock: 0,
    categoria: [{ nombre: "Disipadores-para-CPU", id: 6 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-931311-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-931311-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-931311-1.jpg",
  },
  {
    id: 122,
    nombre: "Disipador CPU Thermaltake UX200 ARGB, 120mm, 300 - 1500RPM, Negro",
    marca: "Balam Rush",
    precio: {
      Dolares: "32.43",
      PesosMX: "639.00",
      PesosArg: "3900.22",
    },
    caracteristicas: {
      "Número de ventiladores": "1 Ventilador(es)",
    },
    funciones: "Disipadores-para-CPU",
    stock: 0,
    categoria: [{ nombre: "Disipadores-para-CPU", id: 6 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-THERMALTAKE-CL-P065-AL12SW-A-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-THERMALTAKE-CL-P065-AL12SW-A-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-THERMALTAKE-CL-P065-AL12SW-A-3.jpg",
  },
  {
    id: 123,
    nombre: "Disipador CPU Cooler Master Hyper T20, 955mm, 2000RPM, Negro",
    marca: "Cooler",
    precio: {
      Dolares: "32.43",
      PesosMX: "639.00",
      PesosArg: "3900.22",
    },
    caracteristicas: {
      "Número de ventiladores": "1 Ventilador(es)",
    },
    funciones: "Disipadores-para-CPU",
    stock: 0,
    categoria: [{ nombre: "Disipadores-para-CPU", id: 6 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-COOLERMASTER-RR-T20-20FK-R1-a0afed.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-COOLERMASTER-RR-T20-20FK-R1-bd2a52.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-THERMALTAKE-CL-P065-AL12SW-A-3.jpg",
  },
  {
    id: 124,
    nombre: "Disipador CPU Yeyian Storm 1200 RGB, 120mm, 1000 - 1800RPM, Negro",
    marca: "Yeyian",
    precio: {
      Dolares: "26.85",
      PesosMX: "529.00",
      PesosArg: "3228.82",
    },
    caracteristicas: {
      "Número de ventiladores": "1 Ventilador(es)",
    },
    funciones: "Disipadores-para-CPU",
    stock: 0,
    categoria: [{ nombre: "Disipadores-para-CPU", id: 6 }],
    imagen0: "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-AC1200-1.jpg",
    imagen1: "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-AC1200-1.jpg",
    imagen2: "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-AC1200-1.jpg",
  },
  {
    id: 125,
    nombre: "Disipador CPU Aerocool Cylon 3, 120mm, 600 - 1800RPM, Negro",
    marca: "Aerocool",
    precio: {
      Dolares: "26.85",
      PesosMX: "529.00",
      PesosArg: "3228.82",
    },
    caracteristicas: {
      "Número de ventiladores": "1 Ventilador(es)",
    },
    funciones: "Disipadores-para-CPU",
    stock: 0,
    categoria: [{ nombre: "Disipadores-para-CPU", id: 6 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-AEROCOOL-CYLON3-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-AEROCOOL-CYLON3-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-AEROCOOL-CYLON3-3.jpg",
  },
  {
    id: 126,
    nombre:
      "Disipador CPU Cooler Master Hyper 212 ARGB, 120mm, 650-1800RPM, Negro",
    marca: "Cooler",
    precio: {
      Dolares: "34.46",
      PesosMX: "529.00",
      PesosArg: "4144.37",
    },
    caracteristicas: {
      "Número de ventiladores": "1 Ventilador(es)",
    },
    funciones: "Disipadores-para-CPU",
    stock: 0,
    categoria: [{ nombre: "Disipadores-para-CPU", id: 6 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-COOLERMASTER-RR-2V2L-18PA-R1-2cfed4.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-COOLERMASTER-RR-2V2L-18PA-R1-16703f.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-COOLERMASTER-RR-2V2L-18PA-R1-64ff5e.jpg",
  },
  {
    id: 127,
    nombre:
      "Disipador CPU Gigabyte AORUS ATC800 RGB, 120mm, 600RPM - 2000RPM, Negro",
    marca: "Gigabyte",
    precio: {
      Dolares: "110.07",
      PesosMX: "2169.00",
      PesosArg: "13238.78",
    },
    caracteristicas: {
      "Número de ventiladores": "2 Ventilador(es)",
    },
    funciones: "Disipadores-para-CPU",
    stock: 0,
    categoria: [{ nombre: "Disipadores-para-CPU", id: 6 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-GP-ATC800-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-GP-ATC800-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-GP-ATC800-3.jpg",
  },
  {
    id: 128,
    nombre: "Disipador CPU Vetroo Darkstorm RGB, 120mm, 1600RPM, Negro",
    marca: "Vetroo",
    precio: {
      Dolares: "13.50",
      PesosMX: "266.00",
      PesosArg: "1623.57",
    },
    caracteristicas: {
      "Número de ventiladores": "2 Ventilador(es)",
    },
    funciones: "Disipadores-para-CPU",
    stock: 0,
    categoria: [{ nombre: "Disipadores-para-CPU", id: 6 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-VETROO-VT-CPU-RGB-M2-2780e7.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-VETROO-VT-CPU-RGB-M2-cb544d.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-VETROO-VT-CPU-RGB-M2-cb544d.jpg",
  },
  {
    id: 129,
    nombre:
      "Disipador CPU Cooler Master MasterAir G200P, 92mm, 800RPM - 2600RPM, Negro/Plata",
    marca: "Vetroo",
    precio: {
      Dolares: "33.44",
      PesosMX: "659.0",
      PesosArg: "4022.30",
    },
    caracteristicas: {
      "Número de ventiladores": "1 Ventilador(es)",
    },
    funciones: "Disipadores-para-CPU",
    stock: 0,
    categoria: [{ nombre: "Disipadores-para-CPU", id: 6 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-COOLERMASTER-MAP-G2PN-126PC-R1-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-COOLERMASTER-MAP-G2PN-126PC-R1-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-COOLERMASTER-MAP-G2PN-126PC-R1-3.jpg",
  },
  {
    id: 130,
    nombre:
      "Kit de Ventilador In Win SIRIUS LOOP ASL120 RGB, 120mm, 500 - 1800RPM, Negro, 3 Piezas",
    marca: "Vetroo",
    precio: {
      Dolares: "33.44",
      PesosMX: "659.0",
      PesosArg: "4022.30",
    },
    caracteristicas: {
      "Nivel de ruido": "27 dB",
      "Diámetro de ventilador": "12 cm",
      "Iluminación de color": "Rojo/Verde/Azul",
    },
    funciones: "Ventiladores",
    stock: 0,
    categoria: [{ nombre: "Ventiladores", id: 7 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-INWIN-ASL120FAN-3PK-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-INWIN-ASL120FAN-3PK-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-INWIN-ASL120FAN-3PK-3.jpg",
  },
  {
    id: 131,
    nombre:
      "Ventilador In Win Saturn ASN120 ARGB, 120mm, 500 - 1800RPM, Negro - 3 Piezas",
    marca: "In Win",
    precio: {
      Dolares: "33.44",
      PesosMX: "659.0",
      PesosArg: "4022.30",
    },
    caracteristicas: {
      "Nivel de ruido": "27 dB",
      "Diámetro de ventilador": "12 cm",
      "Iluminación de color": "Rojo/Verde/Azul",
    },
    funciones: "Ventiladores",
    stock: 0,
    categoria: [{ nombre: "Ventiladores", id: 7 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-INWIN-IW-FN-ASN120-3PK-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-INWIN-IW-FN-ASN120-3PK-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-INWIN-IW-FN-ASN120-3PK-3.jpg",
  },
  {
    id: 132,
    nombre:
      "Ventilador In Win Jupiter AJ120 RGB, 120mm, 500RPM - 1800RPM, Negro - 3 Piezas",
    marca: "In Win",
    precio: {
      Dolares: "33.44",
      PesosMX: "659.0",
      PesosArg: "4022.30",
    },
    caracteristicas: {
      "Nivel de ruido": "27 dB",
      "Diámetro de ventilador": "12 cm",
      "Iluminación de color": "Rojo/Verde/Azul",
    },
    funciones: "Ventiladores",
    stock: 0,
    categoria: [{ nombre: "Ventiladores", id: 7 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-INWIN-IW-FN-AJ120-3PK-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-INWIN-IW-FN-AJ120-3PK-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-INWIN-IW-FN-AJ120-3PK-3.jpg",
  },
  {
    id: 133,
    nombre:
      "Ventilador Game Factor FKG400 RGB, 120mm, 1500RPM, Negro - 3 Piezas",
    marca: "Game Factor",
    precio: {
      Dolares: "25.32",
      PesosMX: "499.00",
      PesosArg: "3045.71",
    },
    caracteristicas: {
      "Nivel de ruido": "27 dB",
      "Diámetro de ventilador": "12 cm",
      "Iluminación de color": "Rojo/Verde/Azul",
    },
    funciones: "Ventiladores",
    stock: 0,
    categoria: [{ nombre: "Ventiladores", id: 7 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-GAMEFACTOR-FKG400-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-GAMEFACTOR-FKG400-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-GAMEFACTOR-FKG400-3.jpg",
  },
  {
    id: 134,
    nombre:
      "Ventilador Cooler Master SickleFlow 120 ARGB Reverse, 120mm, 650 - 1800RPM, Negro",
    marca: "Game Factor",
    precio: {
      Dolares: "10.81",
      PesosMX: "499.00",
      PesosArg: "1300.07",
    },
    caracteristicas: {
      "Nivel de ruido": "27 dB",
      "Diámetro de ventilador": "12 cm",
      "Iluminación de color": "Rojo/Verde/Azul",
    },
    funciones: "Ventiladores",
    stock: 0,
    categoria: [{ nombre: "Ventiladores", id: 7 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-COOLERMASTER-MFX-B2DR-18NPA-R1-e6f89b.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-COOLERMASTER-MFX-B2DR-18NPA-R1-f195c9.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-COOLERMASTER-MFX-B2DR-18NPA-R1-587479.jpg",
  },
  {
    id: 135,
    nombre:
      "Ventilador Balam Rush EOLOX AIR 3 ARGB LED, 120mm, 1200RPM, Negro - 3 Piezas, incluye Control",
    marca: "Game Factor",
    precio: {
      Dolares: "25.83",
      PesosMX: "509.00",
      PesosArg: "3106.75",
    },
    caracteristicas: {
      "Nivel de ruido": "27 dB",
      "Diámetro de ventilador": "12 cm",
      "Iluminación de color": "Rojo/Verde/Azul",
    },
    funciones: "Ventiladores",
    stock: 0,
    categoria: [{ nombre: "Ventiladores", id: 7 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-931335-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-931335-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-931335-3.jpg",
  },
  {
    id: 235,
    nombre: "SSD Kingston NV1 NVMe, 250GB, PCI Express 3.0, M.2",
    marca: "Kingston",
    precio: {
      Dolares: "29.61",
      PesosMX: "579.00",
      PesosArg: "3573.00",
    },
    caracteristicas: {
      Capacidad: "500 GB",
      Interface: "PCI Express 3.0",
      "Velocidad de lectura": "2100 MB/s",
      "Velocidad de escritura": "1700 MB/s",
    },
    funciones: "SSD",
    stock: 0,
    categoria: [{ nombre: "SSD", id: 8 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/XS/CP-KINGSTON-SNVS250G-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XS/CP-KINGSTON-SNVS250G-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XS/CP-KINGSTON-SNVS250G-3.jpg",
  },
  {
    id: 136,
    nombre:
      "Ventilador Balam Rush EOLOX AIR 3 ARGB LED, 120mm, 1200RPM, Negro - 3 Piezas, incluye Control",
    marca: "Game Factor",
    precio: {
      Dolares: "25.83",
      PesosMX: "509.00",
      PesosArg: "3106.75",
    },
    caracteristicas: {
      "Nivel de ruido": "27 dB",
      "Diámetro de ventilador": "12 cm",
      "Iluminación de color": "Rojo/Verde/Azul",
    },
    funciones: "Ventiladores",
    stock: 0,
    categoria: [{ nombre: "Ventiladores", id: 7 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-931335-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-931335-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-931335-3.jpg",
  },
  {
    id: 137,
    nombre:
      "Ventilador Balam Rush EOLOX AIR 3 ARGB LED, 120mm, 1200RPM, Negro - 3 Piezas, incluye Control",
    marca: "Game Factor",
    precio: {
      Dolares: "25.83",
      PesosMX: "509.00",
      PesosArg: "3106.75",
    },
    caracteristicas: {
      "Nivel de ruido": "27 dB",
      "Diámetro de ventilador": "12 cm",
      "Iluminación de color": "Rojo/Verde/Azul",
    },
    funciones: "Ventiladores",
    stock: 0,
    categoria: [{ nombre: "Ventiladores", id: 7 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-931335-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-931335-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-931335-3.jpg",
  },
  {
    id: 138,
    nombre:
      "Ventilador Balam Rush EOLOX AIR 3 ARGB LED, 120mm, 1200RPM, Negro - 3 Piezas, incluye Control",
    marca: "Game Factor",
    precio: {
      Dolares: "25.83",
      PesosMX: "509.00",
      PesosArg: "3106.75",
    },
    caracteristicas: {
      "Nivel de ruido": "27 dB",
      "Diámetro de ventilador": "12 cm",
      "Iluminación de color": "Rojo/Verde/Azul",
    },
    funciones: "Ventiladores",
    stock: 0,
    categoria: [{ nombre: "Ventiladores", id: 7 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-931335-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-931335-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-BALAMRUSH-BR-931335-3.jpg",
  },
  {
    id: 139,
    nombre:
      "Ventilador Ocelot Gaming OGF01 RGB (No Controlable), 120mm, 1200RPM, Negro",
    marca: "Ocelot",
    precio: {
      Dolares: "25.83",
      PesosMX: "509.00",
      PesosArg: "3106.75",
    },
    caracteristicas: {
      "Nivel de ruido": "27 dB",
      "Diámetro de ventilador": "12 cm",
      "Iluminación de color": "Rojo/Verde/Azul",
    },
    funciones: "Ventiladores",
    stock: 0,
    categoria: [{ nombre: "Ventiladores", id: 7 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGF01-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGF01-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGF01-3.jpg",
  },
  {
    id: 140,
    nombre: "Ventilador XPG Vento 120 ARGB LED, 120mm, 1200RPM, Negro",
    marca: "XPG ",
    precio: {
      Dolares: "12.59",
      PesosMX: "509.00",
      PesosArg: "1513.70",
    },
    caracteristicas: {
      "Nivel de ruido": "27 dB",
      "Diámetro de ventilador": "12 cm",
      "Iluminación de color": "Rojo/Verde/Azul",
    },
    funciones: "Ventiladores",
    stock: 0,
    categoria: [{ nombre: "Ventiladores", id: 7 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-VENTO120ARGB-BKCWW-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-VENTO120ARGB-BKCWW-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-VENTO120ARGB-BKCWW-3.jpg",
  },
  {
    id: 141,
    nombre:
      "Ventilador Cooler Master Hyper 212 Black Edition with LGA1700, 120mm, 800-2000RPM, Negro",
    marca: "Cooler Master",
    precio: {
      Dolares: "41.56",
      PesosMX: "819.00",
      PesosArg: "4998.88",
    },
    caracteristicas: {
      "Nivel de ruido": "27 dB",
      "Diámetro de ventilador": "12 cm",
    },
    funciones: "Ventiladores",
    stock: 0,
    categoria: [{ nombre: "Ventiladores", id: 7 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-COOLERMASTER-RR-212S-20PK-R2-b6966e.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-COOLERMASTER-RR-212S-20PK-R2-e51c50.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-COOLERMASTER-RR-212S-20PK-R2-e51c50.jpg",
  },
  {
    id: 142,
    nombre:
      "Tarjeta Madre ASUS Micro ATX PRIME H410M-E, S-1200, Intel H410, HDMI, 64GB DDR4 para Intel",
    marca: "Intel",
    precio: {
      Dolares: "41.56",
      PesosMX: "819.00",
      PesosArg: "4998.88",
    },
    caracteristicas: {
      "Familia de procesador": "Intel",
      "Circuito integrado de tarjeta madre": "Intel H410",
      "Socket de procesador": "LGA 1200",
      "Circuito integrado": "Intel H410",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90MB13H0-M0AAY0-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90MB13H0-M0AAY0-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90MB13H0-M0AAY0-3.jpg",
  },
  {
    id: 143,
    nombre:
      "Tarjeta Madre Gigabyte Micro ATX H410M H (REV. 1.0), S-1200, Intel H410 Express, HDMI, 64GB DDR4 para Inte",
    marca: "Intel",
    precio: {
      Dolares: "81.65",
      PesosMX: "1609.00",
      PesosArg: "9820.75",
    },
    caracteristicas: {
      "Familia de procesador": "Intel",
      "Circuito integrado de tarjeta madre": "Intel H410",
      "Socket de procesador": "LGA 1200",
      "Circuito integrado": "Intel H410",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-H410MH(REV10)-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-H410MH(REV10)-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-H410MH(REV10)-3.jpg",
  },
  {
    id: 144,
    nombre:
      "Tarjeta Madre ASUS Micro ATX PRIME H410M-A/CSM, S-1200, Intel H410, HDMI, 64GB DDR4 para Inte",
    marca: "Intel",
    precio: {
      Dolares: "89.27",
      PesosMX: "1,759.00",
      PesosArg: "10736.29",
    },
    caracteristicas: {
      "Familia de procesador": "Intel",
      "Circuito integrado de tarjeta madre": "Intel H410",
      "Socket de procesador": "LGA 1200",
      "Circuito integrado": "Intel H410",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-PRIMEH410M-ACSM-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-PRIMEH410M-ACSM-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-PRIMEH410M-ACSM-3.jpg",
  },
  {
    id: 145,
    nombre:
      "Tarjeta Madre Biostar Micro ATX H310MHP, S-1151, Intel H310, HDMI, 32GB DDR4 para Intel",
    marca: "Intel",
    precio: {
      Dolares: "53.74",
      PesosMX: "1,059.00",
      PesosArg: "6463.75",
    },
    caracteristicas: {
      "Familia de procesador": "Intel",
      "Circuito integrado de tarjeta madre": "Intel H410",
      "Socket de procesador": "LGA 1200",
      "Circuito integrado": "Intel H410",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-BIOSTAR-H310MHP-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-BIOSTAR-H310MHP-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-BIOSTAR-H310MHP-3.jpg",
  },
  {
    id: 146,
    nombre:
      "Tarjeta Madre AORUS ATX Extendida Z490 XTREME, S-1200, Intel Z490, HDMI, 128GB DDR4 para Intel",
    marca: "Intel",
    precio: {
      Dolares: "300.38",
      PesosMX: "5,919.00",
      PesosArg: "36127.41",
    },
    caracteristicas: {
      "Familia de procesador": "Intel",
      "Circuito integrado de tarjeta madre": "Intel H410",
      "Socket de procesador": "LGA 1200",
      "Circuito integrado": "Intel H410",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-Z490AORUSXTREME-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-Z490AORUSXTREME-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-Z490AORUSXTREME-3.jpg",
  },
  {
    id: 147,
    nombre:
      "arjeta Madre AORUS XL-ATX X299X Xtreme Waterforce, S-2066, Intel X299 Express, max. 256GB DDR4 para Intel",
    marca: "Intel",
    precio: {
      Dolares: "1792.89",
      PesosMX: "35329.00",
      PesosArg: "215635.32",
    },
    caracteristicas: {
      "Familia de procesador": "Intel",
      "Circuito integrado de tarjeta madre": "Intel H410",
      "Socket de procesador": "LGA 1200",
      "Circuito integrado": "Intel H410",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-X299XAORUSXTREMEWATERFORCE-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-X299XAORUSXTREMEWATERFORCE-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-X299XAORUSXTREMEWATERFORCE-3.jpg",
  },
  {
    id: 148,
    nombre:
      "Tarjeta Madre ASUS micro ATX Prime B365M-A, S-1151, Intel B365, HDMI, 64GB DDR4 para Intel",
    marca: "Intel",
    precio: {
      Dolares: "88.76",
      PesosMX: "1,749.00",
      PesosArg: "10675.26",
    },
    caracteristicas: {
      "Familia de procesador": "Intel",
      "Circuito integrado de tarjeta madre": "Intel H410",
      "Socket de procesador": "LGA 1200",
      "Circuito integrado": "Intel H410",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90MB10N0-M0AAY0-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90MB10N0-M0AAY0-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90MB10N0-M0AAY0-3.jpg",
  },
  {
    id: 149,
    nombre:
      "Tarjeta Madre MSI Micro-ATX B365M PRO-VDH, S-1151, Intel B365, HDMI, 64GB DDR4 para Intel",
    marca: "Intel",
    precio: {
      Dolares: "88.76",
      PesosMX: "1,749.00",
      PesosArg: "10675.26",
    },
    caracteristicas: {
      "Familia de procesador": "Intel",
      "Circuito integrado de tarjeta madre": "Intel H410",
      "Socket de procesador": "LGA 1200",
      "Circuito integrado": "Intel H410",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0: "https://www.cyberpuerta.mx/img/product/M/CP-MSI-7C39-001R-1.png",
    imagen1: "https://www.cyberpuerta.mx/img/product/M/CP-MSI-7C39-001R-2.png",
    imagen2: "https://www.cyberpuerta.mx/img/product/M/CP-MSI-7C39-001R-3.png",
  },
  {
    id: 150,
    nombre:
      "Tarjeta Madre MSI Micro-ATX B365M PRO-VDH, S-1151, Intel B365, HDMI, 64GB DDR4 para Intel",
    marca: "Intel",
    precio: {
      Dolares: "88.76",
      PesosMX: "1,749.00",
      PesosArg: "10675.26",
    },
    caracteristicas: {
      "Familia de procesador": "Intel",
      "Circuito integrado de tarjeta madre": "Intel H410",
      "Socket de procesador": "LGA 1200",
      "Circuito integrado": "Intel H410",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0: "https://www.cyberpuerta.mx/img/product/M/CP-MSI-7C39-001R-1.png",
    imagen1: "https://www.cyberpuerta.mx/img/product/M/CP-MSI-7C39-001R-2.png",
    imagen2: "https://www.cyberpuerta.mx/img/product/M/CP-MSI-7C39-001R-3.png",
  },
  {
    id: 151,
    nombre:
      "Tarjeta Madre MSI Micro-ATX B365M PRO-VDH, S-1151, Intel B365, HDMI, 64GB DDR4 para Intel",
    marca: "Intel",
    precio: {
      Dolares: "88.76",
      PesosMX: "1,749.00",
      PesosArg: "10675.26",
    },
    caracteristicas: {
      "Familia de procesador": "Intel",
      "Circuito integrado de tarjeta madre": "Intel H410",
      "Socket de procesador": "LGA 1200",
      "Circuito integrado": "Intel H410",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0: "https://www.cyberpuerta.mx/img/product/M/CP-MSI-7C39-001R-1.png",
    imagen1: "https://www.cyberpuerta.mx/img/product/M/CP-MSI-7C39-001R-2.png",
    imagen2: "https://www.cyberpuerta.mx/img/product/M/CP-MSI-7C39-001R-3.png",
  },
  {
    id: 152,
    nombre:
      "Tarjeta Madre AORUS micro ATX B450 AORUS M (rev. 1.0), S-AM4, AMD B450, HDMI, 64GB DDR4 para AMD ",
    marca: "AMD",
    precio: {
      Dolares: "106.52",
      PesosMX: "2099.00",
      PesosArg: "12811.53",
    },
    caracteristicas: {
      "Familia de procesador": "AMD",
      "Circuito integrado de tarjeta madre": "AMD B450",
      "Socket de procesador": "Socket AM4",
      "Circuito integrado": "AMD B450",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-B450AORUSM-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-B450AORUSM-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-B450AORUSM-3.jpg",
  },
  {
    id: 153,
    nombre:
      "Tarjeta Madre AORUS ATX B550 Elite V2, S-AM4, AMD B550, HDMI, 128GB DDR4 para AMD",
    marca: "AMD",
    precio: {
      Dolares: "156.52",
      PesosMX: "3099.00",
      PesosArg: "22811.53",
    },
    caracteristicas: {
      "Familia de procesador": "AMD",
      "Circuito integrado de tarjeta madre": "AMD B550",
      "Socket de procesador": "Socket AM4",
      "Circuito integrado": "AMD B550",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-B450AORUSM-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-B450AORUSM-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-B450AORUSM-3.jpg",
  },
  {
    id: 154,
    nombre:
      "Tarjeta Madre ASUS Micro ATX TUF Gaming B450M-Plus II, S-AM4, AMD B450, HDMI, 128GB DDR4 para AMD",
    marca: "AMD",
    precio: {
      Dolares: "156.52",
      PesosMX: "3099.00",
      PesosArg: "22811.53",
    },
    caracteristicas: {
      "Familia de procesador": "AMD",
      "Circuito integrado de tarjeta madre": "AMD B550",
      "Socket de procesador": "Socket AM4",
      "Circuito integrado": "AMD B550",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90MB1620-M0EAY0-d97bb2.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90MB1620-M0EAY0-d97bb2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90MB1620-M0EAY0-d97bb2.jpg",
  },
  {
    id: 155,
    nombre:
      "Tarjeta Madre Gigabyte micro ATX A520M S2H, S-AM4, AMD A520, HDMI, 64GB DDR4 para AMD",
    marca: "AMD",
    precio: {
      Dolares: "74.04",
      PesosMX: "1459.00",
      PesosArg: "8905.20",
    },
    caracteristicas: {
      "Familia de procesador": "AMD",
      "Circuito integrado de tarjeta madre": "AMD B550",
      "Socket de procesador": "Socket AM4",
      "Circuito integrado": "AMD B550",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-A520MS2H-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-A520MS2H-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-A520MS2H-3.jpg",
  },
  {
    id: 156,
    nombre:
      "Tarjeta Madre AORUS B450 AORUS PRO WIFI (rev. 1.0), S-AM4, AMD B450, HDMI, 64GB DDR4 para AMD ",
    marca: "AMD",
    precio: {
      Dolares: "74.04",
      PesosMX: "1459.00",
      PesosArg: "8905.20",
    },
    caracteristicas: {
      "Familia de procesador": "AMD",
      "Circuito integrado de tarjeta madre": "AMD B550",
      "Socket de procesador": "Socket AM4",
      "Circuito integrado": "AMD B550",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-B450AORUSPROWIFI-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-B450AORUSPROWIFI-3.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-AORUS-B450AORUSPROWIFI-2.jpg",
  },
  {
    id: 157,
    nombre:
      "Tarjeta Madre MSI ATX MAG B550 TOMAHAWK, S-AM4, AMD B550, HDMI, 128GB DDR4 para AMD",
    marca: "AMD",
    precio: {
      Dolares: "174.04",
      PesosMX: "13459.00",
      PesosArg: "28905.20",
    },
    caracteristicas: {
      "Familia de procesador": "AMD",
      "Circuito integrado de tarjeta madre": "AMD B550",
      "Socket de procesador": "Socket AM4",
      "Circuito integrado": "AMD B550",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-MAGB550TOMAHAWK-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-MAGB550TOMAHAWK-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-MAGB550TOMAHAWK-3.jpg",
  },
  {
    id: 158,
    nombre:
      "Tarjeta Madre MSI ATX MAG B550 TOMAHAWK, S-AM4, AMD B550, HDMI, 128GB DDR4 para AMD",
    marca: "AMD",
    precio: {
      Dolares: "174.04",
      PesosMX: "13459.00",
      PesosArg: "28905.20",
    },
    caracteristicas: {
      "Familia de procesador": "AMD",
      "Circuito integrado de tarjeta madre": "AMD B550",
      "Socket de procesador": "Socket AM4",
      "Circuito integrado": "AMD B550",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-MAGB550TOMAHAWK-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-MAGB550TOMAHAWK-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-MAGB550TOMAHAWK-3.jpg",
  },
  {
    id: 159,
    nombre:
      "Tarjeta Madre MSI ATX MAG B550 TOMAHAWK, S-AM4, AMD B550, HDMI, 128GB DDR4 para AMD",
    marca: "AMD",
    precio: {
      Dolares: "174.04",
      PesosMX: "13459.00",
      PesosArg: "28905.20",
    },
    caracteristicas: {
      "Familia de procesador": "AMD",
      "Circuito integrado de tarjeta madre": "AMD B550",
      "Socket de procesador": "Socket AM4",
      "Circuito integrado": "AMD B550",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-MAGB550TOMAHAWK-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-MAGB550TOMAHAWK-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-MAGB550TOMAHAWK-3.jpg",
  },
  {
    id: 160,
    nombre:
      "Tarjeta Madre MSI ATX MAG B550 TOMAHAWK, S-AM4, AMD B550, HDMI, 128GB DDR4 para AMD",
    marca: "AMD",
    precio: {
      Dolares: "174.04",
      PesosMX: "13459.00",
      PesosArg: "28905.20",
    },
    caracteristicas: {
      "Familia de procesador": "AMD",
      "Circuito integrado de tarjeta madre": "AMD B550",
      "Socket de procesador": "Socket AM4",
      "Circuito integrado": "AMD B550",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-MAGB550TOMAHAWK-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-MAGB550TOMAHAWK-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-MAGB550TOMAHAWK-3.jpg",
  },
  {
    id: 161,
    nombre:
      "Tarjeta Madre Gigabyte ATX B450 GAMING X, S-AM4, AMD B450, HDMI, 64GB DDR4 para AM",
    marca: "AMD",
    precio: {
      Dolares: "102.46",
      PesosMX: "2,019.00",
      PesosArg: "12323.24",
    },
    caracteristicas: {
      "Familia de procesador": "AMD",
      "Circuito integrado de tarjeta madre": "AMD B550",
      "Socket de procesador": "Socket AM4",
      "Circuito integrado": "AMD B550",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-B450GAMINGX-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-B450GAMINGX-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-B450GAMINGX-3.jpg",
  },
  {
    id: 162,
    nombre:
      "Tarjeta Madre ASUS ATX ROG STRIX B550-F GAMING, S-AM4, AMD B550, HDMI, 128GB DDR4 para AMD",
    marca: "AMD",
    precio: {
      Dolares: "210.55",
      PesosMX: "4,149.0",
      PesosArg: "25323.98",
    },
    caracteristicas: {
      "Familia de procesador": "AMD",
      "Circuito integrado de tarjeta madre": "AMD B550",
      "Socket de procesador": "Socket AM4",
      "Circuito integrado": "AMD B550",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90MB14S0-M0AAY0-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90MB14S0-M0AAY0-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90MB14S0-M0AAY0-3.jpg",
  },
  {
    id: 163,
    nombre:
      "Tarjeta Madre Gigabyte ATX B550 Gaming X, S-AM4, AMD B550, HDMI, 128GB DDR4 para AMD",
    marca: "AMD",
    precio: {
      Dolares: "210.55",
      PesosMX: "4,149.0",
      PesosArg: "25323.98",
    },
    caracteristicas: {
      "Familia de procesador": "AMD",
      "Circuito integrado de tarjeta madre": "AMD B550",
      "Socket de procesador": "Socket AM4",
      "Circuito integrado": "AMD B550",
      " Memoria interna, máxima": "64 GB",
      " Tipo de memoria": "DDR4-SDRAM",
    },
    funciones: "Tarjetas-Madre",
    stock: 0,
    categoria: [{ nombre: "Tarjetas-Madre", id: 9 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-B550GAMINGX-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-B550GAMINGX-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-B550GAMINGX-3.jpg",
  },
  {
    id: 164,
    nombre:
      "Computadora Gamer Xtreme PC Gaming CM-91051, AMD Ryzen 5 PRO 4650G 3.70GHz, 8GB, 1TB, Wi-Fi, Windows 10 Prueba, Negro",
    marca: "AMD",
    precio: {
      Dolares: "432.32",
      PesosMX: "8519.00",
      PesosArg: "51996.87",
    },
    caracteristicas: {
      "Familia de procesador": "AMD Ryzen 5 PRO",
      "Frecuencia del procesador": "3.70 GHz",
      "Memoria interna": "8 GB",
      "Capacidad total de almacenaje": "1000 GB",
      "Sistema operativo instalado": "Windows 10 Prueba",
    },
    funciones: "PC-s-Gamer",
    stock: 0,
    categoria: [{ nombre: "PC-s-Gamer", id: 10 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTPCR58GBRENOIRB-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTPCR58GBRENOIRB-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTPCR58GBRENOIRB-3.jpg",
  },
  {
    id: 165,
    nombre:
      "Computadora Gamer Xtreme PC Gaming CM-05030, AMD E1-6010 1.35GHz, 8GB, 240GB SSD, Wi-Fi, Windows 10 Prueba",
    marca: "AMD",
    precio: {
      Dolares: "432.32",
      PesosMX: "8519.00",
      PesosArg: "51996.87",
    },
    caracteristicas: {
      "Familia de procesador": "AMD Ryzen 5 PRO",
      "Frecuencia del procesador": "3.70 GHz",
      "Memoria interna": "8 GB",
      "Capacidad total de almacenaje": "1000 GB",
      "Sistema operativo instalado": "Windows 10 Prueba",
    },
    funciones: "PC-s-Gamer",
    stock: 0,
    categoria: [{ nombre: "PC-s-Gamer", id: 10 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTACE18GBRADEONR2-1c8407.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-XTREMEPCGAMING-XTACE18GBRADEONR2-4b14c5.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-XTREMEPCGAMING-XTACE18GBRADEONR2-fd6ee6.jpg",
  },
  {
    id: 166,
    nombre:
      "Computadora Gamer Xtreme PC Gamer CM-30032, Intel Core i7-10700F 2.90GHz, 16GB, 3TB + 500GB SSD, NVIDIA GeForce RTX 3060, Windows 10 Prueba",
    marca: "Intel",
    precio: {
      Dolares: "1346.81",
      PesosMX: "26,539.00",
      PesosArg: "161984.36",
    },
    caracteristicas: {
      "Familia de procesador": "AMD Ryzen 5 PRO",
      "Frecuencia del procesador": "3.70 GHz",
      "Memoria interna": "8 GB",
      "Capacidad total de almacenaje": "1000 GB",
      "Sistema operativo instalado": "Windows 10 Prueba",
    },
    funciones: "PC-s-Gamer",
    stock: 0,
    categoria: [{ nombre: "PC-s-Gamer", id: 10 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTAEI716GB3060W-1cb80d.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-XTREMEPCGAMING-XTAEI716GB3060W-feeaf4.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-XTREMEPCGAMING-XTAEI716GB3060W-e2d7b0.jpg",
  },
  {
    id: 167,
    nombre:
      "Computadora Gamer Xtreme PC Gaming CM-053602, AMD Ryzen 5 5600G 3.90GHz, 16GB, 2TB + 120GB SSD, Wi-Fi, Windows 10 Prueba, Blanco",
    marca: "Intel",
    precio: {
      Dolares: "500",
      PesosMX: "10000",
      PesosArg: "61036.35",
    },
    caracteristicas: {
      "Familia de procesador": "AMD Ryzen 5 PRO",
      "Frecuencia del procesador": "3.70 GHz",
      "Memoria interna": "8 GB",
      "Capacidad total de almacenaje": "1000 GB",
      "Sistema operativo instalado": "Windows 10 Prueba",
    },
    funciones: "PC-s-Gamer",
    stock: 0,
    categoria: [{ nombre: "PC-s-Gamer", id: 10 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTBRR516GBRENOIRW-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTBRR516GBRENOIRW-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTBRR516GBRENOIRW-3.jpg",
  },
  {
    id: 168,
    nombre:
      "Computadora Gamer Xtreme PC Gaming CM-20601, AMD Ryzen 3 Pro 4350G 3.80GHz, 8GB, 240GB SSD, WiFi, Windows 10 Prueba, Blanco",
    marca: "AMD",
    precio: {
      Dolares: "500",
      PesosMX: "10000",
      PesosArg: "61036.35",
    },
    caracteristicas: {
      "Familia de procesador": "AMD Ryzen 5 PRO",
      "Frecuencia del procesador": "3.70 GHz",
      "Memoria interna": "8 GB",
      "Capacidad total de almacenaje": "1000 GB",
      "Sistema operativo instalado": "Windows 10 Prueba",
    },
    funciones: "PC-s-Gamer",
    stock: 0,
    categoria: [{ nombre: "PC-s-Gamer", id: 10 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTRMR38GBRENOIRW-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTRMR38GBRENOIRW-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTRMR38GBRENOIRW-3.jpg",
  },
  {
    id: 169,
    nombre:
      "Computadora Gamer Xtreme PC Gaming CM-05033, AMD A4-3350B 2GHz, 8GB, 1TB, Wi-Fi, Windows 10 Prueba",
    marca: "AMD",
    precio: {
      Dolares: "500",
      PesosMX: "10000",
      PesosArg: "61036.35",
    },
    caracteristicas: {
      "Familia de procesador": "AMD Ryzen 5 PRO",
      "Frecuencia del procesador": "3.70 GHz",
      "Memoria interna": "8 GB",
      "Capacidad total de almacenaje": "1000 GB",
      "Sistema operativo instalado": "Windows 10 Prueba",
    },
    funciones: "PC-s-Gamer",
    stock: 0,
    categoria: [{ nombre: "PC-s-Gamer", id: 10 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTRMR38GBRENOIRW-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTRMR38GBRENOIRW-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTRMR38GBRENOIRW-3.jpg",
  },
  {
    id: 170,
    nombre:
      "Computadora Gamer Xtreme PC Gaming CM-50156, AMD Ryzen 5 5600X 3.70GHz, 16GB, 1TB + 500GB SSD, AMD Radeon RX 6600 XT, Windows 10 Prueba",
    marca: "AMD",
    precio: {
      Dolares: "500",
      PesosMX: "10000",
      PesosArg: "61036.35",
    },
    caracteristicas: {
      "Familia de procesador": "AMD Ryzen 5 PRO",
      "Frecuencia del procesador": "3.70 GHz",
      "Memoria interna": "8 GB",
      "Capacidad total de almacenaje": "1000 GB",
      "Sistema operativo instalado": "Windows 10 Prueba",
    },
    funciones: "PC-s-Gamer",
    stock: 0,
    categoria: [{ nombre: "PC-s-Gamer", id: 10 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTCOR516GB6600XTB-eb79a8.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTCOR516GB6600XTB-eb79a8.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTCOR516GB6600XTB-eb79a8.jpg",
  },
  {
    id: 171,
    nombre:
      "Computadora Gamer Xtreme PC Gaming CM-50156, AMD Ryzen 5 5600X 3.70GHz, 16GB, 1TB + 500GB SSD, AMD Radeon RX 6600 XT, Windows 10 Prueba",
    marca: "AMD",
    precio: {
      Dolares: "500",
      PesosMX: "10000",
      PesosArg: "61036.35",
    },
    caracteristicas: {
      "Familia de procesador": "AMD Ryzen 5 PRO",
      "Frecuencia del procesador": "3.70 GHz",
      "Memoria interna": "8 GB",
      "Capacidad total de almacenaje": "1000 GB",
      "Sistema operativo instalado": "Windows 10 Prueba",
    },
    funciones: "PC-s-Gamer",
    stock: 0,
    categoria: [{ nombre: "PC-s-Gamer", id: 10 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTCOR516GB6600XTB-eb79a8.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTCOR516GB6600XTB-eb79a8.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTCOR516GB6600XTB-eb79a8.jpg",
  },
  {
    id: 172,
    nombre:
      "Computadora Gamer Xtreme PC Gaming CM-50156, AMD Ryzen 5 5600X 3.70GHz, 16GB, 1TB + 500GB SSD, AMD Radeon RX 6600 XT, Windows 10 Prueba",
    marca: "AMD",
    precio: {
      Dolares: "500",
      PesosMX: "10000",
      PesosArg: "61036.35",
    },
    caracteristicas: {
      "Familia de procesador": "AMD Ryzen 5 PRO",
      "Frecuencia del procesador": "3.70 GHz",
      "Memoria interna": "8 GB",
      "Capacidad total de almacenaje": "1000 GB",
      "Sistema operativo instalado": "Windows 10 Prueba",
    },
    funciones: "PC-s-Gamer",
    stock: 0,
    categoria: [{ nombre: "PC-s-Gamer", id: 10 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTCOR516GB6600XTB-eb79a8.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTCOR516GB6600XTB-eb79a8.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTCOR516GB6600XTB-eb79a8.jpg",
  },
  {
    id: 173,
    nombre:
      "Computadora Gamer Xtreme PC Gaming CM-50156, AMD Ryzen 5 5600X 3.70GHz, 16GB, 1TB + 500GB SSD, AMD Radeon RX 6600 XT, Windows 10 Prueba",
    marca: "AMD",
    precio: {
      Dolares: "500",
      PesosMX: "10000",
      PesosArg: "61036.35",
    },
    caracteristicas: {
      "Familia de procesador": "AMD Ryzen 5 PRO",
      "Frecuencia del procesador": "3.70 GHz",
      "Memoria interna": "8 GB",
      "Capacidad total de almacenaje": "1000 GB",
      "Sistema operativo instalado": "Windows 10 Prueba",
    },
    funciones: "PC-s-Gamer",
    stock: 0,
    categoria: [{ nombre: "PC-s-Gamer", id: 10 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTCOR516GB6600XTB-eb79a8.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTCOR516GB6600XTB-eb79a8.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTCOR516GB6600XTB-eb79a8.jpg",
  },
  {
    id: 174,
    nombre:
      "Computadora Gamer Xtreme PC Gaming CM-50156, AMD Ryzen 5 5600X 3.70GHz, 16GB, 1TB + 500GB SSD, AMD Radeon RX 6600 XT, Windows 10 Prueba",
    marca: "AMD",
    precio: {
      Dolares: "500",
      PesosMX: "10000",
      PesosArg: "61036.35",
    },
    caracteristicas: {
      "Familia de procesador": "AMD Ryzen 5 PRO",
      "Frecuencia del procesador": "3.70 GHz",
      "Memoria interna": "8 GB",
      "Capacidad total de almacenaje": "1000 GB",
      "Sistema operativo instalado": "Windows 10 Prueba",
    },
    funciones: "PC-s-Gamer",
    stock: 0,
    categoria: [{ nombre: "PC-s-Gamer", id: 10 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTCOR516GB6600XTB-eb79a8.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTCOR516GB6600XTB-eb79a8.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTCOR516GB6600XTB-eb79a8.jpg",
  },
  {
    id: 175,
    nombre:
      "Computadora Gamer Xtreme PC Gaming CM-50156, AMD Ryzen 5 5600X 3.70GHz, 16GB, 1TB + 500GB SSD, AMD Radeon RX 6600 XT, Windows 10 Prueba",
    marca: "AMD",
    precio: {
      Dolares: "500",
      PesosMX: "10000",
      PesosArg: "61036.35",
    },
    caracteristicas: {
      "Familia de procesador": "AMD Ryzen 5 PRO",
      "Frecuencia del procesador": "3.70 GHz",
      "Memoria interna": "8 GB",
      "Capacidad total de almacenaje": "1000 GB",
      "Sistema operativo instalado": "Windows 10 Prueba",
    },
    funciones: "PC-s-Gamer",
    stock: 0,
    categoria: [{ nombre: "PC-s-Gamer", id: 10 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTCOR516GB6600XTB-eb79a8.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTCOR516GB6600XTB-eb79a8.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTCOR516GB6600XTB-eb79a8.jpg",
  },
  {
    id: 176,
    nombre:
      "Procesador AMD Ryzen 5 5600G con Gráficos Radeon 7, S-AM4, 3.90GHz, Six-Core, 16MB L3 Caché - incluye Disipador Wraith Stealth",
    marca: "AMD",
    precio: {
      Dolares: "500",
      PesosMX: "10000",
      PesosArg: "61036.35",
    },
    caracteristicas: {
      "Familia de procesador": "AMD Ryzen 5",
      "Modelo del procesador": "5600G",
      "Socket de procesador": "Socket AM4",
      "Número de núcleos": "6",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-AMD-100-100000252BOX-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-AMD-100-100000252BOX-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-AMD-100-100000252BOX-3.jpg",
  },
  {
    id: 177,
    nombre:
      "Procesador AMD Ryzen 7 5700G, S-AM4, 3.80GHz, 8-Core, 16MB L3 Caché - incluye Disipador Wraith Stealth",
    marca: "AMD",
    precio: {
      Dolares: "300.89",
      PesosMX: "5,929.00",
      PesosArg: "36188.45",
    },
    caracteristicas: {
      "Familia de procesador": "AMD Ryzen 7",
      "Modelo del procesador": "5600G",
      "Socket de procesador": "Socket AM4",
      "Número de núcleos": "6",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-AMD-100-100000263BOX-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-AMD-100-100000263BOX-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-AMD-100-100000263BOX-3.jpg",
  },
  {
    id: 178,
    nombre:
      "Procesador AMD Ryzen 5 5600X, S-AM4, 3.70GHz, 32MB L3 Cache - incluye Disipador Wraith Stealth",
    marca: "AMD",
    precio: {
      Dolares: "300.89",
      PesosMX: "5,929.00",
      PesosArg: "36188.45",
    },
    caracteristicas: {
      "Familia de procesador": "AMD Ryzen 7",
      "Modelo del procesador": "5600G",
      "Socket de procesador": "Socket AM4",
      "Número de núcleos": "6",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-AMD-100-100000065BOX-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-AMD-100-100000065BOX-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-AMD-100-100000065BOX-3.jpg",
  },
  {
    id: 179,
    nombre:
      "Procesador AMD Ryzen 7 5800X, S-AM4, 3.80GHz, 8-Core, 32MB L3 Cache - no incluye Disipador",
    marca: "AMD",
    precio: {
      Dolares: "300.89",
      PesosMX: "5,929.00",
      PesosArg: "36188.45",
    },
    caracteristicas: {
      "Familia de procesador": "AMD Ryzen 7",
      "Modelo del procesador": "5600G",
      "Socket de procesador": "Socket AM4",
      "Número de núcleos": "6",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-AMD-100-100000063WOF-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-AMD-100-100000063WOF-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-AMD-100-100000063WOF-3.jpg",
  },
  {
    id: 180,
    nombre:
      "Procesador AMD Ryzen 9 5900X, S-AM4, 3.70GHz, 64MB L3 Cache - no incluye Disipador",
    marca: "AMD",
    precio: {
      Dolares: "412.53",
      PesosMX: "8,129.00",
      PesosArg: "49616.45",
    },
    caracteristicas: {
      "Familia de procesador": "AMD Ryzen 9",
      "Modelo del procesador": "5600G",
      "Socket de procesador": "Socket AM4",
      "Número de núcleos": "6",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-AMD-100-100000061WOF-2.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-AMD-100-100000061WOF-1.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-AMD-100-100000061WOF-3.jpg",
  },
  {
    id: 181,
    nombre:
      "Procesador Intel Core i9-12900KF, S-1700, 3.20GHz, 16-Core, 30MB Smart Cache (12va Generación - Alder Lake)",
    marca: "Intel",
    precio: {
      Dolares: "606.90",
      PesosMX: "11959.00",
      PesosArg: "72993.37",
    },
    caracteristicas: {
      "Familia de procesador": "AMD Ryzen 9",
      "Modelo del procesador": "5600G",
      "Socket de procesador": "Socket AM4",
      "Número de núcleos": "6",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-INTEL-BX8071512900KF-2beebf.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-INTEL-BX8071512900KF-2beebf.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-INTEL-BX8071512900KF-fb1bb6.jpg",
  },
  {
    id: 182,
    nombre:
      "Procesador Intel Core i9-12900KF, S-1700, 3.20GHz, 16-Core, 30MB Smart Cache (12va Generación - Alder Lake)",
    marca: "Intel",
    precio: {
      Dolares: "606.90",
      PesosMX: "11,959.00",
      PesosArg: "72993.37",
    },
    caracteristicas: {
      "Familia de procesador": "AMD Ryzen 9",
      "Modelo del procesador": "5600G",
      "Socket de procesador": "Socket AM4",
      "Número de núcleos": "6",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-INTEL-BX8071512900KF-2beebf.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-INTEL-BX8071512900KF-2beebf.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-INTEL-BX8071512900KF-fb1bb6.jpg",
  },
  {
    id: 185,
    nombre:
      "Procesador Intel Core i9-12900K Intel UHD Graphics 770, S-1700, 3.20GHz, 16-Core, 30MB Smart Cache (12va. Generación - Alder Lake)",
    marca: "Intel",
    precio: {
      Dolares: "670.33",
      PesosMX: "13,209.00",
      PesosArg: "80622.91",
    },
    caracteristicas: {
      "Familia de procesador": "Intel® Core™ i9-10xxx",
      "Modelo del procesador": "i9-10900K",
      "Frecuencia del procesador": "3.7 GHz",
      "Socket de procesador": "LGA 1200",
      "Número de núcleos": "10",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-INTEL-BX8071512900K-a6160e.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-INTEL-BX8071512900K-fb1bb6.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-INTEL-BX8071512900K-a6160e.jpg",
  },
  {
    id: 186,
    nombre:
      "Procesador Intel Core i9-10900F, S-1200, 2.80GHz, 10-Core, 20MB SmartCache (10ma Generación - Comet Lake)",
    marca: "Intel",
    precio: {
      Dolares: "386.14",
      PesosMX: "7,609.00",
      PesosArg: "46442.56",
    },
    caracteristicas: {
      "Familia de procesador": "Intel® Core™ i9-10xxx",
      "Modelo del procesador": "i9-10900K",
      "Frecuencia del procesador": "3.7 GHz",
      "Socket de procesador": "LGA 1200",
      "Número de núcleos": "10",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-INTEL-BX8070110900F-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-INTEL-BX8070110900F-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-INTEL-BX8070110900F-3.jpg",
  },
  {
    id: 187,
    nombre:
      "Procesador Intel Core i9-10900F, S-1200, 2.80GHz, 10-Core, 20MB SmartCache (10ma Generación - Comet Lake)",
    marca: "Intel",
    precio: {
      Dolares: "386.14",
      PesosMX: "7,609.00",
      PesosArg: "46442.56",
    },
    caracteristicas: {
      "Familia de procesador": "Intel® Core™ i9-10xxx",
      "Modelo del procesador": "i9-10900K",
      "Frecuencia del procesador": "3.7 GHz",
      "Socket de procesador": "LGA 1200",
      "Número de núcleos": "10",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-INTEL-BX8070110900F-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-INTEL-BX8070110900F-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-INTEL-BX8070110900F-3.jpg",
  },
  {
    id: 188,
    nombre:
      "Memoria Ram XPG Spectrix D50 Tungsten Grey DDR4, 3200MHz, 8GB, Non-ECC, CL16, XMP",
    marca: "XPG",
    precio: {
      Dolares: "99.45",
      PesosMX: "709.00",
      PesosArg: "386.14",
    },
    caracteristicas: {
      "Tipo de memoria interna": "DDR4",
      "Memoria interna": "8 GB",
      "Diseño de memoria": " 1 x 8 GB",
      "Velocidad de memoria del reloj": "3200 MHz",
      "Latencia CAS": "16",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-AX4U32008G16A-ST50-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-AX4U32008G16A-ST50-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-AX4U32008G16A-ST50-1.jpg",
  },
  {
    id: 189,
    nombre:
      "Memoria RAM Kingston FURY Beast Black DDR4, 3200MHz, 8GB, Non-ECC, CL16, XMP",
    marca: "Kingston",
    precio: {
      Dolares: "29.38",
      PesosMX: "579.00",
      PesosArg: "3534.00",
    },
    caracteristicas: {
      "Tipo de memoria interna": "DDR4",
      "Memoria interna": "8 GB",
      "Diseño de memoria": " 1 x 8 GB",
      "Velocidad de memoria del reloj": "3200 MHz",
      "Latencia CAS": "16",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-KINGSTON-KF432C16BB8-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-KINGSTON-KF432C16BB8-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-KINGSTON-KF432C16BB8-3.jpg",
  },
  {
    id: 190,
    nombre:
      "Memoria Ram XPG Spectrix D60G DDR4, 3200MHz, 8GB, Non-ECC, CL16, XMP",
    marca: "XPG",
    precio: {
      Dolares: "38.01",
      PesosMX: "749.00",
      PesosArg: "4571.62",
    },
    caracteristicas: {
      "Tipo de memoria interna": "DDR4",
      "Memoria interna": "8 GB",
      "Diseño de memoria": " 1 x 8 GB",
      "Velocidad de memoria del reloj": "3200 MHz",
      "Latencia CAS": "16",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/XL/CP-XPG-AX4U32008G16A-ST60-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-XPG-AX4U32008G16A-ST60-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-XPG-AX4U32008G16A-ST60-3.jpg",
  },
  {
    id: 191,
    nombre: "Memoria RAM XPG Spectrix D50 DDR4, 3200MHz, 8GB, Non-ECC, XMP",
    marca: "XPG",
    precio: {
      Dolares: "36.41",
      PesosMX: "719.00",
      PesosArg: "4388.51",
    },
    caracteristicas: {
      "Tipo de memoria interna": "DDR4",
      "Memoria interna": "8 GB",
      "Diseño de memoria": " 1 x 8 GB",
      "Velocidad de memoria del reloj": "3200 MHz",
      "Latencia CAS": "8",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-AX4U32008G16A-SW50-2.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-XPG-AX4U32008G16A-SW50-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-XPG-AX4U32008G16A-SW50-2.jpg",
  },
  {
    id: 192,
    nombre:
      "Memoria Ram XPG Gammix D30 Silver DDR4, 3200MHz, 8GB, Non-ECC, CL16, XMP",
    marca: "XPG",
    precio: {
      Dolares: "31.92",
      PesosMX: "629.00",
      PesosArg: "3839.19",
    },
    caracteristicas: {
      "Tipo de memoria interna": "DDR4",
      "Memoria interna": "8 GB",
      "Diseño de memoria": " 1 x 8 GB",
      "Velocidad de memoria del reloj": "3200 MHz",
      "Latencia CAS": "8",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-AX4U32008G16A-SR30-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-AX4U32008G16A-SR30-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-AX4U32008G16A-SR30-1.jpg",
  },
  {
    id: 193,
    nombre:
      "Memoria RAM XPG Gammix D10 Black DDR4, 3200MHz, 8GB, Non-ECC, CL16, XMP",
    marca: "XPG",
    precio: {
      Dolares: "31.92",
      PesosMX: "629.00",
      PesosArg: "3839.19",
    },
    caracteristicas: {
      "Tipo de memoria interna": "DDR4",
      "Memoria interna": "8 GB",
      "Diseño de memoria": " 1 x 8 GB",
      "Velocidad de memoria del reloj": "3200 MHz",
      "Latencia CAS": "8",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-AX4U32008G16A-SB10-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-AX4U32008G16A-SB10-1.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-AX4U32008G16A-SB10-1.jpg",
  },
  {
    id: 194,
    nombre:
      "Kit Memoria RAM XPG Spectrix D50 RGB White DDR4, 3200MHz, 16GB (2 x 8GB), Non-ECC, CL16, XMP",
    marca: "XPG",
    precio: {
      Dolares: "77.59",
      PesosMX: "1,529.00",
      PesosArg: "9332.46",
    },
    caracteristicas: {
      "Tipo de memoria interna": "DDR4",
      "Memoria interna": "8 GB",
      "Diseño de memoria": " 1 x 8 GB",
      "Velocidad de memoria del reloj": "3200 MHz",
      "Latencia CAS": "8",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-AX4U32008G16A-DW50-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-AX4U32008G16A-DW50-1.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-AX4U32008G16A-DW50-1.jpg",
  },
  {
    id: 195,
    nombre:
      "Memoria RAM XPG SPECTRIX D60G DDR4, 3200MHz, 16GB, Non-ECC, CL16, XMP",
    marca: "XPG",
    precio: {
      Dolares: "67.44",
      PesosMX: "1329.00",
      PesosArg: "8111.73",
    },
    caracteristicas: {
      "Tipo de memoria interna": "DDR4",
      "Memoria interna": "8 GB",
      "Diseño de memoria": " 1 x 8 GB",
      "Velocidad de memoria del reloj": "3200 MHz",
      "Latencia CAS": "16",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-AX4U320016G16A-ST60-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-XPG-AX4U320016G16A-ST60-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-XPG-AX4U320016G16A-ST60-3.jpg",
  },
  {
    id: 196,
    nombre:
      "Memoria RAM Kingston FURY BEAST DDR4, 3200MHz, 16GB, Non-ECC, CL16, XMP",
    marca: "Kingston",
    precio: {
      Dolares: "67.95",
      PesosMX: "1339.00",
      PesosArg: "8172.77",
    },
    caracteristicas: {
      "Tipo de memoria interna": "DDR4",
      "Memoria interna": "8 GB",
      "Diseño de memoria": " 1 x 8 GB",
      "Velocidad de memoria del reloj": "3200 MHz",
      "Latencia CAS": "16",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-KINGSTON-KF432C16BB116-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-KINGSTON-KF432C16BB116-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-KINGSTON-KF432C16BB116-3.jpg",
  },
  {
    id: 202,
    nombre:
      "Mouse Gamer Logitech Óptico G305, Inalámbrico, USB, 12.000DPI, Negro",
    marca: "Logitech",
    precio: {
      Dolares: "34.46",
      PesosMX: "679.00",
      PesosArg: "4144.37",
    },
    caracteristicas: {
      Tecnología: "Óptico",
      "Resolución de movimiento": "12000 DPI",
      "Tecnología de conectividad": "Inalámbrico",
      "Cantidad de botones": "6",
      "Color del producto": "Negro",
    },
    funciones: "Gabinetes",
    stock: 0,
    categoria: [{ nombre: "Gabinetes", id: 5 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-910-005281-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-910-005281-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-910-005281-3.jpg",
  },
  {
    id: 203,
    nombre:
      "Mouse Ergonómico Logitech Óptico G502 Hero Lightspeed, Inalámbrico, USB, 16000DPI, Negro",
    marca: "Logitech",
    precio: {
      Dolares: "97.39",
      PesosMX: "1919.00",
      PesosArg: "11712.88",
    },
    caracteristicas: {
      Tecnología: "Óptico",
      "Resolución de movimiento": "12000 DPI",
      "Tecnología de conectividad": "Inalámbrico",
      "Cantidad de botones": "6",
      "Color del producto": "Negro",
    },
    funciones: "Mouse",
    stock: 0,
    categoria: [{ nombre: "Mouse", id: 12 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-910-005566-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-910-005566-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-910-005566-3.jpg",
  },
  {
    id: 204,
    nombre:
      "Mouse Gamer Ocelot Gaming Óptico OGEM02, Alámbrico, USB A, 2400DPI, Negro",
    marca: "Logitech",
    precio: {
      Dolares: "20",
      PesosMX: "103.00",
      PesosArg: "1203.00",
    },
    caracteristicas: {
      Tecnología: "Óptico",
      "Resolución de movimiento": "12000 DPI",
      "Tecnología de conectividad": "Inalámbrico",
      "Cantidad de botones": "6",
      "Color del producto": "Negro",
    },
    funciones: "Mouse",
    stock: 0,
    categoria: [{ nombre: "Mouse", id: 12 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGEM02-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGEM02-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGEM02-3.jpg",
  },
  {
    id: 205,
    nombre:
      "Mouse Gamer Logitech Óptico G305, Inalámbrico, USB, 12.000DPI, Lila",
    marca: "Logitech",
    precio: {
      Dolares: "28.37",
      PesosMX: "559.00",
      PesosArg: "3411.93",
    },
    caracteristicas: {
      Tecnología: "Óptico",
      "Resolución de movimiento": "12000 DPI",
      "Tecnología de conectividad": "Inalámbrico",
      "Cantidad de botones": "6",
      "Color del producto": "Lila",
    },
    funciones: "Mouse",
    stock: 0,
    categoria: [{ nombre: "Mouse", id: 12 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-910-006021-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-910-006021-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-910-006021-3.jpg",
  },
  {
    id: 206,
    nombre:
      "Mouse Gamer Logitech Óptico G305, Inalámbrico, USB, 12.000DPI, Negro",
    marca: "Logitech",
    precio: {
      Dolares: "34.46",
      PesosMX: "679.00",
      PesosArg: "4144.37",
    },
    caracteristicas: {
      Tecnología: "Óptico",
      "Resolución de movimiento": "12000 DPI",
      "Tecnología de conectividad": "Inalámbrico",
      "Cantidad de botones": "6",
      "Color del producto": "Lila",
    },
    funciones: "Mouse",
    stock: 0,
    categoria: [{ nombre: "Mouse", id: 12 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-910-005281-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-910-005281-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-910-005281-3.jpg",
  },
  {
    id: 208,
    nombre: "Mouse Dell Láser MS3220, Alámbrico, USB, 3200DPI, Negro",
    marca: "Dell Láser",
    precio: {
      Dolares: "8.12",
      PesosMX: "160.00",
      PesosArg: "976.58",
    },
    caracteristicas: {
      Tecnología: "Óptico",
      "Resolución de movimiento": "12000 DPI",
      "Tecnología de conectividad": "Inalámbrico",
      "Cantidad de botones": "6",
      "Color del producto": "Lila",
    },
    funciones: "Mouse",
    stock: 0,
    categoria: [{ nombre: "Mouse", id: 12 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-NACEBTECHNOLOGY-NA-630-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-NACEBTECHNOLOGY-NA-630-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-NACEBTECHNOLOGY-NA-630-3.jpg",
  },
  {
    id: 209,
    nombre: "Mouse Dell Láser MS3220, Alámbrico, USB, 3200DPI, Negro",
    marca: "Dell Láser",
    precio: {
      Dolares: "8.12",
      PesosMX: "160.00",
      PesosArg: "976.58",
    },
    caracteristicas: {
      Tecnología: "Óptico",
      "Resolución de movimiento": "12000 DPI",
      "Tecnología de conectividad": "Inalámbrico",
      "Cantidad de botones": "6",
      "Color del producto": "Lila",
    },
    funciones: "Mouse",
    stock: 0,
    categoria: [{ nombre: "Mouse", id: 12 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-NACEBTECHNOLOGY-NA-630-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-NACEBTECHNOLOGY-NA-630-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-NACEBTECHNOLOGY-NA-630-3.jpg",
  },
  {
    id: 210,
    nombre:
      "Disco Duro Interno Toshiba HDWD110UZSVA 3.5'', 1TB, SATA, 6 Gbit/s, 7200RPM, 64MB Cache",
    marca: "Toshiba",
    precio: {
      Dolares: "39.03",
      PesosMX: "769.00",
      PesosArg: "4693.70",
    },
    caracteristicas: {
      Interfaz: "Serial ATA",
      "Velocidad de transferencia": "6 Gbit/s",
      "Tamaño de búfer": "64 MB",
    },
    funciones: "Discos-Duros",
    stock: 0,
    categoria: [{ nombre: "Discos-Duros", id: 13 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-TOSHIBA-HDWD110UZSVA-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-TOSHIBA-HDWD110UZSVA-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-TOSHIBA-HDWD110UZSVA-3.jpg",
  },
  {
    id: 198,
    nombre:
      "Fuente de Poder Corsair AX1600i 80 PLUS Titanium, 20+4 pin ATX, 140mm, 1600W",
    marca: "Corsair",
    precio: {
      Dolares: "531.28",
      PesosMX: "10,469",
      PesosArg: "63898.95",
    },
    caracteristicas: {
      "Tipo de memoria interna": "DDR4",
      "Memoria interna": "8 GB",
      "Diseño de memoria": " 1 x 8 GB",
      "Velocidad de memoria del reloj": "3200 MHz",
      "Latencia CAS": "16",
    },
    funciones: "Fuentes-de-Poder-para-PC-s",
    stock: 0,
    categoria: [{ nombre: "Fuentes-de-Poder-para-PC-s", id: 14 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-CORSAIR-CP-9020087-NA-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-CORSAIR-CP-9020087-NA-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-CORSAIR-CP-9020087-NA-3.jpg",
  },
  {
    id: 199,
    nombre: "Fuente de Poder XPG PYLON 80 PLUS Bronze, 24-pin ATX, 120mm, 550W",
    marca: "XPG",
    precio: {
      Dolares: "133.92",
      PesosMX: "1209.00",
      PesosArg: "7379.29",
    },
    caracteristicas: {
      "Potencia nominal": "850 W",
      "Factor de forma": "ATX",
      "Certificación 80 PLUS": "80 PLUS Platinum",
    },
    funciones: "Fuentes-de-Poder-para-PC-s",
    stock: 0,
    categoria: [{ nombre: "Fuentes-de-Poder-para-PC-s", id: 14 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-PYLON550B-BKCUS-2.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-PYLON550B-BKCUS-3.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-PYLON550B-BKCUS-1.jpg",
  },
  {
    id: 200,
    nombre:
      "Fuente de Poder Gigabyte P750GM 80 PLUS Gold, 20+4 pin ATX, 120mm, 750W",
    marca: "Gigabyte",
    precio: {
      Dolares: "99.42",
      PesosMX: "1,959.00",
      PesosArg: "11957.02",
    },
    caracteristicas: {
      "Potencia nominal": "850 W",
      "Factor de forma": "ATX",
      "Certificación 80 PLUS": "80 PLUS Platinum",
    },
    funciones: "Fuentes-de-Poder-para-PC-s",
    stock: 0,
    categoria: [{ nombre: "Fuentes-de-Poder-para-PC-s", id: 14 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-GP-P750GM-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-GIGABYTE-GP-P750GM-4.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-THERMALTAKE-PS-TPG-1050F1FAPU-1-3.jpg",
  },
  {
    id: 201,
    nombre:
      "Fuente de Poder Thermaltake Toughpower Grand RGB 80 PLUS Platinum, 24-pin ATX, 140mm, 1050W",
    marca: "Thermaltake",
    precio: {
      Dolares: "263.33",
      PesosMX: "31671.76",
      PesosArg: "32282.12",
    },
    caracteristicas: {
      "Potencia nominal": "850 W",
      "Factor de forma": "ATX",
      "Certificación 80 PLUS": "80 PLUS Platinum",
    },
    funciones: "Fuentes-de-Poder-para-PC-s",
    stock: 0,
    categoria: [{ nombre: "Fuentes-de-Poder-para-PC-s", id: 14 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YE0090-B001N0-1.png",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YE0090-B001N0-2.png",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90YE0090-B001N0-3.png",
  },
  {
    id: 207,
    nombre:
      "Mouse Gamer Naceb Láser NA-630, Alámbrico, USB, Izquierdo, 2400DPI, Negro/Plata",
    marca: "Naceb",
    precio: {
      Dolares: "8.12",
      PesosMX: "160.00",
      PesosArg: "976.58",
    },
    caracteristicas: {
      Tecnología: "Óptico",
      "Resolución de movimiento": "12000 DPI",
      "Tecnología de conectividad": "Inalámbrico",
      "Cantidad de botones": "6",
      "Color del producto": "Lila",
    },
    funciones: "Mouse",
    stock: 0,
    categoria: [{ nombre: "Mouse", id: 12 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-NACEBTECHNOLOGY-NA-630-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-NACEBTECHNOLOGY-NA-630-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-NACEBTECHNOLOGY-NA-630-3.jpg",
  },
  {
    id: 211,
    nombre:
      "Disco Duro Interno Seagate Barracuda 3.5'', 2TB, SATA III, 6 Gbit/s, 7200RPM, 256MB Cache",
    marca: "SATA",
    precio: {
      Dolares: "51.71",
      PesosMX: "1,019.00",
      PesosArg: "6219.60",
    },
    caracteristicas: {
      Interfaz: "Serial ATA",
      "Velocidad de transferencia": "6 Gbit/s",
      "Tamaño de búfer": "64 MB",
    },
    funciones: "Discos-Duros",
    stock: 0,
    categoria: [{ nombre: "Discos-Duros", id: 13 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-SEAGATE-ST2000DM008-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-SEAGATE-ST2000DM008-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-SEAGATE-ST2000DM008-1.jpg",
  },
  {
    id: 212,
    nombre:
      "Disco Duro Interno Seagate Barracuda 3.5'', 1TB, SATA III, 6 Gbit/s, 7200RPM, 64MB Cache",
    marca: "SATA",
    precio: {
      Dolares: "38.52",
      PesosMX: "759.00",
      PesosArg: "4632.66",
    },
    caracteristicas: {
      Interfaz: "Serial ATA",
      "Velocidad de transferencia": "6 Gbit/s",
      "Tamaño de búfer": "64 MB",
    },
    funciones: "Discos-Duros",
    stock: 0,
    categoria: [{ nombre: "Discos-Duros", id: 13 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-SEAGATE-ST2000DM008-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-SEAGATE-ST2000DM008-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-SEAGATE-ST2000DM008-1.jpg",
  },
  {
    id: 213,
    nombre:
      "Disco Duro Interno Western Digital WD Caviar Blue 3.5'', 1TB, SATA III, 6 Gbit/s, 7200RPM, 64MB Cache",
    marca: "SATA",
    precio: {
      Dolares: "38.52",
      PesosMX: "759.00",
      PesosArg: "4632.66",
    },
    caracteristicas: {
      Interfaz: "Serial ATA",
      "Velocidad de transferencia": "6 Gbit/s",
      "Tamaño de búfer": "64 MB",
    },
    funciones: "Discos-Duros",
    stock: 0,
    categoria: [{ nombre: "Discos-Duros", id: 13 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-WESTERNDIGITAL-WD10EZEX-6e58bd.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-WESTERNDIGITAL-WD10EZEX-ca6bbd.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-WESTERNDIGITAL-WD10EZEX-ca6bbd.jpg",
  },
  {
    id: 214,
    nombre:
      "Disco Duro Interno Western Digital WD Blue 3.5, 2TB, SATA III, 6 Gbit/s, 5400RPM, 256MB Caché",
    marca: "SATA",
    precio: {
      Dolares: "38.52",
      PesosMX: "759.00",
      PesosArg: "4632.66",
    },
    caracteristicas: {
      Interfaz: "Serial ATA",
      "Velocidad de transferencia": "6 Gbit/s",
      "Tamaño de búfer": "64 MB",
    },
    funciones: "Discos-Duros",
    stock: 0,
    categoria: [{ nombre: "Discos-Duros", id: 13 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-WESTERNDIGITAL-WD20EZAZ-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-WESTERNDIGITAL-WD20EZAZ-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-WESTERNDIGITAL-WD20EZAZ-3.jpg",
  },
  {
    id: 215,
    nombre:
      "Disco Duro Interno Seagate Barracuda 3.5'', 2TB, SATA III, 6 Gbit/s, 5400RPM, 256MB Cache",
    marca: "SATA",
    precio: {
      Dolares: "38.52",
      PesosMX: "759.00",
      PesosArg: "4632.66",
    },
    caracteristicas: {
      Interfaz: "Serial ATA",
      "Velocidad de transferencia": "6 Gbit/s",
      "Tamaño de búfer": "64 MB",
    },
    funciones: "Discos-Duros",
    stock: 0,
    categoria: [{ nombre: "Discos-Duros", id: 13 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-SEAGATE-ST2000DM005-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-SEAGATE-ST2000DM005-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-SEAGATE-ST2000DM005-1.jpg",
  },
  {
    id: 216,
    nombre:
      "Disco Duro Interno Western Digital WD Black Series 3.5'', 2TB, SATA III, 6 Gbit/s, 7200RPM, 64MB Cache",
    marca: "SATA",
    precio: {
      Dolares: "113.12",
      PesosMX: "2229.00",
      PesosArg: "5.00",
    },
    caracteristicas: {
      Interfaz: "Serial ATA",
      "Velocidad de transferencia": "6 Gbit/s",
      "Tamaño de búfer": "64 MB",
    },
    funciones: "Discos-Duros",
    stock: 0,
    categoria: [{ nombre: "Discos-Duros", id: 13 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-WESTERNDIGITAL-WD2003FZEX-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-WESTERNDIGITAL-WD2003FZEX-3.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-WESTERNDIGITAL-WD2003FZEX-2.jpg",
  },
  {
    id: 217,
    nombre:
      "Teclado Gamer Logitech G213 Prodigy LED RGB, Alámbrico, Negro, (Inglés)",
    marca: "Logitech",
    precio: {
      Dolares: "31.41",
      PesosMX: "619.00",
      PesosArg: "3778.15",
    },
    caracteristicas: {
      Interfaz: "Serial ATA",
      "Velocidad de transferencia": "6 Gbit/s",
      "Tamaño de búfer": "64 MB",
    },
    funciones: "Teclados",
    stock: 0,
    categoria: [{ nombre: "Teclados", id: 15 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-920-008084-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-920-008084-1.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-LOGITECH-920-008084-1.jpg",
  },
  {
    id: 218,
    nombre: "Teclado Ghia GTA50, Alámbrico, USB, Negro (Español)",
    marca: "Ghia",
    precio: {
      Dolares: "25",
      PesosMX: "100",
      PesosArg: "600",
    },
    caracteristicas: {
      Interfaz: "Serial ATA",
      "Velocidad de transferencia": "6 Gbit/s",
      "Tamaño de búfer": "64 MB",
    },
    funciones: "Teclados",
    stock: 0,
    categoria: [{ nombre: "Teclados", id: 15 }],
    imagen0: "https://www.cyberpuerta.mx/img/product/M/CP-GHIA-GTA50-1.jpg",
    imagen1: "https://www.cyberpuerta.mx/img/product/M/CP-GHIA-GTA50-1.jpg",
    imagen2: "https://www.cyberpuerta.mx/img/product/M/CP-GHIA-GTA50-1.jpg",
  },
  {
    id: 221,
    nombre: "Teclado Dell KB216, Alámbrico, USB, Negro (Español)",
    marca: "Dell",
    precio: {
      Dolares: "25",
      PesosMX: "100",
      PesosArg: "600",
    },
    caracteristicas: {
      Interfaz: "Serial ATA",
      "Velocidad de transferencia": "6 Gbit/s",
      "Tamaño de búfer": "64 MB",
    },
    funciones: "Teclados",
    stock: 0,
    categoria: [{ nombre: "Teclados", id: 15 }],
    imagen0: "https://www.cyberpuerta.mx/img/product/M/CP-DELL-580-ADRC-1.jpg",
    imagen1: "https://www.cyberpuerta.mx/img/product/M/CP-DELL-580-ADRC-2.jpg",
    imagen2: "https://www.cyberpuerta.mx/img/product/M/CP-DELL-580-ADRC-1.jpg",
  },
  {
    id: 183,
    nombre:
      "Procesador Intel Core i9-10900K Intel UHD Graphics 630, S-1200, 3.70GHz, 10-Core, 20MB Caché (10ma Generación Comet Lake",
    marca: "Intel",
    precio: {
      Dolares: "435.37",
      PesosMX: "8,579.00",
      PesosArg: "52363.08",
    },
    caracteristicas: {
      "Familia de procesador": "Intel® Core™ i9-10xxx",
      "Modelo del procesador": "i9-10900K",
      "Frecuencia del procesador": "3.7 GHz",
      "Socket de procesador": "LGA 1200",
      "Número de núcleos": "10",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-INTEL-BX8070110900K-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-INTEL-BX8070110900K-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-INTEL-BX8070110900K-3.jpg",
  },
  {
    id: 184,
    nombre:
      "Procesador Intel Core i9-11900K, S-1200, 3.50GHz, 8-Core, 16MB Smart Cache (11va Generación Rocket Lake",
    marca: "Intel",
    precio: {
      Dolares: "461.76",
      PesosMX: "9099.00",
      PesosArg: "55536.97",
    },
    caracteristicas: {
      "Familia de procesador": "Intel® Core™ i9-10xxx",
      "Modelo del procesador": "i9-10900K",
      "Frecuencia del procesador": "3.7 GHz",
      "Socket de procesador": "LGA 1200",
      "Número de núcleos": "10",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-INTEL-BX8070110900K-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-INTEL-BX8070110900K-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-INTEL-BX8070110900K-3.jpg",
  },
  {
    id: 197,
    nombre:
      "Memoria RAM XPG SPECTRIX D41 RGB Tungsten Grey DDR4, 3200MHz, 16GB, Non-ECC, CL16, XMP",
    marca: "XPG",
    precio: {
      Dolares: "62.88",
      PesosMX: "1239.00",
      PesosArg: "7562.40",
    },
    caracteristicas: {
      "Tipo de memoria interna": "DDR4",
      "Memoria interna": "8 GB",
      "Diseño de memoria": " 1 x 8 GB",
      "Velocidad de memoria del reloj": "3200 MHz",
      "Latencia CAS": "16",
    },
    funciones: "Procesadores",
    stock: 0,
    categoria: [{ nombre: "Procesadores", id: 11 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/XL/CP-XPG-AX4U320016G16A-ST41-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-XPG-AX4U320016G16A-ST41-1.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-XPG-AX4U320016G16A-ST41-1.jpg",
  },
  {
    id: 219,
    nombre:
      "Teclado Gamer Ocelot Gaming OGEK01 RGB, Alámbrico, Negro (Español)",
    marca: "Ocelot",
    precio: {
      Dolares: "25",
      PesosMX: "100",
      PesosArg: "600",
    },
    caracteristicas: {
      Interfaz: "Serial ATA",
      "Velocidad de transferencia": "6 Gbit/s",
      "Tamaño de búfer": "64 MB",
    },
    funciones: "Teclados",
    stock: 0,
    categoria: [{ nombre: "Teclados", id: 15 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGEK01-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGEK01-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGEK01-3.jpg",
  },
  {
    id: 220,
    nombre:
      "Teclado Gamer Ocelot Gaming OGEK03 RGB, Alámbrico, Negro (Español)",
    marca: "Ocelot",
    precio: {
      Dolares: "25",
      PesosMX: "100",
      PesosArg: "600",
    },
    caracteristicas: {
      Interfaz: "Serial ATA",
      "Velocidad de transferencia": "6 Gbit/s",
      "Tamaño de búfer": "64 MB",
    },
    funciones: "Teclados",
    stock: 0,
    categoria: [{ nombre: "Teclados", id: 15 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGEK03-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGEK03-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-OCELOTGAMING-OGEK03-3.jpg",
  },
  {
    id: 226,
    nombre:
      "Monitor Gamer Yeyian Odraz LED 27, 4K Ultra HD, Widescreen, FreeSync, 60Hz, HDMI, Negro",
    marca: "Yeyian",
    precio: {
      Dolares: "279.16",
      PesosMX: "5459.00",
      PesosArg: "33687.42",
    },
    caracteristicas: {
      "Diagonal de la pantalla": "68,6 cm (27)",
      "Tipo HD": "4K Ultra HD",
      Resolución: "3840 x 2160 Pixeles",
      "Tiempo de respuesta": "5 ms",
      "Velocidad de actualización": "60 Hz",
      "Cantidad de puertos HDMI": "2",
    },
    funciones: "Monitores",
    stock: 0,
    categoria: [{ nombre: "Monitores", id: 16 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-YEYIAN-YMG-4K27-01-042f96.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-YEYIAN-YMG-4K27-01-6c75fa.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-YEYIAN-YMG-4K27-01-817398.jpg",
  },
  {
    id: 227,
    nombre:
      "Monitor Curvo Samsung LC24F390FHL LED 23.5'', Full HD, Widescreen, FreeSync, HDMI, Negro",
    marca: "Samsung",
    precio: {
      Dolares: "166.15",
      PesosMX: "3,249.00",
      PesosArg: "20049.54",
    },
    caracteristicas: {
      "Diagonal de la pantalla": "68,6 cm (27)",
      "Tipo HD": "4K Ultra HD",
      Resolución: "3840 x 2160 Pixeles",
      "Tiempo de respuesta": "5 ms",
      "Velocidad de actualización": "60 Hz",
      "Cantidad de puertos HDMI": "2",
    },
    funciones: "Monitores",
    stock: 0,
    categoria: [{ nombre: "Monitores", id: 16 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-SAMSUNG-LC24F390FHLXZX-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-SAMSUNG-LC24F390FHLXZX-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-SAMSUNG-LC24F390FHLXZX-3.jpg",
  },
  {
    id: 228,
    nombre:
      "Monitor Curvo Samsung LC24F390FHL LED 23.5'', Full HD, Widescreen, FreeSync, HDMI, Negro",
    marca: "Samsung",
    precio: {
      Dolares: "214.22",
      PesosMX: "4189",
      PesosArg: "25850.26",
    },
    caracteristicas: {
      "Diagonal de la pantalla": "68,6 cm (27)",
      "Tipo HD": "4K Ultra HD",
      Resolución: "3840 x 2160 Pixeles",
      "Tiempo de respuesta": "5 ms",
      "Velocidad de actualización": "60 Hz",
      "Cantidad de puertos HDMI": "2",
    },
    funciones: "Monitores",
    stock: 0,
    categoria: [{ nombre: "Monitores", id: 16 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-SAMSUNG-LC24F390FHLXZX-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-SAMSUNG-LC24F390FHLXZX-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-SAMSUNG-LC24F390FHLXZX-3.jpg",
  },
  {
    id: 229,
    nombre:
      "Monitor Gamer Curvo MSI Optix G241VC LED 23.6, Full HD, Widescreen, FreeSync, 75Hz, HDMI, Negro",
    marca: "MSI",
    precio: {
      Dolares: "169.73",
      PesosMX: "3,319.00",
      PesosArg: "20481.50",
    },
    caracteristicas: {
      "Diagonal de la pantalla": "68,6 cm (27)",
      "Tipo HD": "4K Ultra HD",
      Resolución: "3840 x 2160 Pixeles",
      "Tiempo de respuesta": "5 ms",
      "Velocidad de actualización": "60 Hz",
      "Cantidad de puertos HDMI": "2",
    },
    funciones: "Monitores",
    stock: 0,
    categoria: [{ nombre: "Monitores", id: 16 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-OPTIXG241VC-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-OPTIXG241VC-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-MSI-OPTIXG241VC-3.jpg",
  },
  {
    id: 230,
    nombre:
      "Monitor Gamer ASUS TUF Gaming VG27WQ LED 27, Wide Quad, Widescreen, Adaptive-sync, FreeSync, 165Hz, HDMI, Bocinas Integradas (2 x 4W), Negro",
    marca: "ASUS TUF",
    precio: {
      Dolares: "373.26",
      PesosMX: "7299.00",
      PesosArg: "45042.03",
    },
    caracteristicas: {
      "Diagonal de la pantalla": "68,6 cm (27)",
      "Tipo HD": "4K Ultra HD",
      Resolución: "3840 x 2160 Pixeles",
      "Tiempo de respuesta": "5 ms",
      "Velocidad de actualización": "60 Hz",
      "Cantidad de puertos HDMI": "2",
    },
    funciones: "Monitores",
    stock: 0,
    categoria: [{ nombre: "Monitores", id: 16 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90LM05F0-B01E10-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90LM05F0-B01E10-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ASUS-90LM05F0-B01E10-3.jpg",
  },
  {
    id: 231,
    nombre:
      "Monitor Gamer Curvo Gigabyte G34WQC LCD 34, Quad HD, Ultra Wide, Widescreen, Adaptive-Sync, 144Hz, HDMI, Bocinas Integradas (2 x 2W), Negro",
    marca: "Gigabyte",
    precio: {
      Dolares: "508.26",
      PesosMX: "9,939.00",
      PesosArg: "61333.44",
    },
    caracteristicas: {
      "Diagonal de la pantalla": "68,6 cm (27)",
      "Tipo HD": "4K Ultra HD",
      Resolución: "3840 x 2160 Pixeles",
      "Tiempo de respuesta": "5 ms",
      "Velocidad de actualización": "60 Hz",
      "Cantidad de puertos HDMI": "2",
    },
    funciones: "Monitores",
    stock: 0,
    categoria: [{ nombre: "Monitores", id: 16 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-20VM0-GG34WQCBI-1SAR-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-20VM0-GG34WQCBI-1SAR-3.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-GIGABYTE-20VM0-GG34WQCBI-1SAR-2.jpg",
  },
  {
    id: 232,
    nombre: "SSD Kingston NV1 NVMe, 500GB, PCI Express 3.0, M.2",
    marca: "Gigabyte",
    precio: {
      Dolares: "48.53",
      PesosMX: "949.00",
      PesosArg: "5856.27",
    },
    caracteristicas: {
      Capacidad: "500 GB",
      Interface: "PCI Express 3.0",
      "Velocidad de lectura": "2100 MB/s",
      "Velocidad de escritura": "1700 MB/s",
    },
    funciones: "SSD",
    stock: 0,
    categoria: [{ nombre: "SSD", id: 8 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-KINGSTON-SNVS500G-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-KINGSTON-SNVS500G-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-KINGSTON-SNVS500G-3.jpg",
  },
  {
    id: 233,
    nombre:
      "SSD Western Digital WD Green SN350 NVMe, 480GB, PCI Express 3.0, M.2",
    marca: "Gigabyte",
    precio: {
      Dolares: "40.86",
      PesosMX: "799.00",
      PesosArg: "4930.62",
    },
    caracteristicas: {
      Capacidad: "500 GB",
      Interface: "PCI Express 3.0",
      "Velocidad de lectura": "2100 MB/s",
      "Velocidad de escritura": "1700 MB/s",
    },
    funciones: "SSD",
    stock: 0,
    categoria: [{ nombre: "SSD", id: 8 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-WESTERNDIGITAL-WDS480G2G0C-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-WESTERNDIGITAL-WDS480G2G0C-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-WESTERNDIGITAL-WDS480G2G0C-1.jpg",
  },
  {
    id: 234,
    nombre: "SSD Western Digital WD Green SN350 NVMe, 1TB, PCI Express, M.2",
    marca: "Western Digital",
    precio: {
      Dolares: "40.86",
      PesosMX: "799.00",
      PesosArg: "4930.62",
    },
    caracteristicas: {
      Capacidad: "500 GB",
      Interface: "PCI Express 3.0",
      "Velocidad de lectura": "2100 MB/s",
      "Velocidad de escritura": "1700 MB/s",
    },
    funciones: "SSD",
    stock: 0,
    categoria: [{ nombre: "SSD", id: 8 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-WESTERNDIGITAL-WDS100T3G0C-c0f70c.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-WESTERNDIGITAL-WDS100T3G0C-ea2e07.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-WESTERNDIGITAL-WDS100T3G0C-499629.jpg",
  },
  {
    id: 223,
    nombre:
      "Monitor Samsung LU32J590UQLXZX LED 32, 4K Ultra HD, Widescreen, FreeSync, HDMI, Negro",
    marca: "Samsung",
    precio: {
      Dolares: "412.63",
      PesosMX: "8069.00",
      PesosArg: "49793.69",
    },
    caracteristicas: {
      "Diagonal de la pantalla": "68,6 cm (27)",
      "Tipo HD": "4K Ultra HD",
      Resolución: "3840 x 2160 Pixeles",
      "Tiempo de respuesta": "5 ms",
      "Velocidad de actualización": "60 Hz",
      "Cantidad de puertos HDMI": "2",
    },
    funciones: "Monitores",
    stock: 0,
    categoria: [{ nombre: "Monitores", id: 16 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/XL/CP-SAMSUNG-LU32J590UQLXZX-6.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-SAMSUNG-LU32J590UQLXZX-5.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-SAMSUNG-LU32J590UQLXZX-7.jpg",
  },
  {
    id: 224,
    nombre:
      "Monitor Gamer LG 32UN500-W LED 32'', 4K Ultra HD, Widescreen, FreeSync, HDMI, Bocinas Integradas (2 x 5W), Negro/Blanco",
    marca: "LG",
    precio: {
      Dolares: "412.63",
      PesosMX: "8069.00",
      PesosArg: "49793.69",
    },
    caracteristicas: {
      "Diagonal de la pantalla": "68,6 cm (27)",
      "Tipo HD": "4K Ultra HD",
      Resolución: "3840 x 2160 Pixeles",
      "Tiempo de respuesta": "5 ms",
      "Velocidad de actualización": "60 Hz",
      "Cantidad de puertos HDMI": "2",
    },
    funciones: "Monitores",
    stock: 0,
    categoria: [{ nombre: "Monitores", id: 16 }],
    imagen0: "https://www.cyberpuerta.mx/img/product/M/CP-LG-32UN500-W-1.jpg",
    imagen1: "https://www.cyberpuerta.mx/img/product/M/CP-LG-32UN500-W-2.jpg",
    imagen2: "https://www.cyberpuerta.mx/img/product/M/CP-LG-32UN500-W-3.jpg",
  },
  {
    id: 225,
    nombre:
      "Monitor Samsung LU28R550UQLXZX LED 28, 4K Ultra HD, Widescreen, HDMI, Azul/Gris",
    marca: "Samsung",
    precio: {
      Dolares: "412.63",
      PesosMX: "8069.00",
      PesosArg: "49793.69",
    },
    caracteristicas: {
      "Diagonal de la pantalla": "68,6 cm (27)",
      "Tipo HD": "4K Ultra HD",
      Resolución: "3840 x 2160 Pixeles",
      "Tiempo de respuesta": "5 ms",
      "Velocidad de actualización": "60 Hz",
      "Cantidad de puertos HDMI": "2",
    },
    funciones: "Monitores",
    stock: 0,
    categoria: [{ nombre: "Monitores", id: 16 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-SAMSUNG-LU28R550UQLXZX-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/XL/CP-SAMSUNG-LU28R550UQLXZX-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/XL/CP-SAMSUNG-LU28R550UQLXZX-3.jpg",
  },
  {
    id: 236,
    nombre: "SSD PNY CS900, 240GB, SATA III, 2.5'', 7mm",
    marca: "PNY",
    precio: {
      Dolares: "29.61",
      PesosMX: "579.00",
      PesosArg: "3573.00",
    },
    caracteristicas: {
      Capacidad: "500 GB",
      Interface: "PCI Express 3.0",
      "Velocidad de lectura": "2100 MB/s",
      "Velocidad de escritura": "1700 MB/s",
    },
    funciones: "SSD",
    stock: 0,
    categoria: [{ nombre: "SSD", id: 8 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-PNY-SSD7CS900-240-RB-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-PNY-SSD7CS900-240-RB-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-PNY-SSD7CS900-240-RB-3.jpg",
  },
  {
    id: 237,
    nombre:
      "SSD Western Digital WD Green SN350 NVMe, 240GB, PCI Express 3.0, M.2",
    marca: "Western Digital",
    precio: {
      Dolares: "29.61",
      PesosMX: "579.00",
      PesosArg: "3573.00",
    },
    caracteristicas: {
      Capacidad: "500 GB",
      Interface: "PCI Express 3.0",
      "Velocidad de lectura": "2100 MB/s",
      "Velocidad de escritura": "1700 MB/s",
    },
    funciones: "SSD",
    stock: 0,
    categoria: [{ nombre: "SSD", id: 8 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-WESTERNDIGITAL-WDS240G2G0C-1.png",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-WESTERNDIGITAL-WDS240G2G0C-2.png",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-WESTERNDIGITAL-WDS240G2G0C-3.png",
  },
  {
    id: 238,
    nombre: "SSD XPG Spectrix S40G, 512GB, PCI Express 3.0, M.2",
    marca: "XPG",
    precio: {
      Dolares: "62.88",
      PesosMX: "1,229.00",
      PesosArg: "7584.14",
    },
    caracteristicas: {
      Capacidad: "500 GB",
      Interface: "PCI Express 3.0",
      "Velocidad de lectura": "2100 MB/s",
      "Velocidad de escritura": "1700 MB/s",
    },
    funciones: "SSD",
    stock: 0,
    categoria: [{ nombre: "SSD", id: 8 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-AS40G-512GT-C-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-AS40G-512GT-C-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-AS40G-512GT-C-3.jpg",
  },
  {
    id: 239,
    nombre: "SSD Adata SWORDFISH 3D NAND, 250GB, PCI Express, M.2 2280",
    marca: "Adata",
    precio: {
      Dolares: "62.88",
      PesosMX: "1,229.00",
      PesosArg: "7584.14",
    },
    caracteristicas: {
      Capacidad: "500 GB",
      Interface: "PCI Express 3.0",
      "Velocidad de lectura": "2100 MB/s",
      "Velocidad de escritura": "1700 MB/s",
    },
    funciones: "SSD",
    stock: 0,
    categoria: [{ nombre: "SSD", id: 8 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-ADATA-ASWORDFISH-250G-C-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-ADATA-ASWORDFISH-250G-C-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-ADATA-ASWORDFISH-250G-C-3.jpg",
  },
  {
    id: 240,
    nombre: "SSD XPG GAMMIX S41 3D NAND, 512GB, PCI Express, M.2",
    marca: "XPG",
    precio: {
      Dolares: "62.88",
      PesosMX: "1,229.00",
      PesosArg: "7584.14",
    },
    caracteristicas: {
      Capacidad: "500 GB",
      Interface: "PCI Express 3.0",
      "Velocidad de lectura": "2100 MB/s",
      "Velocidad de escritura": "1700 MB/s",
    },
    funciones: "SSD",
    stock: 0,
    categoria: [{ nombre: "SSD", id: 8 }],
    imagen0:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-AGAMMIXS41-512G-C-1.jpg",
    imagen1:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-AGAMMIXS41-512G-C-2.jpg",
    imagen2:
      "https://www.cyberpuerta.mx/img/product/M/CP-XPG-AGAMMIXS41-512G-C-3.jpg",
  },
  {
    id: 222,
    nombre:
      "Monitor Gamer LG 27UL500-W LED 27, 4K Ultra HD, Widescreen, FreeSync, HDMI, Plata",
    marca: "LG",
    precio: {
      Dolares: "340.53",
      PesosMX: "6,659.00",
      PesosArg: "130216.41",
    },
    caracteristicas: {
      "Diagonal de la pantalla": "68,6 cm (27)",
      "Tipo HD": "4K Ultra HD",
      Resolución: "3840 x 2160 Pixeles",
      "Tiempo de respuesta": "5 ms",
      "Velocidad de actualización": "60 Hz",
      "Cantidad de puertos HDMI": "2",
    },
    funciones: "Monitores",
    stock: 0,
    categoria: [{ nombre: "Monitores", id: 16 }],
    imagen0: "https://www.cyberpuerta.mx/img/product/XL/CP-LG-27UL500-W-4.jpg",
    imagen1: "https://www.cyberpuerta.mx/img/product/XL/CP-LG-27UL500-W-1.jpg",
    imagen2: "https://www.cyberpuerta.mx/img/product/XL/CP-LG-27UL500-W-2.jpg",
  },
];

router.get("/", async (req, res) => {
  const { name } = req.query;
  if (name) {
    try {
      const search_products = await Producto.findAll({
        where: { nombre: { [Op.iLike]: `%${name}%` } },
      });
      if (search_products.length > 0) {
        res.json(search_products);
      } else {
        res.send("No encontrado");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const all_products = await Producto.findAll({
        include: Categoria,
      });
      if (all_products.length > 0) {
        res.json(all_products);
      } else {
        res.send("No hay productos");
      }
    } catch (error) {
      console.log(error);
    }
  }
});

/* ESTA RUTA ES PARA OBTENER LOS NOMBRES LO LOS PRODUCTOS MIENTRAS TIPEO EN EL INPUT, TIPO GOOGLE */
router.get("/:name", async (req, res) => {
  const { name } = req.params;
  console.log(name);
  if (name) {
    try {
      const search_products = await Producto.findAll({
        include: Categoria,
        where: { nombre: { [Op.iLike]: `%${name}%` } },
      });
      if (search_products.length > 0) {
        res.json(
          search_products
            .map((elm) => elm.nombre.slice(0, (elm.nombre.length * 40) / 100))
            .slice(0, 9)
        );
      } else {
        res.send("No encontrado");
      }
    } catch (error) {
      console.log(error);
    }
  }
});

router.post("/create", async (req, res) => {
  try {
    _productos?.map(async(elem) => {
      
      let producto =await Producto.create({
        nombre: elem.nombre,
        marca: elem.marca,
        precio: elem.precio,
        caracteristicas: elem.caracteristicas,
        funciones: elem.funciones,
        stock: elem.stock,
        imagen0: elem.imagen0,
        imagen1: elem.imagen1,
        imagen2: elem.imagen2,
      })
      await producto.addCategoria(elem.categoria[0].id);
    });
    res.json("Se agrego la información correctamente");
  } catch (error) {
    console.log(error);
  }
});

router.put("/update", async (req, res) => {
  const { id, name, completed, active } = req.body;
  if (!id) {
    res.send("Falto el id!");
  } else if (id && !name && !completed && !active) {
    res.send("Falto informacion!");
  } else if (id && name && !completed && !active) {
    const todo = await Producto.findOne({ where: { id } });
    todo.name = name;
    await todo.save();
    res.json(todo);
  } else if (id && name && completed && !active) {
    const todo = await Producto.findOne({ where: { id } });
    todo.name = name;
    todo.completed = completed;
    await todo.save();
    res.json(todo);
  } else if (id && !name && completed && !active) {
    const todo = await Producto.findOne({ where: { id } });
    todo.completed = completed;
    await todo.save();
    res.json(todo);
  } else if (id && !name && !completed && active) {
    const todo = await Producto.findOne({ where: { id } });
    todo.active = active;
    await todo.save();
    res.json(todo);
  } else if (id && name && completed && active) {
    const todo = await Producto.findOne({ where: { id } });
    todo.name = name;
    todo.completed = completed;
    todo.active = active;
    await todo.save();
    res.json(todo);
  }
});

router.delete("/delete", async (req, res) => {
  const { id } = req.query;
  try {
    const deleted_todo = await Producto.destroy({ where: { id } });
    if (deleted_todo >= 1) {
      res.send("Producto eliminado con exito");
    } else {
      res.send("Hubo un error");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product_detail = await Producto.findOne({
      include: Categoria,
      where: { id: id },
    });
    product_detail ? res.json(product_detail) : res.send("No hay productos!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
