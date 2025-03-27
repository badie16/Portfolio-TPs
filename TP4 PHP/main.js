// Fonctionnalités JavaScript pour l'exercice 5
document.addEventListener("DOMContentLoaded", function () {
	// Toggle liste
	const toggleListBtn = document.getElementById("toggleList");
	const itemListContainer = document.getElementById("itemListContainer");

	toggleListBtn.addEventListener("click", function () {
		if (itemListContainer.style.display === "none") {
			itemListContainer.style.display = "block";
			toggleListBtn.innerHTML =
				'<i class="fas fa-eye-slash"></i> Cacher la liste';
		} else {
			itemListContainer.style.display = "none";
			toggleListBtn.innerHTML = '<i class="fas fa-eye"></i> Afficher la liste';
		}
	});

	// Filtrer les éléments
	const filterInput = document.getElementById("filterInput");
	const items = document.querySelectorAll("#itemList .list-item");

	filterInput.addEventListener("input", function () {
		const filterValue = this.value.toLowerCase();

		items.forEach((item) => {
			const text = item.querySelector(".item-text").textContent.toLowerCase();
			if (text.includes(filterValue)) {
				item.style.display = "flex";
			} else {
				item.style.display = "none";
			}
		});
	});

	// Supprimer un élément
	const deleteButtons = document.querySelectorAll(".delete-btn");

	deleteButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const id = this.getAttribute("data-id");
			const item = document.querySelector(`.list-item[data-id="${id}"]`);
			item.remove();
		});
	});

	// Mode sombre
	const darkModeBtn = document.getElementById("darkModeBtn");

	darkModeBtn.addEventListener("click", function () {
		document.body.classList.toggle("dark-mode");

		if (document.body.classList.contains("dark-mode")) {
			this.innerHTML = '<i class="fas fa-sun"></i> Mode Clair';
		} else {
			this.innerHTML = '<i class="fas fa-moon"></i> Mode Sombre';
		}
	});

	// Fonctionnalités pour le mode sombre global
	const darkModeToggle = document.getElementById("darkModeToggle");

	darkModeToggle.addEventListener("click", function () {
		document.body.classList.toggle("dark-mode");

		if (document.body.classList.contains("dark-mode")) {
			this.innerHTML = '<i class="fa-solid fa-sun"></i>';
		} else {
			this.innerHTML = '<i class="fa-solid fa-moon"></i>';
		}
	});

	// Fonctionnalités pour la To-Do List
	const todoInput = document.getElementById("todoInput");
	const addTodoBtn = document.getElementById("addTodo");
	const clearCompletedBtn = document.getElementById("clearCompleted");
	const todoList = document.getElementById("todoList");

	// Ajouter une tâche
	addTodoBtn.addEventListener("click", function () {
		const text = todoInput.value.trim();
		if (text) {
			const id = Date.now();

			const li = document.createElement("li");
			li.className = "todo-item";
			li.setAttribute("data-id", id);

			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.className = "todo-checkbox";

			const span = document.createElement("span");
			span.className = "todo-text";
			span.textContent = text;

			const deleteBtn = document.createElement("button");
			deleteBtn.className = "delete-todo-btn";
			deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';

			li.appendChild(checkbox);
			li.appendChild(span);
			li.appendChild(deleteBtn);
			todoList.appendChild(li);

			todoInput.value = "";

			// Ajouter les événements
			checkbox.addEventListener("change", toggleComplete);
			deleteBtn.addEventListener("click", deleteTodo);
		}
	});

	// Marquer comme terminée
	function toggleComplete() {
		const todoItem = this.parentElement;
		todoItem.classList.toggle("completed");
	}

	// Supprimer une tâche
	function deleteTodo() {
		const todoItem = this.parentElement;
		todoItem.remove();
	}

	// Supprimer les tâches terminées
	clearCompletedBtn.addEventListener("click", function () {
		const completedItems = document.querySelectorAll(".todo-item.completed");
		completedItems.forEach((item) => item.remove());
	});

	// Ajouter les événements aux éléments existants
	document.querySelectorAll(".todo-checkbox").forEach((checkbox) => {
		checkbox.addEventListener("change", toggleComplete);
	});

	document.querySelectorAll(".delete-todo-btn").forEach((button) => {
		button.addEventListener("click", deleteTodo);
	});
});
