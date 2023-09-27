class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <footer>
          <section>
            <a href="https://documenter.getpostman.com/view/9034494/TzJpjL63">Documentacion</a>
            <a href="/WebStore/view/nosotros/nosotros.html">Nosotros</a>
          </section>
          <div class="copyright">
            © Derechos Reservados 2023 | <a href="https://impulsandonegocios.cl">ImpulsandoNegocios</a>
          </div>
        </footer>
      `;
    }
}

customElements.define('footer-component', Footer);