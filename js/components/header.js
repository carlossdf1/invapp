class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/WebStore/index.html">Inventario App</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
            <div class="collapse navbar-collapse" id="navbarColor01">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="/WebStore/view/grupos/grupos.html">Grupos</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="/WebStore/view/productos/productos.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Inventario
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="/WebStore/view/productos/productos.html" >Disponibles</a></li>
                            <li><a class="dropdown-item" onclick="buscar('prestamo')">En prestamo</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" onclick="buscar('eliminados')">Eliminados</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/WebStore/view/users/users.html">Usuarios</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/WebStore/view/categorias/categorias.html">Categorias</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/WebStore/view/ubicaciones/ubicaciones.html">Ubicaciones</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/WebStore/view/nosotros/nosotros.html">Nosotros</a>
                    </li>
                </ul>
                <div class="d-flex">
                    <input id="search" class="form-control me-2" onchange="buscar()" type="search" placeholder="Buscar" aria-label="Search">
                    <button id="buscar" class="btn btn-outline-light" onclick="buscar()" type="button">Buscar</button>
                </div>
            </div>
        </div>
    </nav>
    </header>
        `;
    }

}

customElements.define('header-component', Header);