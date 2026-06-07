// --- LÓGICA DEL CLICKER ---
const clickArea = document.getElementById('click-area');
const sessionDisplay = document.getElementById('session-coins');
let clicksEnSesion = 0;

clickArea.addEventListener('click', () => {
    // 1. Sumamos 1 cristal (usando BigInt por seguridad)
    let cristalesActuales = BigInt(localStorage.getItem('userCoins') || "100");
    cristalesActuales += 1n; // 1n es 1 en formato BigInt
    localStorage.setItem('userCoins', cristalesActuales.toString());

    // 2. Efecto visual
    clicksEnSesion++;
    sessionDisplay.innerText = `+${clicksEnSesion} esta sesión`;
    
    // Mini animación de salto al cliquear
    clickArea.style.transform = "scale(0.9)";
    setTimeout(() => clickArea.style.transform = "scale(1)", 50);
});

const canciones = [
    { id: 1, titulo: "Tell Your World", artista: "Hatsune Miku", file: "assets/videos/video1.mp4", thumb: "assets/figuritas/.extra/thumb1.jpg" },
    { id: 3, titulo: "Lost One Sheep", artista: "Leo Need", file: "assets/videos/video2.mp4", thumb: "assets/figuritas/.extra/thumb2.jpg" },
    { id: 5, titulo: "DREAM PLACE", artista: "MORE MORE JUMP!", file: "assets/videos/video3.mp4", thumb: "assets/figuritas/.extra/thumb3.jpg" },
    { id: 7, titulo: "Konton Boggie", artista: "Wonderlands x showtime", file: "assets/videos/video4.mp4", thumb: "assets/figuritas/.extra/thumb4.jpg" },
    { id: 9, titulo: "Mind Brand", artista: "Nightcord at 25", file: "assets/videos/video4.mp4", thumb: "assets/figuritas/.extra/thumb4.jpg" },
    { id: 10, titulo: "Non Breath Oblige", artista: "Nightcord at 25", file: "assets/videos/video4.mp4", thumb: "assets/figuritas/.extra/thumb4.jpg" },
    { id: 11, titulo: "NEO", artista: "Leaders", file: "assets/videos/video4.mp4", thumb: "assets/figuritas/.extra/thumb4.jpg" }
];

const videoList = document.getElementById('video-list');
const overlay = document.getElementById('video-player-overlay');
const mainVideo = document.getElementById('main-video');
const playingTitle = document.getElementById('playing-title');
const closeBtn = document.getElementById('close-video');

let tiempoMax = 0;

// Generar la lista visual
canciones.forEach(cancion => {
    const item = document.createElement('div');
    item.className = 'video-item';
    item.innerHTML = `
        <img src="${cancion.thumb}" class="video-thumbnail">
        <div class="video-details">
            <h4>${cancion.titulo}</h4>
            <p>${cancion.artista} • RECOMPENSA: 100 🪙</p>
        </div>
    `;
    item.onclick = () => abrirVideo(cancion);
    videoList.appendChild(item);
});

function abrirVideo(cancion) {
    tiempoMax = 0;
    mainVideo.src = cancion.file;
    playingTitle.innerText = `Reproduciendo: ${cancion.titulo}`;
    overlay.style.display = 'flex';
    mainVideo.play();
}

// Bloqueo de adelantado (el mismo que antes)
mainVideo.addEventListener('timeupdate', () => {
    if (!mainVideo.seeking) {
        if (mainVideo.currentTime > tiempoMax + 0.5) {
            mainVideo.currentTime = tiempoMax;
        } else {
            tiempoMax = mainVideo.currentTime;
        }
    }
});

// Premio
mainVideo.addEventListener('ended', () => {
    let monedas = BigInt(localStorage.getItem('userCoins') || "100");
    monedas += 100n;
    localStorage.setItem('userCoins', monedas.toString());
    alert("¡Misión cumplida! Ganaste 100 monedas.");
    overlay.style.display = 'none';
});

closeBtn.onclick = () => {
    mainVideo.pause();
    overlay.style.display = 'none';
};

// misiones.js

// ... (mantener la lista de canciones y variables anteriores) ...

function abrirVideo(cancion) {
    tiempoMax = 0;
    mainVideo.src = cancion.file;
    playingTitle.innerText = `Reproduciendo: ${cancion.titulo}`;
    
    // Mostramos el overlay
    overlay.style.display = 'flex';
    overlay.style.animation = 'fadeIn 0.3s forwards';
    
    // Quitamos controles de adelantar (opcional, para más seguridad)
    mainVideo.disablePictureInPicture = true;
    mainVideo.play();
}

// Bloqueo de adelantado: El usuario no puede saltar hacia adelante
mainVideo.addEventListener('timeupdate', () => {
    if (!mainVideo.seeking) {
        if (mainVideo.currentTime > tiempoMax + 0.5) {
            mainVideo.currentTime = tiempoMax;
        } else {
            tiempoMax = mainVideo.currentTime;
        }
    }
});

// VERIFICACIÓN AL TERMINAR
mainVideo.addEventListener('ended', () => {
    // 1. Sumamos las monedas solo AQUÍ
    let monedas = BigInt(localStorage.getItem('userCoins') || "0");
    monedas += 100n;
    localStorage.setItem('userCoins', monedas.toString());

    // 2. Cerramos el reproductor automáticamente
    overlay.style.display = 'none';
    mainVideo.src = ""; // Limpiamos el video

    // 3. Alert de confirmación
    setTimeout(() => {
        alert("✨ ¡Video completado! ✨\nHas recibido 100 cristales.");
        // Opcional: actualizar el contador de monedas si tenés uno en pantalla
        if(window.actualizarInterfazMonedas) window.actualizarInterfazMonedas();
    }, 100);
});

// Botón cerrar (Sin premio)
closeBtn.onclick = () => {
    if (confirm("Si cierras ahora no recibirás la recompensa. ¿Cerrar de todos modos?")) {
        mainVideo.pause();
        mainVideo.src = "";
        overlay.style.display = 'none';
    }
};