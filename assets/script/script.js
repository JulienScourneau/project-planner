document.querySelector("#new-date").valueAsDate = new Date();
let div = document.getElementById("add_task_container");
let taskList = [];
console.log(document.getElementById("new-name").textContent.length);
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
        let name

        if (document.getElementById("new-name").value !== "") {
            generateTask();
            displayOrHideAddTask();
            clearInput();
        } else {
            displaySnackBar();
        }
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
    console.log(textInput.value);
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
    article.classList.add("task");
    let divHead = document.createElement("div");
    divHead.classList.add("task__head");
    let divContent = document.createElement("div");
    divContent.classList.add("task__content");
    let name = document.createElement("h3");
    name.classList.add("task__head__name");
    name.contentEditable = "false"
    let description = document.createElement("p");
    description.classList.add("task__content__description");
    let important = document.createElement("img");
    important.classList.add("task__head__img");
    let tag = document.createElement("span");
    tag.classList.add("task__head__tag");
    let time = document.createElement("time");
    time.classList.add("task__content__time");
    let timeText = document.createElement("p");
    timeText.classList.add("task__content__time__text");
    let timeIcon = document.createElement("img");
    timeIcon.classList.add("task__content__time__img");

    name.innerHTML = task.name;
    description.innerHTML = task.description;
    important.src = "assets/images/sort_by_priority.svg";
    if (!task.important) {
        important.style.visibility = "hidden";
    }
    tag.innerHTML = task.tag;
    timeIcon.src = "assets/images/time_left.png";
    switch (task.tag) {
        case "Doing":
            article.classList.add("task-doing");
            tag.classList.add("doing");
            break;
        case "Done":
            article.classList.add("task-done");
            tag.classList.add("done");
            break;
        default:
            article.classList.add("task-todo");
            tag.classList.add("todo");
            break;
    }

    divHead.appendChild(name);
    divHead.appendChild(important);
    divHead.appendChild(tag);
    divContent.appendChild(description);
    time.appendChild(timeText);
    time.appendChild(timeIcon);
    divContent.appendChild(time);
    article.appendChild(divHead);
    article.appendChild(divContent);
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
    taskList.push(task);
    let article = generateArticle(task);
    document.body.children[1].children[1].appendChild(article);
}
const displaySnackBar = () => {
    let snackbar = document.getElementById("snackbar");
    snackbar.className = "show";
    setTimeout(function () {
        snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
};

setupEvent();
