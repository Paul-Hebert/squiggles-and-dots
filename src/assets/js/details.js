const preview = document.querySelector('.details__graphic');

const refreshButton = document.querySelector(".js-refresh");
const playButton = document.querySelector(".js-play");
const pauseButton = document.querySelector(".js-pause");
const downloadButton = document.querySelector(".js-download");

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

  lazyLoadBonusListings();
});

function lazyLoadBonusListings() {
  const interval = setInterval(() => {
    const listingClass = 'bonus-listings__loading';
    const listing = document.querySelector('.' + listingClass);
    console.log('boop');

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