import Router from "express";
import { buscar } from "../controllers/buscar.js";

export const routerSearch = Router();

routerSearch.get("/:coleccion/:termino", buscar);
