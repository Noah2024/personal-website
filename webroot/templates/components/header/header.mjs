export default function Header() {

        return `
        <header>
            <nav class = "navmain"> 
                <ul>
                    <li> <a href="#home"> Home </a></li>
                    <li> <a href="#projects"> Projects </a> </li>
                    <li> <a href="#about"> About </a></li>
                    <li> <a href="#aipolicy"> AI Policy </a></li>

                    <li> <a href="#contact"> Contact</a> </li>
                </ul>

                <ul style="flex-direction: row-reverse ">
                    <li> <a href="#contact"> <img src="/static/images/topbar/download.svg"> </a> </li>
                    <li> <a href="https://www.linkedin.com/in/noah-yurasko-a86207336/"> <img src="/static/images/topbar/linkedin.svg"> </a></li>
                    <li> <a href="https://github.com/Noah2024"> <img src="/static/images/topbar/github.svg"> </a> </li>
                </ul>
            </nav>
        </header>
        `;
    }