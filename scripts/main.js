document.addEventListener('DOMContentLoaded', () => {
    const cards = document.getElementsByClassName('card-container');
    // const cards = document.getElementsByClassName('card-container');
    const fullOver = document.getElementsByClassName('fullover')[0];

    console.log(cards.length);

     for (const card of cards) {
        
        card.addEventListener('focusin', () => {
            console.log("focousin")
            fullOver.classList.toggle('show');
        });

        card.addEventListener('focusout', () => {
            console.log("focousout")
            fullOver.classList.toggle('show');
        });
    }

});