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

// Función de apoyo para dibujar un píxel individual
function drawPixel(ctx, x, y, color = "#000000") {
    ctx.fillStyle = color;
    ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

/**
 * Implementación del algoritmo de Bresenham para líneas.
 * @param {number} x0, y0 - Coordenadas iniciales
 * @param {number} x1, y1 - Coordenadas finales
 * @returns {void}
 */
function bresenhamLine(x0, y0, x1, y1, color) {
    // Desarrollo del estudiante
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
}
