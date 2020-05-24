require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

// Middlewares
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "client", "build", "index.html"))
);

require("./startup/routes")(app);
require("./startup/cors")(app);

app.listen(8080, () => console.log("Server is listening on port 8080"));
