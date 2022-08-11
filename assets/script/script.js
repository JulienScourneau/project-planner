document.querySelector("#new-date").valueAsDate = new Date();
let div = document.getElementById("add_task_container");

/**
 * Display or hide Add task area
 */
document.getElementById("add_task_button").addEventListener("click", () => {
    if (
        window.getComputedStyle(div, null).getPropertyValue("display") == "none"
    ) {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
});

class Task {
    constructor(name, description, important, date, tag) {
        this.name = name;
        this.description = description;
        this.important = important;
        this.date = date;
        this.tag = tag;
    }

    get name() {
        return this.name;
    }

    set name(name) {
        this.name = name;
    }
    get description() {
        return this.description;
    }
    set description(description) {
        this.description = description;
    }
    get important() {
        return this.important;
    }
    set important(important) {
        this.important = important;
    }
    get date() {
        return this.date;
    }
    set date(date) {
        this.date = date;
    }
    get tag() {
        return this.tag;
    }
    set tag(tag) {
        this.tag = tag;
    }
}

const generateArticle = () => {
    let article = document.createElement("article");
    let name = document.createElement("p");
    let description = document.createElement("p");
    let important = document.createElement("img");
    let tag = document.createElement("span");

    name.innerHTML = "Name";
    description.innerHTML = "description";
    important.src = "assets/images/sort_by_priority.svg";
    tag.innerHTML = "tag";

    article.appendChild(name);
    article.appendChild(important);
    article.appendChild(description);
    article.appendChild(tag);
    return article;
};

function generateTask(task) {
    let article = generateArticle();

    document.body.children[1].children[1].appendChild(article);
}
generateTask();
