import { request, response } from "express";
import mongoose from "mongoose";
import { Usuario } from "../models/usuario.js";
import { Category } from "../models/category.js";
import { Product } from "../models/producto.js";

const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoId = mongoose.isValidObjectId(termino);

  if (esMongoId) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};

const buscarCategorias = async (termino = "", res = response) => {
  const esMongoId = mongoose.isValidObjectId(termino);

  if (esMongoId) {
    const categoria = await Category.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const categoria = await Category.find({ nombre: regex, estado: true });

  res.json({
    results: categoria,
  });
};

const buscarProductos = async (termino = "", res = response) => {
  const esMongoId = mongoose.isValidObjectId(termino);

  if (esMongoId) {
    const productos = await Product.findById(termino).populate(
      "categoria",
      "nombre"
    );
    return res.json({
      results: productos ? [productos] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const productos = await Product.find({
    nombre: regex,
    estado: true,
  }).populate("categoria", "nombre");

  res.json({
    results: productos,
  });
};

export const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas} `,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "No hay categoria de búsqueda",
      });
  }
};
