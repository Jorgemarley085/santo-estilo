const authService = require("../services/authServices");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

async function register(req, res) {
  const { nome, email, password } = req.body;
  try {
    const user = await authService.createUser({ nome, email, password });
    res.status(201).json({ message: "Usuário criado!", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await authService.loginUser({ email, password });
    const token = jwt.sign(
      { id: user.id, role: user.role, nome: user.nome },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, role: user.role, nome: user.nome });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { register, login };
