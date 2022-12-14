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

app.get("*", (req = express.request, res = express.response) => {
	res.sendFile(`${__dirname}/public/index.html`);
});

app.listen(process.env.PORT || 4000, () => {
	console.log(`Servidor corriendo en ${process.env.PORT || 4000}`);
});
