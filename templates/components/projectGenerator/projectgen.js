//Generator responsible for creating all the cards from included project metadata
import { ChildProcess } from "node:child_process";
import {card as projectCard } from "../projectCard/card.js"
import {card as projectCardExpanded} from "../projectCardExpanded/card.js"
// import projects from "../projects" assert { type: "json" };
import fs from 'node:fs';
import path from 'node:path';

const projectsDir = "./projects";
const appDir = "./projects/apps"
const metaDir =  "./projects/meta";
const readmeHTMLName = "README.html"
const readmeMDName = "README.md"
const langname = "lang.json"
const metaname = "meta.json"

let cardHTML = ""
let cardExpandedHTML = ""

function genTags(bytesAsJson){
    let ttlBytes = 0;
    let rtnTags = ""
    Object.entries(bytesAsJson).forEach(([language, value]) => {
        // console.log(parseInt(value, 10))
        ttlBytes += parseInt(value, 10);
        rtnTags += `<span class="repo-tag">${language}</span>`
    });
    console.log(ttlBytes)
    return [ttlBytes, rtnTags]
}

function genSummary(readmemd){
    return readmemd.slice(0, 155) + "..."
}

function interactiveDemo(appname){
    const apppath = path.join(appDir, appname)
    if (fs.existsSync(apppath)){
        const tagline =  `<span class="click-for-info"> interactive demo available </span>`
        const demobtn = `<a href="${path.join(apppath, "demo.html")}" target="_blank">
                            <button class = "demo-button"type="button">Interactive Demo</button>
                        </a>`
        return [tagline, demobtn]
    }
    return [`<span class="click-for-info"> click for more info </span>`,""]
}

export function projectGenerator(){
    fs.readdirSync(metaDir).forEach(file => {
        const projname = file
        const curtDir = path.join(metaDir, projname)
        if (fs.statSync(curtDir).isDirectory()){
            const metapath = path.join(curtDir, metaname)
            const langpath = path.join(curtDir, langname)
            const readmeHTMLpath = path.join(curtDir, readmeHTMLName)
            const readmeMDpath = path.join(curtDir, readmeMDName)

            const meta = fs.readFileSync(metapath, "utf-8")
            const metajson =  JSON.parse(meta)

            const lang = fs.readFileSync(langpath, "utf-8")
            const langjson =  JSON.parse(lang)

            const readmehtml = fs.readFileSync(readmeHTMLpath, "utf-8")
            const readmemd = fs.readFileSync(readmeMDpath, "utf-8")

            const apppath = path.join(projectsDir, "apps", metajson.name)
            
            const link = metajson.html_url
            const [ bytes, tags] = genTags(langjson)

            cardHTML += projectCard(metajson.name, 
                metajson.pushed_at, 
                bytes, 
                genSummary(readmemd), 
                tags, 
                interactiveDemo(metajson.name),
                curtDir)

            cardExpandedHTML += projectCardExpanded(metajson.name,
                metajson.pushed_at, 
                bytes, 
                readmehtml, 
                tags, 
                interactiveDemo(metajson.name),
                curtDir,
                link)
            // console.log(cardHTML)
        }
});

    return [`${cardHTML}`, `${cardExpandedHTML}`]//projects.map(projectCard).join("\n");
}