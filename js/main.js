// --- 1. CONFIGURACIÓN INICIAL ---
const coleccionBase = [
    { id: 1, nombre: "☆☆☆☆", rareza: "Legendaria", imagen: "assets/Figuritas/Miku/wl.jpg" },
    { id: 2, nombre: "୨୧ Cumpleaños", rareza: "Cumpleaños", imagen: "assets/Figuritas/Miku/Mikumple.jpg" },
    { id: 3, nombre: "☆☆☆☆", rareza: "Común", imagen: "assets/Figuritas/Miku/Miku.jpg" },
    { id: 6, nombre: "☆☆☆☆ Leo Need", rareza: "Rara", imagen: "assets/Figuritas/Miku/LN.jpg" },
    { id: 7, nombre: "☆☆☆☆ MORE MORE JUMP!", rareza: "Rara", imagen: "assets/Figuritas/Miku/MMJ.jpg" },
    { id: 8, nombre: "☆☆☆☆ Vivid Bad Squad", rareza: "Rara", imagen: "assets/Figuritas/Miku/VBS.jpg" },
    { id: 9, nombre: "☆☆☆☆ Wonderland x Showtime", rareza: "Rara", imagen: "assets/Figuritas/Miku/WXS.jpg" },
    { id: 10, nombre: "☆☆☆☆ Nightcord at 25", rareza: "Rara", imagen: "assets/Figuritas/Miku/N25.jpg" },

    { id: 11, nombre: "☆☆☆☆", rareza: "Legendaria", imagen: "assets/Figuritas/Emu/wl.jpg" },
    { id: 12, nombre: "୨୧ Cumpleaños", rareza: "Cumpleaños", imagen: "assets/Figuritas/Emu/cumple.jpg" },
    { id: 12, nombre: "☆☆☆☆", rareza: "Legendaria", imagen: "assets/Figuritas/Emu/guerrera.jpg" },
    { id: 13, nombre: "☆☆☆☆", rareza: "Rara", imagen: "assets/Figuritas/Emu/caballero.jpg" },
    { id: 14, nombre: "☆☆☆☆", rareza: "Común", imagen: "assets/Figuritas/Emu/wonderhorror.jpg" },
    { id: 15, nombre: "☆☆☆☆", rareza: "Común", imagen: "assets/Figuritas/Emu/vamp.jpg" },
    { id: 16, nombre: "☆☆☆☆", rareza: "Común", imagen: "assets/Figuritas/Emu/payaso.jpg" },
    { id: 17, nombre: "☆☆☆☆", rareza: "Común", imagen: "assets/Figuritas/Emu/Fenix.jpg" },

    { id: 17, nombre: "☆☆☆☆", rareza: "Legendaria", imagen: "assets/Figuritas/Kanade/wl.jfif" },
    { id: 18, nombre: "୨୧ Cumpleaños", rareza: "Cumpleaños", imagen: "assets/Figuritas/Kanade/cumple.jfif" },
    { id: 19, nombre: "☆☆☆☆", rareza: "Legendaria", imagen: "assets/Figuritas/Kanade/sanva.jfif" },
    { id: 20, nombre: "☆☆☆☆", rareza: "Raro", imagen: "assets/Figuritas/Kanade/corto.jfif" },
    { id: 21, nombre: "☆☆☆☆", rareza: "Común", imagen: "assets/Figuritas/Kanade/4k.jfif" },
    { id: 22, nombre: "☆☆☆☆", rareza: "Común", imagen: "assets/Figuritas/Kanade/caja.jfif" },
    { id: 23, nombre: "☆☆☆☆", rareza: "Común", imagen: "assets/Figuritas/Kanade/enojo.jfif" },
    { id: 24, nombre: "☆☆☆☆", rareza: "Común", imagen: "assets/Figuritas/Kanade/pinguino.jfif" },
];

function obtenerRarezaGacha() {
    const num = Math.random() * 100; // Genera un número de 0 a 99.99

    if (num < 1) return "Cumpleaños";    // 0 a 3.99 -> 4% de probabilidad
    if (num < 14) return "Legendaria";  // 4 a 13.99 -> 10% de probabilidad
    if (num < 44) return "Raro";        // 14 a 43.99 -> 30% de probabilidad
    return "Común";                     // 44 en adelante -> 54% de probabilidad
}

