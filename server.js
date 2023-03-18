const express = require("express");
const app = express();

app.use("/", express.static("dist"));

app.get("/*", (req, res) => {
	res.sendFile(__dirname + "/dist/" + "index.html");
});

app.listen(process.env.PORT || 5000);
console.log(process.env.PORT);