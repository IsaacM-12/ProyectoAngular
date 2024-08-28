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

module.exports = router;
