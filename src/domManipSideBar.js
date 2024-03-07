import pf from "./projectFunctions";
import dmtc from "./domManipTaskContainer";
import tf from "./taskFuntions";

const renderSideBar = function () {
    const sideBar = document.querySelector(".sideBar");
    const storedProject = JSON.parse(localStorage.getItem("projects"));

    while (sideBar.firstChild) {
        sideBar.removeChild(sideBar.firstChild);
    }


    const todayCard = document.createElement("div");
    todayCard.classList.add("projectCard");

    const todayButton = document.createElement("button");
    todayButton.setAttribute("id", `Today-DisplayTasks`)
    todayButton.classList.add("projectButton");
    todayButton.innerText ="Today";
    todayButton.addEventListener("click", () => {
        // console.log(`Today Clicked`);
        dmtc.renderDateFilter("Today");
        // dmtc.renderTaskContainer(project.projectName);
    });

    const tomorrowCard = document.createElement("div");
    tomorrowCard.classList.add("projectCard");

    const tomorrowButton = document.createElement("button");
    tomorrowButton.setAttribute("id", `Tomorrow-DisplayTasks`)
    tomorrowButton.classList.add("projectButton");
    tomorrowButton.innerText = "Tomorrow";
    tomorrowButton.addEventListener("click", () => {
        // console.log(`Tomorrow Clicked`);
        dmtc.renderDateFilter("Tomorrow");
        // dmtc.renderTaskContainer(project.projectName);
    });

    const thisWeekCard = document.createElement("div");
    thisWeekCard.classList.add("projectCard");


    const thisWeekButton = document.createElement("button");
    thisWeekButton.setAttribute("id", `ThisWeek-DisplayTasks`)
    thisWeekButton.classList.add("projectButton");
    thisWeekButton.innerText = "ThisWeek";
    thisWeekButton.addEventListener("click", () => {
        // console.log(`Today Clicked`);
        dmtc.renderDateFilter("ThisWeek");


        // dmtc.renderTaskContainer(project.projectName);
    });

    todayCard.appendChild(todayButton);
    sideBar.appendChild(todayCard);

    tomorrowCard.appendChild(tomorrowButton);
    sideBar.appendChild(tomorrowCard);
    
    thisWeekCard.appendChild(thisWeekButton);
    sideBar.appendChild(thisWeekCard);

    const myHeadingDiv = document.createElement("div");
    myHeadingDiv.classList.add("projectHeading");
    const heading = document.createElement("h1");
    heading.innerText = "My Projects";

    myHeadingDiv.appendChild(heading);
    sideBar.appendChild(myHeadingDiv);



        





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
    addProjButton.classList.add("addProjectButton");
    addProjButton.setAttribute("id", "addProjectButton");
    addProjButton.innerText = "+ADD PROJECT";
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