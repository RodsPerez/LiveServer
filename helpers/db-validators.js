import { Role } from "../models/role.js";
import { Usuario } from "../models/usuario.js";
export const esRoleValido = async (rol = " ") => {
  const existRol = await Role.findOne({ rol });
  if (!existRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

export const emailExiste = async (correo = 0) => {
  //Verificar si el correo existe
  const existEmail = await Usuario.findOne({
    correo,
  });

  if (existEmail) {
    throw new Error(`El correo ${correo} ya esta registrado`);
  }
};
