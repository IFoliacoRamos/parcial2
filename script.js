/**
 * Universidad - Facultad de Ingeniería
 * Asignatura: Introducción a la Computación Gráfica
 * * Estudiante: _Iveth_Alejandra_Foliaco Ramos____
 * * Tarea: Implementar los algoritmos de rasterización manual.
 * 
 * Reto: Desarrollar un script en JavaScript que, al cargar la página, genere automáticamente una figura compuesta por un polígono regular
 * de n lados (donde n es un número aleatorio entre 5 y 10). En cada vértice del polígono, se debe trazar una circunferencia de radio R/4 
 * (donde R es el radio del polígono). Todo el trazado debe realizarse píxel a píxel.
 * 
 * Validación de Octantes: En el algoritmo de Bresenham para líneas, el código debe soportar pendientes m > 1 y m < 0.
 * Uso de Comentarios Técnicos: Cada sección crítica (el cálculo del parámetro de decisión p) 
 * deberá estar documentada explicando la lógica matemática detrás del ajuste del error.
 */
// Obtener canvas y contexto
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
// Función de apoyo para dibujar un píxel individual
function drawPixel(ctx, x, y, color = "#000000") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

/**
 * Implementación del algoritmo de Bresenham para líneas.
 * @param {number} x0, y0 - Coordenadas iniciales
 * @param {number} x1, y1 - Coordenadas finales
 * @param {string} color - Color de la línea
 * @returns {void}
 */
function bresenhamLine(x0, y0, x1, y1, color) {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);

    //Dirección de avance en cada eje (+1 o -1)
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;

    // Error acumulado 
    let err = dx - dy;

    while (true){
        drawPixel(ctx, x0, y0, color);
        // Si se alcanzó el punto final, terminar
        if (x0 === x1 && y0 === y1) break;

        let e2 = 2 * err;
        // Ajuste horizontal
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        // Ajuste vertical
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }

    }
}
// bresenham para circunferencias
function bresenhamCircle(cx, cy, r, color = "#e01313"){

    let x = 0;
    let y = r;
    
    // Parametro de desicion inicial 
    let p = 3 - 2 * r; 
    while (x <= y) {
        plotCirclePoints(cx, cy, x, y, color);

        if (p < 0) {
            p = p + 4 * x + 6;
        } else {
            p = p + 4 * (x - y) + 10;
            y--;
        }

        x++;
     }
   }

   // dibuja los 8 octantes de la circunferencia 
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

/**
 * Calcula los vértices de un polígono regular.
 * @param {number} centerX, centerY - Centro
 * @param {number} sides - Número de lados
 * @param {number} radius - Radio
 * @returns {Array} Arreglo de objetos {x, y}
 */
function getPolygonVertices(centerX, centerY, sides, radius) {
    // Desarrollo del estudiante (Uso de Math.sin/Math.cos y retorno de datos)
    let vertices = [];

    for (let i = 0; i < sides; i++) {
        //divide la circunferencia completa en partes iguales
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
