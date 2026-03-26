import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import productsRouter from "./products.js";
import projectsRouter from "./projects.js";
import videosRouter from "./videos.js";
import adminAuthRouter from "./admin-auth.js";
import rifaRouter from "./rifa.js"; // <-- Importamos nuestro nuevo módulo

const router: IRouter = Router();

router.use(healthRouter);
router.use(adminAuthRouter);
router.use(productsRouter);
router.use(projectsRouter);
router.use(videosRouter);
router.use(rifaRouter); // <-- Lo conectamos a la red principal

export default router;
