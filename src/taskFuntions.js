import domtf from "./domManipTaskContainer";

const createTask =  function ( titleVal, descriptionVal, dueDateVal,priorityVal){
    return{ 
        title: titleVal, 
        description: descriptionVal, 
        dueDate: dueDateVal,
        priority: priorityVal
    }
}

const removeTask = function(projectIndex , taskIndex){
    const localStoredProjectArray = JSON.parse(localStorage.getItem("projects"));
    const projectObj = localStoredProjectArray[projectIndex];
    projectObj.taskList.splice(taskIndex,1);
    localStorage.setItem("projects", JSON.stringify(localStoredProjectArray));

}


const addTask = function(projectIndex , title, description, dueDate,priority){
    const newTaskObj = createTask(title, description, dueDate,priority);
    console.log(`Adding New Task Obj ${newTaskObj.title} to ${projectIndex}`);
    const localStoredProjectArray = JSON.parse(localStorage.getItem("projects"));
    
    // localStoredProjectArray.forEach((project)=>{
    //     if(project.projectName === projectName){
    //         project.taskList.push(newTaskObj);
    //     }
    // });
    
    
    localStoredProjectArray[projectIndex].taskList.push(newTaskObj);;
    // console.log(projectObj)
   
    // console.log(localStoredProjectArray);
    localStorage.setItem("projects", JSON.stringify(localStoredProjectArray));


    domtf.renderTaskContainer(localStoredProjectArray[projectIndex].projectName);
}


const sendFormInfoToAddTask = function(projectIndex){

    let title , description , dueDate , priority;
    const taskForm = document.querySelector("#taskForm");
    const formData = new FormData(taskForm);
    for (const [name, value] of formData.entries()) {
        console.log(`${name} : ${value}`);
        if(name==="title") title = value;
        if(name==="description") description = value;
        if(name==="dueDate") dueDate = value;
        if(name==="priority") priority =value;
    }
    
    addTask(projectIndex , title, description, dueDate,priority);
}


const activateTaskModal = function(e){

    const projectIndex = parseInt(e.target.id.split("-")[1]);

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
    { once: true});
}



export default {
    addTask,
    activateTaskModal,
    removeTask
}