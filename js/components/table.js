class Table extends HTMLElement {
  constructor() {
    super();
    this.attributesComponents = [
      // this.classname = 'table table-striped table-xl table-bordered table-hover table-responsive-xxl'
      this.classname = ''
    ];
  }
  
  static get observedAttributes(){ return ['classname']; }
  attributeChangedCallback(attribute, _, newAttr){
    this.attributesComponents = [...this.attributesComponents, attribute]
    this[attribute] = newAttr;
  }
  connectedCallback() {
    this.innerHTML = `
    <div class="container">
      <div class="container" id="container-table"></div>
      <table id="table_registros" class="${this.classname}">
        <thead id="list_titles" class=""></thead>
        <tbody id="list_row"></tbody>
      </table>
    </div>  
    `;
  }
  // connectedCallback() {
  //   this.innerHTML = `
  //   <div class="container">
  //     <table id="table_registros" class="${this.classname}">
  //       <caption>${this.name}</caption>
  //       <thead id="list_titles" class="table-dark"></thead>
  //       <tbody id="list_row"></tbody>
  //     </table>
  //     <div id="pagination-container" class="pagination-container"></div>
  //   </div>  
  //   `;
  // }
}

customElements.define('table-component', Table);