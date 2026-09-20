// ===========================================
// EDUKIT - JAVASCRIPT
// ===========================================

// Navbar cambia al hacer scroll
window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if(window.scrollY > 50){

        header.style.background = "#ffffff";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.12)";

    }else{

        header.style.background = "#ffffff";
        header.style.boxShadow = "none";

    }

});


// ===========================================
// ANIMACIÓN AL HACER SCROLL
// ===========================================

const elementos = document.querySelectorAll(
".about, .steps, .categories, .category, .step-card, .mini-card"
);

const mostrarElemento = () =>{

    elementos.forEach(elemento=>{

        const posicion = elemento.getBoundingClientRect().top;

        if(posicion < window.innerHeight - 120){

            elemento.style.opacity="1";
            elemento.style.transform="translateY(0px)";

        }

    });

};

elementos.forEach(elemento=>{

    elemento.style.opacity="0";
    elemento.style.transform="translateY(60px)";
    elemento.style.transition=".8s";

});

window.addEventListener("scroll",mostrarElemento);

mostrarElemento();


// ===========================================
// EFECTO EN BOTONES
// ===========================================

const botones = document.querySelectorAll("a");

botones.forEach(boton=>{

    boton.addEventListener("mouseenter",()=>{

        boton.style.transition=".3s";

    });

});


// ===========================================
// CONTADORES
// ===========================================

const counters = document.querySelectorAll(".counter");

counters.forEach(counter=>{

    const actualizar=()=>{

        const objetivo=+counter.getAttribute("data-target");

        const numero=+counter.innerText;

        const incremento=objetivo/120;

        if(numero<objetivo){

            counter.innerText=Math.ceil(numero+incremento);

            setTimeout(actualizar,20);

        }else{

            counter.innerText=objetivo;

        }

    };

    actualizar();

});


// ===========================================
// TARJETAS
// ===========================================

const cards=document.querySelectorAll(".category,.step-card,.mini-card");

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-10px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0px)";

    });

});


