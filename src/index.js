import "./style.css";
import pf from "./projectFunctions";
import dom from "./domManipSideBar";
import domtc from "./domManipTaskContainer"


if (!("projects" in localStorage)) {
  pf.createDefaultProject("Personal");
  console.log("Not Found : Adding Personal");

}

domtc.renderTaskContainer("Personal");
dom.renderSideBar();

