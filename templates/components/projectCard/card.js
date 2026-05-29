export function card(title, lastCommit, bytes, summary, tags, demo){
     return `
        <div class="card-container" tabindex="0">

            <img class="repo-image" src="../static/images/default.svg">

            <div class="repo-content">

                <h2 class="repo-title">${title}</h2>

                <div class="repo-meta">
                    <span>Last Commit: ${lastCommit}</span>
                    <span>Bytes: ${bytes}</span>
                </div>

                <div class="tag-container">
                    ${tags}
                </div>

            </div>
            <div class = "summary-container">
                <div> ${summary} </div>
            </div>

            ${demo[0]}

        </div>
        `;
}