import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import productsRouter from "./products.js";
import projectsRouter from "./projects.js";
import videosRouter from "./videos.js";
import adminAuthRouter from "./admin-auth.js";
import { createClient } from "@supabase/supabase-js"; // Importamos Supabase

// --- CONEXIÓN A SUPABASE ---
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

const router: IRouter = Router();

// Tus rutas originales
router.use(healthRouter);
router.use(adminAuthRouter);
router.use(productsRouter);
router.use(projectsRouter);
router.use(videosRouter);

// ==========================================
// RUTA DE LA RIFA (Integrada al sistema)
// ==========================================
// Ojo: Como este archivo ya maneja todo lo que empieza con "/api", 
// solo necesitamos decirle la parte final de la ruta: "/rifa/registrar"
router.post("/rifa/registrar", async (req, res) => {
  const { codigo, nombre, telefono } = req.body;

  if (!codigo || !nombre || !telefono) {
    res.status(400).json({ error: "Todos los campos son obligatorios" });
    return;
  }

  try {
    const { data, error } = await supabase
      .from("rifa")
      .insert([{ codigo, nombre, telefono }]);

    if (error) {
      // 23505 = Llave Primaria Duplicada
      if (error.code === "23505") {
        res.status(400).json({ error: "Alguien más ya registró este código." });
        return;
      }
      throw error;
    }

    res.status(200).json({ success: true, message: "Código registrado correctamente" });
  } catch (error) {
    console.error("Error al registrar en la rifa:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

export default router;
