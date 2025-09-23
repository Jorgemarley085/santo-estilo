const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function createUser({ nome, email, password, role = "cliente" }) {
  // Verifica se email já existe
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("Email já cadastrado");

  // Criptografa senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Cria usuário
  return await prisma.user.create({
    data: {
      nome,
      email,
      password: hashedPassword,
      role,
    },
  });
}

async function loginUser({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Usuário não encontrado");

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) throw new Error("Senha incorreta");

  // Retorna dados essenciais
  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
    role: user.role,
  };
}

module.exports = { createUser, loginUser };