// ===========================================
// SCROLL SUAVE
// ===========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const destino=document.querySelector(this.getAttribute("href"));

        if(destino){

            destino.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


// ===========================================
// FOOTER AÑO AUTOMÁTICO
// ===========================================

const year=document.getElementById("year");

if(year){

    year.textContent=new Date().getFullYear();

}


// ===========================================
// MENSAJE DE BIENVENIDA
// ===========================================

window.addEventListener("load",()=>{

    console.log("Bienvenido a EduKit");

});
/* =====================================================
   MÓDULO DE DONACIONES - EDUKIT
   Evidencia: GA7-220501096-AA3-EV01
   ===================================================== */

// Esperamos a que todo el contenido HTML esté cargado
document.addEventListener("DOMContentLoaded", function () {

    /* -------------------------------------------------
       1. FILTRAR DONACIONES POR CATEGORÍA
       ------------------------------------------------- */

    const botonesFiltro = document.querySelectorAll(".filtro-categoria");
    const tarjetasDonacion = document.querySelectorAll(".tarjeta-donacion");

    botonesFiltro.forEach(function (boton) {

        boton.addEventListener("click", function () {

            // Obtenemos la categoría seleccionada
            const categoriaSeleccionada = boton.dataset.categoria;

            // Recorremos todas las tarjetas
            tarjetasDonacion.forEach(function (tarjeta) {

                const categoriaTarjeta = tarjeta.dataset.categoria;

                // Mostramos todas o solamente la categoría seleccionada
                if (
                    categoriaSeleccionada === "todos" ||
                    categoriaSeleccionada === categoriaTarjeta
                ) {
                    tarjeta.style.display = "";
                } else {
                    tarjeta.style.display = "none";
                }

            });

            // Cambiamos el estilo de los botones
            botonesFiltro.forEach(function (otroBoton) {
                otroBoton.classList.remove("btn-success");
                otroBoton.classList.add("btn-outline-success");
            });

            boton.classList.remove("btn-outline-success");
            boton.classList.add("btn-success");

        });

    });


    /* -------------------------------------------------
       2. BOTONES "SOLICITAR DONACIÓN"
       ------------------------------------------------- */

    const botonesSolicitar = document.querySelectorAll(".btn-solicitar");

    botonesSolicitar.forEach(function (boton) {

        boton.addEventListener("click", function () {

            // Obtenemos el nombre del artículo
            const articulo = boton.dataset.articulo;

            // Mostramos una confirmación al usuario
            alert(
                "Solicitud realizada correctamente.\n\n" +
                "Artículo solicitado: " + articulo + "\n\n" +
                "EduKit notificará al donante sobre tu solicitud."
            );

        });

    });

    /* -------------------------------------------------
       3. FORMULARIO PARA PUBLICAR UNA DONACIÓN
       ------------------------------------------------- */

    const formulario = document.getElementById("formDonacion");

    if (formulario) {

        formulario.addEventListener("submit", function (evento) {

            // Evitamos que la página se recargue
            evento.preventDefault();

            // Capturamos los datos del formulario
            const nombre = document.getElementById("nombreArticulo").value;
            const categoria = document.getElementById("categoriaArticulo").value;
            const cantidad = document.getElementById("cantidadArticulo").value;
            const estado = document.getElementById("estadoArticulo").value;
            const descripcion = document.getElementById("descripcionArticulo").value;

            // Obtenemos el contenedor donde están las tarjetas
            const listaDonaciones = document.getElementById("listaDonaciones");

            // Creamos una nueva tarjeta
            const nuevaDonacion = document.createElement("div");

            nuevaDonacion.classList.add(
                "col-md-6",
                "col-lg-4",
                "tarjeta-donacion"
            );

            nuevaDonacion.dataset.categoria = categoria;

            // Creamos el contenido de la nueva donación
            nuevaDonacion.innerHTML = `
                <div class="card h-100 shadow-sm">

                    <div class="card-body">

                        <span class="badge bg-success mb-2">
                            ${obtenerNombreCategoria(categoria)}
                        </span>

                        <h5 class="card-title">
                            ${nombre}
                        </h5>

                        <p class="card-text">
                            ${descripcion}
                        </p>

                        <p class="mb-1">
                            <strong>Cantidad:</strong>
                            ${cantidad} unidades
                        </p>

                        <p class="mb-3">
                            <strong>Estado:</strong>
                            ${estado}
                        </p>

                        <button
                            class="btn btn-success w-100 btn-solicitar"
                            data-articulo="${nombre}">
                            Solicitar donación
                        </button>

                    </div>

                </div>
            `;

            // Agregamos la nueva tarjeta a la página
            listaDonaciones.appendChild(nuevaDonacion);

            // Cerramos el formulario
            const modal = bootstrap.Modal.getInstance(
                document.getElementById("modalPublicar")
            );

            if (modal) {
                modal.hide();
            }

            // Limpiamos los campos
            formulario.reset();

            // Mostramos confirmación
            alert(
                "¡Donación publicada correctamente!\n\n" +
                "Artículo: " + nombre
            );

            // Activamos el botón solicitar de la nueva tarjeta
            const nuevoBoton = nuevaDonacion.querySelector(".btn-solicitar");

            nuevoBoton.addEventListener("click", function () {

                alert(
                    "Solicitud realizada correctamente.\n\n" +
                    "Artículo solicitado: " + nombre + "\n\n" +
                    "EduKit notificará al donante sobre tu solicitud."
                );

            });

        });

    }
    /* -------------------------------------------------
       4. FUNCIÓN PARA MOSTRAR EL NOMBRE DE LA CATEGORÍA
       ------------------------------------------------- */

    function obtenerNombreCategoria(categoria) {

        if (categoria === "escolar") {
            return "Útiles escolares";
        }

        if (categoria === "ropa") {
            return "Ropa";
        }

        return "Otros";
    }

});
console.log("EduKit: JavaScript funcionando correctamente");