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




# curl -L \
#   -H "Accept: application/vnd.github.raw+json" \
#   -H "Authorization: Bearer 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" \
#   https://api.github.com/repos/Noah2024/422-tsiraM/readme?ref=master
# curl -L https://raw.githubusercontent.com/Noah2024/422-tsiraM/master/README.md -o README.md

# curl -L \
#   -H "Accept: application/vnd.github+json" \
#   -H "X-GitHub-Api-Version: 2026-03-10" \
#   https://api.github.com/repos/Noah2024/422-tsiraM/branches/master
