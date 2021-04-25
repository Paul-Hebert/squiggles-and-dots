const cards = [...document.querySelectorAll('.card')];

cards.forEach(card => {
  const graphic = card.querySelector('.card__graphic');

  card.addEventListener('mouseover', () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (graphic?.play) graphic.play();
  });

  card.addEventListener('mouseout', () => {
    if (graphic?.pause) graphic.pause();
  });
});
