const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const authenticated = (req = request, res = response, next) => {
	const token = req.header("x-token");

	if (!token) {
		return res.status(401).json({
			ok: false,
			message: "No existe el token en la petición",
		});
	}

	try {

	} catch (error) {
		return res.status(401).json({
			ok: false,
			message: "No autenticado",
		});
	}

	next();
};

module.exports = {
	authenticated,
};
