import { Router } from "express";
import { createClient } from "@supabase/supabase-js";

// Conexión a Supabase
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

const router = Router();

// Lógica para registrar el código. 
// Nota: La ruta aquí es solo "/registrar" porque el prefijo "/api/rifa" se lo daremos en el index.ts
router.post("/registrar", async (req, res) => {
  console.log("🟢 Petición de rifa recibida:", req.body); // Rastreador para tus logs en Render

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
      if (error.code === "23505") { // Código SQL de duplicado
        res.status(400).json({ error: "Alguien más ya registró este código." });
        return;
      }
      throw error;
    }

    res.status(200).json({ success: true, message: "Código registrado correctamente" });
  } catch (error) {
    console.error("🔴 Error al registrar en la rifa:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

export default router;
