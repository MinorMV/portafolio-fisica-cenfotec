const jumpImpulse =
    document.getElementById("jumpImpulse");

const gravityControl =
    document.getElementById("gravityControl");

const jumpImpulseValue =
    document.getElementById("jumpImpulseValue");

const gravityValue =
    document.getElementById("gravityValue");

const maxHeightElement =
    document.getElementById("maxHeight");

const airTimeElement =
    document.getElementById("airTime");

const character =
    document.getElementById("character");

const simulateButton =
    document.getElementById("simulateButton");


let jumpChart;
let animationFrame;



function updateControlValues() {

    const impulse =
        Number(jumpImpulse.value);

    const gravity =
        Number(gravityControl.value);

    jumpImpulseValue.textContent =
        impulse.toFixed(1);

    gravityValue.textContent =
        gravity.toFixed(2);
}



function calculateJumpData(
    impulse,
    gravity
) {

    const totalTime =
        (2 * impulse) / gravity;

    const maxHeight =
        (impulse ** 2) /
        (2 * gravity);


    const timeData = [];
    const heightData = [];

    const steps = 60;


    for (
        let i = 0;
        i <= steps;
        i++
    ) {

        const t =
            (totalTime / steps) * i;

        let y =
            impulse * t -
            0.5 * gravity * t ** 2;


        if (y < 0) {
            y = 0;
        }


        timeData.push(
            Number(t.toFixed(2))
        );

        heightData.push(
            Number(y.toFixed(2))
        );
    }


    return {
        totalTime,
        maxHeight,
        timeData,
        heightData
    };
}



function updateChart(
    timeData,
    heightData
) {

    if (jumpChart) {
        jumpChart.destroy();
    }


    jumpChart = new Chart(

        document.getElementById(
            "jumpChart"
        ),

        {
            type: "line",

            data: {

                labels: timeData,

                datasets: [

                    {
                        label:
                            "Altura del personaje (m)",

                        data:
                            heightData,

                        borderWidth: 3,

                        tension: 0.25,

                        pointRadius: 0
                    }

                ]
            },


            options: {

                responsive: true,

                animation: false,


                plugins: {

                    title: {

                        display: true,

                        text:
                            "Trayectoria vertical del salto"

                    }

                },


                scales: {

                    x: {

                        title: {

                            display: true,

                            text:
                                "Tiempo (s)"
                        }

                    },


                    y: {

                        beginAtZero: true,

                        title: {

                            display: true,

                            text:
                                "Altura (m)"
                        }

                    }

                }

            }

        }

    );
}



function animateCharacter(
    impulse,
    gravity,
    totalTime,
    maxHeight
) {

    if (animationFrame) {

        cancelAnimationFrame(
            animationFrame
        );
    }


    character.style.bottom =
        "20px";


    let startTime = null;

    const worldHeight = 250;


    function animate(timestamp) {

        if (!startTime) {

            startTime =
                timestamp;

        }


        const elapsed =
            (timestamp - startTime)
            / 1000;


        if (elapsed >= totalTime) {

            character.style.bottom =
                "20px";

            animationFrame = null;

            return;
        }


        let height =
            impulse * elapsed -
            0.5 *
            gravity *
            elapsed ** 2;


        if (height < 0) {

            height = 0;

        }


        const normalizedHeight =
            maxHeight > 0
                ? height / maxHeight
                : 0;


        const pixelHeight =
            normalizedHeight *
            worldHeight;


        character.style.bottom =
            `${20 + pixelHeight}px`;


        animationFrame =
            requestAnimationFrame(
                animate
            );
    }


    animationFrame =
        requestAnimationFrame(
            animate
        );
}




function runSimulation() {

    const impulse =
        Number(jumpImpulse.value);

    const gravity =
        Number(gravityControl.value);


    const data =
        calculateJumpData(
            impulse,
            gravity
        );


    maxHeightElement.textContent =
        `${data.maxHeight.toFixed(2)} m`;


    airTimeElement.textContent =
        `${data.totalTime.toFixed(2)} s`;


    updateChart(
        data.timeData,
        data.heightData
    );


    animateCharacter(
        impulse,
        gravity,
        data.totalTime,
        data.maxHeight
    );
}



jumpImpulse.addEventListener(
    "input",
    updateControlValues
);


gravityControl.addEventListener(
    "input",
    updateControlValues
);



simulateButton.addEventListener(
    "click",
    runSimulation
);



updateControlValues();