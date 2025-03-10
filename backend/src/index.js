const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB conectado"))
.catch(err => console.error("❌ Erro ao conectar ao MongoDB:", err));

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));

const taskRoutes = require("./routes/TaskRoutes");
app.use("/api/tasks", taskRoutes);
