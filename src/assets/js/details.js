const preview = document.querySelector('.details__graphic');
const bonusListings = document.querySelectorAll('.bonus-listings__graphic')

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
  
  bonusListings.forEach(listing => {
    listing.addEventListener('click', e => {
      e.target.closest('.bonus-listings__graphic').download()
    });
  })
});
