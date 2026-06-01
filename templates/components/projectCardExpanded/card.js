export function card(title, lastCommit, bytes, readme, tags, demo, curtDir, link){
        return `
        <div class="card-container expanded" tabindex="0">

            <img class="repo-image expanded" src="${curtDir}/default.png">

            <div class="repo-content">

                <h2 class="repo-title">${title}</h2>
                <div class = "repo-header"> 
                    <div class="repo-meta">
                        <span>Last Commit:${lastCommit}</span>
                        <span>Bytes: ${bytes}</span>
                    </div>

                    ${demo[1]}
                </div>

                <div class="tag-container">
                    ${tags}
                </div>

                <div class=readme-container>
                    ${readme}
                </div>

                <span>
                    For more information please visit:
                    <a href="${link}">${link}</a>
                </span>

            </div>

        </div>
        `;         
}
    
