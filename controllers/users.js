import { response, request } from "express";

const usuariosGet = (req = request, res = response) => {
  const { q, nombre, apikey } = req.query;

  res.json({
    msg: "get API desde el controlador",
    q,
    nombre,
    apikey,
  });
};

const usuariosPost = (req, res) => {
  const { nombre, edad } = req.body;
  res.status(201).json({
    msg: "post API",
    nombre,
    edad,
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
