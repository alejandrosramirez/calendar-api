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
		const { uid, name } = jwt.verify(token, process.env.API_SECRET_JWT);

		req.uid = uid;
		req.name = name;
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
