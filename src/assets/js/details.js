const preview = document.querySelector('.details__graphic');

window.customElements.whenDefined(preview.localName).then(() => {
  document.querySelector(".js-refresh").addEventListener("click", () => preview.refreshOnce());
  document.querySelector(".js-slideshow").addEventListener("click",  () => preview.toggle());
});
