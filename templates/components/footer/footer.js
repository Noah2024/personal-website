export default class Footer extends HTMLElement{
    constructor(){
        super()

    const shadow = this.attachShadow({mode: 'open'});

    shadow.innerHTML = `
        <link rel="stylesheet" href="./components/footer/footer.css">
        <footer> 
            <p> &copy 2026 Noah Yurasko. All Rights Reserved. </p>
        </footer>
    `;
    }
}
customElements.define("app-footer", Footer)