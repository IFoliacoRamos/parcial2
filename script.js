/**
 * Universidad - Facultad de Ingeniería
 * Asignatura: Introducción a la Computación Gráfica
 * Estudiante: Iveth Alejandra Foliaco Ramos
 *
 * Reto:
 * Generar automáticamente, al cargar la página, una figura compuesta por:
 * - Un polígono regular de n lados (n aleatorio entre 5 y 10)
 * - Circunferencias en cada vértice con radio R/4
 * Todo debe implementarse mediante rasterización píxel a píxel.
 *
 * Restricciones:
 * - No usar primitivas gráficas como lineTo() o arc()
 * - Implementar Bresenham para líneas y circunferencias
 * - Explicar parámetros de decisión y lógica de error
 */

// =========================
// Canvas y contexto global
// =========================
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/**
 * Dibuja un píxel individual en el canvas.
 * Es la base de toda la rasterización.
 */
function drawPixel(ctx, x, y, color = "#000000") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

// ======================================
// ALGORITMO DE BRESENHAM PARA LÍNEAS
// ======================================
/**
 * Bresenham Line Algorithm
 *
 * Idea:
 * Dibuja una línea determinando en cada paso
 * qué píxel es más cercano a la trayectoria ideal.
 *
 * Se usa un "error acumulado" para decidir el avance.
 */
function bresenhamLine(x0, y0, x1, y1, color) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);

    // Dirección del avance en cada eje
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;

    /**
     * Error acumulado:
     * Representa la diferencia entre la línea ideal
     * y la posición discreta en píxeles.
     */
    let err = dx - dy;

    while (true) {
        drawPixel(ctx, x0, y0, color);

        // Condición de parada: se alcanzó el punto final
        if (x0 === x1 && y0 === y1) break;

        let e2 = 2 * err;

        // Ajuste horizontal:
        // si el error indica desviación, avanzamos en X
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }

        // Ajuste vertical:
        // si el error lo requiere, avanzamos en Y
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

// ======================================
// ALGORITMO DE BRESENHAM PARA CÍRCULOS
// ======================================
/**
 * Bresenham / Midpoint Circle Algorithm
 *
 * Idea:
 * Se calcula solo un octante del círculo y se replica
 * por simetría en los 8 octantes.
 *
 * El parámetro de decisión "p" determina
 * si el siguiente píxel está dentro o fuera del círculo.
 */
function bresenhamCircle(cx, cy, r, color = "#e01313") {

    let x = 0;
    let y = r;

    /**
     * Parámetro de decisión inicial:
     * p = 3 - 2r
     *
     * Representa la evaluación inicial del punto medio
     * entre dos posibles píxeles.
     */
    let p = 3 - 2 * r;

    while (x <= y) {
        plotCirclePoints(cx, cy, x, y, color);

        /**
         * Decisión:
         * - Si p < 0 → el punto medio está dentro del círculo
         *              se incrementa solo x
         *
         * - Si p >= 0 → el punto medio está fuera
         *               se incrementa x y se decrementa y
         */
        if (p < 0) {
            p = p + 4 * x + 6;
        } else {
            p = p + 4 * (x - y) + 10;
            y--;
        }

        x++;
    }
}

/**
 * Replica un punto en los 8 octantes del círculo
 * aprovechando la simetría geométrica.
 */
function plotCirclePoints(cx, cy, x, y, color) {
    drawPixel(ctx, cx + x, cy + y, color);
    drawPixel(ctx, cx - x, cy + y, color);
    drawPixel(ctx, cx + x, cy - y, color);
    drawPixel(ctx, cx - x, cy - y, color);

    drawPixel(ctx, cx + y, cy + x, color);
    drawPixel(ctx, cx - y, cy + x, color);
    drawPixel(ctx, cx + y, cy - x, color);
    drawPixel(ctx, cx - y, cy - x, color);
}

// ======================================
// CÁLCULO DE VÉRTICES DEL POLÍGONO
// ======================================
/**
 * Genera los vértices de un polígono regular.
 *
 * Matemática:
 * Cada vértice se obtiene dividiendo el ángulo total (2π)
 * en partes iguales según el número de lados.
 *
 * x = cx + R * cos(θ)
 * y = cy + R * sin(θ)
 */
function getPolygonVertices(centerX, centerY, sides, radius) {

    let vertices = [];

    for (let i = 0; i < sides; i++) {

        // Divide la circunferencia en partes iguales
        let angle = (2 * Math.PI * i) / sides - Math.PI / 2;

        let x = centerX + radius * Math.cos(angle);
        let y = centerY + radius * Math.sin(angle);

        vertices.push({
            x: Math.round(x),
            y: Math.round(y)
        });
    }

    return vertices;
}

// ======================================
// FUNCIÓN PRINCIPAL DE DIBUJO
// ======================================
/**
 * Esta función controla todo el proceso:
 * - genera figura
 * - calcula vértices
 * - dibuja polígono
 * - dibuja circunferencias
 */
function drawFigure() {

    // Limpia el canvas antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Número aleatorio de lados (5 a 10)
    let n = Math.floor(Math.random() * 6) + 5;

    // Centro del canvas
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;

    // Radio del polígono
    let R = 180;

    // Generación de vértices
    let vertices = getPolygonVertices(centerX, centerY, n, R);

    // =========================
    // DIBUJO DEL POLÍGONO
    // =========================
    for (let i = 0; i < vertices.length; i++) {

        let current = vertices[i];
        let next = vertices[(i + 1) % vertices.length];

        // Conexión entre vértices usando Bresenham
        bresenhamLine(current.x, current.y, next.x, next.y, "#0000FF");
    }

    // =========================
    // DIBUJO DE CÍRCULOS
    // =========================
    let circleRadius = Math.floor(R / 4);

    for (let vertex of vertices) {
        bresenhamCircle(vertex.x, vertex.y, circleRadius, "#FF0000");
    }
}

// Ejecuta automáticamente al cargar la página
window.onload = drawFigure;