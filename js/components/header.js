class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        
        <nav class="navbar fixed-top navbar-expand-lg navbar-dark primary-color">
        <div class="container-fluid">
            <a class="navbar-brand" id="url" href="/index.html">Inventario App</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
            <div class="collapse navbar-collapse" id="navbar">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="enlaces">
                    <li class="nav-item" id="urlGrupos" >
                        <a class="nav-link" id="url" href="/view/grupos/grupos.html">Grupos</a>
                    </li>
                    <li class="nav-item dropdown" id="urlProductos" >
                        <a class="nav-link dropdown-toggle" id="url" href="/view/productos/productos.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Inventario
                        </a>
                        <ul class="dropdown-menu " aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" id="url" href="/view/productos/productos.html" >Disponibles</a></li>
                            <li><a class="dropdown-item" id="url" href="/view/productos/productos.html?estado=prestamo" >En prestamo</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" id="url" href="/view/productos/productos.html?estado=eliminado" >Eliminados</a></li>
                        </ul>
                    </li>
                    <li class="nav-item" id="urlUsuarios" >
                        <a class="nav-link" id="url" href="/view/users/users.html">Usuarios</a>
                    </li>
                    <li class="nav-item" id="urlCat" >
                        <a class="nav-link" id="url" href="/view/categorias/categorias.html">Categorias</a>
                    </li>
                    <li class="nav-item" id="urlUbi" >
                        <a class="nav-link" id="url" href="/view/ubicaciones/ubicaciones.html">Ubicaciones</a>
                    </li>
                    <li class="nav-item" id="urlHis" >
                        <a class="nav-link" id="url" href="/view/history/history.html">Historial</a>
                    </li>
                    <li class="nav-item" id="urlNosotros" >
                        <a class="nav-link" id="url" href="/view/nosotros/nosotros.html">Nosotros</a>
                    </li>
                </ul>
                <div class="d-flex">
                    <input id="search" class="form-control me-2 bg-dark text-white" onchange="buscar()" type="search" placeholder="Buscar" aria-label="Search">
                    <button id="buscar" class="btn btn-outline-light" onclick="buscar()" type="button">Buscar</button>
                </div>
                <div class="d-flex">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="url" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                </svg>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end" id="useropt" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" id="url" href="/view/users/perfil.html" >Perfil</a></li>
                                <li><a class="dropdown-item" >Grupo</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li>
                                    <a class="dropdown-item">Modo Obscuro
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars-fill" viewBox="0 0 16 16">
                                            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
                                            <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/>
                                        </svg>
                                        <div class="form-check form-switch">
                                            <input class="form-check-input dropdown-item" type="checkbox" role="switch" id="darkMode" onclick="selectMode()">
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
        `;
    }

}

customElements.define('header-component', Header);