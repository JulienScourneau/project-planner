document.querySelector("#new-date").valueAsDate = new Date();
let div = document.getElementById("add_task_container");
let taskList = [];
let id = 0;
let taskId;
let taskButton = document.getElementById("new-task-button");
let nameInput = document.getElementById("new-name");
let descriptionInput = document.getElementById("new-description");
let dateInput = document.getElementById("new-date");
let importantInput = document.getElementById("new-important");
let tagInput = document.getElementById("new-select");

class Task {
    constructor(name, description, important, date, tag) {
        this.name = name;
        this.description = description;
        this.important = important;
        this.date = date;
        this.tag = tag;
    }
}

/**
 * Setup all event listener
 */
const setupEvent = () => {
    document.getElementById("new-task-button").addEventListener("click", () => {
        if (document.getElementById("new-name").value == "") {
            displaySnackBar("Ajoutez un nom");
        } else if (
            getTimeLeft(document.getElementById("new-date").value) == "0"
        ) {
            displaySnackBar("Date invalide");
        } else {
            if (taskButton.innerHTML == "Sauvegarder") {
                console.log("Save");
                editTask(taskId);
                displayOrHideAddTask();
            } else {
                generateTask();
                displayOrHideAddTask();
            }
        }
    });

    document.getElementById("add_task_button").addEventListener("click", () => {
        taskButton.innerHTML = "Ajouter";
        displayOrHideAddTask();
    });

    document
        .getElementsByClassName("task-container")[0]
        .addEventListener("click", () => {
            closeAddTask();
        });
};

const closeAddTask = () => {
    if (
        window.getComputedStyle(div, null).getPropertyValue("display") ==
        "block"
    )
        div.style.display = "none";
};

const openAddTask = () => {
    let addDiv = document.getElementById("add_task_container");
    taskButton.innerHTML = "Sauvegarder";
    if (addDiv.style.display == "none") {
        addDiv.style.display = "block";
    }
};

/**
 * Display or hide Add task area
 */
const displayOrHideAddTask = () => {
    if (
        window.getComputedStyle(div, null).getPropertyValue("display") == "none"
    ) {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
    clearInput();
};

/**
 * Clear input selection from newTask div
 */
const clearInput = () => {
    let textInput = document.getElementsByClassName("text-input");
    for (const elem of textInput) {
        elem.value = "";
    }
    dateInput.valueAsDate = new Date();
    importantInput.checked = true ? (importantInput.checked = false) : "";
    tagInput.value = "To do";
};

/**
 * Generate an article with all data pass from user in newTask div
 * @param {Task} task
 * @returns
 */
const generateArticle = (task) => {
    //Generate Dom element
    let article = document.createElement("article");
    article.id = id;
    id++;
    article.classList.add("task");
    let divHead = document.createElement("div");
    divHead.classList.add("task__head");
    let divContent = document.createElement("div");
    divContent.classList.add("task__content");
    let divfooter = document.createElement("div");
    divfooter.classList.add("task__footer");
    let name = document.createElement("h3");
    name.classList.add("task__head__name");
    name.contentEditable = "false";
    let description = document.createElement("p");
    description.classList.add("task__content__description");
    let important = document.createElement("img");
    important.classList.add("task__head__img");
    let tag = document.createElement("span");
    tag.classList.add("task__head__tag");
    let time = document.createElement("time");
    time.classList.add("task__footer__time");
    let timeText = document.createElement("p");
    timeText.classList.add("task__footer__time__text");
    let timeIcon = document.createElement("img");
    timeIcon.classList.add("task__footer__time__icon");
    timeIcon.classList.add("icon");
    let editIcon = document.createElement("img");
    editIcon.classList.add("task__footer__edit");
    editIcon.classList.add("icon");

    //Edit event
    editIcon.addEventListener("click", () => {
        openEditTask(article.id);
    });

    //Set data
    name.innerHTML = task.name;
    description.innerHTML = task.description;
    if ((task.description.value = "")) {
        description.style.display = "none";
    }
    important.src = "assets/images/sort_by_priority.svg";
    if (!task.important) {
        important.style.visibility = "hidden";
    }
    timeText.innerHTML = getTimeLeft(task.date) + " days left";
    timeIcon.src = "assets/images/time_left.png";
    editIcon.src = "assets/images/edit.png";
    tag.innerHTML = task.tag;
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

    //Add the elements in the article
    divHead.appendChild(name);
    divHead.appendChild(important);
    divHead.appendChild(tag);
    divContent.appendChild(description);
    time.appendChild(timeText);
    time.appendChild(timeIcon);
    divfooter.appendChild(time);
    divfooter.appendChild(editIcon);
    article.appendChild(divHead);
    article.appendChild(divContent);
    article.appendChild(divfooter);
    document.getElementById("task-container").appendChild(article);
};

/**
 * Get input from user to create a new task object
 */
function generateTask() {
    let task = new Task(
        nameInput.value,
        descriptionInput.value,
        importantInput.checked,
        dateInput.value,
        tagInput.value
    );
    taskList.push(task);
    generateArticle(task);
}

/**
 * Show snackbar
 */
const displaySnackBar = (message) => {
    let snackbar = document.getElementById("snackbar");
    snackbar.className = "show";
    snackbar.innerHTML = message;
    setTimeout(function () {
        snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
};

/**
 *Get days left between select day and today
 * @param {Date} date
 */
const getTimeLeft = (date) => {
    let today = new Date();
    let newDate = new Date(date);
    let day = newDate.getTime() - today.getTime();

    if (Math.ceil(day / (1000 * 3600 * 24)) <= -1) return "0";
    if (Math.ceil(day / (1000 * 3600 * 24)) <= 0) return "1";
    return Math.ceil(day / (1000 * 3600 * 24));
};

/**
 * Open the window for editing the selected task
 * @param {int} id
 */
const openEditTask = (id) => {
    setTimeout(openAddTask, 1);
    taskId = id;
    let updatedTask = taskList[id];
    nameInput.value = updatedTask.name;
    descriptionInput.value = updatedTask.description;
    dateInput.valueAsDate = new Date(updatedTask.date);
    importantInput.checked = updatedTask.important;
    tagInput.value = updatedTask.tag;
};

const editTask = (id) => {
    let article = document.getElementById(id);
    article.querySelector("h3").innerHTML = nameInput.value;
    importantInput.checked
        ? (article.getElementsByClassName(
              "task__head__img"
          )[0].style.visibility = "visible")
        : (article.getElementsByClassName(
              "task__head__img"
          )[0].style.visibility = "hidden");
    console.log(tagInput);

    switch (tagInput.value) {
        case "Doing":
            article.className = "task task-doing";
            article.querySelector("span").className = "task__head__tag doing";
            article.querySelector("span").innerHTML = "Doing";
            break;
        case "Done":
            article.className = "task task-done";
            article.querySelector("span").className = "task__head__tag done";
            article.querySelector("span").innerHTML = "Done";
            break;
        default:
            article.className = "task task-todo";
            article.querySelector("span").className = "task__head__tag todo";
            article.querySelector("span").innerHTML = "to do";
            break;
    }

    if (descriptionInput == "") {
        article.querySelector("p").style.display = "none";
    } else {
        article.querySelector("p").innerHTML = descriptionInput.value;
        article.querySelector("p").style.display = "block";
    }

    article.getElementsByClassName('task__footer__time__text')[0].innerHTML = getTimeLeft(dateInput.value) + " days left";
};

setupEvent();
