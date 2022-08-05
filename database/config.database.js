const mongoose = require("mongoose");

const dbConnect = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, { autoIndex: true });

		console.log("Connected");
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	dbConnect,
};
