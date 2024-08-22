const express = require("express");
const app = express();
const userRoutes = require("./routes/users");
const port = 3000;

app.use(express.json());
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log("listening on port " + port);
});
