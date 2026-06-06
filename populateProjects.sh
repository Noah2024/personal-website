#!/bin/bash
#Warning, git likes the get fucky with CLRF and LF in the csv file
#Make sure the CSV file is using LF and not CLRF when running this script
source ~/.bashrc
source .env

#New files shoul've been synced with git by now
#So we can compile the new typst document
typst c webroot/typst/resume.typ

# pwd
while IFS=',' read -r col1
do 
    IFS="/" read -ra parts <<< "$col1"
    repoName="${parts[-1]}"
    repoOwner="${parts[-2]}"
    echo $repoName
    mkdir -p "$(dirname "webroot/meta/$repoName/README.md")"

    curl -L \
      -H "Accept: application/vnd.github.raw+json" \
      -H "Authorization: Bearer $ghPAT" \
      https://api.github.com/repos/$repoOwner/$repoName/readme > webroot/meta/$repoName/README.md


    curl -H "Authorization: token $ghPAT" \
     -H "Accept: application/vnd.github+json" \
     https://api.github.com/repos/$repoOwner/$repoName > webroot/meta/$repoName/meta.json

    curl -L \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer $ghPAT" \
    https://api.github.com/repos/$repoOwner/$repoName/languages > webroot/meta/$repoName/lang.json

    if curl --fail -L \
    -H "Authorization: Bearer $ghPAT" \
    -H "Accept: application/vnd.github.v3.raw" \
    "https://api.github.com/repos/$repoOwner/$repoName/contents/default.png" \
    -o "webroot/meta/$repoName/default.png"
    then
        echo "default.png downloaded successfully"
    else
        echo "default.png does not exist or download failed, using provided default"
        cp ./static/images/default.png webroot/meta/$repoName/default.png
    fi

    pandoc webroot/meta/$repoName/README.md -o webroot/meta/$repoName/README.html < /dev/null

    
done < includedProjects.csv

node webroot/templates/build.mjs
