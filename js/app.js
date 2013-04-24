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
            renderTo : this.get('renderToId'),
            defaultSeriesType : this.get('graphType'),
            type: 'line',
            zoomType: 'x',
            series : this.get('seriesData')
        };
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
    renderToId : null,
    seriesData : null,
    graphType : null

});
App.graphController = Ember.ArrayController.create({
    content : Ember.A([]),

    createGraph : function(renderTo, graphType, seriesData) {
        var chart = App.ChartConfig.create();
        chart.set('renderToId', renderTo);
        chart.set('graphType', graphType);
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
//
//    switchTypes : function() {
//        this.forEach(function(chart) {
//            var newType = chart.graphType == 'line' ? 'column' : 'line';
//            chart.set('graphType', newType);
//            chart.setChart();
//        });
//        this.renderCharts();
//    }
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
        this.resource("editExercise", {path: "/exercises/:exercise_id/edit"});
    });
    
    App.ExerciseRoute = Ember.Route.extend({
        model: function(params) {
            return App.Exercise.find(params.exercise_id);
        },
        setupController: function(controller, model) {
            var data = App.Exercise.find(model.id);            
            controller.set("content", data);
            
            var data2 = controller.get("content");
            console.log(data2);
            data2.forEach(function(element, index){
                console.log(element);
            });
//            //console.log(data.get('motionlogs'));
//            data.forEach(function(element, index){
//                console.log(element);
//            });
            var pitch = new Array();
            var roll = new Array();
            var yaw = new Array();
            
            var accelX = new Array();
            var accelY = new Array();
            var accelZ = new Array();
            var gyroX = new Array();
            var gyroY = new Array();
            var gyroZ = new Array();
            
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
            
//            App.graphController.createGraph('graph1', 'line', );
//            App.graphController.renderCharts();            
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
        sum: function() {
            return parseFloat(this.get('roll')) + parseFloat(this.get('pitch')) + parseFloat(this.get('yaw'));
        }.property('roll', 'pitch', 'yaw'),
        exercise: DS.belongsTo('App.Exercise')
    });

/************************** * Controllers **************************/
//    App.MotionlogsController = Ember.ArrayController.extend({});
//    App.ExerciseController = Ember.ArrayController.extend({});
});
