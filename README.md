# personal-website

This repository contains the source code for my personal website project. It includes a basic Go HTTP server, frontend templates, static assets, and scripts used to include new projects, the sites index is compiled statically using node. All animations are done nateivly in html css and javascript. Github webhook configured to automatically update deployed instance of server at [indoshon.com](https://indoshon.com).

## Overview

- `main.go` launches a simple Go server.
- `http_server/` will contain routes and server logic when the need arises.
- `templates/` holds HTML templates used by the site.
- `static/` includes CSS, fonts, and image assets.
- `projects/` stores project data as well as interactive demos where possible, generated with populateProjects.sh
- `populateProjects.sh` + `getFromGit.sh` + `updateSystemd.sh` are used in an automated CICD pipeline on my homeserver to automatically pull and update changes made to both the website and web routes


## Notes

- Template and static files are organized under `templates/` and `static/` for site rendering.
- `includedProjects.csv` may be used to control which projects are published or listed. Only adds new projects, does not remove ones already listed, that is still done manually
- Currently the one demo for tsiram is built dynamically at runtime, rather than statically. That is becuase I didn't want to deal with compiling wasm into the final static version. 
