import { response, request } from "express";
import { Category } from "../models/category.js";
import mongoose from "mongoose";

//obtenerCtaegorias - paginado - total - populate

export const obtenerCategorias = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [categorias, total] = await Promise.all([
    Category.find(query)
      .populate("usuario", "nombre")
      .limit(Number(limite))
      .skip(Number(desde)),
    Category.countDocuments(query),
  ]);

  res.json({
    total,
    categorias: categorias,
  });
};

//ObtenerCategoria - populate {}

export const categoriaID = async (req = request, res = response) => {
  const { id } = req.params;

  const categoria = await Category.findById(id).populate("usuario", "nombre");

  res.status(200).json({
    categoria: categoria,
  });
};

//Crear Categoria

export const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Category.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre}, ya existe`,
    });
  }

  //Generar la data a guardar

  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const category = new Category(data);

  //Guardar DB

  await category.save();

  res.status(201).json(category);
};

//Actualizar Categoria

export const actualizarCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const categoriaDB = await Category.findOne({ nombre: data.nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre}, ya existe`,
    });
  }

  const category = await Category.findByIdAndUpdate(id, data, { new: true });

  res.status(200).json(category);
};

//Borrar Categoria - Actualizar

export const borrarCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  const category = await Category.findByIdAndUpdate(id, { estado: false });

  res.status(200).json(category);
};
