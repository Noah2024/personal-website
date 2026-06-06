export default function Header() {

        return `
        <header>
            <nav class = "navmain"> 
                <ul class = "site-links">
                    <li> <a href="#home"> Home </a></li>
                    <li> <a href="#projects"> Projects </a> </li>
                    <li> <a href="#about"> About </a></li>
                    <li> <a href="#aipolicy"> AI Policy </a></li>

                    <li> <a href="#contact"> Contact</a> </li>
                </ul>

                <ul class="outside-links" style="flex-direction: row-reverse ">
                    <li> <a href="./typst/resume.pdf" target="_blank"> <img src="/static/images/topbar/download.svg", title="Download Resume" > </a> </li>
                    <li> <a href="https://www.linkedin.com/in/noah-yurasko-a86207336/" target="_blank"> <img src="/static/images/topbar/linkedin.svg" title = "Linkedin"> </a></li>
                    <li> <a href="https://github.com/Noah2024" target="_blank"> <img src="/static/images/topbar/github.svg" title="Github"> </a> </li>
                </ul>
            </nav>
        </header>
        `;
    }