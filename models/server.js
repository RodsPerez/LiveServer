import express from "express";
import cors from "cors";
import { router } from "../routes/user.js";

import { dbConnection } from "../db/config.js";
import { routerAuth } from "../routes/auth.js";
import { routerCategory } from "../routes/categories.js";
import { routerProduct } from "../routes/productos.js";
import { routerSearch } from "../routes/buscar.js";

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      buscar: "/api/buscar",
      categorias: "/api/categories",
      productos: "/api/productos",
      usuarios: "/api/usuarios",
    };

    //Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    //Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //Cors
    this.app.use(cors());

    //Parse y lectura del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, routerAuth);
    this.app.use(this.paths.categorias, routerCategory);
    this.app.use(this.paths.buscar, routerSearch);
    this.app.use(this.paths.productos, routerProduct);
    this.app.use(this.paths.usuarios, router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}
