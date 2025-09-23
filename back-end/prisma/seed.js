const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
require("dotenv").config();
const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@loja.com";
  const password = process.env.ADMIN_PASSWORD || "123456";
  const nome = process.env.ADMIN_NAME || "Admin Master";
  const role = "admin";

  // Verifica se o admin já existe
  const existingAdmin = await prisma.user.findUnique({ where: { email } });
  if (existingAdmin) {
    console.log("Admin já existe:", existingAdmin.email);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.create({
    data: { nome, email, password: hashedPassword, role },
  });

  console.log("Admin criado com sucesso:", admin.email);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
