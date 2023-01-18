const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
/*  TO COMPLETE pagination
 *  completar la paginacion
 *  */
const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };
  const [total, users] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(from)).limit(Number(limit)),
  ]);
  res.json({
    total,
    users,
  });
};

const postUser = async (req = request, res = response) => {
  const { name, email, password, rol } = req.body;
  const usuario = new Usuario({ name, email, password, rol });

  // * encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  // * guardar en db
  await usuario.save();
  // * response
  res.json({
    usuario,
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

  const user = await Usuario.findByIdAndUpdate(id, data);
  res.json({
    user,
  });
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  /**
   * ?  fisicamente  borrar de la base datos
   *   const user = await Usuario.findByIdAndDelete(id);
   */
  // ? quitar acceso(borrado para uso) pero manteniendo registro 
  const user = await Usuario.findByIdAndUpdate(id, { state: false });

  res.json({
    user,
  });
};

module.exports = { getUsers, postUser, putUser, deleteUser };
