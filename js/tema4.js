const tireTemperatures = [60, 70, 80, 90, 100, 110, 120, 130];

const muMin = 0.75;
const muMax = 1.22;
const optimalTemperature = 100;
const sigma = 22;


function calculateFrictionCoefficient(temperature) {

    const exponent =
        -Math.pow(temperature - optimalTemperature, 2) /
        (2 * Math.pow(sigma, 2));

    const coefficient =
        muMin +
        (muMax - muMin) * Math.exp(exponent);

    return Number(coefficient.toFixed(3));
}

const frictionCoefficients =
    tireTemperatures.map(calculateFrictionCoefficient);


new Chart(
    document.getElementById("tireChart"),
    {
        type: "line",

        data: {
            labels: tireTemperatures,

            datasets: [
                {
                    label: "Coeficiente de fricción calculado (μ)",
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
                    text: "Modelo calculado de temperatura y agarre"
                },

                tooltip: {

                    callbacks: {

                        label: function(context) {

                            return "μ = " +
                                context.parsed.y.toFixed(3);
                        }

                    }

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
                    },

                    suggestedMin: 0.7,
                    suggestedMax: 1.3

                }

            }

        }
    }
);