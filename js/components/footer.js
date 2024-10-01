class Footer extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.attributesComponents = [
        this.copyright = '© Derechos Reservados',
        this.year = `${ new Date().getFullYear() }`,
        this.company = 'ImpulsandoNegocios',
      ];
    }
    static get observedAttributes(){ return ['copyright', 'year', 'company']; }

  attributeChangedCallback(attribute, _, newAttr){
    this.attributesComponents = [...this.attributesComponents, attribute]
    this[attribute] = newAttr;
  }

  templateCss() {
    return `
      <style>
        footer {
          background-color: #2196f3;
          width: 100%;
          padding-top: 3%
          padding-bottom: 3%;
          color: #fff;
          bottom: 0;
          position: absolute;
        }

        footer section {
          float: left;
        }

        footer a {
          margin: 0px 1px;
          color: white;
          text-decoration: none;
        }

        footer a:hover {
          box-shadow: inset 0 -2px 0 0 #333;
        }

        .copyright {
          color : #C7C7C7;
          float : right;
        }

        .copyright a{
          text-decoration     : none;
          color               : white;
          font-weight         : bold;
          padding-inline-end  : 0.5rem;
          padding-inline-end  : 0px;
        }

        @media screen and (min-width: 900px) {
          .copyright {
            padding-right: 1%;
          }
          footer section {
            padding-left: 1%;
          }
        }
        
        @media screen and (max-width: 900px) {
           .copyright {
            padding-right: 10%;
          }
          footer section {
            padding-left: 5.4%;
          }
        }




      </style>
    `;
  }

  template() {
    return `
      <footer>
          <section>
            <a href="https://documenter.getpostman.com/view/9034494/TzJpjL63">Documentacion</a>
            <a href="/WebStore/nosotros.html">Nosotros</a>
          </section>
          <div class="copyright">
            ${this.copyright} ${this.year} | <a href="https://impulsandonegocios.cl">${ this.company}</a>
          </div>
        </footer>
    `
    
    ;
  }
  render(){
    this.shadowRoot.innerHTML = `
    ${this.templateCss()}
    ${this.template()}
  `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define('footer-component', Footer);