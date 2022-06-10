const { Router } = require("express");

const router = Router();

router.put("/", (req, res) => {
  const { rol } = req.body;
});

module.exports = router;
