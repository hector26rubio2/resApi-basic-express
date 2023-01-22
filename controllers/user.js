const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/usuario");
/*  TO COMPLETE pagination
 *  completar la paginacion
 *  */
const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);
  res.json({
    total,
    users,
  });
};

const postUser = async (req = request, res = response) => {
  const { name, email, password, rol } = req.body;
  const User = new User({ name, email, password, rol });

  // * encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  User.password = bcryptjs.hashSync(password, salt);
  // * guardar en db
  await User.save();
  // * response
  res.json({
    User,
  });
};

const putUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...data } = req.body;
  // TODO validadr contra la base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync();
    data.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, data);
  res.json({
    user,
  });
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  /**
   * ?  fisicamente  borrar de la base datos
   *   const user = await User.findByIdAndDelete(id);
   */
  // ? quitar acceso(borrado para uso) pero manteniendo registro
  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json({
    user,
  });
};

module.exports = { getUsers, postUser, putUser, deleteUser };
