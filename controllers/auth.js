const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/usuario");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.state) {
      return res.status(400).json({
        mgs: "the password or the email are not valid",
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        mgs: "the password or the email are not valid",
        validPassword,
      });
    }
    const token = await generateJWT(user.id);
    res.json({
      user,

      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mgs: "contact the administrator",
    });
  }
};
module.exports = {
  login,
};
