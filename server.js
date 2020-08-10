const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const items = require("./routes/api/items");

const app = express();

app.use(bodyParser.json());

db = require("./config/keys").mongoURI;
mongoose
	.connect(db)
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.log(err));

app.use("/api/items", items);

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
// Serve static assets If in production
if (process.env.NODE_ENV === "production") {
	//Set static folder
	app.use(express.static("client/build"));
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
