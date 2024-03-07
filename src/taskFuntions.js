import domtf from "./domManipTaskContainer";

const createTask = function (titleVal, descriptionVal, dueDateVal, priorityVal) {
    return {
        title: titleVal,
        description: descriptionVal,
        dueDate: dueDateVal,
        priority: priorityVal
    }
}

const showDescription = function (projectIndex, taskIndex) {
    const localStoredProjectArray = JSON.parse(localStorage.getItem("projects"));
    const projectObj = localStoredProjectArray[projectIndex];
    const description = projectObj.taskList[taskIndex].description;
    console.log(description);

    const descriptionModal = document.querySelector("#descriptionModal");
    console.log("Activating Show Details Modal");
    descriptionModal.style.display = "flex";
    descriptionModal.showModal();

    const descriptionDialog = document.querySelector("#descriptionSpan");
    descriptionDialog.innerText = description ? description : "None";


    const closeButton = document.querySelector(".closeButton");
    closeButton.addEventListener("click",()=>{
        console.log("closing dialog descrp");
        descriptionModal.close();
        descriptionModal.style.display = "none";
    });
}



const removeTask = function (projectIndex, taskIndex) {
    const localStoredProjectArray = JSON.parse(localStorage.getItem("projects"));
    const projectObj = localStoredProjectArray[projectIndex];
    projectObj.taskList.splice(taskIndex, 1);
    localStorage.setItem("projects", JSON.stringify(localStoredProjectArray));

}


const addTask = function (projectIndex, title, description, dueDate, priority) {
    const newTaskObj = createTask(title, description, dueDate, priority);
    console.log(`Adding New Task Obj ${newTaskObj.title} to ${projectIndex}`);
    const localStoredProjectArray = JSON.parse(localStorage.getItem("projects"));
    localStoredProjectArray[projectIndex].taskList.push(newTaskObj);;
    localStorage.setItem("projects", JSON.stringify(localStoredProjectArray));
    domtf.renderTaskContainer(localStoredProjectArray[projectIndex].projectName);
}


const sendFormInfoToAddTask = function (projectIndex) {

    let title, description, dueDate, priority;
    const taskForm = document.querySelector("#taskForm");
    const formData = new FormData(taskForm);
    for (const [name, value] of formData.entries()) {
        console.log(`${name} : ${value}`);
        if (name === "title") title = value;
        if (name === "description") description = value;
        if (name === "dueDate") dueDate = value;
        if (name === "priority") priority = value;
    }

    addTask(projectIndex, title, description, dueDate, priority);
}


const activateTaskModal = function (e) {

    const projectIndex = parseInt(e.target.id.split("-")[1]);
    const dueDate = document.querySelector("#dueDate");
    dueDate.min = new Date().toISOString().split("T")[0];
    console.log("Activating Task Modal");
    const taskModal = document.querySelector("#taskModal");
    taskModal.showModal();

    const closeTaskModal = document.querySelector("#closeTaskModal");
    closeTaskModal.addEventListener("click", (e) => {
        e.preventDefault();
        taskModal.close();
    });

    const taskForm = document.querySelector("#taskForm");
    taskForm.addEventListener("submit",
        (e) => {
            e.preventDefault();
            sendFormInfoToAddTask(projectIndex);
            taskModal.close()

        },
        { once: true });
}

const createDefaultTasksForDefaultProject = function(){
    const dueDate = new Date();
    addTask(0, "Workout for 1hr", "Chest and Triceps Workout on monday", dueDate, "High");
    addTask(0, "Clean Motorcyle", "Lube the Chains and check tyre Pressure as well", dueDate, "Low");
    addTask(0, "Meditate for 20mins", "If Possible Early Morning", dueDate, "Medium");
       
}


export default {
    addTask,
    activateTaskModal,
    removeTask,
    showDescription,
    createDefaultTasksForDefaultProject
}