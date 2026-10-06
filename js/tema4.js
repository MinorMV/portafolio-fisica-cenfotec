const tireTemperatures = [60, 70, 80, 90, 100, 110, 120, 130];
const frictionCoefficients = [0.85, 0.95, 1.05, 1.15, 1.22, 1.18, 1.08, 0.96];

new Chart(
    document.getElementById("tireChart"),
    {
        type: "line",

        data: {
            labels: tireTemperatures,
            datasets: [
                {
                    label: "Coeficiente de fricción (μ)",
                    data: frictionCoefficients,
                    borderWidth: 3,
                    tension: 0.3,
                    fill: false
                }
            ]
        },

        options: {
            responsive: true,

            plugins: {
                title: {
                    display: true,
                    text: "Ventana de temperatura y agarre de la llanta"
                }
            },

            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Temperatura del neumático (°C)"
                    }
                },

                y: {
                    title: {
                        display: true,
                        text: "Coeficiente de fricción (μ)"
                    }
                }
            }
        }
    }
);