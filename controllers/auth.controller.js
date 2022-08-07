const { request, response } = require("express");
const bcrypt = require("bcryptjs");

const UserModel = require("../models/user.model");

const { generateJWT } = require("../helpers/jwt.helper");

const register = async (req = request, res = response) => {
	try {
		const { email, password } = req.body;

		let user = await UserModel.findOne({ email });

		if (user) {
			return res.status(400).json({
				ok: false,
				message: "El usuario ya existe",
			});
		}

		user = new UserModel(req.body);

		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		await user.save();

		const token = await generateJWT(user._id, user.name);

		res.status(201).json({
			ok: true,
			uid: user._id,
			name: user.name,
			token,
		});
	} catch (error) {
		console.log(`Ocurrió el siguiente error: [${error.message}]`);

		res.status(500).json({
			ok: false,
			message: "Error al registrar el usuario",
		});
	}
};

const login = async (req = request, res = response) => {
	try {
		const { email, password } = req.body;

		const user = await UserModel.findOne({ email });

		if (!user) {
			return res.status(400).json({
				ok: false,
				message: "El usuario no existe",
			});
		}

		const isValid = bcrypt.compareSync(password, user.password);

		if (!isValid) {
			return res.status(400).json({
				ok: false,
				message: "La contraseña es incorrecta",
			});
		}

		const token = await generateJWT(user._id, user.name);

		res.json({
			ok: true,
			uid: user._id,
			name: user.name,
			token,
		});
	} catch (error) {
		console.log(`Ocurrió el siguiente error: [${error.message}]`);

		res.status(500).json({
			ok: false,
			message: "Error al iniciar sesión con el usuario",
		});
	}
};

const refresh = async (req = request, res = response) => {
	const uid = req.uid;
	const name = req.name;

	const token = await generateJWT(uid, name);

	res.json({
		ok: true,
		token,
	});
};

module.exports = {
	register,
	login,
	refresh,
};
