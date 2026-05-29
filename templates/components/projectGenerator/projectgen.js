//Generator responsible for creating all the cards from included project metadata
import { ChildProcess } from "node:child_process";
import {card as projectCard } from "../projectCard/card.js"
import {card as projectCardExpanded} from "../projectCardExpanded/card.js"
// import projects from "../projects" assert { type: "json" };
import fs from 'node:fs';
import path from 'node:path';

const projectsDir = "./projects";
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
        ttlBytes += value;
        rtnTags += `<span class="repo-tag">${language}</span>`
    });
    return ttlBytes, rtnTags
}

function genSummary(readmemd){
    console.log("Summary")
    console.log(readmemd)
    return readmemd.slice(0, 155) + "..."
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


            //Handle the metadata

            const meta = fs.readFileSync(metapath, "utf-8")
            const metajson =  JSON.parse(meta)

            const lang = fs.readFileSync(langpath, "utf-8")
            const langjson =  JSON.parse(lang)

            const readmehtml = fs.readFileSync(readmeHTMLpath, "utf-8")
            // console.log(readmehtml)
            const readmemd = fs.readFileSync(readmeMDpath, "utf-8")
            
            let bytes, tags = genTags(langjson)

            cardHTML += projectCard(metajson.name, metajson.pushed_at, bytes, genSummary(readmemd), tags)
            cardExpandedHTML += projectCardExpanded(metajson.name,metajson.pushed_at, bytes, readmehtml, tags)
            // console.log(cardHTML)
        }
});

    return [`${cardHTML}`, `${cardExpandedHTML}`]//projects.map(projectCard).join("\n");
}

//  <div class="card-overlay">
//             ${cardExtendedHTML}
//          </div>