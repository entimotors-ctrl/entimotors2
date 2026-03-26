import { Router, type IRouter } from "express";
import rifaRouter from "./rifa.js"; // <-- Importado arriba del todo
import healthRouter from "./health.js";
import productsRouter from "./products.js";
import projectsRouter from "./projects.js";
import videosRouter from "./videos.js";
import adminAuthRouter from "./admin-auth.js";

const router: IRouter = Router();

// 🚨 MUY IMPORTANTE: Montamos la rifa de primero con su prefijo exacto
// Esto evita que las otras rutas "golosas" se coman la petición y den error 404.
router.use("/rifa", rifaRouter);

// Tus demás rutas originales quedan intactas
router.use(healthRouter);
router.use(adminAuthRouter);
router.use(productsRouter);
router.use(projectsRouter);
router.use(videosRouter);

export default router;
