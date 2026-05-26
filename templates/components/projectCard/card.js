export default class ProjectCard extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const title = this.getAttribute("title") || "default"
        const summary = this.getAttribute("summary") || "[No Summary Provided]"
        const lastCommit = this.getAttribute("lastCommit") || "[No Commit Provided]]"
        const bytes = this.getAttribute("bytes") || "[Not Provided]"
        let tags = this.getAttribute("tags") || ""

        // const lastCommit = this.getAttribute(lastCommit) || "N/A"
        // const languageTags = this.getAttribute("languageTags") || ""
        this.innerHTML = `
        <link rel="stylesheet" href="./components/projectCard/card.css">
        <div class="card-container" tabindex="0">

            <img class="repo-image" src="../static/images/default.svg">

            <div class="repo-content">

                <h2 class="repo-title">${title}</h2>

                <div class="repo-meta">
                    <span>Last Commit:${lastCommit}</span>
                    <span>
                    <span>Bytes: ${bytes}</span>
                </div>

                <div class="tag-container">
                   
                </div>

            </div>
            <div class = "summary-container">
                <div> ${summary} </div>
            </div>

        </div>
        `;
        //Inserts tag elements dynamically
        const tagContainer = this.querySelector(".tag-container")
        if (tagContainer != null){
            for (const [tagIndex, tagValue] of tags.split(",").entries()){
                tagContainer.innerHTML += `<span class="repo-tag">${tagValue}</span>`
            
            }
        }
    }
}customElements.define("project-card", ProjectCard)