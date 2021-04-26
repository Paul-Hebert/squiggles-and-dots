const preview = document.querySelector('.details__graphic');
const bonusListings = document.querySelectorAll('.bonus-listings__graphic')

window.customElements.whenDefined(preview.localName).then(() => {
  document.querySelector(".js-refresh").addEventListener("click", () => preview.refreshOnce());
  document.querySelector(".js-slideshow").addEventListener("click",  () => preview.toggle());
  document.querySelector(".js-download").addEventListener("click", () => preview.download());
  
  bonusListings.forEach(listing => {
    listing.addEventListener('click', e => {
      e.target.closest('.bonus-listings__graphic').download()
    });
  })
});
