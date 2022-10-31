/** @format */
const tl = gsap.timeline();
tl.from(".img", {
  delay: 0.5,
  y: -100,
  height: 0,
  duration: 1,
  ease: "Power2.easeInOut",
});
tl.from(
  ".card-side, .card-header",
  {
    y: -50,
    opacity: 0,
    stagger: {
      amount: 0.3,
    },
  },
  "-=.3"
);

const card = gsap.timeline({
  paused: "true",
  reversed: "true",
});
card.fromTo(
  "#card-animation #card-plus",
  {
    display: "block",
  },
  {
    display: "none",
  }
);
card.fromTo(
  "#card-animation #card-minus",
  {
    display: "none",
  },
  {
    display: "block",
  }
);
card.fromTo(
  "#card-animation .card-paragraph, #card-animation .card-text-below, .card-side-header",
  {
    opacity: 0,
    y: 20,
  },
  {
    opacity: 1,
    y: 0,
    stagger: {
      amount: 0.4,
    },
  },
  "-=2"
);

function cardOn() {
  card.reversed() ? card.play() : card.reverse();
}
