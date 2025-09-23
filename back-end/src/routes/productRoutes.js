const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { authenticateToken, isAdmin } = require("../middlewares/authMiddleware");

// listar produtos (aberto para todos)
router.get("/", productController.getProductsController);

// apenas admin
router.post(
  "/",
  authenticateToken,
  isAdmin,
  productController.createProductController
);
router.put(
  "/:id",
  authenticateToken,
  isAdmin,
  productController.updateProductController
);
router.delete(
  "/:id",
  authenticateToken,
  isAdmin,
  productController.deleteProductController
);

module.exports = router;
