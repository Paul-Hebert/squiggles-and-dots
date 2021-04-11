const preview = document.querySelector('.details');

window.customElements.whenDefined(preview.localName).then(() => {
  document.querySelector(".js-refresh").addEventListener("click", () => preview.refresh());
  document.querySelector(".js-slideshow").addEventListener("click",  () => preview.toggle());
});
