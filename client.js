$(document).ready(function () {
    var queuews = [];
    var queuewd = [];
    var queuetemp = [];
    var counter = 0;

    const ws = new WebSocket('ws://localhost:8080')
    ws.addEventListener('open', () => {
        /*console.log('WebSocket opened')*/
    })

    var firstdatatime = null;

    $('.js--buttonws').click(function () {
        var buttonws = $('.js--buttonws');

        if (buttonws.hasClass('playing')) {
            buttonws.removeClass('playing');
            buttonws.addClass('paused');
        } else {
            buttonws.removeClass('paused');
            buttonws.addClass('playing');
            chartwindspeed.updateSeries([{
                name: 'Windspeed',
                data: queuews
            }])
        }
    })

    $('.js--buttonwd').click(function () {
        var buttonwd = $('.js--buttonwd');

        if (buttonwd.hasClass('playing')) {
            buttonwd.removeClass('playing');
            buttonwd.addClass('paused');
        } else {
            buttonwd.removeClass('paused');
            buttonwd.addClass('playing');
            chartwinddirection.updateSeries([{
                name: 'Wind direction',
                data: queuewd
            }])
        }
    })

    $('.js--buttontemp').click(function () {
        var buttontemp = $('.js--buttontemp');

        if (buttontemp.hasClass('playing')) {
            buttontemp.removeClass('playing');
            buttontemp.addClass('paused');
        } else {
            buttontemp.removeClass('paused');
            buttontemp.addClass('playing');
            charttemperature.updateSeries([{
                name: 'Temperature',
                data: queuetemp
            }])
        }
    })

    ws.addEventListener('message', (msg) => {
        $('#databox').prepend(" <p> " + msg.data + " </p>");
        /*console.log(msg.data)*/

        const sensordata = JSON.parse(msg.data);
        counter++;
        /* console.log(counter); */

        /* Times and packages */
        if (firstdatatime === null) {
            firstdatatime = moment(sensordata.properties.timestamp);
            $('#firstarrived').text(firstdatatime.format("lll"));
        }

        var lastdatatime = moment(sensordata.properties.timestamp);
        $('#lastarrived').text(lastdatatime.format("lll"));

        let diffinminutes = lastdatatime.diff(firstdatatime, 'seconds') / 60;
        var averagedata = counter / diffinminutes;
        $('#average').text(Math.round(averagedata * 100) / 100);
        /* console.log(diffinminutes); */
        /* console.log(averagedata); */

        /* Wind speed */
        if (sensordata.properties.payload.windspeed === sensordata.properties.payload.windspeed) {
            var chartdataws = { x: sensordata.properties.timestamp, y: sensordata.properties.payload.windspeed }

            if (queuews.length === 20) {
                queuews.shift();
                queuews.push(chartdataws);
            } else {
                queuews.push(chartdataws);
            }

            if ($('.js--buttonws').hasClass('playing')) {
                chartwindspeed.updateSeries([{
                    name: 'Windspeed',
                    data: queuews
                }])
            }
        }

        /* Wind direction */
        if (sensordata.properties.payload.winddirection === sensordata.properties.payload.winddirection) {
            var chartdatawd = { x: sensordata.properties.timestamp, y: sensordata.properties.payload.winddirection }

            if (queuewd.length === 20) {
                queuewd.shift();
                queuewd.push(chartdatawd);
            } else {
                queuewd.push(chartdatawd);
            }
            if ($('.js--buttonwd').hasClass('playing')) {
                chartwinddirection.updateSeries([{
                    name: 'Wind direction',
                    data: queuewd
                }])
            }
        }

        /* Temperature*/
        if (sensordata.properties.payload.Temperature === sensordata.properties.payload.Temperature) {
            var chartdatatemp = { x: sensordata.properties.timestamp, y: sensordata.properties.payload.Temperature }

            if (queuetemp.length === 20) {
                queuetemp.shift();
                queuetemp.push(chartdatatemp);
            } else {
                queuetemp.push(chartdatatemp);
            }

            if ($('.js--buttontemp').hasClass('playing')) {
                charttemperature.updateSeries([{
                    name: 'Temperature',
                    data: queuetemp
                }])
            }
        }
        /*console.log(queuews);
        console.log(queuewd);
        console.log(queuetemp);*/
    });
});