function abrirSobre() {
    // 1. Decidir qué rareza va a salir
    const rarezaSorteada = obtenerRarezaGacha();

    // 2. Filtrar TU coleccionBase para obtener solo las de esa rareza
    const posiblesCartas = coleccionBase.filter(carta => carta.rareza === rarezaSorteada);

    // 3. Si por casualidad no tenés cartas en esa rareza todavía, sacamos una común para que no explote el juego
    const poolFinal = posiblesCartas.length > 0 ? posiblesCartas : coleccionBase.filter(c => c.rareza === "Común");

    // 4. Elegir una al azar del resultado filtrado
    const cartaGanada = poolFinal[Math.floor(Math.random() * poolFinal.length)];

    console.log(`¡Suerte! Rareza: ${rarezaSorteada}. Te tocó: ${cartaGanada.nombre}`);

    // Llamar a tu función de mostrar carta
    mostrarCartaEnPantalla(cartaGanada);
}

// --- CONFIGURACIÓN DE TÍTULOS POR PÁGINA ---
const titulosPaginas = [
    "Hatsune Miku's Collection", // Página 1 (Índice 0)
    "Emu Otori's Collection",    // Página 2 (Índice 1)
    "Kanade Yoisaki's Collection", // Página 3 (Índice 2)
    "Leo/need Section",          // Página 4 ... y así seguís
];

let misFiguritas = JSON.parse(localStorage.getItem('misFiguritas')) || [];
let coinsCount = parseInt(localStorage.getItem('userCoins')) || 100;
let currentPage = 0;
const figsPerPage = 8; // 4 por carilla

// --- 2. ACTUALIZAR INTERFAZ ---
function actualizarCristales() {
    const display = document.getElementById('coins');
    if (display) display.textContent = coinsCount;
    localStorage.setItem('userCoins', coinsCount);
}

// --- 3. LÓGICA DE APERTURA (HOME) ---
const btnStart = document.getElementById('btn-start');
if (btnStart) {
    btnStart.addEventListener('click', () => {
        if (coinsCount >= 10) {
            coinsCount -= 10;
            actualizarCristales();
            abrirSobre();
        } else {
            alert('¡No tenés suficientes cristales!');
        }
    });
}

function abrirSobre() {
    let nuevasFigus = [];
    for (let i = 0; i < 5; i++) {
        const indiceAzar = Math.floor(Math.random() * coleccionBase.length);
        const figuGanada = coleccionBase[indiceAzar];
        nuevasFigus.push(figuGanada);
        misFiguritas.push(figuGanada);
    }
    localStorage.setItem('misFiguritas', JSON.stringify(misFiguritas));

    // Llamamos a la función para dibujarlas
    renderizarNuevasFigus(nuevasFigus);
}

function renderizarNuevasFigus(figus) {
    let display = document.getElementById('cards-display');
    if (!display) {
        display = document.createElement('div');
        display.id = 'cards-display';
        const container = document.querySelector('.welcome-container');
        container.insertBefore(display, document.querySelector('.pack-display-area'));
    }

    display.innerHTML = "";

    figus.forEach((figu, index) => {
        const card = document.createElement('div');
        card.className = 'card-new';
        card.style.animationDelay = `${index * 0.15}s`;

        // ¡OJO ACÁ!: Solo figu.imagen porque ya tiene "assets/Figuritas/..."
        card.innerHTML = `
            <img src="${figu.imagen}" alt="${figu.nombre}">
            <div class="slot-name">${figu.nombre}</div>
        `;
        display.appendChild(card);
    });
}

// --- 4. LÓGICA DEL ÁLBUM (PÁGINAS) ---
function renderizarAlbum() {

    const tituloAlbum = document.getElementById('album-title');

    if (tituloAlbum) {
        tituloAlbum.textContent = titulosPaginas[currentPage] || "Mi Colección";
    }

    const gridLeft = document.getElementById('grid-left');
    const gridRight = document.getElementById('grid-right');
    if (!gridLeft || !gridRight) return;

    gridLeft.innerHTML = "";
    gridRight.innerHTML = "";

    const inicio = currentPage * figsPerPage;
    const fin = inicio + figsPerPage;
    const visibles = coleccionBase.slice(inicio, fin);

    visibles.forEach((figu, index) => {
        const copias = misFiguritas.filter(f => f.id === figu.id).length;
        const tiene = copias > 0;

        const slot = document.createElement('div');
        slot.className = `album-slot ${tiene ? 'owned' : ''}`;
        slot.innerHTML = `
            <span class="slot-number">${figu.id}</span>
            ${tiene ? `<img src="${figu.imagen}" alt="${figu.nombre}">` : ''}
            ${tiene ? `<span class="slot-count">x${copias}</span>` : ''}
            <div class="slot-name">${figu.nombre}</div>
        `;

        if (index < 4) gridLeft.appendChild(slot);
        else gridRight.appendChild(slot);
    });

    document.getElementById('current-page-num').textContent = currentPage + 1;
}

