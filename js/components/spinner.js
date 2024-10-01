class Loader extends HTMLElement {
    constructor() {
      super();
      this.attributesComponents = [
        this.classname = 'text-center',
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
      <div id="spinner" class="${this.classname}">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">${this.message}</span> 
        </div> 
      </div>`;
    }
  
    render(){ this.innerHTML = `${ this.template() }`; }

    connectedCallback() {
      this.render();
    }
}

customElements.define('spinner-component', Loader);