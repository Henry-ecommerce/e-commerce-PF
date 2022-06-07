const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  const { registro } = req;
  res.json({ registro });
});

module.exports = router;
