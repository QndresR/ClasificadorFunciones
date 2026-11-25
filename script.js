// Conexión con los elementos del HTML 
let elementoB = document.getElementById("valor-b");
let elementoC = document.getElementById("valor-c");
const botonGenerar = document.getElementById("btn-generar");
let cajaLineal = document.getElementById("propiedades-lineal");
let cajaAfin = document.getElementById("propiedades-afin");
let cajaConstante = document.getElementById("propiedades-constante");
let cajaSinFuncion = document.getElementById("propiedades-sin-funcion");
let textoFuncion = document.getElementById("expresion-funcion");

// 2. Carga e inicialización del visor de GeoGebra
let ggbAppListo = null;

const parametrosGeoGebra = {
    appName: "graphing",
    width: 600,
    height: 350,
    showToolBar: false,
    showAlgebraInput: false,
    showMenuBar: false,
    appletOnLoad: function (api) {
        ggbAppListo = api;
    }
};

window.addEventListener("DOMContentLoaded", function () {
    if (typeof GGBApplet === "function") {
        new GGBApplet(parametrosGeoGebra, true).inject("ggb-applet");
    }
});

// Evento click del botón para generar enteros aleatorios entre -3 y 3
botonGenerar.addEventListener("click", function () {
    const b = Math.floor(Math.random() * 7) - 3;
    const c = Math.floor(Math.random() * 7) - 3;

    elementoB.textContent = b;
    elementoC.textContent = c;

    // Limpieza de las cajas de resultados anteriores
    cajaLineal.innerHTML = "";
    cajaAfin.innerHTML = "";
    cajaConstante.innerHTML = "";
    cajaSinFuncion.innerHTML = "";

    // Clasificación de los cuatro casos
    if (b === 0 && c === 0) { // Contenido que se inserta dentro del HTML en Clasificacion Sin Funcion
        cajaSinFuncion.innerHTML = `
            <p>Expresión: f(x) = 0</p>
            <ul>
                <li>Estado: Sin función (b = 0 y c = 0).</li>
                <li>Gráfica: Coincide con el eje horizontal X (y = 0).</li>
                <li>Pendiente: Sin inclinación (b = 0).</li>
            </ul>
        `;

        textoFuncion.textContent = "Sin función (f(x) = 0)";

        if (ggbAppListo) {
            ggbAppListo.evalCommand("Delete(f)");
        }
    } else if (b === 0) { // Contenido que se inserta dentro del HTML en Clasificacion Constante
        cajaConstante.innerHTML = `
            <p>Expresión: f(x) = ${c}</p>
            <ul>
                <li>Gráfica: Línea recta horizontal paralela al eje X.</li>
                <li>Corte Eje Y: Interseca al eje Y en las coordenadas (0, ${c}).</li>
                <li>Variación: Mantiene el valor ${c} para todo x.</li>
            </ul>
        `;

        const funcionGeoGebra = `${c}`;
        textoFuncion.textContent = `f(x) = ${funcionGeoGebra}`;

        if (ggbAppListo) {
            ggbAppListo.evalCommand("Delete(f)");
            ggbAppListo.evalCommand(`f(x) = ${funcionGeoGebra}`);
        }
    } else if (c === 0) {
        let textoPendiente = "";

        if (b > 0) {
            textoPendiente = "Función creciente (sube de izquierda a derecha).";
        } else {
            textoPendiente = "Función decreciente (baja de izquierda a derecha).";
        }
        // Contenido que se inserta dentro del HTML en Clasificacion Lineal
        cajaLineal.innerHTML = ` 
            <p>Expresión: f(x) = ${b}x</p>
            <ul>
                <li>Gráfica: Línea recta continua.</li>
                <li>Paso Obligatorio: Pasa por el origen de coordenadas (0, 0).</li>
                <li>Pendiente (b): ${textoPendiente}</li>
            </ul>
        `;

        const funcionGeoGebra = `${b}x`;
        textoFuncion.textContent = `f(x) = ${funcionGeoGebra}`;

        if (ggbAppListo) {
            ggbAppListo.evalCommand("Delete(f)");
            ggbAppListo.evalCommand(`f(x) = ${funcionGeoGebra}`);
        }
    } else {
        const signoC = c > 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
        // Contenido que se inserta dentro del HTML en Clasificacion Afin
        cajaAfin.innerHTML = `
            <p>Expresión: f(x) = ${b}x ${signoC}</p>
            <ul>
                <li>Gráfica: Línea recta que no pasa por el origen.</li>
                <li>Corte Eje Y: Interseca al eje Y en las coordenadas (0, ${c}).</li>
                <li>Inclinación: Regulada por el valor del coeficiente de pendiente b (${b}).</li>
                <li>Traslación: Es una traslación vertical de la función lineal f(x) = ${b}x en ${c} unidades.</li>
            </ul>
        `;

        const funcionGeoGebra = `${b}x ${signoC}`;
        textoFuncion.textContent = `f(x) = ${funcionGeoGebra}`;

        if (ggbAppListo) {
            ggbAppListo.evalCommand("Delete(f)");
            ggbAppListo.evalCommand(`f(x) = ${funcionGeoGebra}`);
        }
    }
});