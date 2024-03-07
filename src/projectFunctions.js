import dom from "./domManipSideBar";
import domtf from "./domManipTaskContainer"
import tf from "./taskFuntions"

function createProjectObj(projectName) {
    console.log(typeof projectName);
    return {
        projectName : projectName,
        taskList : [],
    }
}

const removeProject = function(projectName){
    const localStoredProjectArray = JSON.parse(localStorage.getItem("projects"));
    let index = -1;
    localStoredProjectArray.forEach(project=>{
        if(project.projectName===projectName){
            index = localStoredProjectArray.indexOf(project);
        }
    });
    console.log(`Deleting Index : ${index}`);
    if(index>0){
        localStoredProjectArray.splice(index,1);
        localStorage.setItem("projects", JSON.stringify(localStoredProjectArray));
    }

}


const createDefaultProject = function (projectName) {
    const projectArray = []
    const newProjectObj = createProjectObj(projectName);
    projectArray.push(newProjectObj)
    localStorage.setItem("projects", JSON.stringify(projectArray));
    dom.renderSideBar();
    tf.createDefaultTasksForDefaultProject();
}

const addProjectToStorage = function (projectName) {

    console.log("Add Project cLicked");
    const newProjectObj = createProjectObj(projectName);
    const localStoredProjectArray = JSON.parse(localStorage.getItem("projects"));
    localStoredProjectArray.push(newProjectObj);
    // console.log(newProjectObj);
    console.log(localStoredProjectArray);
    localStorage.setItem("projects", JSON.stringify(localStoredProjectArray));
    
    // dom.renderSideBar();
}


const activateProjectModal = function () {

    console.log("Activating Modal");
    const projectModal = document.querySelector("#projectModal");
    projectModal.showModal();

    const closeProjectModal = document.querySelector("#closeProjectModal");
    closeProjectModal.addEventListener("click", (e) => {
        e.preventDefault();
        projectModal.close();
    });
    const projectForm = document.querySelector("#projectForm");

    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let projectName ; 
        const formData = new FormData(projectForm);
        for (const [name, value] of formData.entries()) {
            if (name == "projectName") {
                addProjectToStorage(value);
                projectName = value;
                projectModal.close();
            }
        }
        domtf.renderTaskContainer(projectName);
        dom.renderSideBar();
    },{ once: true});
}


export default {
    createDefaultProject,
    activateProjectModal,
    removeProject
}