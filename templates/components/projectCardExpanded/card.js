export default class ProjectCard extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const title = this.getAttribute("title") || "default"
        this.s
        console.log(title)

        this.innerHTML = `
        <link rel="stylesheet" href="./components/projectCardExpanded/card.css">
        <script src="./components/projectCardExpanded/loadHtml.js"></script>

        <div class="card-container expanded" tabindex="0">

            <img class="repo-image expanded" src="../static/images/default.svg">

            <div class="repo-content">

                <h2 class="repo-title">Project Name</h2>

                <div class="repo-meta">
                    <span>Last Commit: 2 days ago</span>
                    <span>
                    <span>12,481 lines</span>
                </div>

                <div class="tag-container">
                    <span class="repo-tag">C++</span>
                    <span class="repo-tag">Arduino</span>
                    <span class="repo-tag">Networking</span>
                </div>

                <div class=readme-container>
                </div>

            </div>

        </div>
        `;
         fetch('/projects/meta/422-tsiraM/README.html')
            .then(response => response.text())
            .then(data => {
                this.querySelector(".readme-container").innerHTML = data;
            })
            .catch(err => console.error(err));
    }
    
}customElements.define("project-card-expanded", ProjectCard)