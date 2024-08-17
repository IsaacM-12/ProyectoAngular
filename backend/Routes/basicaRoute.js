const router = require("express").Router();
const { Basica, validateBasica } = require("../Models/basicaModel"); // Importa el modelo Basica

// Ruta para obtener todas las entradas de la colección "basica"
router.get("/", async (req, res) => {
  try {
    // Busca todos los documentos en la colección "basica"
    const basicaEntries = await Basica.find();
    // Devuelve los documentos como JSON
    res.json(basicaEntries);
  } catch (error) {
    console.error("Error al consultar la colección basica en MongoDB:", error);
    res
      .status(500)
      .json({ error: "Error al consultar la colección basica en MongoDB" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validateBasica(req.body); // Validar usando Joi o Mongoose
    if (error) return res.status(400).json({ message: "Datos inválidos" });

    const newBasicaEntry = new Basica(req.body);
    await newBasicaEntry.save();
    res.status(201).json({ message: "Se logro correctamente" });
  } catch (error) {
    console.error(
      "Error al guardar la entrada en la colección basica en MongoDB:",
      error
    );
    res.status(500).json({
      message: "Error al guardar la entrada en la colección basica en MongoDB",
    });
  }
});

module.exports = router;
