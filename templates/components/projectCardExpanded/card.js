export function card(title, lastCommit, bytes, readme, tags){
        console.log("Read me below:::")
        console.log(readme)
        return `
        <div class="card-container expanded" tabindex="0">

            <img class="repo-image expanded" src="../static/images/default.svg">

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

                <div class=readme-container>
                    ${readme}
                </div>

            </div>

        </div>
        `;         
        //Inserts tag elements dynamically
        //  const tagContainer = this.querySelector(".tag-container")
        //  if (tagContainer != null){
        //      for (const [tagIndex, tagValue] of tags.split(",").entries()){
        //          tagContainer.innerHTML += `<span class="repo-tag">${tagValue}</span>`
            
        //      }
        //  }
}
    
