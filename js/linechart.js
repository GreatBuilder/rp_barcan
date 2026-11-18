async function getData()
{
    const response = await fetch('data/research-summative-data.csv');
    const data = await response.text();
    console.log(data);

    const xWaterFlowSpeeds = [];   // x-axis labels = water flow speeds
    const yMeanPlanariaGrowths = [];   // y-axis labels = mean planaria growths (mm)

    const table = data.split('\n').slice(1);
    console.log(table);

    table.forEach(row => {
        const columns = row.split(',');
        const waterFlowSpeed = parseFloat(columns[0]);
        xWaterFlowSpeeds.push(waterFlowSpeed);

        const stdev = parseFloat(columns[2]);

        const meanPlanariaGrowth = parseFloat(columns[1]);
        yMeanPlanariaGrowths.push(
        {
            y: meanPlanariaGrowth,
            yMin: meanPlanariaGrowth - stdev/2,
            yMax: meanPlanariaGrowth + stdev/2
        });

        console.log(waterFlowSpeed, meanPlanariaGrowth);
    });
    return {xWaterFlowSpeeds, yMeanPlanariaGrowths};
}

async function createChart()
{
    const data = await getData()
    const lineChart = document.getElementById('lineChart');     // Get the html element that will hold the chart    
    
    const myChart = new Chart(lineChart, 
    {    
        type: 'lineWithErrorBars',
        data: 
        {                               // Define data
            labels: data.xWaterFlowSpeeds,        // x-axis labels
            datasets: 
            [ 
                {
                    label:    'Mean Planaria Growth (mm)',     // Dataset label for legend
                    data:     data.yMeanPlanariaGrowths,    // Reference to array of y-values
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(0, 162, 255, 0.36)',    // Color for data marker
                    borderColor:      'rgb(0, 183, 255)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },
            ]
        },
        options: 
        {                        // Define display chart display options 
            responsive: true,             // Re-size based on screen size
            maintainAspectRatio: false,
            scales: 
            {                     // Display options for x & y axes
                x: 
                {                      // x-axis properties
                    title: 
                    {
                        display: true,
                        text: 'Water Flow Speed (cm/s)',     // x-axis title
                        font: 
                        {                   // font properties
                            size: 14
                        },
                    },
                    ticks: // x-axis tick mark properties
                    {        
                        font: 
                        {
                            size: 14  
                        },
                    },
                    grid: 
                    {                       // x-axis grid properties
                        color: '#6c767e'
                    }
                },
                y: 
                {                              // y-axis properties
                    title: 
                    {
                        display: true,                          
                        text: 'Mean Planaria Growth (mm)',     // y-axis title
                        font: 
                        {
                            size: 14
                        },
                    },
                    ticks: 
                    {  
                        font: 
                        {
                            size: 12
                        }
                    },
                    grid: 
                    {                       // y-axis gridlines
                        color: '#6c767e'
                    }
                }
            },
            plugins: 
            {                  // Display options for title and legend
                title: 
                {
                    display: true,
                    text: 'Mean Planaria Growth (mm) vs. Water Flow Speeds (cm/s)',
                    font: 
                    {
                        size: 24,
                    },
                    color: '#black',
                    padding: 
                    {
                        top: 10,
                        bottom: 30
                    }
                }
            }
        }       
    });
}

getData();
createChart();