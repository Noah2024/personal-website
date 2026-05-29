import fs from "fs";
import { projectGenerator } from "./components/projectGenerator/projectgen.js";
import Header from "./components/header/header.js";
import Footer from "./components/footer/footer.js";

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

    <title> indoshon </title>
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
        <!-- These must be inline with their expanded versions in the card-overlay div -->
        ${cardHtml}
    </main>
    ${Footer()}

</body>
</html>
`
fs.writeFileSync("./index2.html", html);
