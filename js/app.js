$(function() {
/************************** * Application **************************/ 
    App = Ember.Application.create({});
    // Sideloads
    DS.RESTAdapter.configure('App.Motionlog', {
        sideloadsAs: 'motionlogs'
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
//            return {id: params.exercise_id};
            return App.Exercise.find(params.exercise_id);
        },
        setupController: function(controller, model) {
            console.log('Hello update ? '+model.id);
            var content = controller.set("content",  App.Exercise.find(model.id));
            content.get('isLoaded');
//            this.model(model.id);
//            controller.set('content', model);
        }
    });

    /*
     * Default route
     */
    App.ApplicationRoute = Ember.Route.extend({
        model: function() {
            return App.Exercise.find();
        }        
    });
/************************** * Models **************************/ 
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
