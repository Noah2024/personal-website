import fs from "fs";
import { projectGenerator } from "./components/projectGenerator/projectgen.mjs";
//import pkg from './components/projectGenerator/projectgen.mjs';
//const { projectGenerator } = pkg;
import Header from "./components/header/header.mjs";
//import pkg2 from './components/header/header.mjs';
//const {header } = pkg2;
import Footer from "./components/footer/footer.mjs";
//import pkg3 from './components/footer/footer.mjs';
//const {footer } = pkg3;


const [cardHtml, expandedCardHtml] = projectGenerator()

const html = `
<!DOCTYPE html>
<html lan="en">
<head>
    <meta charset="UTF-8">
    <meta name="personal-website">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/static/main.css"> 
    <script src="./scripts/main.js" defer></script>
    <link rel="stylesheet" href="./templates/components/header/header.css">
    <link rel="stylesheet" href="./templates/components/footer/footer.css">
    <link rel="stylesheet" href="./templates/components/projectCard/card.css">
    <link rel="stylesheet" href="./templates/components/projectCardExpanded/card.css">

    <title> indoshon.com </title>
</head>

<body>
    <!-- fullscreen blurr overlay -->
    <div id="fullover" class="fullover"> </div>
    <!-- fullscreen card overlay -->
    <div class="card-overlay">
        ${expandedCardHtml}
    </div>

    ${Header()}
    <main> 
        <h1 id="home"> INDOSHON.com </h1>
        <div class="aboutme-container">
            <p> Welcome friends, family, countrymen, (potential employeers), welcome to indoshon.com.
            The personal website mananged by and for Noah (indoshon) Yurasko, enjoy! (and if you thinking 'now who tf actually is Noah', luckily there is something called an about me section)
            Please puruse the few personal projects (one or two from groups) which I actually am proud of. 
            </p>
        </div>
       
        <h2 id="projects"> Projects Worthy of Being Seen </h2>
        <div class="project-card-container"> 
            ${cardHtml}
        </div>

        <h2 id="about"> About </h2>
        <div class="aboutme-container">
            <p> 
            I am a Dual Major Junior at Marist University, looking to find expierences upon which I can build upon my programming and mathmatics expierence. 
            My interest in Computer Science as a topic of study stemms from my facination by the seemily infinitley complex digital machines that have become common place in our daily lives. 
            I've always had a desire to understand and even create these systems on my own, its this desire to unlock the unknown is why I've recently added a mathamtics double major. 
            <br> <br>

            I am a very staunch supporter of the right to repair and firmly oppose the way in tech is currently being used to mine data on individuals for advertising and dynamic pricing. 
            Most recently I've taken an interest in learning golang as well as ardunio, for which I will make projects im proud of sometime soon. 
        
            </p>
        </div>

        <h2 id=aipolicy> AI Policy </h2> 
        <div class="aboutme-container">
            <p> 
                My personal AI Policy is quite simple, never allow AI to think for you. 
                This manifests in many different use cases, such as finding documentation and syntax that may be obscure or hard to find, or 
                bouncing ideas when working in spaces and with codebases I am not familiar. 
                It's because of this policy I have not significantly explored AI-Driven workflows such as Claude Code, I personally always like to be in the driver's seat, 
                even when working with AI tooling.  

                <br><br> 
                This policy is rooted in the belief that it's a REALLY BAD THING to allow all human knowledge to become utility bought and sold by big tech 
                Cause seriously, having our ability to think slowly degraded then sold back to us just so some rich ass hole can be even more rich is genuinely terrifying. 
            </p>
        </div>
       
        <h2 id="contact"> Contact </h2>
        <div class="aboutme-container"> 
            <span> ndyurasko at gmail.com </span>
            <br><br>
            <span> 781-960-79843 </span>

        </div>
      
    </main>
    ${Footer()}

</body>
</html>
`
fs.writeFileSync("./webroot/index.html", html);
{/* <div class="aboutme-container"> 
            <h1> Welcome! </h2>
            <p> Welcome friends, family, countrymen, (potential employeers...), welcome to indoshon.com. 
        </div> */}
