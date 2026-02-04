// Datos de podios por monoplaza
// Formato: [coches, podios] basado en investigación histórica de F1

const podiomData = {
    'Tyrrell P34': { podios: 5, carreras: 32 },
    'Brabham BT46B': { podios: 2, carreras: 2 },
    'Tyrrell 019': { podios: 1, carreras: 16 },
    'Modena Lambo 291': { podios: 0, carreras: 2 },
    'Ferrari F92A': { podios: 2, carreras: 16 },
    'Williams FW26': { podios: 1, carreras: 18 },
    'Renault R31': { podios: 2, carreras: 19 },
    'Force India VJM08B': { podios: 1, carreras: 10 },
    'Mercedes W13': { podios: 1, carreras: 22 }
};

// Función para inicializar el gráfico de podios
function initPodiomChart() {
    const canvas = document.getElementById('podiumChart');
    
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Preparar datos
    const cars = Object.keys(podiomData);
    const podiums = cars.map(car => podiomData[car].podios);
    
    // Colores del gráfico
    const colors = [
        '#dc0000', '#ff6b6b', '#ff8787', '#ffa5a5',
        '#ffb3b3', '#ffc1c1', '#ffcfcf', '#ffdddd', '#ffebeb'
    ];

    // Configurar el gráfico
    const barWidth = canvas.width / cars.length;
    const maxPodiums = Math.max(...podiums, 5);
    const chartHeight = canvas.height * 0.8;
    const padding = 40;

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar barras
    cars.forEach((car, index) => {
        const barHeight = (podiums[index] / maxPodiums) * chartHeight;
        const x = padding + index * (barWidth);
        const y = canvas.height - barHeight - padding;

        // Dibujar barra
        ctx.fillStyle = colors[index];
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetY = 2;
        ctx.fillRect(x + barWidth * 0.1, y, barWidth * 0.8, barHeight);

        // Dibujar número de podios encima de la barra
        ctx.fillStyle = '#1a1a1a';
        ctx.font = 'bold 14px Segoe UI';
        ctx.textAlign = 'center';
        ctx.fillText(podiums[index], x + barWidth * 0.5, y - 10);

        // Dibujar nombre del coche abajo
        ctx.save();
        ctx.translate(x + barWidth * 0.5, canvas.height - padding + 20);
        ctx.rotate(-Math.PI / 4);
        ctx.font = '11px Segoe UI';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'right';
        ctx.fillText(car, 0, 0);
        ctx.restore();
    });

    // Dibujar eje Y
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.stroke();

    // Dibujar eje X
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width, canvas.height - padding);
    ctx.stroke();

    // Dibujar etiquetas del eje Y
    ctx.fillStyle = '#666';
    ctx.font = '12px Segoe UI';
    ctx.textAlign = 'right';
    for (let i = 0; i <= maxPodiums; i++) {
        const y = canvas.height - padding - (i / maxPodiums) * chartHeight;
        ctx.fillText(i, padding - 10, y + 4);
    }
}

// Función para manejar el redimensionamiento del canvas
function handleCanvasResize() {
    const canvas = document.getElementById('podiumChart');
    
    if (!canvas) return;

    const container = canvas.parentElement;
    const containerWidth = container.offsetWidth;
    
    // Establecer el tamaño del canvas según el dispositivo
    if (window.innerWidth <= 480) {
        canvas.width = containerWidth - 40;
        canvas.height = 250;
    } else if (window.innerWidth <= 768) {
        canvas.width = containerWidth - 40;
        canvas.height = 300;
    } else {
        canvas.width = containerWidth - 40;
        canvas.height = 400;
    }

    initPodiomChart();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    handleCanvasResize();
});

window.addEventListener('resize', function() {
    handleCanvasResize();
});

// Función para desplazamiento suave (mejorar UX)
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

// Función para cargar dinámicamente las imágenes (lazy loading)
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

// Función para agregar efectos de carga
window.addEventListener('load', function() {
    const cards = document.querySelectorAll('.car-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Función para mejorar la accesibilidad
document.addEventListener('keydown', function(event) {
    // Permitir navegación con teclado
    if (event.key === 'ArrowDown') {
        window.scrollBy({
            top: 300,
            behavior: 'smooth'
        });
    } else if (event.key === 'ArrowUp') {
        window.scrollBy({
            top: -300,
            behavior: 'smooth'
        });
    }
});
