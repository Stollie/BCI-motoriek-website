$(function() {
/************************** * Application **************************/ 
    App = Ember.Application.create({});
    // Sideloads
    DS.RESTAdapter.configure('App.Motionlog', {
        sideloadsAs: 'motionlogs'
    });

/************************** * ChartConfig **************************/ 
App.ChartConfig = Ember.Object.extend({
    chart: null,
    setChart : function() {
        var chart = {
//            renderTo : this.get('renderToId'),
            renderTo : 'graph1',
            type: 'line',
            zoomType: 'x'
        };
        this.set('series', this.get('seriesData'));
        this.set('chart', chart);
        
    },
    title: {
        text: null
    },
    xAxis: {
        type: 'datetime',
        tickInterval: 5000 // 5 sec
    },
    plotOptions: {
        series: {
             pointInterval: 500 // 0.5 sec
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b><br/>',
        shared: true
    },
    renderTo : null,
    series : null
});

App.graphController = Ember.ArrayController.create({
    content : Ember.A([]),

    createGraph : function(renderToId, seriesData) {
        var chart = App.ChartConfig.create();
        chart.set('renderTo', renderToId);
//        chart.set('graphType', graphType);
        chart.set('seriesData', seriesData);
        chart.setChart();
        this.pushObject(chart);
    },

    renderCharts : function() {
        this.forEach(this.renderChart, this);
    },

    renderChart : function(config) {
        new Highcharts.Chart($.extend({}, config));
    }
});
/************************** * RESTAdapter **************************/  
    // Prefix voor url
    DS.RESTAdapter.reopen({
      namespace: 'api/v1'
    });

    // Data Store
    App.Store = DS.Store.extend({
        revision: 12,
        adapter: 'DS.RESTAdapter'
    });
    
/************************** * Routes **************************/    
    App.Router.map(function() {
        this.resource("exercise", {path: "/exercises/:exercise_id"});
//        this.resource("editExercise", {path: "/exercises/:exercise_id/edit"});
    });
    
    App.ExerciseRoute = Ember.Route.extend({
        model: function(params) {
            return App.Exercise.find(params.exercise_id);
        },
        setupController: function(controller, model) {
            var data = App.Exercise.find(model.id);
            controller.set("content", data); 
            controller.addGraph();
        }
    });

    /*
     * Default route
     */
    App.ApplicationRoute = Ember.Route.extend({
        model: function() {
            return App.ExerciseListing.find();
        }        
    });
/************************** * Models **************************/
    /*
     * List model
     *  Om aparte lijst een maken
     */
    App.ExerciseListing = DS.Model.extend({
        name: DS.attr('string')
    });
    /*
     * Exercise model
     */
    App.Exercise = DS.Model.extend({
        name: DS.attr('string'),
        createdAt: DS.attr('string'),
        updatedAt: DS.attr('string'),
        motionlogs: DS.hasMany('App.Motionlog')
    });
    /*
     * Motionlog Model
     */
    App.Motionlog = DS.Model.extend({
        //id: DS.attr('number'), Geen id toevoegen
        roll: DS.attr('number'),
        pitch: DS.attr('number'),
        yaw: DS.attr('number'),
        accelx: DS.attr('number'),
        accely: DS.attr('number'),
        accelz: DS.attr('number'),
        gyrox: DS.attr('number'),
        gyroy: DS.attr('number'),
        gyroz: DS.attr('number'),
        sum: function() {
            return parseFloat(this.get('roll')) + parseFloat(this.get('pitch')) + parseFloat(this.get('yaw'));
        }.property('roll', 'pitch', 'yaw'),
        exercise: DS.belongsTo('App.Exercise')
    });

/************************** * Controllers **************************/
//    App.MotionlogsController = Ember.ArrayController.extend({});
    App.ExerciseController = Ember.ObjectController.extend({
        addGraph: function(){
//            console.log(this.get('content'));
//            var data2 = this.get("content");
//            console.log(data2);
//            data2.forEach(function(element, index){
//                console.log(element);
//            });
//            console.log(this.content.get('motionlogs'));
//            console.log(this.content.motionlogs);
//            data.forEach(function(element, index){
//                console.log(element);
//            });
//            var pitch = new Array();
//            var roll = new Array();
//            var yaw = new Array();
//            
//            var accelX = new Array();
//            var accelY = new Array();
//            var accelZ = new Array();
//            var gyroX = new Array();
//            var gyroY = new Array();
//            var gyroZ = new Array();
            
//            $.each(data, function(){
//                pitch.push(this.pitch * 1000);
//                roll.push(this.roll * 1000);
//                yaw.push(this.yaw * 1000);
//                
//                accelX.push(this.accelx * 1000);
//                accelY.push(this.accely * 1000);
//                accelZ.push(this.accelz * 1000);
//
//                gyroX.push(this.gyrox * 1000);
//                gyroY.push(this.gyroy * 1000);
//                gyroZ.push(this.gyroz * 1000);
//            });
            
            App.graphController.createGraph("graph1", [{name:"Pitch values", data:[0, -31.63, 88.794, 28.814, 155.084, 675.7959999999999, 65.023, 838.798, 658.3520000000001, 479.63]}, {name:"Roll values", data:[0, -29.799, -48.732, 211.69199999999998, 679.433, -344.959, 251.25599999999997, -15.084, 352.303, -24.884]}, {name:"Yaw values", data:[0, 142.121, 171.50799999999998, 150.34900000000002, -214.34900000000002, 75.641, -109.237, -184.577, -755.576, -625.518]}, {name:"Accel X", data:[0, 46.824, 306.745, 71.32900000000001, 221.856, 33.625, -36.303000000000004, 14.597000000000001, 10.474, 27.629]}, {name:"Accel Y", data:[0, 105.93299999999999, 2.3739999999999997, -18.157, -65.156, -34.729000000000006, -9.867, 60.186, -3.313, 1.23]}, {name:"Accel Z", data:[0, -149.793, 374.486, -137.262, -360.02299999999997, 66.949, -62.239000000000004, -30.48, 108.095, -18.047]}, {name:"Gyro X", data:[0, -40.455, -346.94399999999996, 448.121, 1854.76, -1089.19, -779.616, 1907.92, -751.619, -259.96200000000005]}, {name:"Gyro Y", data:[0, -913.073, 10554.3, -6101.66, -4067.9999999999995, 40.858, 3206.36, -527.55, -781.976, 13.037999999999998]}, {name:"Gyro X", data:[0, 570.87, -1617.8, 362.39500000000004, 1146.96, 40.985, -1118.91, 295.173, -837.7280000000001, 100.821]}]);
            setTimeout(function(){
                App.graphController.renderCharts();                
            }, 2000);
        }
    });
});