const router = require("express").Router();
const { UserModel, validateUser } = require("../Models/UserModel"); // Importa el modelo User

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.error("Error al consultar la colección User en MongoDB:", error);
    res.status(500).json({
      error: "Error al consultar la colección User en MongoDB",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error)
      return res
        .status(400)
        .json({ message: error.details[0].message || "Datos inválidos" });

    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).json({ message: "Se creo User from correctamente" });
  } catch (error) {
    console.error(
      "Error al guardar la entrada en la colección User en MongoDB:",
      error
    );
    res.status(500).json({
      message: "Error al guardar la entrada en la colección User en MongoDB",
    });
  }
});
