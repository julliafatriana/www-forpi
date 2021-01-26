function displayForecast(res) {
    $('#displayForecast').show();

    let date = new Date();
    let now = date.getFullYear()+"-"+('0' + (date.getMonth()+1)).slice(-2)+"-"+('0' + date.getDate()).slice(-2)
    
    let minTemperature = res.minTemperature;
    let maxTemperature = res.maxTemperature;
    let minHumidity = res.minHumidity;
    let maxHumidity = res.maxHumidity;

    for(let m of minTemperature) {
        if(m.date == now) {
            $('#minTemperatureText').text(m.scheme[0].value+" "+m.scheme[0].label+"/"+m.scheme[1].value+" "+m.scheme[1].label)
            break;
        }
    }

    for(let m of maxTemperature) {
        if(m.date == now) {
            $('#maxTemperatureText').text(m.scheme[0].value+" "+m.scheme[0].label+"/"+m.scheme[1].value+" "+m.scheme[1].label)
            break;
        }
    }

    for(let m of minHumidity) {
        if(m.date == now) {
            $('#minHumidityText').text(m.scheme[0].value+""+m.scheme[0].label)
            break;
        }
    }

    for(let m of maxHumidity) {
        if(m.date == now) {
            $('#maxHumidityText').text(m.scheme[0].value+""+m.scheme[0].label)
            break;
        }
    }

    let temperatureDailyCtx = $('#temperatureDaily');
    let dataTemperatureDaily = [];
    let labelTemperatureDaily = [];
    for(let t of res.temperature) {
        dataTemperatureDaily = [...dataTemperatureDaily, parseInt(t.scheme[0].value)];
        labelTemperatureDaily = [...labelTemperatureDaily, t.date+" "+t.time];
    }
    chartComposer(temperatureDailyCtx, 'line', 'Temperature Hourly in Celcius', labelTemperatureDaily, dataTemperatureDaily);

    let humidityDailyCtx = $('#humidityDaily');
    let dataHumidityDaily = []
    let labelHumidityDaily = []
    for(let h of res.humidity) {
        dataHumidityDaily = [...dataHumidityDaily, parseInt(h.scheme[0].value)]
        labelHumidityDaily = [...labelHumidityDaily, h.date+" "+h.time]
    }
    chartComposer(humidityDailyCtx, 'line', 'Humidity Hourly in Percentage', labelHumidityDaily, dataHumidityDaily);
}

function chartComposer(ctx, typeChart, title, labels, data) {
        return new Chart(ctx, {
        type: typeChart,
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function compare( a, b ) {
    if ( a.id < b.id ){
      return -1;
    }
    if ( a.id > b.id ){
      return 1;
    }
    return 0;
}