const router = require("express").Router();
const {
  StrategicPlanModel,
  validateStrategicPlan,
} = require("../Models/StrategicPlanModel"); // Importa el modelo StrategicPlanModel

router.get("/", async (req, res) => {
  try {
    const strategicPlans = await StrategicPlanModel.find();
    res.json(strategicPlans);
  } catch (error) {
    console.error(
      "Error al consultar la colección StrategicPlanModel en MongoDB:",
      error
    );
    res.status(500).json({
      error: "Error al consultar la colección StrategicPlanModel en MongoDB",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validateStrategicPlan(req.body);
    if (error)
      return res
        .status(400)
        .json({ message: error.details[0].message || "Datos inválidos" });

    const newStrategicPlan = new StrategicPlanModel(req.body);
    await newStrategicPlan.save();
    res
      .status(201)
      .json({ message: "Se creo StrategicPlanModel from correctamente" });
  } catch (error) {
    console.error(
      "Error al guardar la entrada en la colección StrategicPlanModel en MongoDB:",
      error
    );
    res.status(500).json({
      message:
        "Error al guardar la entrada en la colección StrategicPlanModel en MongoDB",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del parámetro de la URL
    const result = await StrategicPlanModel.findByIdAndDelete(id);
    if (!result) {
      return res
        .status(404)
        .json({ message: "StrategicPlanModel no encontrado" });
    }
    res.json({ message: "StrategicPlanModel eliminado correctamente" });
  } catch (error) {
    console.error(
      "Error al eliminar la entrada en la colección StrategicPlanModel en MongoDB:",
      error
    );
    res.status(500).json({
      message:
        "Error al eliminar la entrada en la colección StrategicPlanModel en MongoDB",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validateStrategicPlan(req.body);
    if (error)
      return res
        .status(400)
        .json({ message: error.details[0].message || "Datos inválidos" });

    const updatedStrategicPlan = await StrategicPlanModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedStrategicPlan) {
      return res
        .status(404)
        .json({ message: "StrategicPlanModel no encontrado" });
    }

    res.json({
      message: "StrategicPlanModel actualizado correctamente",
      data: updatedStrategicPlan,
    });
  } catch (error) {
    console.error(
      "Error al actualizar la entrada en la colección StrategicPlanModel en MongoDB:",
      error
    );
    res.status(500).json({
      message:
        "Error al actualizar la entrada en la colección StrategicPlanModel en MongoDB",
    });
  }
});
module.exports = router;
