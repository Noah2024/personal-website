#!/bin/bash
#Warning, git likes the get fucky with CLRF and LF in the csv file
#Make sure the CSV file is using LF and not CLRF when running this script
source ~/.bashrc
source .env
# pwd
while IFS=',' read -r col1
do 
    IFS="/" read -ra parts <<< "$col1"
    repoName="${parts[-1]}"
    repoOwner="${parts[-2]}"
    echo $repoName
    mkdir -p "$(dirname "projects/meta/$repoName/README.md")"

    curl -L \
      -H "Accept: application/vnd.github.raw+json" \
      -H "Authorization: Bearer $ghPAT" \
      https://api.github.com/repos/$repoOwner/$repoName/readme > projects/meta/$repoName/README.md


    curl -H "Authorization: token $ghPAT" \
     -H "Accept: application/vnd.github+json" \
     https://api.github.com/repos/$repoOwner/$repoName > projects/meta/$repoName/meta.json

    curl -L \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer $ghPAT" \
    https://api.github.com/repos/$repoOwner/$repoName/languages > projects/meta/$repoName/lang.json

    if curl --fail -L \
    -H "Authorization: Bearer $ghPAT" \
    -H "Accept: application/vnd.github.v3.raw" \
    "https://api.github.com/repos/$repoOwner/$repoName/contents/default.png" \
    -o "projects/meta/$repoName/default.png"
    then
        echo "default.png downloaded successfully"
    else
        echo "default.png does not exist or download failed, using provided default"
        cp ./static/images/default.png projects/meta/$repoName/default.png
    fi

    pandoc.exe projects/meta/$repoName/README.md -o projects/meta/$repoName/README.html < /dev/null

    

done < includedProjects.csv

node.exe templates/build.js