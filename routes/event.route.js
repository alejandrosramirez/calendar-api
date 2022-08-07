const { Router } = require("express");
const { check } = require("express-validator");

const { authenticated } = require("../middlewares/authenticated.middleware");
const { validator } = require("../middlewares/validator.middleware");
const {
	index,
	store,
	show,
	update,
	destroy,
} = require("../controllers/event.controller");

const { isDate } = require("../helpers/is-date.helper");

const router = Router();

router.use(authenticated);

router.get("/", index);
router.post(
	"/",
	[
		check("title", "El campo título es obligatorio").not().isEmpty(),
		check("start", "El campo fecha de inicio es obligatoria").custom(isDate),
		check("end", "El campo fecha de fin es obligatoria").custom(isDate),
		validator,
	],
	store
);
router.get("/:id", show);
router.put(
	"/:id",
	[
		check("title", "El campo título es obligatorio").not().isEmpty(),
		check("start", "El campo fecha de inicio es obligatoria").custom(isDate),
		check("end", "El campo fecha de fin es obligatoria").custom(isDate),
		validator,
	],
	update
);
router.delete("/:id", destroy);

module.exports = router;
