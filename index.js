const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.static("public"));

app.use("/api/auth", require("./routes/auth"));

app.listen(process.env.API_PORT, () => {
	console.log(`Servidor corriendo en ${process.env.API_PORT}`)
});
