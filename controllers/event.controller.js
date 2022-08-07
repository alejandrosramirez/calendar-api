const { request, response } = require("express");

const EventModel = require("../models/event.model");

const index = async (req = request, res = response) => {
	try {
		const events = await EventModel.find({}).populate("user", "name");

		res.json({
			ok: true,
			events,
		});
	} catch (error) {
		console.log(`Ocurrió el siguiente error: [${error.message}]`);

		res.status(500).json({
			ok: false,
			message: "Ocurrió un error al cobtener lps eventos",
		});
	}
};

const store = async (req = request, res = response) => {
	try {
		const event = new EventModel(req.body);

		event.user = req.uid;

		await event.save();

		res.json({
			ok: true,
			event,
		});
	} catch (error) {
		console.log(`Ocurrió el siguiente error: [${error.message}]`);

		res.status(500).json({
			ok: false,
			message: "Ocurrió un error al crear el evento",
		});
	}
};

const show = async (req = request, res = response) => {
	try {
		const event = await EventModel.findById(req.params.id);

		if (!event) {
			return res.status(404).json({
				ok: false,
				message: "El evento no existe",
			});
		}

		res.json({
			ok: true,
			event,
		});
	} catch (error) {
		console.log(`Ocurrió el siguiente error: [${error.message}]`);

		res.status(500).json({
			ok: false,
			message: "Ocurrió un error al obtener el detalle del evento",
		});
	}
};

const update = async (req = request, res = response) => {
	try {
		const event = await EventModel.findById(req.params.id);

		if (!event) {
			return res.status(404).json({
				ok: false,
				message: "El evento no existe",
			});
		}

		if (event.user.toString() !== req.uid) {
			return res.status(403).json({
				ok: false,
				message: "No tiene los permisos para editar el evento",
			});
		}

		event.title = req.body.title;
		if (req.body.notes) {
			event.notes = req.body.notes;
		}
		event.start = req.body.start;
		event.end = req.body.end;
		event.user = req.uid;

		await event.save();

		res.json({
			ok: true,
			event,
		});
	} catch (error) {
		console.log(`Ocurrió el siguiente error: [${error.message}]`);

		res.status(500).json({
			ok: false,
			message: "Ocurrió un error al actualizar el evento",
		});
	}
};

const destroy = async (req = request, res = response) => {
	try {
		const event = await EventModel.findById(req.params.id);

		if (!event) {
			return res.status(404).json({
				ok: false,
				message: "El evento no existe",
			});
		}

		if (event.user.toString() !== req.uid) {
			return res.status(403).json({
				ok: false,
				message: "No tiene los permisos para eliminar el evento",
			});
		}

		await event.delete();

		res.json({
			ok: true,
		});
	} catch (error) {
		console.log(`Ocurrió el siguiente error: [${error.message}]`);

		res.status(500).json({
			ok: false,
			message: "Ocurrió un error al eliminar el evento",
		});
	}
};

module.exports = {
	index,
	store,
	show,
	update,
	destroy,
};
