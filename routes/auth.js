const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validate-fields");

const router = Router();

router.post(
  "/login",
  [
    check("email", "the email is invalid").isEmail(),
    check("password", "the password is required").not().isEmpty(),
    check(
      "password",
      "the password must have a minimum of 6 characters"
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  login
);
module.exports = router;
