import { Router } from "express";
import { check, validationResult } from "express-validator";
import {
  validarJWT,
  validarCampos,
  esAdminRole,
} from "../middlewares/index.js";
import {
  actualizarCategoria,
  borrarCategoria,
  categoriaID,
  crearCategoria,
  obtenerCategorias,
} from "../controllers/categories.js";
import {
  esRoleValido,
  existeCategoriaPorId,
  existeUsuarioPorId,
} from "../helpers/db-validators.js";

export const routerCategory = Router();

//Obtener todas las categorias público

routerCategory.get("/", obtenerCategorias);

//Obtener una categoria por id - publico
routerCategory.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
  ],
  categoriaID
);

//Crear una nueva categoria - privado - cualquier persona con un token válido
routerCategory.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);
// Actualizar por id - privado - cualquier persona con un token válido
routerCategory.patch(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarCategoria
);
//Borrar una categoria - Admin
routerCategory.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  borrarCategoria
);
