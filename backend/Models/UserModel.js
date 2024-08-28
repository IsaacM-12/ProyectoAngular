const mongoose = require("mongoose");
const Joi = require("joi");

/**
 * Modelo de usuario.
 */
const userSchema = new mongoose.Schema(
  {
    ID: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    strategicPlans_ListIDS: { type: [String], required: true },
  },
  { strict: "throw" }
);

/**
 * Función de validación de datos de usuario.
 * @param {Object} data - Datos a validar.
 * @returns {Object} - Objeto con los errores y el valor.
 */
const validateUser = (data) => {
  const schema = Joi.object({
    ID: Joi.string().required().label("ID"),
    name: Joi.string().min(1).max(255).required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
    strategicPlans_ListIDS: Joi.array().items(Joi.string()).required().label("Strategic Plans List IDs"),
  });
  return schema.validate(data);
};

// Definición del modelo de usuario
const User = mongoose.model("User", userSchema);

// Exportación del modelo y la función de validación
module.exports = { User, validateUser };
