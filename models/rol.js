const { Schema, model } = require("mongoose");

const RolSchema = Schema({
  rol: {
    type: String,
    required: [true, "the rol is required"],
  },
});

module.exports = model("Rol", RolSchema, "roles");
