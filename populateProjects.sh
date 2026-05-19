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
    echo $repoName
    mkdir -p "$(dirname "projects/meta/$repoName/README.md")"

    curl -L \
      -H "Accept: application/vnd.github.raw+json" \
      -H "Authorization: Bearer $ghPAT" \
      https://api.github.com/repos/$repoOwner/$repoName/readme > projects/meta/$repoName/README.md
    # curl -L https://raw.githubusercontent.com/Noah2024/422-tsiraM/master/README.md -o README.md

done < includedProjects.csv