const jwt = require("jsonwebtoken");

const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const paylod = { uid };
    jwt.sign(
      paylod,
      process.env.SECRETORPRIVATEKEY,
      { expiresIn: "4h" },
      (err, token) => {
        if (err) {
          reject("problems generating the token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generateJWT };
