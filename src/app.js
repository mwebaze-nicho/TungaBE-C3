require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth");
// const gradeRoutes = require("./routes/grades");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

const app = express();

app.use(express.json());
//documentation for the api
const options = {
  customCss:
    ".swagger-container .swagger-ui { max-width: 1100px; margin: auto; } .swagger-ui .topbar { display: none } .swagger-ui { background: #00000e6; }",
  customSiteTitle: "SMS API",
};
app.use("/api/api-docs", swaggerUi.serve);
app.get("/api/api-docs", swaggerUi.setup(swaggerDocument, options));

app.use("/api/auth", authRoutes);

module.exports = app;
