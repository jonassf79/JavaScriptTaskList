const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["pendente", "andamento", "concluido"], default: "pendente" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Atualiza o campo `updatedAt` automaticamente antes de salvar
taskSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
