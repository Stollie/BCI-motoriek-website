(function ($) {
jQuery.extend({
    updateGraph: function () {
        var hash = window.location.hash.substr(1);
        var id = (hash != '') ? hash : "88";
        $.get("/api/v1/exercises/"+id, function(data) {
            var pitch = new Array();
            var roll = new Array();
            var yaw = new Array();
            
            var accelX = new Array();
            var accelY = new Array();
            var accelZ = new Array();
            var gyroX = new Array();
            var gyroY = new Array();
            var gyroZ = new Array();

            $.each(data.motionlogs, function(){
                pitch.push(this.pitch * 1000);
                roll.push(this.roll * 1000);
                yaw.push(this.yaw * 1000);
                
                accelX.push(this.accelx * 1000);
                accelY.push(this.accely * 1000);
                accelZ.push(this.accelz * 1000);

                gyroX.push(this.gyrox * 1000);
                gyroY.push(this.gyroy * 1000);
                gyroZ.push(this.gyroz * 1000);
            });

            $("#container").highcharts({
                chart: {
                    type: 'line',
                    zoomType: 'x'
                },            
                title: {
                    text: 'Exercise'
                },

                xAxis: {
                    type: 'datetime',
                    tickInterval: 5000 // 5 sec
                },
                yAxis: {
                    title: {
                        text: 'x 1000'
                    }
                },
                plotOptions: {
                    series: {
                         pointInterval: 500
                    }
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}</b><br/>',
                    shared: true
                },

                series: [{
                    name: 'Pitch values',
                    data: pitch
                }, {
                    name: 'Roll values',
                    data: roll
                }, {
                    name: 'Yaw values',
                    data: yaw
                }, {
                    name: 'Accel X',
                    data: accelX
                }, {
                    name: 'Accel Y',
                    data: accelY
                }, {
                    name: 'Accel Z',
                    data: accelZ
                }, {
                    name: 'Gyro X',
                    data: gyroX
                }, {
                    name: 'Gyro Y',
                    data: gyroY
                }, {
                    name: 'Gyro X',
                    data: gyroZ
                }]
            });        

        });
    }
});

})(jQuery);

$(function () {
    $.updateGraph();
    
    $(window).bind('hashchange', function() {
        $.updateGraph();
    });
});