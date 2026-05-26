export default class ProjectCard extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const title = this.getAttribute("title") || "[Not Provided]" 
        const lastCommit = this.getAttribute("lastCommit") || "[No Commit Provided]]"
        const bytes = this.getAttribute("bytes") || "[Not Provided]"
        let tags = this.getAttribute("tags") || ""

        this.innerHTML = `
        <link rel="stylesheet" href="./components/projectCardExpanded/card.css">
        <div class="card-container expanded" tabindex="0">

            <img class="repo-image expanded" src="../static/images/default.svg">

            <div class="repo-content">

                <h2 class="repo-title">${title}</h2>

                <div class="repo-meta">
                    <span>Last Commit:${lastCommit}</span>
                    <span>
                    <span>Bytes: ${bytes}</span>
                </div>

                <div class="tag-container">
                    
                </div>

                <div class=readme-container>
                </div>

            </div>

        </div>
        `;
        //Gets html of readme
         fetch('/projects/meta/422-tsiraM/README.html')
            .then(response => response.text())
            .then(data => {
                this.querySelector(".readme-container").innerHTML = data;
            })
            .catch(err => console.error(err));
        //Inserts tag elements dynamically
         const tagContainer = this.querySelector(".tag-container")
         if (tagContainer != null){
             for (const [tagIndex, tagValue] of tags.split(",").entries()){
                 tagContainer.innerHTML += `<span class="repo-tag">${tagValue}</span>`
            
             }
         }
    }
    
}customElements.define("project-card-expanded", ProjectCard)