import tf from "./taskFuntions";
import { isToday, isTomorrow, isThisWeek } from "date-fns";

const displayTask = function(task, projectIndex , taskIndex, projectName) {

    const myDiv = document.createElement("div");
    myDiv.classList.add("taskCard");

    let completionCheck = document.createElement("input");
    completionCheck.setAttribute("type", "checkbox");

    // FIX ISSUE : Theres a better way to toggle classes here 
    completionCheck.addEventListener("click", toggle);


    function toggle() {
        // console.log("Toggling");
        if (myDiv.classList.contains("taskOver")) {
            myDiv.classList.remove("taskOver");
        } else {
            myDiv.classList.add("taskOver");
        }
        // console.log(myDiv.classList.contains("taskOver"));
    }

    myDiv.appendChild(completionCheck);

    // When taskName is clicked it opens a dialogue box With its description 
    const mytitle = document.createElement("p");
    mytitle.classList.add("taskTitle");
    mytitle.innerText = task.title;
    const myDueDate = document.createElement("p");
    myDueDate.classList.add("taskDueDate")


    // FIX ISSUE : Use date-fn to format the date in Final else section
    let s = "";
    if (isToday(task.dueDate)) s = "Today";
    else if (isTomorrow(task.dueDate)) s = "Tomorrow";
    else s = task.dueDate;
    myDueDate.innerText = s;
    const myPriority = document.createElement("p");
    myPriority.classList.add("taskPriority")
    myPriority.innerText = task.priority;

    if (task.priority == 'High') {
        myPriority.style.color = "red";
        myDiv.style.borderLeft = "thick solid red";
    } else if (task.priority == 'Medium') {
        myPriority.style.color = "orange";
        myDiv.style.borderLeft = "thick solid orange";
    } else {
        myPriority.style.color = "green";
        myDiv.style.borderLeft = "thick solid green";
    }
    myDiv.appendChild(mytitle);
    myDiv.appendChild(myDueDate);
    myDiv.appendChild(myPriority);

    const showDetails = document.createElement("button");
    showDetails.setAttribute("id", "task" + "-" + projectIndex + "-" + taskIndex);
    showDetails.classList.add("showDetailsPara");
    showDetails.innerText = "Show Details";
    showDetails.addEventListener("click", ()=>{
        console.log(`Show Details of ${projectIndex} ${taskIndex}`);
    });
    myDiv.appendChild(showDetails);

    const deleteButton  = document.createElement("button");
    deleteButton.innerText = "Delete";   
    deleteButton.setAttribute('id', "deleteTaskButton" + "-" + + projectIndex + "-" + taskIndex);
    deleteButton.addEventListener("click", ()=>{
        console.log(`Delete Task ${projectIndex} ${taskIndex}`);
        tf.removeTask(projectIndex,taskIndex);
        renderTaskContainer(projectName);
    });
    deleteButton.classList.add("deleteButton");

    myDiv.appendChild(deleteButton);

    const taskContainer = document.querySelector(".taskContainer");
    taskContainer.appendChild(myDiv);
}






const renderTaskContainer = function(projectName){
    const taskContainer = document.querySelector(".taskContainer");
    const localStoredProjectArray = JSON.parse(localStorage.getItem("projects"));

    while (taskContainer.firstChild) {
        taskContainer.removeChild(taskContainer.firstChild);
    }

    let index = -1;
    localStoredProjectArray.forEach(project=>{
        if(project.projectName===projectName){
            index = localStoredProjectArray.indexOf(project);
        }
    });


    const myHeadingDiv = document.createElement("div");
    myHeadingDiv.classList.add("taskHeading");
    const heading = document.createElement("h1");
    heading.innerText = projectName;

    myHeadingDiv.appendChild(heading);

    const addTaskButton = document.createElement("button");
    addTaskButton.innerText = " + Add Task ";
    addTaskButton.setAttribute('id', `addTaskButton-${index}`);
    addTaskButton.addEventListener("click", (e)=>{
        // e.preventDefault();
        console.log(`Add Task to ${projectName}`);
        tf.activateTaskModal(e);
        renderTaskContainer(projectName);
    },{once:true});
    addTaskButton.classList.add("addTaskButton");

    myHeadingDiv.appendChild(addTaskButton);

    taskContainer.appendChild(myHeadingDiv);

    

    const projectObj = localStoredProjectArray[index];

    projectObj.taskList.forEach((taskObj)=>{
        let taskIndex = projectObj.taskList.indexOf(taskObj);
        console.log(`Display Task Index : ${taskIndex}`);
        displayTask(taskObj, index,taskIndex,projectName);

    });
        

}

export default {
    renderTaskContainer
}