const Router = require("express");
const router = new Router();

router.post("/registration");
router.post("/login");
router.get("/auth", (req, res) => {
  res.json({ message: "all users in this list" });
});

module.exports = router;
