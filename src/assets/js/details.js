const preview = document.querySelector('.details__graphic');

const refreshButton = document.querySelector(".js-refresh");
const playButton = document.querySelector(".js-play");
const pauseButton = document.querySelector(".js-pause");
const downloadButton = document.querySelector(".js-download");

const bonusListings = document.querySelector('.js-bonus-listings');
const sentinel = document.querySelector('.js-scroll-sentinel');

let interval;
let animationFrame;

window.customElements.whenDefined(preview.localName).then(() => {
  refreshButton.addEventListener("click", () => preview.refreshOnce());
  downloadButton.addEventListener("click", () => preview.download());
  playButton.addEventListener("click",  () => {
    preview.play();
    playButton.disabled = true;
    refreshButton.disabled = true;
    downloadButton.disabled = true;
    pauseButton.disabled = false;
  });
  pauseButton.addEventListener("click",  () => {
    preview.pause();
    pauseButton.disabled = true;
    refreshButton.disabled = false;
    downloadButton.disabled = false;
    playButton.disabled = false;
  });

  if(sentinel) {
    lazyLoadBonusListings();

    let intersectionObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.intersectionRatio > 0)) {
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
        animationFrame = window.requestAnimationFrame(() => { lazyLoadBonusListings(20) });
      }
    });
    intersectionObserver.observe(sentinel);
  }
});

function lazyLoadBonusListings(newCount = 0) {
  for (let i = 0; i < newCount; i++) {
    const listing = document.createElement('div');
    listing.className = "bonus-listings__listing";
    const listingInner = document.createElement('div');
    listingInner.className = "ratio-box bonus-listings__loading";
    listingInner.style.setProperty('--aspect-ratio', `${preview.height}/${preview.width}`);
    listing.append(listingInner);
    bonusListings.append(listing);
  };

  if (interval) clearInterval(interval);

  interval = setInterval(() => {
    const listingClass = 'bonus-listings__loading';
    const listing = document.querySelector('.' + listingClass);

    if (listing) {
      const newGraphic = document.createElement(preview.localName);
      newGraphic.className = 'bonus-listings__graphic';
      listing.append(newGraphic);
      newGraphic.addEventListener('click', newGraphic.download)
      const reflow = newGraphic.offsetHeight;
      listing.classList.remove(listingClass);
    } else {
      clearInterval(interval);
    }
  }, 30);
}