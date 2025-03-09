// Mode dark
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", function () {
	document.body.classList.toggle("dark-mode");
});

/*start exercice 1*/
const arrayInput = document.getElementById("arrayInput");
const addToArrayBtn = document.getElementById("addToArray");
const sortArrayBtn = document.getElementById("sortArray");
const removeLastBtn = document.getElementById("removeLastElement");
const arrayList = document.getElementById("arrayList");

let myArray = [];

function updateArrayDisplay() {
	arrayList.innerHTML = "";
	myArray.forEach((item) => {
		const li = document.createElement("li");
		li.textContent = item;
		li.classList.add("fade-in");
		arrayList.appendChild(li);
	});
}
addToArrayBtn.addEventListener("click", function () {
	const value = arrayInput.value.trim();
	if (value) {
		myArray.push(value);
		updateArrayDisplay();
		arrayInput.value = "";
		setTimeout(() => {
			arrayList.lastChild.classList.add("highlight");
		}, 10);
	}
});

sortArrayBtn.addEventListener("click", function () {
	myArray.sort();
	updateArrayDisplay();
});

removeLastBtn.addEventListener("click", function () {
	if (myArray.length > 0) {
		myArray.pop();
		updateArrayDisplay();
	}
});
arrayInput.addEventListener("keypress", function (e) {
	if (e.key === "Enter") {
		addToArrayBtn.click();
	}
});
/*end exercice 1*/
/*start exercice 2*/
class Personne {
	constructor(nom, age, ville) {
		this.nom = nom;
		this.age = age;
		this.ville = ville;
	}

	sePresenter() {
		console.log(
			`Bonjour, je m'appelle ${this.nom}, j'ai ${this.age} ans et j'habite à ${this.ville}.`
		);
		return `Bonjour, je m'appelle ${this.nom}, j'ai ${this.age} ans et j'habite à ${this.ville}.`;
	}
}
const personForm = document.getElementById("personForm");
const personList = document.getElementById("personList");
let personnes = [];
function updatePersonDisplay() {
	personList.innerHTML = "";
	personnes.forEach((personne) => {
		const li = document.createElement("li");
		li.classList.add("person");
		li.classList.add("fade-in");
		const info = document.createElement("div");
		info.textContent = `${personne.nom}, ${personne.age} ans`;
		const presentBtn = document.createElement("button");
		presentBtn.textContent = "Se présenter";
		presentBtn.addEventListener("click", function () {
			alert(personne.sePresenter());
		});
		li.appendChild(info);
		li.appendChild(presentBtn);
		personList.appendChild(li);
	});
}
personForm.addEventListener("submit", function (e) {
	e.preventDefault();
	const nom = document.getElementById("personName").value.trim();
	const age = parseInt(document.getElementById("personAge").value);
	const ville = document.getElementById("personCity").value.trim();
	if (nom && !isNaN(age) && ville) {
		const personne = new Personne(nom, age, ville);
		personnes.push(personne);
		updatePersonDisplay();
		personForm.reset();
	}
});

/*end exercice 2*/
/*start exercice 3*/
const numberInput = document.getElementById("numberInput");
const calculateBtn = document.getElementById("calculate");
const calcResult = document.getElementById("calcResult");

// Calculer le carré et la racine carrée
calculateBtn.addEventListener("click", function () {
	const number = parseFloat(numberInput.value);
	if (!isNaN(number)) {
		const square = number * number;
		const squareRoot = Math.sqrt(number);

		calcResult.innerHTML = `
                <p>Nombre: <strong>${number}</strong></p>
                <p>Carré: <strong>${square}</strong></p>
                <p>Racine carrée: <strong>${squareRoot.toFixed(2)}</strong></p>
            `;
		calcResult.classList.add("fade-in");
	}
});
const number1Input = document.getElementById("number1");
const number2Input = document.getElementById("number2");
const calculateSumBtn = document.getElementById("calculateSum");
const sumResult = document.getElementById("sumResult");
// Calculer la somme
calculateSumBtn.addEventListener("click", function () {
	const num1 = parseFloat(number1Input.value);
	const num2 = parseFloat(number2Input.value);

	if (!isNaN(num1) && !isNaN(num2)) {
		const sum = num1 + num2;
		sumResult.innerHTML = `
                <p>La somme de ${num1} et ${num2} est <strong>${sum}</strong></p>
            `;
		sumResult.classList.add("fade-in");
	}
});

const primeInput = document.getElementById("primeInput");
const checkPrimeBtn = document.getElementById("checkPrime");
const primeResult = document.getElementById("primeResult");
// Vérifier si un nombre est premier
function isPrime(num) {
	if (num <= 1) {
		return false;
	} else {
		for (let i = 2; i < num; i++) {
			if (num % i === 0) {
				return false;
			}
		}
	}
	return true;
}

