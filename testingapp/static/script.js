function generatePieChart() {
    const slice1Value = document.getElementById('slice1').value;
    const slice2Value = document.getElementById('slice2').value;
    const slice3Value = document.getElementById('slice3').value;

    fetch('/generate_pie_chart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            slice1: slice1Value,
            slice2: slice2Value,
            slice3: slice3Value,
        })
    })
    .then(response => response.json())
    .then(data => {
        renderPieChart(data);
    })
    .catch(error => console.error('Error:', error));
}

function renderPieChart(data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const labels = Object.keys(data);
    const values = Object.values(data);

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Pie Chart',
                data: values,
                backgroundColor: getRandomColorArray(labels.length),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Generated Pie Chart'
                }
            }
        }
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomColorArray(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(getRandomColor());
    }
    return colors;
}