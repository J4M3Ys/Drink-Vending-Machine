const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const Product = require("../controllers/product");
const router = express.Router();

router.post("/product", authenticateToken, Product.Create);
router.get("/product", authenticateToken, Product.GetList);
router.get(
  "/machine-product/:id",
  authenticateToken,
  Product.GetListMachineProduct
);
router.get("/machine-product/web/:id", Product.GetListMachineProduct);
router.put("/product/:id", authenticateToken, Product.Update);
router.get("/product/:id", authenticateToken, Product.GetByID);
router.delete("/product/:id", authenticateToken, Product.Delete);
router.put("/buy-product/:id", Product.BuyProduct);

module.exports = router;
