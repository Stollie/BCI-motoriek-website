$(function() {  
    App = Ember.Application.create({
    name: "Motoriek"});

    /*
     * Controllers
     */
    App.ExerciseController = Ember.Controller.extend();
    App.MotionlogController = Ember.Controller.extend();
    
    
    /*App.Router.map(function() {
        this.resources('motionlogs', {path:'motionlogs/:log_id'});
    });*/
    
    /*
     * Modals
     
    App.Motionlog = DS.Model.extend({
        xyz: DS.attr('number')
    });
    
    App.Exercise = DS.Modal.extend({
        name: DS.attr('string')
    });*/
    
    App.Motionlog = Ember.Object.extend({

    });
    /*App.Exercise = Ember.Object.extend({

    });*/
    
    /*
     * Views
     */
    App.MotionlogView = Ember.View.extend({
      // the controller is the initial context for the template
      controller: null,
      template: Ember.Handlebars.compile("<h3>{{xyz}}</h3>")
    });

    var motionlog = App.Motionlog.create();
    var motionlogController = App.MotionlogController.create({ content: motionlog });

    App.MotionlogView.create({ controller: motionlogController }).appendTo('body');

    jQuery.getJSON("api/v1/logs/3", function(json) {
      motionlog.setProperties(json);
    });

//    App.IndexRoute = Ember.Route.extend({
//      model: function() {
//        return ['red', 'yellow', 'blue'];
//      }
//    });

    
    
//    App.initialize();
});
