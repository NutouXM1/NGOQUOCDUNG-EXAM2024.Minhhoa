const taskInput = document.getElementById("taskName");
const taskError = document.getElementById("taskError");
const saveTask = document.getElementById("saveTask");
const taskContainer = document.getElementById("taskContainer");

let tasks = [];

// Render tasks dynamically
function renderTasks(taskList) {
  taskContainer.innerHTML = "";

  taskList.forEach(task => {
    const card = document.createElement("div");
    card.className = "card shadow-sm mb-3";
    card.innerHTML = `
      <div class="card-body">
        <div class="row align-items-center gy-3">
          <div class="col-12 col-md-4">
            <small class="text-muted d-block">Task</small>
            <span>${task.taskName}</span>
          </div>
          <div class="col-6 col-md-2">
            <small class="text-muted d-block">Priority</small>
            <span class="fw-bold text-${task.priority === "High" ? "danger" : task.priority === "Medium" ? "warning" : "success"}">
              ${task.priority}
            </span>
          </div>
          <div class="col-6 col-md-2">
            <span class="badge ${task.status === "Done" ? "bg-success" : task.status === "In Progress" ? "bg-warning text-dark" : "bg-secondary"}">
              ${task.status}
            </span>
          </div>
          <div class="col-4 col-md-1 text-md-center">
            <button class="btn btn-outline-danger btn-sm delete-btn">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // Delete functionality
    card.querySelector(".delete-btn").addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks(tasks);
    });

    taskContainer.appendChild(card);
  });
}

// Add new task
saveTask.addEventListener("click", () => {
  const taskName = taskInput.value.trim();
  taskError.textContent = "";

  if (taskName === "") {
    taskError.textContent = "Tên Task không được để trống";
    return;
  }

  if (taskName.length > 100) {
    taskError.textContent = "Tên Task không được vượt quá 100 ký tự";
    return;
  }

  const priority = document.querySelector('input[name="priority"]:checked');
  const newTask = {
    id: Date.now(),
    taskName: taskName,
    priority: priority ? priority.nextElementSibling.textContent.trim() : "Low",
    status: "To Do"
  };

  tasks.push(newTask);
  renderTasks(tasks);

  // Close modal after saving
  const modal = bootstrap.Modal.getInstance(document.getElementById("addTaskModal"));
  modal.hide();

  taskInput.value = "";
  document.querySelectorAll('input[name="priority"]').forEach(r => r.checked = false);
});

// Load tasks from JSON
fetch("data.json")
  .then(response => response.json())
  .then(data => {
    tasks = data;
    renderTasks(tasks);
  })
  .catch(error => {
    console.error("Lỗi đọc file JSON:", error);
  });
