var options = {
    chart: {
        height: 400,
        type: 'line',
    },
    dataLabels: {
        enabled: false
    },
    series: [],
    title: {
        text: 'Sensordata',
    },
    noData: {
        text: 'Loading...'
    },
    xaxis: {
        type: 'datetime',
        tickPlacement: 'on',
        labels: {
            rotate: -45,
            rotateAlways: true,
            formatter: function (yaxis, time, index) {
                let value = new Date(time);
                return moment(value).format("lll");
            }
        }
    }
}
/* STAB */
var optionsws = JSON.parse(JSON.stringify(options));
optionsws.title.text = 'Windspeed';
optionsws.xaxis.labels.formatter = function (yaxis, time, index) {
    let value = new Date(time);
    return moment(value).format("lll");
}

var optionswd = JSON.parse(JSON.stringify(options));
optionswd.title.text = 'Wind direction';
optionswd.chart.type = 'area';
optionswd.xaxis.labels.formatter = function (yaxis, time, index) {
    let value = new Date(time);
    return moment(value).format("lll");
}

var optionstemp = JSON.parse(JSON.stringify(options));
optionstemp.title.text = 'Temperature';
optionstemp.chart.type = 'area';
optionstemp.xaxis.labels.formatter = function (yaxis, time, index) {
    let value = new Date(time);
    return moment(value).format("lll");
}

/* Chart render */
var chartwindspeed = new ApexCharts(document.querySelector("#chartwindspeed"), optionsws);
var chartwinddirection = new ApexCharts(document.querySelector("#chartwinddirection"), optionswd);
var charttemperature = new ApexCharts(document.querySelector("#charttemperature"), optionstemp);

chartwindspeed.render();
chartwinddirection.render();
charttemperature.render();