// --- LÓGICA DE CANJE AUTOMÁTICO EN EL ÁLBUM ---
function verificarRepetidasParaPremio() {
    // Solo ejecutamos esto si estamos en la página del álbum
    if (!window.location.pathname.includes('album.html')) return;

    let huboCanje = false;
    let coleccionesPremiadas = []; // Para guardar los nombres de las secciones
    let totalCristalesAGanar = 0; // Acumulador para el premio total

    // 1. Contamos cuántas tenemos de cada una
    const conteo = {};
    misFiguritas.forEach(f => {
        conteo[f.id] = (conteo[f.id] || 0) + 1;
    });

    // 2. Revisamos si alguna llegó a 11
    for (const id in conteo) {
        if (conteo[id] >= 11) {
            // IDENTIFICAR LA COLECCIÓN:
            // Buscamos el índice de la figurita en la base total para saber su página
            const indexBase = coleccionBase.findIndex(f => f.id == id);
            // Si cada página tiene 8 cartas (figsPerPage), calculamos el índice del título
            const numPagina = Math.floor(indexBase / 8);
            const nombreColeccion = titulosPaginas[numPagina] || "una colección especial";

            if (!coleccionesPremiadas.includes(nombreColeccion)) {
                coleccionesPremiadas.push(nombreColeccion);
            }

            // 3. Restamos 10 figuritas de ese ID de la lista
            let eliminadas = 0;
            misFiguritas = misFiguritas.filter(f => {
                if (f.id == id && eliminadas < 10) {
                    eliminadas++;
                    return false; // Se elimina
                }
                return true; // Se queda
            });

            // Acumulamos las 20 cristales en una variable limpia primero
            totalCristalesAGanar += 20;
            huboCanje = true;
        }
    }

    if (huboCanje) {
        // 4. Sumamos los cristales usando BigInt para que soporte números gigantes de 12 dígitos
        let cristalesActualesRaw = localStorage.getItem('userCoins') || "100";
        let cristalesActuales = BigInt(cristalesActualesRaw);
        let nuevosCristales = cristalesActuales + BigInt(totalCristalesAGanar);

        // 5. Guardamos TODO junto en el almacenamiento local de forma inmediata
        localStorage.setItem('userCoins', nuevosCristales.toString());
        localStorage.setItem('misFiguritas', JSON.stringify(misFiguritas));

        // Opcional: Si tenés un elemento de texto mostrando los cristales en el álbum, lo actualizamos en vivo
        const contenedorCristales = document.getElementById('coins-display') || document.querySelector('.cristales-clase');
        if (contenedorCristales) {
            contenedorCristales.textContent = `Cristales: ${nuevosCristales.toString()}`;
        }

        // Armamos el mensaje detallado con los nombres de las secciones afectadas
        const listaNombres = coleccionesPremiadas.join(", ");

        // ¡EL TRUCO CLAVE!: Retrasamos el aviso para permitir que la página cargue primero
        setTimeout(() => {
            alert(`¡Llegaste a las 10 figuritas extra en: ${listaNombres}!\nGanaste ${totalCristalesAGanar} cristales.`);

            // Recargamos RECIÉN DESPUÉS de que le das a aceptar para asentar el render
            location.reload();
        }, 300); // 300 milisegundos son suficientes para que todo se dibuje de fondo
    }
}

// Llamamos a esta función al final de tu script o al cargar el álbum
verificarRepetidasParaPremio();

// Botones de navegación
document.addEventListener('click', (e) => {
    if (e.target.id === 'next-page') {
        if ((currentPage + 1) * figsPerPage < coleccionBase.length) {
            currentPage++;
            renderizarAlbum();
        }
    }
    if (e.target.id === 'prev-page') {
        if (currentPage > 0) {
            currentPage--;
            renderizarAlbum();
        }
    }
});

// --- FUNCIÓN PARA REINICIAR COLECCIÓN ---
const btnReset = document.getElementById('btn-reset');

if (btnReset) {
    btnReset.addEventListener('click', () => {
        // El 'confirm' muestra un cartel con "Aceptar" y "Cancelar"
        const confirmacion = confirm("⚠️ ¿Estás segura de que querés REINICIAR tu colección? Se borrarán todas tus figuritas y el progreso volverá a cero.");

        if (confirmacion) {
            // Si el usuario puso 'Aceptar', borramos la colección
            localStorage.removeItem('misFiguritas');

            // Opcional: Si querés que los cristales tmb vuelvan a 100, descomentá la línea de abajo:
            // localStorage.setItem('userCoins', 100);

            alert("Colección reiniciada. ¡Buena suerte con los nuevos sobres!");
            location.reload(); // Recarga la página para limpiar los slots del álbum
        } else {
            // Si puso 'Cancelar', no hace nada
            console.log("Reinicio cancelado");
        }
    });
}

// Iniciar todo
window.onload = () => {
    actualizarCristales();
    renderizarAlbum();
};