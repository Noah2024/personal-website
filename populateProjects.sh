#!/bin/bash
#Warning, git likes the get fucky with CLRF and LF in the csv file
#Make sure the CSV file is using LF and not CLRF when running this script
source ~/.bashrc
source .env
while IFS=',' read -r col1
do 
    # echo "$col1"
    # reversedLinks = "/".join("$col1".split("/")[::-1])
    # echo reversedLinks
    IFS="/" read -ra parts <<< "$col1"
    repoName="${parts[-1]}"
    repoOwner="${parts[-2]}"
    repoImage="./static/iamges/project/$repoName"
    if [[ ! -f "$repoImage" ]]; then
        echo "No image for repo $repoName... using default"
        repoImage="./static/images/default.svg"
    fi
    echo $repoName
    mkdir -p "$(dirname "projects/meta/$repoName/README.md")"

    curl -L \
      -H "Accept: application/vnd.github.raw+json" \
      -H "Authorization: Bearer $ghPAT" \
      https://api.github.com/repos/$repoOwner/$repoName/readme > projects/meta/$repoName/README.md

    curl -L \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer $ghPAT" \
    https://api.github.com/repos/$repoOwner/$repoName/languages

    pandoc.exe projects/meta/$repoName/README.md -o projects/meta/$repoName/README.html < /dev/null
done < includedProjects.csv