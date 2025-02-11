require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Conexión a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware de autenticación
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Acceso denegado" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token inválido" });
    req.user = decoded;
    next();
  });
};

// Rutas
app.get("/", (req, res) => res.send("API funcionando 🚀"));

// Ruta protegida
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Ruta protegida!", user: req.user });
});

// Registro de usuario
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
      [email, hashedPassword]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// Login de usuario
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) return res.status(401).json({ error: "Credenciales inválidas" });

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error en el login" });
  }
});

// Iniciar servidor
app.listen(port, () => console.log(`Servidor en http://localhost:${port}`));
