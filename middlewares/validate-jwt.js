const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/usuario");

const validateToken = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "missing token",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    // * leer user  que correspondeal uid
    const user = await User.findById(uid);
    if (!user || !user.state) {
      return res.status(401).json({
        msg: "Invalid Token - user delete",
      });
    }

    req.user = user;
  } catch (error) {}
  next();
};
module.exports = { validateToken };

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};