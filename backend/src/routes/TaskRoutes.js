const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

// Criar nova tarefa
router.post("/", async (req, res) => {
    try {
        const { title, description, status } = req.body; // Agora captura o status corretamente
        const task = new Task({ title, description, status }); // Adiciona o status
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar a tarefa" });
    }
});

// Obter todas as tarefas
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar tarefas" });
    }
});

// Atualizar tarefa
router.put("/:id", async (req, res) => {
    try {
        const { title, description, status } = req.body; // Adicionando status na atualização
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status },
            { new: true }
        );
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar a tarefa" });
    }
});

// Deletar tarefa
router.delete("/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Tarefa removida" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar a tarefa" });
    }
});

module.exports = router;
