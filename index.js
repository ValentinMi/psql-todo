require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
require("./startup/routes")(app);

app.listen(8080, () => console.log("Server is listening on port 8080"));
