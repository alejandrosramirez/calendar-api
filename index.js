const express = require("express");
require("dotenv").config();

const { dbConnect } = require("./database/config.database");

const app = express();

dbConnect();

app.use(express.static("public"));

app.use(express.json());

app.use("/api/auth", require("./routes/auth.route"));

app.listen(process.env.API_PORT, () => {
	console.log(`Servidor corriendo en ${process.env.API_PORT}`);
});
