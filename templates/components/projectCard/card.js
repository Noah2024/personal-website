export function card(title, lastCommit, bytes, summary, tags){
     return `
        <div class="card-container" tabindex="0">

            <img class="repo-image" src="../static/images/default.svg">

            <div class="repo-content">

                <h2 class="repo-title">${title}</h2>

                <div class="repo-meta">
                    <span>Last Commit:${lastCommit}</span>
                    <span>
                    <span>Bytes: ${bytes}</span>
                </div>

                <div class="tag-container">
                    ${tags}
                </div>

            </div>
            <div class = "summary-container">
                <div> ${summary} </div>
            </div>

        </div>
        `;
        // const tagContainer = this.querySelector(".tag-container")
        // if (tagContainer != null){
        //     for (const [tagIndex, tagValue] of tags.split(",").entries()){
        //         tagContainer.innerHTML += `<span class="repo-tag">${tagValue}</span>`
            
        //     }
        // }
}