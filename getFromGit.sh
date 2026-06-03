#!/bin/bash

#Gets repo updates from git
cd /var/www/personal-website || exit 1

git fetch 
git pull https://github.com/Noah2024/personal-website

##AI did the conflict detection below##

# Capture the exit status of the pull command
PULL_STATUS=$?

# Method 1: Check the exit status code (Git returns non-zero on conflict)
if [ $PULL_STATUS -ne 0 ]; then
    
    # Method 2: Double check if there are unmerged (conflicted) files
    CONFLICTS=$(git ls-files -u)
    
    if [ -n "$CONFLICTS" ]; then
        echo "❌ ALERT: Merge conflicts detected!"
        echo "The following files require manual resolution:"
        
        # Extract unique file names that are conflicted
        git ls-files -u | awk '{print $4}' | sort -u
        
        # Optional: Abort the merge immediately if you want to keep the script fully hands-off
        # git merge --abort
        # exit 1
    else
        echo "⚠️ Git pull failed due to reasons other than a merge conflict (e.g., network issue or uncommitted local changes)."
    fi
else
    echo "✅ Pull successful! No conflicts found."
    bash populateProjects.sh
    bash updateSystemd.sh
fi
