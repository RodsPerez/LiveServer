import { response, request } from "express";
import { Usuario } from "../models/usuario.js";
import bcryptjs from "bcryptjs";

const usuariosGet = (req = request, res = response) => {
  const { q, nombre, apikey } = req.query;

  res.json({
    msg: "get API desde el controlador",
    q,
    nombre,
    apikey,
  });
};

const usuariosPost = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({
    nombre,
    correo,
    password,
    rol,
  });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en BD

  await usuario.save();

  res.status(201).json({
    usuario,
  });
};

const usuariosPut = (req, res) => {
  const { id } = req.params;

  res.json({
    msg: "put API",
    id,
  });
};

const usuariosPatch = (req, res) => {
  res.json({
    msg: "patch API",
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    msg: "delete API",
  });
};

export {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
