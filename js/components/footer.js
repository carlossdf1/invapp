class Footer extends HTMLElement {
  constructor() {
      super();
      this.classname;
      this.links = `
      <a href="https://documenter.getpostman.com/view/9034494/TzJpjL63">Documentacion</a>
      <a href="/WebStore/view/nosotros/nosotros.html">Nosotros</a>`;
      this.copyright = ' © Derechos Reservados 2023 | <a href="https://impulsandonegocios.cl">ImpulsandoNegocios</a>';
  }
  connectedCallback() {
      this.innerHTML = `
      <footer class="${this.classname}">
        <section>${this.liks}</section>
        <div class="copyright">${ this.copyright }</div>
      </footer>
    `;
  }
}

customElements.define('footer-component', Footer);