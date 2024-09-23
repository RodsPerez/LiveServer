import express from "express";
import cors from "cors";
import { router } from "../routes/user.js";

import { dbConnection } from "../db/config.js";
import { routerAuth } from "../routes/auth.js";

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    this.authPath = "/api/auth";

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
    this.app.use(this.authPath, routerAuth);
    this.app.use(this.usuariosPath, router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}
