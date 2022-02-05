class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <style>
        
        footer {
         background-color: #222;
         padding: 1rem;
         color: #fff;
         bottom: 0;
         position: absolute;
         width: 100%;
        }

        footer section {
          float: left;
        }
        
        footer a {
          margin: 0 2px;
          color: white;
          text-decoration: none;
        }
        
        footer a:hover {
          padding-bottom: 5px;
          box-shadow: inset 0 -2px 0 0 #333;
        }

        .copyright {
          color : #C7C7C7;
          float : right;
          margin : 0;
        }
      
      .copyright a{
          text-decoration     : none;
          color               : white;
          font-weight         : bold;
          padding-inline-end  : 0.5rem;
          padding-inline-end  : 30px;
      }
      
        </style>
        <div class="p-5"></div>
        <footer class="primary-color">
          <section>
            <a href="/WebStore/view/version/app.html">About</a>
            <a href="https://documenter.getpostman.com/view/9034494/TzJpjL63">Documentacion</a>
            <a href="/WebStore/view/nosotros/nosotros.html">Nosotros</a>
          </section>
          <div class="copyright">
            © Derechos Reservados 2022 | <a href="https://impulsandonegocios.cl">ImpulsandoNegocios</a>
          </div>
        </footer>

        <script type="text/javascript">

          copyright = new Date();
          update    = copyright.getFullYear();
          document.write("© 2022 - " + update + " " + "https://impulsandonegocios.cl");
        </script>
      `;
    }
}

customElements.define('footer-component', Footer);