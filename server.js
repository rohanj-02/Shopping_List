const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const items = require("./routes/api/items");

const app = express();

app.use(bodyParser.json());

// db = require("./config/keys").mongoURI;
db = process.env.mongoURI;

mongoose
	.connect(db)
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.log(err));

app.use("/api/items", items);

// Serve static assets If in production
app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client/build")));
	//
	app.get("*", (req, res) => {
		res.sendfile(path.join((__dirname = "client/build/index.html")));
	});
}
//build mode
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/public/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
