document.querySelector("#new-date").valueAsDate = new Date();
let div = document.getElementById("add_task_container");
let taskList = [];
class Task {
    constructor(name, description, important, date, tag) {
        this.name = name;
        this.description = description;
        this.important = important;
        this.date = date;
        this.tag = tag;
    }

    get Name() {
        return this.name;
    }

    set Name(name) {
        this.name = name;
    }
    get Description() {
        return this.description;
    }
    set Description(description) {
        this.description = description;
    }
    get Important() {
        return this.important;
    }
    set Important(important) {
        this.important = important;
    }
    get Date() {
        return this.date;
    }
    set Date(date) {
        this.date = date;
    }
    get Tag() {
        return this.tag;
    }
    set Tag(tag) {
        this.tag = tag;
    }
}

/**
 * Display or hide Add task area
 */
const setupEvent = () => {
    document.getElementById("new-task-button").addEventListener("click", () => {
        generateTask();
        displayOrHideAddTask();
        clearInput();
    });

    document.getElementById("add_task_button").addEventListener("click", () => {
        displayOrHideAddTask();
    });
};

const displayOrHideAddTask = () => {
    if (
        window.getComputedStyle(div, null).getPropertyValue("display") == "none"
    ) {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
};

const clearInput = () => {
    let textInput = document.getElementsByClassName("text-input");
    let dateInput = document.getElementById("new-date");
    let importantInput = document.getElementById("new-important");
    let tagInput = document.getElementById("new-select");
    for (const elem of textInput) {
        elem.value = "";
    }
    dateInput.valueAsDate = new Date();
    importantInput.checked = true ? (importantInput.checked = false) : "";
    tagInput.value = "To do";
};

const generateArticle = (task) => {
    let article = document.createElement("article");
    let name = document.createElement("p");
    let description = document.createElement("p");
    let important = document.createElement("img");
    let tag = document.createElement("span");

    name.innerHTML = task.name;
    description.innerHTML = task.description;
    important.src = "assets/images/sort_by_priority.svg";
    tag.innerHTML = task.tag;
    

    article.appendChild(name);
    article.appendChild(important);
    article.appendChild(description);
    article.appendChild(tag);
    return article;
};

function generateTask() {
    let nameInput = document.getElementById("new-name");
    let descriptionInput = document.getElementById("new-description");
    let dateInput = document.getElementById("new-date");
    let importantInput = document.getElementById("new-important");
    let tagInput = document.getElementById("new-select");

    let task = new Task(
        nameInput.value,
        descriptionInput.value,
        importantInput.checked,
        dateInput.value,
        tagInput.value
    );
    taskList.push(task)
    let article = generateArticle(task);
    document.body.children[1].children[1].appendChild(article);
}
setupEvent();
