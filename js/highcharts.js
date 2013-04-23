(function ($) {
jQuery.extend({
    updateGraph: function () {
        var hash = window.location.hash.substr(1);
        var id = (hash != '') ? hash : "88";
        $.get("/api/v1/exercises/"+id, function(data) {
            var pitch = new Array();
            var roll = new Array();
            var yaw = new Array();

            $.each(data.motionlogs, function(){
                pitch.push(this.pitch * 1000);
                roll.push(this.roll * 1000);
                yaw.push(this.yaw * 1000);
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