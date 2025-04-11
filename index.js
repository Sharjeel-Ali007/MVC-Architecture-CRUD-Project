const express = require("express");
const app = express();
const studentRoutes = require("./routes/studentRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/students", studentRoutes);

app.listen(3000, () => console.log("Server listening on port 3000"));
