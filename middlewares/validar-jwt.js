import { response, request } from "express";
import { Usuario } from "../models/usuario.js";

import jwt from "jsonwebtoken";

export const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //leer el usuario que corresponde al uid

    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe en BD",
      });
    }

    //Verificar si el uid tiene estado en true

    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token no válido - usuario con estado false",
      });
    }

    // req.uid = uid;
    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};
