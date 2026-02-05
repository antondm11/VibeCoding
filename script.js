// Datos de podios por monoplaza basados en StatsF1
const podiumData = [
    { name: 'Tyrrell P34', podios: 14 },
    { name: 'Brabham BT46B', podios: 1 },
    { name: 'Tyrrell 019', podios: 2 },
    { name: 'Modena Lambo 291', podios: 0 },
    { name: 'Ferrari F92A', podios: 2 },
    { name: 'Williams FW26', podios: 4 },
    { name: 'Renault R31', podios: 2 },
    { name: 'Force India VJM08', podios: 1 },
    { name: 'Force India VJM09', podios: 2 },
    { name: 'Mercedes W13', podios: 17 }
];

// Colores para las barras
const colors = [
    '#dc0000', '#ff4444', '#ff6b6b', '#ff8787',
    '#ffa5a5', '#ffb3b3', '#ffc1c1', '#ffdddd', '#ffe8e8', '#ffebeb'
];

// Función para inicializar el gráfico
function initPodiumChart() {
    const canvas = document.getElementById('podiumChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);

    // Configurar dimensiones
    const maxPodiums = Math.max(...podiumData.map(d => d.podios));
    const padding = 50;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - padding - 40;
    const barWidth = chartWidth / podiumData.length;

    // Dibujar fondo
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);

    // Dibujar barras
    podiumData.forEach((car, index) => {
        const barHeight = (car.podios / maxPodiums) * chartHeight;
        const x = padding + index * barWidth + barWidth * 0.1;
        const y = height - padding - barHeight;

        // Dibujar barra
        ctx.fillStyle = colors[index];
        ctx.fillRect(x, y, barWidth * 0.8, barHeight);

        // Sombra
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetY = 2;

        // Número de podios encima de la barra
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 14px Segoe UI';
        ctx.textAlign = 'center';
        ctx.fillText(car.podios, x + barWidth * 0.4, y - 10);

        // Nombre del coche abajo (rotado)
        ctx.save();
        ctx.translate(x + barWidth * 0.4, height - padding + 15);
        ctx.rotate(-Math.PI / 4);
        ctx.fillStyle = '#999';
        ctx.font = '11px Segoe UI';
        ctx.textAlign = 'right';
        ctx.fillText(car.name, 0, 0);
        ctx.restore();
    });

    // Dibujar ejes
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 2;

    // Eje Y
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.stroke();

    // Eje X
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width, height - padding);
    ctx.stroke();

    // Etiquetas del eje Y
    ctx.fillStyle = '#999';
    ctx.font = '12px Segoe UI';
    ctx.textAlign = 'right';
    for (let i = 0; i <= maxPodiums; i += 2) {
        const y = height - padding - (i / maxPodiums) * chartHeight;
        ctx.fillText(i, padding - 10, y + 4);
    }
}

// Función para redimensionar el canvas
function resizeCanvas() {
    const canvas = document.getElementById('podiumChart');
    if (!canvas) return;

    const container = canvas.parentElement;
    const containerWidth = container.offsetWidth;

    if (window.innerWidth <= 480) {
        canvas.width = containerWidth - 30;
        canvas.height = 250;
    } else if (window.innerWidth <= 768) {
        canvas.width = containerWidth - 40;
        canvas.height = 300;
    } else {
        canvas.width = containerWidth - 40;
        canvas.height = 400;
    }

    initPodiumChart();
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    resizeCanvas();
});

// Redimensionar cuando la ventana cambie tamaño
window.addEventListener('resize', function() {
    resizeCanvas();
});

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Carga de imágenes lazy loading
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Abrir imagen completa al hacer clic (pilotos y coches)
function enableImageClickToOpen() {
    const imgs = document.querySelectorAll('.pilot img, .car-image img');
    imgs.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
            // Si tiene data-src y aún no se ha cargado, usar data-src
            const src = img.dataset.src || img.src;
            if (src) {
                window.open(src, '_blank', 'noopener');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Habilitar apertura de imagen tras carga del DOM
    enableImageClickToOpen();
});
