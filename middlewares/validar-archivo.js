export const validarArchivo = (req, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({ msg: "No hay archivos que subir - validarArchivo" });
    return;
  }

  next();
};
