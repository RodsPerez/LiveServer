import { Router } from "express";
import { check, validationResult } from "express-validator";

import { validarCampos } from "../middlewares/validar-campos.js";
import { actualizarImagen, cargarArchivo } from "../controllers/uploads.js";
import { coleccionesPermitidas } from "../helpers/db-validators.js";
import { validarArchivo } from "../middlewares/validar-archivo.js";

export const routerUpload = Router();

routerUpload.post("/", validarArchivo, cargarArchivo);

routerUpload.patch(
  "/:coleccion/:id",
  [
    validarArchivo,
    check("id", "El id debe de ser de mongo").isMongoId(),
    check("coleccion").custom((coleccion) =>
      coleccionesPermitidas(coleccion, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  actualizarImagen
);
