const productService = require("../services/productService");

async function getProductsController(req, res) {
  const produtos = await productService.getAllProducts();
  res.json(produtos);
}

async function createProductController(req, res) {
  try {
    const novo = await productService.addProduct(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function updateProductController(req, res) {
  try {
    const atualizado = await productService.updateProduct(
      req.params.id,
      req.body
    );
    res.json(atualizado);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function deleteProductController(req, res) {
  try {
    const removido = await productService.deleteProduct(req.params.id);
    res.json(removido);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  getProductsController,
  createProductController,
  updateProductController,
  deleteProductController,
};
