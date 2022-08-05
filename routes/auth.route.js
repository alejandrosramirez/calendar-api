const { Router } = require("express");
const { check } = require("express-validator");

const { authenticated } = require("../middlewares/authenticated.middleware");
const { validator } = require("../middlewares/validator.middleware");
const { register, login, refresh } = require("../controllers/auth.controller");

const router = Router();

router.post(
	"/register",
	[
		check("name", "El campo nombre es obligatorio").not().isEmpty(),
		check("email", "El campo email es obligatorio").isEmail(),
		check(
			"password",
			"El campo contraseña debe de ser de 6 caracteres"
		).isLength({ min: 6 }),
		validator,
	],
	register
);
router.post(
	"/login",
	[
		check("email", "El campo email es obligatorio").isEmail(),
		check(
			"password",
			"El campo contraseña debe de ser de 6 caracteres"
		).isLength({ min: 6 }),
		validator,
	],
	login,
);
router.get("/refresh", authenticated, refresh);

module.exports = router;
