document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const burgerBtn = document.getElementById("burger-btn");
    const sidebar_Profile = document.getElementById("sidebar-Profile");

    burgerBtn.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            // Toggle sidebar visibility for small screens
            sidebar.classList.toggle("open");
        } else {
            // Toggle sidebar shrink for larger screens
            sidebar.classList.toggle("shrinked");
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener('resize', function () {
    var sidebar = document.querySelector('.sidebar');
    if (window.innerWidth < 768) {
        sidebar.classList.add('shrinked');
    } else {
        sidebar.classList.remove('shrinked');
    }
});

// Initial check in case the page is already smaller than 768px on load
if (window.innerWidth < 768) {
    document.querySelector('.sidebar').classList.add('shrinked');
}
////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('refresh-Icon').addEventListener('click', function () {
    const icon = this;

    // Add the 'rotate' class to trigger the animation
    icon.classList.add('rotate');

    // Remove the 'rotate' class after the animation ends to allow re-triggering
    icon.addEventListener('animationend', function () {
        icon.classList.remove('rotate');
    }, { once: true }); // Use `{ once: true }` to ensure this listener is removed automatically
});

document.getElementById('bell-icon').addEventListener('click', function () {
    const bell = this;

    bell.classList.add('shake');

    bell.addEventListener('animationend', function () {
        bell.classList.remove('shake');
    }

        , {
            once: true
        });
})

document.getElementById('setting-Icon').addEventListener('click', function () {
    const icon = this;

    // Add the 'rotate' class to trigger the animation
    icon.classList.add('rotate');

    // Remove the 'rotate' class after the animation ends to allow re-triggering
    icon.addEventListener('animationend', function () {
        icon.classList.remove('rotate');
    }, { once: true }); // Use `{ once: true }` to ensure this listener is removed automatically
});

//////////////////////////////////////////////////////////////////////////////////////////


const ctx = document.getElementById('myBarChart').getContext('2d');

// Chart Data and Labels for Different Time Periods
const chartData = {
    "7days": {
        labels: ['01', '02', '03', '04', '05', '06', '07'], // Formatted labels as 01, 02, 03
        data: [15, 20, 25, 30, 35, 40, 50] // ROI between 0 and 50
    },
    "10days": {
        labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
        data: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
    },
    "1month": {
        labels: Array.from({ length: 30 }, (_, i) => String(i + 1).padStart(2, '0')), // 01 to 30
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 51)) // Random ROI between 0 and 50
    },
    "3months": {
        labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 51)) // Random ROI between 0 and 50
    },
    "1year": {
        labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 51)) // Random ROI between 0 and 50
    }
};

// Initial Chart Setup
const initialData = chartData["7days"];
const config = {
    type: 'bar',
    data: {
        labels: initialData.labels, // Use the formatted labels
        datasets: [{
            label: 'ROI (%)',
            data: initialData.data,
            backgroundColor: '#2258BF', // Bar color
            borderRadius: 10 // Rounded corners
        }]
    },
    options: {
        responsive: true, // Ensure the chart is responsive
        maintainAspectRatio: true, // Maintain aspect ratio automatically
        plugins: {
            legend: {
                display: false // Hide legend
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function(context) {
                        return `ROI: ${context.raw}%`; // Tooltip format
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time Period', // X-axis label
                    font: {
                        size: 14,
                        weight: 500 // Set font weight to 500
                    }
                },
                grid: {
                    display: false // Remove gridlines
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'ROI (%)', // Y-axis label
                    font: {
                        size: 14,
                        weight: 500 // Set font weight to 500
                    }
                },
                grid: {
                    display: false // Remove gridlines
                },
                ticks: {
                    callback: function(value) {
                        return `${value}%`; // Format Y-axis as percentages
                    },
                    beginAtZero: true,
                    max: 50 // Set max value for Y-axis to 50
                }
            }
        }
    }
};


const myBarChart = new Chart(ctx, config);

// Event Listener for Time Period Filter
document.getElementById('timeFilter').addEventListener('change', function (e) {
    const selectedRange = e.target.value;
    const newData = chartData[selectedRange];

    // Update Chart Labels and Data
    myBarChart.data.labels = newData.labels;
    myBarChart.data.datasets[0].data = newData.data;

    // Refresh the Chart
    myBarChart.update();
});

