const DOM = function( ){
    this.id = str=>document.getElementById(str);
    this.query = (regla_css,one=false) =>
            one === true ? 
                document.querySelector(regla_css) :
                document.querySelectorAll(regla_css);


    this.create = (str, props={} )=> Object.assign(document.createElement(str), props);

    this.append = (hijos,padre=document.body) => {
            hijos.length ?
                hijos.map( hijo => padre.appendChild(hijo) ):
                padre.appendChild(hijos);
    }

    this.remove = e => e.remove( );
}

const D = new DOM( );