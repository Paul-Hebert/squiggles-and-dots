const template = document.createElement("template");
template.innerHTML = /*html*/`
  <style>
    :host { 
      display: block;
    }
    ::slotted(*) { 
      background: #fff;
      max-width: 100%;
      height: auto;
    }
  </style>
  <slot></slot>
`;

export class SqPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );  
  }

  connectedCallback() {
    this.draw();
  }

  refreshInterval = null;
  isPlaying = false;

  clear = () => {
    this.innerHTML = "";
  }

  draw = () => {
    this.innerHTML = "Draw function not defined"
  }

  refresh = () => {
    this.clear();
    this.draw();
  }

  play = () =>  {
    this.isPlaying = true;
    this.refreshInterval = setInterval(this.refresh, 500);
  }

  pause = () =>  {
    this.isPlaying = false;
    clearInterval(this.refreshInterval);
  }

  toggle = () =>  {
    this.isPlaying ? this.pause() : this.play();
  }
}

customElements.define("sq-preview", SqPreview);
