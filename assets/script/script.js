document.querySelector("#new-date").valueAsDate = new Date();
let div = document.getElementById("add_task_container");


/**
 * Display or hide add task area
 */
document.getElementById("add_task_button").addEventListener("click", () => {

    if (window.getComputedStyle(div, null).getPropertyValue("display") == "none") {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
});
