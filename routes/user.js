import { Router } from "express";
import { check, validationResult } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { emailExiste, esRoleValido } from "../helpers/db-validators.js";
import {
  usuariosDelete,
  usuariosGet,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
} from "../controllers/users.js";

export const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El pasword debe ser más de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail().custom(emailExiste),
    // check("rol", "No es un rol permitido").isIn(["Admin_role", "User_role"]),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);

router.put("/:id", usuariosPut);

router.patch("/", usuariosPatch);

router.delete("/", usuariosDelete);
