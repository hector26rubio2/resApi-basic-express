const Rol = require("../models/rol");
const User = require("../models/usuario");

const isRolValid = async (rol = "") => {
  const existeRol = await Rol.findOne({ rol });
  if (!existeRol) {
    throw new Error(`the rol ${rol} no exist`);
  }
};
const emailExist = async (email) => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`the email ${email}, already exists`);
  }
};

const userExistById = async (id) => {
  const userExistById = await User.findById(id);

  if (!userExistById) {
    throw new Error(`there is no user with that id ${id}`);
  }
};
module.exports = {
  isRolValid,
  emailExist,
  userExistById,
};
