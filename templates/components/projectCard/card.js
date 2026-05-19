export default class ProjectCard extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const title = this.getAttribute("title") || "default"
        console.log(title)
        const shadow = this.attachShadow({mode: 'open'});

        shadow.innerHTML = `
        <link rel="stylesheet" href="./components/projectCard/card.css">

        <h1> ${title} </h1>
        `;
    }
}customElements.define("project-card", ProjectCard)