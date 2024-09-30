import path from "path";
import fs from "fs";
import { response, request } from "express";
import { subirArchivo } from "../helpers/subir-archivo.js";
import { Usuario } from "../models/usuario.js";
import { Product } from "../models/producto.js";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const cargarArchivo = async (req = request, res = response) => {
  try {
    //txt, md
    // const nombre = await subirArchivo(req.files, ["txt", "md"], "textos");

    const nombre = await subirArchivo(req.files, undefined, "imgs");

    res.json({
      nombre,
    });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

export const actualizarImagen = async (req, res = response) => {
  const { coleccion, id } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);

      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }

      break;

    case "productos":
      modelo = await Product.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({ msg: "Se me olvido validar esto" });
  }

  //Limpiar imagenes previas
  if (modelo.img) {
    //Hay qe borrar la imagen del servidro
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );

    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);

  modelo.img = nombre;

  await modelo.save();

  res.json(modelo);
};

export const mostrarImage = async (req, res = response) => {
  const { coleccion, id } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);

      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }

      break;

    case "productos":
      modelo = await Product.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`,
        });
      }

      break;

    default:
      return res.status(500).json({ msg: "Se me olvido validar esto" });
  }

  //Limpiar imagenes previas
  if (modelo.img) {
    //Hay qe borrar la imagen del servidro
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );

    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }

  const pathImagen = path.join(__dirname, "../assets/no-image.jpg");
  res.sendFile(pathImagen);
};
