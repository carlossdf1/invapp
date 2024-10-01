class Loader extends HTMLElement {
    constructor() {
      super();
      this.attributesComponents = [
        this.classname = 'fader',
        this.message = 'Cargando...'
      ];
    }

    static get observedAttributes(){ return ['classname', 'message']; }

    attributeChangedCallback(attribute, _, newAttr){
      this.attributesComponents = [...this.attributesComponents, attribute]
      this[attribute] = newAttr;
    }
  
    template() {
      return `
      <div id="fader" class="${this.classname}">
        <div class="loading"></div>
        <p class="message">${this.message}</p>
      </div>`;
    }
  
    render(){ this.innerHTML = `${ this.template() }`; }

    connectedCallback() {
      this.render();
    }
}

customElements.define('loader-component', Loader);