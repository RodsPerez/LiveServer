import { response, request } from "express";
import { Product } from "../models/producto.js";
import mongoose from "mongoose";

//obtenerProductos - paginado - total - populate

export const obtenerProductos = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [productos, total] = await Promise.all([
    Product.find(query)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre")
      .limit(Number(limite))
      .skip(Number(desde)),
    Product.countDocuments(query),
  ]);

  res.json({
    total,
    productos: productos,
  });
};

//ObtenerProducto - populate {}

export const productoID = async (req = request, res = response) => {
  const { id } = req.params;

  const producto = await Product.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.status(200).json({
    producto: producto,
  });
};

//Crear Producto

export const crearProducto = async (req = request, res = response) => {
  const { estado, usuario, ...body } = req.body;

  const productoDB = await Product.findOne({ nombre: body.nombre });

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre}, ya existe`,
    });
  }

  //Generar la data a guardar

  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id,
  };

  const product = new Product(data);

  //Guardar DB

  await product.save();

  res.status(201).json(product);
};

//Actualizar Producto

export const actualizarProducto = async (req = request, res = response) => {
  const { id } = req.params;

  const { estado, usuario, ...data } = req.body;

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }

  data.usuario = req.usuario._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.status(200).json(product);
};

//Borrar Producto - Actualizar

export const borrarProducto = async (req = request, res = response) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.status(200).json(product);
};
