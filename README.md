# personal-website

This repository contains the source code for a personal website project. It includes a basic Go HTTP server, frontend templates, static assets, and scripts used to include new projects, the sites index is compiled statically using node. All animations are done nateivly in html css and javascript. 

## Overview

- `main.go` launches a simple Go server.
- `http_server/` will contain routes and server logic when the need arises.
- `templates/` holds HTML templates used by the site.
- `static/` includes CSS, fonts, and image assets.
- `projects/` stores sample project demos, along with metadat used to generate tags
- `scripts/` and `populateProjects.sh` are used to manage or generate website content.


## Notes

- Template and static files are organized under `templates/` and `static/` for site rendering.
- `includedProjects.csv` may be used to control which projects are published or listed. Only adds new projects, does not remove ones already listed, that is still done manually
- Currently the one demo for tsiram is built dynamically at runtime, rather than statically. That is becuase I didn't want to deal with compiling wasm into the final static version. 
