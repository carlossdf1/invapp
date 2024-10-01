class Header extends HTMLElement {
    constructor() {
        super();
        this.attributesComponents = [
          this.name = 'INVAPP',
        //   this.classname = 'navbar bg-dark border-bottom border-body navbar-expand-lg bg-body-tertiary" data-bs-theme="dark'
          this.classname = 'navbar fixed-top navbar-expand-lg navbar-dark primary-color'
        ];
    }

    static get observedAttributes() { return ['name', 'classname']; }
    
    attributeChangedCallback(attribute, _, newAttr) {
        this.attributesComponents = [...this.attributesComponents, attribute];
        this[attribute] = newAttr;
    }

    connectedCallback() {
        this.innerHTML = `
        <header>
        <nav class="${this.classname}">
        <div class="container-fluid">
            <a class="navbar-brand" id="url" href="/index.html">${this.name}</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
            <div class="collapse navbar-collapse" id="navbar">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="enlaces">
                    <li class="nav-item dropdown" id="urlProductos" >
                        <a class="nav-link dropdown-toggle" id="url" href="productos.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Inventario
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" id="url" href="/productos.html" >Disponibles</a></li>
                            <li><a class="dropdown-item" id="url" href="/productos.html?estado=prestamo" >En prestamo</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" id="url" href="/productos.html?estado=eliminado" >Eliminados</a></li>
                        </ul>
                    </li>
                    <li class="nav-item" id="urlGrupos"><a class="nav-link" id="url" href="/grupos.html">Grupos</a></li>
                    <li class="nav-item" id="urlUsuarios"><a class="nav-link" id="url" href="/users.html">Usuarios</a></li>
                    <li class="nav-item" id="urlCat"><a class="nav-link" id="url" href="/categorias.html">Categorias</a></li>
                    <li class="nav-item" id="urlUbi"><a class="nav-link" id="url" href="/ubicaciones.html">Ubicaciones</a></li>
                    <li class="nav-item" id="urlHis"><a class="nav-link" id="url" href="/history.html">Historial</a></li>
                    <li class="nav-item" id="urlNosotros"><a class="nav-link" id="url" href="/nosotros.html">Nosotros</a></li>
                </ul>
                <div class="d-flex">
                    <input id="search" class="form-control me-2 bg-dark text-white" onchange="buscar()" type="search" placeholder="Buscar" aria-label="Search">
                    <button id="buscar" class="btn btn-outline-light" onclick="buscar()" type="button">Buscar</button>
                </div>

                <div class="d-flex">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="url" href="" name="url-login" role="button" data-bs-toggle="dropdown" aria-expanded="false"> !Hola </a>
                            <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end" id="useropt" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" id="url" href="/users/perfil.html" >Perfil</a></li>
                                <li><a class="dropdown-item" >Grupo</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li>
                                    <a class="dropdown-item">Modo Obscuro
                                        <div class="form-check form-switch">
                                            <input class="form-check-input dropdown-item" type="checkbox" role="switch" id="darkMode">
                                        </div>
                                    </a>
                                </li>	
                                <li><a class="dropdown-item" onclick="closeSesion()">Cerrar sesion</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </nav> 
    </header>
    `;
    // this.ocultarPaginasPorPermiso();
    }

    // ocultarPaginasPorPermiso() {
    //     const pagesArray = JSON.parse(localStorage.getItem('pages') ) .map(item => item.page);
    //     const paginasPermitidas = pagesArray || ['user', 'close-session'];
    //     const items = document.querySelectorAll('#pages .nav-item');
    //     const pages = document.querySelectorAll('#pages .nav-item .dropdown-item');
    //     const userInfo = document.querySelectorAll('#user-info .nav-item .dropdown-item');
    
    
    //     items.forEach(page => {
    //         const pageId = page.id;
    //         if (!paginasPermitidas.includes(pageId)) {
    //             page.style.display = 'none';
    //         }
    //     });
    
    //     pages.forEach(page => {
    //       const pageName = page.getAttribute('name');
    //       if (!paginasPermitidas.includes(pageName)) {
    //           page.style.display = 'none';
    //       }
    //   });
    
    //     userInfo.forEach(page => {
    //       const pageName = page.getAttribute('name');
    //       if (!paginasPermitidas.includes(pageName)) {
    //           page.style.display = 'none';
    //       }
    //   });
    
    // }
}

customElements.define('header-component', Header);