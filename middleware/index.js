const express = require("express");
const app = express();
const cors = require("cors");

const port = 3333;

// cors are enabled but not set up correctly
app.use(cors());

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "I'm alive!" });
});

app.use("/getData", require("./routes/getData"));

app.get("*", (req, res) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

// start the Express server
app.listen(port, () => {
  console.log("server started at http://localhost:" + port);
});
