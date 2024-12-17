// Selección de elementos del DOM
const partyTitle = document.getElementById('party-title');
const colorPalette = document.getElementById('color-palette');
const popularColorElement = document.getElementById('popular-color');
const timerElement = document.getElementById('timer');
const resetButton = document.getElementById('reset-button'); // Botón de reinicio
const addRandomColorsButton = document.getElementById('add-random-colors'); // Botón para añadir colores aleatorios

// Variable para almacenar el sonido en reproducción
let currentSound = null;

// Función para obtener sonidos aleatorios desde la carpeta "audios"
function getRandomSound() {
    // Ruta relativa a la carpeta "audios"
    const sounds = [
        new Audio('./audios/astral-creepy-dark-logo-254198.mp3'),
        new Audio('./audios/brain-damage-148577.mp3'),
        new Audio('./audios/christmas-chimes-transitions-264369.mp3'),
        new Audio('./audios/cinematic-designed-sci-fi-whoosh-transition-nexawave-228295.mp3'),
        new Audio('./audios/cinematic-intro-6097.mp3'),
        new Audio('./audios/dark-engine-logo-141942.mp3'),
        new Audio('./audios/epic-hybrid-logo-157092.mp3'),
        new Audio('./audios/fx-braam-subdown-with-intense-drop-with-distortion-and-reverb-162383.mp3'),
        new Audio('./audios/horror-hit-logo-142395.mp3'),
        new Audio('./audios/morphed-metal-discharged-cinematic-trailer-sound-effects-124763 (1).mp3'),
        new Audio('./audios/morphed-metal-discharged-cinematic-trailer-sound-effects-124763.mp3'),
        new Audio('./audios/relaxing-guitar-loop-v5-245859.mp3'),
        new Audio('./audios/rock-cinematic-161648.mp3'),
        new Audio('./audios/sci-fi-sound-effect-designed-circuits-hum-10-200831.mp3'),
        new Audio('./audios/sci-fi-sound-effect-designed-circuits-hum-24-200825.mp3'),
        new Audio('./audios/shine-11-268907 (1).mp3'),
        new Audio('./audios/small-wind-272153.mp3'),
        new Audio('./audios/stab-f-01-brvhrtz-224599.mp3'),
        new Audio('./audios/sunflower-street-drumloop-85bpm-163900.mp3')
    ];
    return sounds[Math.floor(Math.random() * sounds.length)];
}
// Configuración inicial de colores con sonidos
const initialColors = [
    { name: 'Rojo', hex: '#FF0000', sound: getRandomSound() },
    { name: 'Verde', hex: '#00FF00', sound: getRandomSound() },
    { name: 'Azul', hex: '#0000FF', sound: getRandomSound() },
    { name: 'Naranja', hex: '#FFA500', sound: getRandomSound() },
    { name: 'Púrpura', hex: '#800080', sound: getRandomSound() },
    { name: 'Rosa', hex: '#FF69B4', sound: getRandomSound() },
    { name: 'Turquesa', hex: '#40E0D0', sound: getRandomSound() }
];

// Variable dinámica para manejar la lista de colores actual
let colors = [...initialColors];

// Objeto para llevar el conteo de votos por color
let colorVotes = {};

// Generar botones para los colores en la paleta
function createColorButtons() {
    colorPalette.innerHTML = ''; // Limpiar la paleta antes de agregar botones
    colors.forEach(color => {
        const button = document.createElement('button');
        button.style.backgroundColor = color.hex;
        button.classList.add('color-button');
        button.addEventListener('click', () => changeColor(color)); // Evento click
        colorPalette.appendChild(button);
        colorVotes[color.name] = colorVotes[color.name] || 0; // Inicializar votos
    });
}

// Cambiar el color del título y reproducir sonido
function changeColor(color) {
    partyTitle.style.color = color.hex; // Cambiar color del título
    colorVotes[color.name]++; // Incrementar votos para este color
    playSound(color.sound); // Reproducir el sonido asociado al color
    updatePopularColor(); // Actualizar el color más popular
}

// Reproducir sonido (deteniendo el anterior si es necesario)
function playSound(sound) {
    if (currentSound) {
        currentSound.pause(); // Detener el sonido actual
        currentSound.currentTime = 0; // Reiniciar el tiempo del sonido actual
    }
    currentSound = sound; // Asignar el nuevo sonido como actual
    currentSound.play(); // Reproducir el nuevo sonido
}

// Mostrar el color más popular
function updatePopularColor() {
    const mostVotedColor = Object.keys(colorVotes).reduce((a, b) =>
        colorVotes[a] > colorVotes[b] ? a : b
    );
    popularColorElement.textContent = `Color más popular: ${mostVotedColor}`;
}

// Reiniciar la fiesta (resetear votos, sonidos y lista de colores)
function resetParty() {
    partyTitle.style.color = 'black'; // Reiniciar el color del título
    colorVotes = {}; // Resetear votos
    popularColorElement.textContent = 'Color más popular: '; // Limpiar texto
    timerElement.textContent = 'Fiesta reiniciada manualmente'; // Notificación

    // Detener sonido en reproducción
    if (currentSound) {
        currentSound.pause();
        currentSound.currentTime = 0;
        currentSound = null;
    }

    // Restaurar la lista de colores original
    colors = [...initialColors];

    // Regenerar los botones de colores
    createColorButtons();
}

// Generar un color aleatorio
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Añadir colores aleatorios a la paleta
function addRandomColors() {
    colors = []; // Limpiar la lista actual de colores

    // Generar 8 nuevos colores aleatorios con sonidos aleatorios
    for (let i = 0; i < 8; i++) {
        const newColor = getRandomColor();
        const newSound = getRandomSound(); // Sonido aleatorio para cada color
        colors.push({ name: `Color Aleatorio ${i + 1}`, hex: newColor, sound: newSound });
    }

    createColorButtons(); // Regenerar botones
}

// Eventos para botones
resetButton.addEventListener('click', resetParty); // Botón de reinicio
addRandomColorsButton.addEventListener('click', addRandomColors); // Botón de colores aleatorios

// Inicializar la paleta de colores al cargar la página
createColorButtons();
