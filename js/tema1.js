// Datos simulados de la ruta del dron
const tiempo = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const posicionX = [0, 5, 11, 18, 26, 35, 45, 56, 68, 81, 95];
const posicionY = [0, 2, 5, 9, 14, 20, 27, 35, 44, 54, 65];

// Cálculo de velocidades por componentes
const velocidadX = [];
const velocidadY = [];
const velocidadTotal = [];

for (let i = 0; i < tiempo.length; i++) {

    if (i === 0) {
        velocidadX.push(0);
        velocidadY.push(0);
        velocidadTotal.push(0);
    } else {

        const dt = tiempo[i] - tiempo[i - 1];

        const vx = (posicionX[i] - posicionX[i - 1]) / dt;
        const vy = (posicionY[i] - posicionY[i - 1]) / dt;

        velocidadX.push(vx);
        velocidadY.push(vy);

        const v = Math.sqrt(vx ** 2 + vy ** 2);

        velocidadTotal.push(Number(v.toFixed(2)));
    }
}

// Cálculo de aceleración
// Cálculo de aceleración
// La aceleración se calcula a partir de dos intervalos
// consecutivos de velocidad.

const aceleracionX = [];
const aceleracionY = [];
const aceleracionTotal = [];

for (let i = 0; i < tiempo.length; i++) {

    if (i < 2) {

        aceleracionX.push(null);
        aceleracionY.push(null);
        aceleracionTotal.push(null);

    } else {

        const dt = tiempo[i] - tiempo[i - 1];

        const ax =
            (velocidadX[i] - velocidadX[i - 1]) / dt;

        const ay =
            (velocidadY[i] - velocidadY[i - 1]) / dt;

        aceleracionX.push(
            Number(ax.toFixed(2))
        );

        aceleracionY.push(
            Number(ay.toFixed(2))
        );

        const aceleracion =
            Math.sqrt(ax ** 2 + ay ** 2);

        aceleracionTotal.push(
            Number(aceleracion.toFixed(2))
        );
    }
}

// ========================
// GRÁFICA DE POSICIÓN
// ========================

new Chart(
    document.getElementById("positionChart"),
    {
        type: "line",

        data: {
            labels: tiempo,

            datasets: [
                {
                    label: "Posición X (m)",
                    data: posicionX,
                    borderWidth: 2,
                    tension: 0.25
                },
                {
                    label: "Posición Y (m)",
                    data: posicionY,
                    borderWidth: 2,
                    tension: 0.25
                }
            ]
        },

        options: {
            responsive: true,

            plugins: {
                title: {
                    display: true,
                    text: "Posición del dron a lo largo del tiempo"
                }
            },

            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Tiempo (s)"
                    }
                },

                y: {
                    title: {
                        display: true,
                        text: "Posición (m)"
                    }
                }
            }
        }
    }
);


// ========================
// GRÁFICA DE VELOCIDAD
// ========================

new Chart(
    document.getElementById("velocityChart"),
    {
        type: "line",

        data: {
            labels: tiempo,

            datasets: [
                {
                    label: "Velocidad X (m/s)",
                    data: velocidadX,
                    borderWidth: 2,
                    tension: 0.25
                },
                {
                    label: "Velocidad Y (m/s)",
                    data: velocidadY,
                    borderWidth: 2,
                    tension: 0.25
                },
                {
                    label: "Velocidad total (m/s)",
                    data: velocidadTotal,
                    borderWidth: 3,
                    tension: 0.25
                }
            ]
        },

        options: {
            responsive: true,

            plugins: {
                title: {
                    display: true,
                    text: "Velocidad del dron a lo largo del tiempo"
                }
            },

            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Tiempo (s)"
                    }
                },

                y: {
                    title: {
                        display: true,
                        text: "Velocidad (m/s)"
                    }
                }
            }
        }
    }
);


// ========================
// GRÁFICA DE ACELERACIÓN
// ========================

new Chart(
    document.getElementById("accelerationChart"),
    {
        type: "line",

        data: {
            labels: tiempo,

            datasets: [
                {
                    label: "Aceleración X (m/s²)",
                    data: aceleracionX,
                    borderWidth: 2,
                    tension: 0.25
                },
                {
                    label: "Aceleración Y (m/s²)",
                    data: aceleracionY,
                    borderWidth: 2,
                    tension: 0.25
                },
                {
                    label: "Aceleración total (m/s²)",
                    data: aceleracionTotal,
                    borderWidth: 3,
                    tension: 0.25
                }
            ]
        },

        options: {
            responsive: true,

            plugins: {
                title: {
                    display: true,
                    text: "Aceleración del dron a lo largo del tiempo"
                }
            },

            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Tiempo (s)"
                    }
                },

                y: {
                    title: {
                        display: true,
                        text: "Aceleración (m/s²)"
                    }
                }
            }
        }
    }
);