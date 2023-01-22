const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  name: {
    type: String,
    required: [true, "the name is requered"],
  },
  email: {
    type: String,
    required: [true, "the email is requered"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "the password is requered"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["ADMIN_ROL", "USER_ROL"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};
module.exports = model("Usuario", UsuarioSchema);
