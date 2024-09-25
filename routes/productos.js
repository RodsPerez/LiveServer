import { Router } from "express";
import { check, validationResult } from "express-validator";
import {
  actualizarProducto,
  borrarProducto,
  crearProducto,
  obtenerProductos,
  productoID,
} from "../controllers/productos.js";
import {
  existeCategoriaPorId,
  existeProductoPorId,
} from "../helpers/db-validators.js";
import {
  esAdminRole,
  validarCampos,
  validarJWT,
} from "../middlewares/index.js";

export const routerProduct = Router();

//Obtener todas los productos público

routerProduct.get("/", obtenerProductos);

//Obtener un producto por id - publico
routerProduct.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoPorId),
  ],
  productoID
);

//Crear un nuevo producto - privado - cualquier persona con un token válido
routerProduct.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de Mongo").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);
// Actualizar por id - privado - cualquier persona con un token válido
routerProduct.patch(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    // check("categoria", "No es un id de Mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);
//Borrar id- Admin
routerProduct.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);
