var express = require("express");
var app = express();

app.use(express.static("public"));

app.listen(3000, function() {
	console.log("Edit.or listening on port 3000");
})