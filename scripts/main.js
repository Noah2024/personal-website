//No need to track card state for debounce becuase the overlay prevents interaction while still visible
//And is only hidden AFTER the animation fin

document.addEventListener('DOMContentLoaded', () => {
    const cards = [...document.getElementsByClassName('card-container')].filter(el => el.className.trim() === "card-container");
    const cardsExpanded = document.getElementsByClassName('card-container expanded');
    const fullOver = document.getElementsByClassName('fullover')[0];

    Array.from(cards).forEach((card, index) => {
        card.addEventListener('focusin', () => {
            fullOver.classList.toggle('show');
            let cardExpanded = cardsExpanded[index]
            makeVisible(cardsExpanded[index])
            expandAnimation(card, cardExpanded, cardExpanded, false);
            cardExpanded.focus(); //So we can click out of it immediatley
        });
    });

    Array.from(cardsExpanded).forEach((cardExpanded, index) => {

        cardExpanded.addEventListener('focusout', (event) => {

            // Allows for clickable elements inside the card
            if (event.relatedTarget != null && cardExpanded.contains(event.relatedTarget)) {
                return
            }

            fullOver.classList.toggle('show');
            console.log("Foucous out")
            let card = cards[index]
            expandAnimation(card, cardExpanded, cardExpanded, true);
        });
    });

});

function makeVisible(target){
    target.style.visibility = "visible";
}

function makeHidden(target){
    target.style.visibility = "hidden";
}

function expandAnimation(first, last, target, reverse){
    first = first.getBoundingClientRect()
    last = last.getBoundingClientRect()

    const dx = first.left - last.left
    const dy = first.top - last.top
    const dsx = first.width / last.width
    const dsy = first.height /last.height


    // console.log(dx, dx, dsx, dsy)
    //   keyframes -> [transform, scale, etc], properties -> {duration, east, etc}
    const keyframes = reverse ? //Top is true
    [
        {   transformOrigin: "top left",
            transform: "translate(0,0) scale(1)",
            opacity: 1
        },
         {  transformOrigin: "top left",
            transform: `
            translate(${dx}px, ${dy}px)
            scale(${dsx}, ${dsy})`,
            opacity: 0
        }
    ]:[ //Swap keyframes direction when animating reverse
        {   transformOrigin: "top left",
            transform: `
            translate(${dx}px, ${dy}px)
            scale(${dsx}, ${dsy})`,
            opacity: 0
        },
        {   transformOrigin: "top left",
            transform: "translate(0,0) scale(1)",
            opacity: 1

        }
    ] 
    
    target.animate(keyframes, {
        duration: 500,
        easing: "ease-in-out",
        // fill: "forwards"
    }).onfinish = () => {
          target.style.transform = "none";
          if (reverse){ //Only set visability on reverse
            makeHidden(target)
          }
  };
}