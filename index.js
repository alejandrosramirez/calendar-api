const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { dbConnect } = require("./database/config.database");

const app = express();

dbConnect();

app.use(cors());

app.use(express.static("public"));

app.use(express.json());

app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/events", require("./routes/event.route"));

app.listen(process.env.API_PORT, () => {
	console.log(`Servidor corriendo en ${process.env.API_PORT}`);
});