checkPrimeBtn.addEventListener("click", function () {
	const number = parseInt(primeInput.value);
	if (!isNaN(number)) {
		const result = isPrime(number);
		primeResult.innerHTML = `
                <p>Le nombre ${number} ${
			result ? "est" : "n'est pas"
		} un nombre premier.</p>
            `;
		primeResult.classList.add("fade-in");
	}
});
/*end exercice 3*/
/*start exercice 4*/
const decrementBtn = document.getElementById("decrementBtn");
const incrementBtn = document.getElementById("incrementBtn");
const resetBtn = document.getElementById("resetBtn");
const counterValue = document.getElementById("counterValue");
let count = 0;
function updateCounter() {
	counterValue.textContent = count;
	counterValue.classList.remove("positive", "negative");

	if (count > 0) {
		counterValue.classList.add("positive");
	} else if (count < 0) {
		counterValue.classList.add("negative");
	}
}
incrementBtn.addEventListener("click", function () {
	count++;
	updateCounter();
});
decrementBtn.addEventListener("click", function () {
	count--;
	updateCounter();
});
resetBtn.addEventListener("click", function () {
	count = 0;
	updateCounter();
});
/*end exercice 4*/
/*start exercice 5*/

const itemInput = document.getElementById("itemInput");
const addItemBtn = document.getElementById("addItem");
const toggleListBtn = document.getElementById("toggleList");
const filterInput = document.getElementById("filterInput");
const itemList = document.getElementById("itemList");
const itemListContainer = document.getElementById("itemListContainer");

addItemBtn.addEventListener("click", function () {
	const value = itemInput.value.trim();
	if (value) {
		const li = document.createElement("li");
		li.classList.add("item", "fade-in");
		const span = document.createElement("span");
		span.textContent = value;
		const deleteBtn = document.createElement("button");
		deleteBtn.textContent = "Supprimer";
		deleteBtn.addEventListener("click", function () {
			li.remove();
		});
		li.appendChild(span);
		li.appendChild(deleteBtn);
		itemList.appendChild(li);
		itemInput.value = "";
	}
});
itemInput.addEventListener("keypress", function (e) {
	if (e.key === "Enter") {
		addItemBtn.click();
	}
});
toggleListBtn.addEventListener("click", function () {
	if (itemListContainer.style.display === "none") {
		itemListContainer.style.display = "block";
		toggleListBtn.textContent = "Cacher la liste";
	} else {
		itemListContainer.style.display = "none";
		toggleListBtn.textContent = "Afficher la liste";
	}
});

filterInput.addEventListener("input", function () {
	const filterValue = this.value.toLowerCase();
	const items = itemList.querySelectorAll(".item");
	items.forEach((item) => {
		const text = item.querySelector("span").textContent.toLowerCase();
		if (text.includes(filterValue)) {
			item.style.display = "flex";
		} else {
			item.style.display = "none";
		}
	});
});
/*end exercice 5*/
/*start to-do list*/
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodo");
const clearCompletedBtn = document.getElementById("clearCompleted");
const todoList = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
	localStorage.setItem("todos", JSON.stringify(todos));
}

function updateTodoDisplay() {
	todoList.innerHTML = "";

	todos.forEach((todo, index) => {
		const li = document.createElement("li");
		li.classList.add("todo-item", "fade-in");
		if (todo.completed) {
			li.classList.add("completed");
		}

		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.checked = todo.completed;
		checkbox.addEventListener("change", function () {
			toggleTodoComplete(index);
		});

		const span = document.createElement("span");
		span.textContent = todo.text;

		const deleteBtn = document.createElement("button");
		deleteBtn.textContent = "Supprimer";
		deleteBtn.addEventListener("click", function () {
			deleteTodo(index);
		});

		li.appendChild(checkbox);
		li.appendChild(span);
		li.appendChild(deleteBtn);
		todoList.appendChild(li);
	});
}

function addTodo(text) {
	todos.push({
		text: text,
		completed: false,
	});
	saveTodos();
	updateTodoDisplay();
}
function toggleTodoComplete(index) {
	todos[index].completed = !todos[index].completed;
	saveTodos();
	updateTodoDisplay();
}

function deleteTodo(index) {
	todos.splice(index, 1);
	saveTodos();
	updateTodoDisplay();
}

function clearCompleted() {
	todos = todos.filter((todo) => !todo.completed);
	saveTodos();
	updateTodoDisplay();
}

addTodoBtn.addEventListener("click", function () {
	const text = todoInput.value.trim();

	if (text) {
		addTodo(text);
		todoInput.value = "";
	}
});
todoInput.addEventListener("keypress", function (e) {
	if (e.key === "Enter") {
		addTodoBtn.click();
	}
});
clearCompletedBtn.addEventListener("click", clearCompleted);
updateTodoDisplay();
/*end to-do list*/
