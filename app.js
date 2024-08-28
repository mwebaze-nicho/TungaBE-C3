const express = require("express");
const app = express();
const userRoutes = require("./routes/users");
const port = 3000;

//third party middleware
const morgan = require("morgan");

app.use(express.json());
app.use("/api", userRoutes);

//middleware in express
// app.use((req, res, next) => {
//   console.log(`${req.method}. ${req.url}`);

//   const urlSource = req.url;

//   //Only allow "/"
//   if (urlSource !== "/") {
//     res.send("Wrong URL: " + urlSource);
//     return;
//   }
//   next();
// });

//Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errorMessage: err.message,
  });
});

//third party middleware
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post(
  "/new/user",

  //check if user if an admin
  (req, res, next) => {
    const user = req.body;
    if (user.name != "admin") {
      res.send("Unauthorized name.");
      return;
    }

    next();
  },

  //if admin, make a post request
  (req, res) => {
    res.json({
      user: req.body.name,
      message: "Right user",
    });
  }
);

app.listen(port, () => {
  console.log("listening on port " + port);
});
