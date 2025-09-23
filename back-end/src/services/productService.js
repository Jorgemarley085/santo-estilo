const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllProducts() {
  return await prisma.product.findMany();
}

async function addProduct(produto) {
  return await prisma.product.create({
    data: {
      name: produto.name,
      price: produto.price,
      size: produto.size,
      imageUrl: produto.imageUrl,
    },
  });
}

async function updateProduct(id, dados) {
  const produto = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });
  if (!produto) throw new Error("produto nao encontrado");
  return await prisma.product.update({
    where: { id: parseInt(id) },
    data: dados,
  });
}

async function deleteProduct(id) {
  const produto = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });
  if (!produto) throw new Error("produto nao encontrado");

  return await prisma.product.delete({ where: { id: parseInt(id) } });
}

module.exports = { getAllProducts, addProduct, updateProduct, deleteProduct };
