import pf from "./projectFunctions";
import dmtc from "./domManipTaskContainer"

const renderSideBar = function () {
    const sideBar = document.querySelector(".sideBar");
    const storedProject = JSON.parse(localStorage.getItem("projects"));

    while (sideBar.firstChild) {
        sideBar.removeChild(sideBar.firstChild);
    }

    storedProject.forEach(project => {
        const projectCard = document.createElement("div");
        projectCard.classList.add("projectCard");

        const projectButton = document.createElement("button");
        projectButton.setAttribute("id", `${project.projectName}-DisplayTasks`)
        projectButton.classList.add("projectButton");
        projectButton.innerText = project.projectName;
        projectButton.addEventListener("click", () => {
            console.log(`${project.projectName} Clicked`);
            dmtc.renderTaskContainer(project.projectName);
        });

        projectCard.appendChild(projectButton);

        let index =storedProject.indexOf(project);;
        
     



        if (project.projectName !== "Personal") {
            const projectDeleteButton = document.createElement("button");
            projectDeleteButton.setAttribute("id", `${project.projectName}-DeleteProject`);
            projectDeleteButton.classList.add("deleteProjectButton")
            projectDeleteButton.innerText = "Delete";
            projectDeleteButton.addEventListener("click", () => {
                console.log(`Delete ${project.projectName} `);
                pf.removeProject(project.projectName);
                index -= 1;
                renderSideBar();
                console.log(`Rendering Task Container for ${storedProject[index].projectName}`)
                dmtc.renderTaskContainer(storedProject[index].projectName);
            });
            projectCard.appendChild(projectDeleteButton);

        }

        sideBar.appendChild(projectCard);
    });

    const addProjButton = document.createElement("button");
    addProjButton.setAttribute("id", "addProject");
    addProjButton.innerText = "ADD PROJECT";
    addProjButton.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Project Button clicked");
        pf.activateProjectModal();

        // renderSideBar();
    });
    sideBar.appendChild(addProjButton);


}


export default {
    renderSideBar
}