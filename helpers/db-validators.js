import { Category } from "../models/category.js";
import { Product } from "../models/producto.js";
import { Role } from "../models/role.js";
import { Usuario } from "../models/usuario.js";

export const esRoleValido = async (rol = " ") => {
  const existRol = await Role.findOne({ rol });
  if (!existRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

export const emailExiste = async (correo = "") => {
  //Verificar si el correo existe
  const existEmail = await Usuario.findOne({
    correo,
  });

  if (existEmail) {
    throw new Error(`El correo ${correo} ya esta registrado`);
  }
};

export const existeUsuarioPorId = async (id = "") => {
  //Verificar si el id existe
  const existeUsuario = await Usuario.findOne({
    _id: id,
  });

  if (!existeUsuario) {
    throw new Error(`El id no existe: ${id} `);
  }
};

//Validador de categorias

export const existeCategoriaPorId = async (id = "") => {
  //Verificar si el id existe
  const existeCategoria = await Category.findOne({
    _id: id,
  });

  if (!existeCategoria) {
    throw new Error(`El id no existe: ${id} `);
  }
};

//Validar de productos

export const existeProductoPorId = async (id = "") => {
  //Verificar si el id existe
  const existeProducto = await Product.findOne({
    _id: id,
  });

  if (!existeProducto) {
    throw new Error(`El id no existe: ${id} `);
  }
};
