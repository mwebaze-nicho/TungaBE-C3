const router = require("express").Router();
const fs = require("fs");

router.get("/users", (req, res) => {

  res.status(200).json({
    message: "Hello router"
  });
});

module.exports = router;
