import { request, response } from "express";

export const esAdminRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se requiere verificar el role sin validar el token primero.",
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== "Admin_role") {
    return res.status(401).json({
      msg: `${nombre} no es un administrador - No pude hacer eso`,
    });
  }

  next();
};

export const tieneRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se requiere verificar el role sin validar el token primero.",
      });
    }

    if (roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`,
      });
    }

    next();
  };
};
