class Cards extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <footer class="">
          <section>
            <a href="/WebStore/view/version/app.html">About</a>
            <a href="https://documenter.getpostman.com/view/9034494/TzJpjL63">Documentacion</a>
            <a href="/WebStore/view/nosotros/nosotros.html">Nosotros</a>
          </section>
          <div class="copyright">
            © Derechos Reservados 2024 | <a href="https://impulsandonegocios.cl">ImpulsandoNegocios</a>
          </div>
        </footer>
      `;
    }
}

customElements.define('cards-component', Cards);