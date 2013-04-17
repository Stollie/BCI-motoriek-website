$(function() {  
    App = Ember.Application.create({
    name: "Motoriek"});
    
    // Maak een object
    App.Motionlog = Ember.Object.extend({});
    /*App.Exercise = Ember.Object.extend({

    });*/    

    App.MotionlogsController = Ember.ArrayController.create();
   
    /*App.Router.map(function() {
        this.resources('motionlogs', {path:'motionlogs/:log_id'});
    });*/
        
    /*
     * Views
     */
   /* App.MotionlogsView = Ember.CollectionView.create({
        classNames: ['log-item'],
        // the controller is the initial context for the template
        controller: null,
        itemViewClass: Ember.View.extend({
            template: Ember.Handlebars.compile('<p>{{view.id}} {{view.xyz}}</p>')
        })
    });*/

    jQuery.getJSON("api/v1/logs/", function(json) {
        App.MotionlogsController.set('content', json)
    });

});
