import { response, request } from "express";
import { Usuario } from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generar-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";

export const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //Verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Passwrod no son correctos - correo",
      });
    }

    //Si el usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario / Passwrod no son correctos - estado: false",
      });
    }

    //Verificar la contraseña
    const validaPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validaPassword) {
      return res.status(400).json({
        msg: "Usuario / Passwrod no son correctos - password",
      });
    }

    //Genrar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { nombre, img, correo } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      //Tengo que crearlo
      const data = {
        nombre,
        correo,
        password: ":p",
        img,
        rol: "User_role",
        google: true,
      };

      usuario = new Usuario(data);

      await usuario.save();
    }

    //Si el usuario en base DB
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    //Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "El token no se pudo verificar",
    });
  }
};
