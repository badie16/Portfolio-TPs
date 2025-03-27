document.addEventListener("DOMContentLoaded", function () {
	//  DOM
	const taskList = document.getElementById("taskList");
	const searchInput = document.getElementById("searchInput");
	const sortAlphaBtn = document.getElementById("sortAlphaBtn");
	const clearCompletedBtn = document.getElementById("clearCompletedBtn");
	const clearCompletedForm = document.getElementById("clearCompletedForm");
	const filterBtns = document.querySelectorAll(".filter-btn");
	const darkModeToggle = document.getElementById("darkModeToggle");
	const editTaskModal = document.getElementById("editTaskModal");
	const editTaskForm = document.getElementById("editTaskForm");
	const editTaskText = document.getElementById("editTaskText");
	const editTaskId = document.getElementById("editTaskId");
	const cancelEditBtn = document.getElementById("cancelEdit");
	const closeModalBtn = document.querySelector(".close");

	let tasks = [];
	function loadTasksFromLocalStorage() {
		const storedTasks = localStorage.getItem("tasks");
		if (storedTasks) {
			try {
				return JSON.parse(storedTasks);
			} catch (e) {
				console.error("Erreur lors du chargement des tâches:", e);
				return [];
			}
		}
		return [];
	}
	function saveTasksToLocalStorage(tasks) {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}

	function syncTasksWithDOM() {
		tasks = [];
		const taskItems = document.querySelectorAll(".task-item");

		taskItems.forEach((item) => {
			const id = item.getAttribute("data-id");
			const text = item.querySelector(".task-text").textContent;
			const completed = item.classList.contains("completed");

			tasks.push({
				id: id,
				text: text,
				completed: completed,
			});
		});

		saveTasksToLocalStorage(tasks);
	}
	function initTasks() {
		if (taskList.children.length === 0) {
			tasks = loadTasksFromLocalStorage();
			renderTasks(tasks);
		} else {
			syncTasksWithDOM();
		}
	}

	function renderTasks(tasksToRender) {
		taskList.innerHTML = "";

		tasksToRender.forEach((task) => {
			const li = document.createElement("li");
			li.className = `task-item ${task.completed ? "completed" : ""}`;
			li.setAttribute("data-id", task.id);

			li.innerHTML = `
                <div class="task-content">
                    <div class="task-checkbox-container">
                        <form method="post" action="" class="toggle-form">
                            <input type="hidden" name="action" value="toggle">
                            <input type="hidden" name="taskId" value="${
															task.id
														}">
                            <input type="checkbox" class="task-checkbox" ${
															task.completed ? "checked" : ""
														}>
                        </form>
                    </div>
                    <span class="task-text">${task.text}</span>
                </div>
                <div class="task-actions">
                    <button class="btn-edit" data-id="${
											task.id
										}" data-text="${task.text.replace(/"/g, "&quot;")}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <form method="post" action="" class="delete-form">
                        <input type="hidden" name="action" value="delete">
                        <input type="hidden" name="taskId" value="${task.id}">
                        <button type="submit" class="btn-delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </form>
                </div>
            `;

			taskList.appendChild(li);
		});

		addEventListenersToTasks();
	}

	function addEventListenersToTasks() {
		document.querySelectorAll(".btn-edit").forEach((btn) => {
			btn.addEventListener("click", function () {
				const taskId = this.getAttribute("data-id");
				const taskText = this.getAttribute("data-text");

				editTaskId.value = taskId;
				editTaskText.value = taskText;
				editTaskModal.style.display = "block";
			});
		});

		document.querySelectorAll(".task-checkbox").forEach((checkbox) => {
			checkbox.addEventListener("change", function () {
				const form = this.closest("form");
				form.submit();
			});
		});
	}

	function searchTasks(query) {
		query = query.toLowerCase();

		const taskItems = document.querySelectorAll(".task-item");
		taskItems.forEach((item) => {
			const text = item.querySelector(".task-text").textContent.toLowerCase();
			if (text.includes(query)) {
				item.style.display = "flex";
			} else {
				item.style.display = "none";
			}
		});
	}

	function sortTasksAlphabetically() {
		const taskItems = Array.from(document.querySelectorAll(".task-item"));
		{
			const taskItems = Array.from(document.querySelectorAll(".task-item"));

			taskItems.sort((a, b) => {
				const textA = a.querySelector(".task-text").textContent.toLowerCase();
				const textB = b.querySelector(".task-text").textContent.toLowerCase();
				return textA.localeCompare(textB);
			});

			taskList.innerHTML = "";
			taskItems.forEach((item) => {
				taskList.appendChild(item);
			});

			syncTasksWithDOM();
		}
	}
	function filterTasks(filter) {
		const taskItems = document.querySelectorAll(".task-item");

		taskItems.forEach((item) => {
			const isCompleted = item.classList.contains("completed");

			switch (filter) {
				case "all":
					item.style.display = "flex";
					break;
				case "active":
					item.style.display = isCompleted ? "none" : "flex";
					break;
				case "completed":
					item.style.display = isCompleted ? "flex" : "none";
					break;
			}
		});
	}
	function toggleDarkMode() {
		document.body.classList.toggle("dark-mode");
		if (document.body.classList.contains("dark-mode")) {
			darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
		} else {
			darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
		}
		localStorage.setItem(
			"darkMode",
			document.body.classList.contains("dark-mode")
		);
	}
	function loadDarkModePreference() {
		const darkMode = localStorage.getItem("darkMode") === "true";
		if (darkMode) {
			document.body.classList.add("dark-mode");
			darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
		}
	}
	searchInput.addEventListener("input", function () {
		searchTasks(this.value);
	});

	sortAlphaBtn.addEventListener("click", sortTasksAlphabetically);

	clearCompletedBtn.addEventListener("click", function () {
		clearCompletedForm.submit();
	});

	filterBtns.forEach((btn) => {
		btn.addEventListener("click", function () {
			filterBtns.forEach((b) => b.classList.remove("active"));
			this.classList.add("active");
			const filter = this.getAttribute("data-filter");
			filterTasks(filter);
		});
	});

	darkModeToggle.addEventListener("click", toggleDarkMode);
	closeModalBtn.addEventListener("click", function () {
		editTaskModal.style.display = "none";
	});

	cancelEditBtn.addEventListener("click", function () {
		editTaskModal.style.display = "none";
	});

	window.addEventListener("click", function (event) {
		if (event.target === editTaskModal) {
			editTaskModal.style.display = "none";
		}
	});
	initTasks();
	loadDarkModePreference();
});
