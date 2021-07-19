class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" id="url" href="/index.html">Inventario App</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
            <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" id="url" href="/view/grupos/grupos.html">Grupos</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" id="url" href="/view/productos/productos.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Inventario
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" id="url" href="/view/productos/productos.html" >Disponibles</a></li>
                            <li><a class="dropdown-item" onclick="buscar('prestamo')">En prestamo</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" onclick="buscar('eliminados')">Eliminados</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="url" href="/view/users/users.html">Usuarios</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="url" href="/view/categorias/categorias.html">Categorias</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="url" href="/view/ubicaciones/ubicaciones.html">Ubicaciones</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="url" href="/view/nosotros/nosotros.html">Nosotros</a>
                    </li>
                </ul>
                <div class="d-flex">
                    <input id="search" class="form-control me-2" onchange="buscar()" type="search" placeholder="Buscar" aria-label="Search">
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
                            <ul class="dropdown-menu dropdown-menu-lg-end" id="useropt" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" id="url" href="/view/users/perfil.html" >Perfil</a></li>
                                <li><a class="dropdown-item" >Grupo</a></li>
                                <li><hr class="dropdown-divider"></li>
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
    }

}

customElements.define('header-component', Header);