#!bin/bash
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
        repoImage="./static/images/default.png"
    fi


done < includedProjects.csv

