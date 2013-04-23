$(function () {
    var pitch = new Array();
    var roll = new Array();
    var yaw = new Array();
    $.get("/api/v1/exercises/80", function(data) {


        $.each(data.motionlogs, function(){
            pitch.push(this.pitch * 1000);
            roll.push(this.roll * 1000);
            yaw.push(this.yaw * 1000);
        });
//        console.log(pitch);
        $('#container').highcharts({
            chart: {
                type: 'line'
            },            
            title: {
                text: 'Exercise'
            },

            xAxis: {
                type: 'datetime',
                tickInterval: 1000 // 1 sec
            },
            yAxis: {
                title: {
                    text: 'x 1000'
                }
            },
            plotOptions: {
                series: {
                     pointInterval: 1000
                }
            },
            tooltip: { enabled: false},
            series: [{
                name: 'Pitch values',
                data: pitch
            }, {
                name: 'Roll values',
                data: roll
            }, {
                name: 'Yaw values',
                data: yaw
            }]
        });        
        
    });

});