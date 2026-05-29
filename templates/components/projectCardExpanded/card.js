export function card(title, lastCommit, bytes, readme, tags, demo){
        return `
        <div class="card-container expanded" tabindex="0">

            <img class="repo-image expanded" src="../static/images/default.svg">

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

            </div>

        </div>
        `;         
}
    
