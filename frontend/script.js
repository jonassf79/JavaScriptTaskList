const API_URL = "http://localhost:5000/api/tasks"; // Atualize conforme necessário

// Função para carregar as tarefas do backend
async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erro ao carregar tarefas");
        const tasks = await response.json();

        const taskList = document.getElementById("task-list");
        if (!taskList) {
            console.error("Elemento task-list não encontrado");
            return;
        }
        taskList.innerHTML = ""; // Limpa a lista antes de atualizar

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${task.title}</strong>
                <p>${task.description}</p>
                <span class="status ${task.status}">${task.status}</span>
                <small>Criado em: ${new Date(task.createdAt).toLocaleString()}</small>
                <button onclick="deleteTask('${task._id}')">Excluir</button>
            `;
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error(error.message);
    }
}

// Adiciona uma nova tarefa
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("task-form");
    const titleInput = document.getElementById("task-title");
    const descInput = document.getElementById("task-desc");
    const statusSelect = document.getElementById("task-status");

    if (!form || !titleInput || !descInput || !statusSelect) {
        console.error("Erro: Elementos do formulário não encontrados");
        return;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const title = titleInput.value.trim();
        const description = descInput.value.trim();
        const status = statusSelect.value;

        if (!title || !description || !status) {
            console.error("Erro: Preencha todos os campos.");
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, status })
            });

            if (!response.ok) throw new Error("Erro ao adicionar a tarefa.");

            loadTasks(); // Recarrega as tarefas
            form.reset(); // Limpa o formulário
        } catch (error) {
            console.error(error.message);
        }
    });

    // Carrega as tarefas ao iniciar
    loadTasks();
});

// Remove uma tarefa
async function deleteTask(taskId) {
    try {
        const response = await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Erro ao excluir a tarefa");
        loadTasks();
    } catch (error) {
        console.error(error.message);
    }
}
