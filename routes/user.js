const { Router } = require("express");

const {
  postUsaurios,
  getUsaurios,
  putUsaurios,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", getUsaurios);
router.post("/", postUsaurios);
router.put("/:id", putUsaurios);
module.exports = router;
