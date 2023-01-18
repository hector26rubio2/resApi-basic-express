const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  isRolValid,
  emailExist,
  userExistById,
} = require("../helpers/db-validators");

const {
  postUser,
  getUsers,
  putUser,
  deleteUser,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", getUsers);

router.post(
  "/",
  [
    check("name", "the name is requerid").not().isEmpty(), // ? esto es un middlewar
    check(
      "password",
      "the password must have a minimum of 6 characters"
    ).isLength({ min: 6 }),
    check("email", "the email is invalid").isEmail(),
    check("email").custom(emailExist), // ? esto es un middlewar
    // check("rol", "not a valid role").isIn(["ADMIN_ROL", "USER_ROL"]),
    check("rol").custom(isRolValid),
    validarCampos,
  ],
  postUser
);

router.put(
  "/:id",
  [
    check("id", "not a valid id").isMongoId(),
    check("id").custom(userExistById),
    validarCampos,
  ],
  putUser
);

router.delete(
  "/:id",
  [
    check("id", "not a valid id").isMongoId(),
    check("id").custom(userExistById),
    validarCampos,
  ],
  deleteUser
);
module.exports = router;
