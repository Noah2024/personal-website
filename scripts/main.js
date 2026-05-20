document.addEventListener('DOMContentLoaded', () => {
    const cards = document.getElementsByClassName('card-container');
    // const cards = document.getElementsByClassName('card-container');
    const fullOver = document.getElementsByClassName('fullover')[0];

    //Setting up cards to be animated correctly
     for (const card of cards) {
        
        card.addEventListener('focusin', () => {
            console.log("focousin")
            fullOver.classList.toggle('show');
            expandAnimation(card)
        });

        card.addEventListener('focusout', () => {
            console.log("focousout")
            fullOver.classList.toggle('show');
            expandAnimation(card)

        });
    }


});

function expandAnimation(card){
    const first = card.getBoundingClientRect();
    card.classList.toggle('expanded')
    const last = card.getBoundingClientRect();

    const dx = first.left - last.left
    const dy = first.top - last.top
    const dsx = first.width / last.width
    const dsy = first.height /last.height

    console.log(dx, dx, dsx, dsy)
    // card.animate([], {})
    //   keyframes -> [transform, scale, etc], properties -> {duration, east, etc}
    card.animate([
        //Frame One
        {transformOrigin: "top left",
         transform: `
            translate(${dx}px, ${dy}px)
            scale(${dsx}, ${dsy})
         `
        },
        {
            transform: `none`
        }
        //Frame Two
        
    ], {
        duration: 500,
        easing: "ease"
    }).onfinish = () => {
        console.log("Run on finsihed")
    card.style.transform = "";
  };
}