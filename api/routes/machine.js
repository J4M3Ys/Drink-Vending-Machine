const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const Machine = require("../controllers/machine");
const router = express.Router();

router.post("/machine", authenticateToken, Machine.Create);
router.get("/machine", authenticateToken, Machine.GetList);
router.get("/machine/web", Machine.GetListWeb);
router.put("/machine/:id", authenticateToken, Machine.Update);
router.get("/machine/:id", authenticateToken, Machine.GetByID);
router.delete("/machine/:id", authenticateToken, Machine.Delete);

module.exports = router;
