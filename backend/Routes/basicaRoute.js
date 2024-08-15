const router = require("express").Router();
const { Basica } = require("../Models/basicaModel"); // Importa el modelo Basica

// Ruta para obtener todas las entradas de la colección "basica"
router.get("/", async (req, res) => {
  try {
    // Busca todos los documentos en la colección "basica"
    const basicaEntries = await Basica.find();
    // Devuelve los documentos como JSON
    res.json(basicaEntries);
  } catch (error) {
    console.error("Error al consultar la colección basica en MongoDB:", error);
    res.status(500).json({ error: "Error al consultar la colección basica en MongoDB" });
  }
});

module.exports = router;
