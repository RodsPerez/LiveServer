import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const subirArchivo = (
  files,
  extesnionesValidas = ["png", "jpg", "jpeg", "gift"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;

    const nombreCortado = archivo.name.split(".");

    const extension = nombreCortado[nombreCortado.length - 1];

    //Validar la extension

    if (!extesnionesValidas.includes(extension)) {
      return reject(
        `La extesnión ${extension} no es permitida, ${extesnionesValidas}`
      );
    }

    const nombreTemp = uuidv4() + "." + extension;

    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(nombreTemp);
    });
  });
};
