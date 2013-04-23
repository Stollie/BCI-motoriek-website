$(function() {
    // Le App
    App = Ember.Application.create({});
    // Sideloads
    DS.RESTAdapter.configure('App.Motionlog', {
        sideloadsAs: 'motionlogs'
    });
    // Prefix voor url
    DS.RESTAdapter.reopen({
      namespace: 'api/v1'
    });
    DS.RESTAdapter.map('App.Exercise', {
        motionlogs: { embedded: 'always' }
    });
    // Data Store
    App.Store = DS.Store.extend({
        revision: 12
    });
    /*
     * Exercise model
     */
    App.Exercise = DS.Model.extend({
        name: DS.attr('string'),
        createdAt: DS.attr('date'),
        updatedAt: DS.attr('date'),
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

    //App.MotionlogsController = Ember.ArrayController.extend({});
    //App.ExercisesController = Ember.ArrayController.extend({});

    App.Router.map(function() {
//        this.route("index");
        this.resource("exercise", {path: "/exercises/:exercise_id"});
        this.resource("editExercise", {path: "/exercises/:exercise_id/edit"});
    });
    
    App.ExerciseRoute = Ember.Route.extend({
        modal: function(params) {
            return {id: params.exercise_id};
            //return App.Exercise.find(params.exercise_id);
        },
        setupController: function(controller, model) {
            console.log('Hello update ? '+model.id);
//            controller.set('content', App.Exercise.find(model.id));
            var exercise_model = App.Exercise.find(model.id);
            controller.set("content", exercise_model);
//            controller.set('content', model);
        }
    });
    App.EditExerciseRoute = Ember.Route.extend({
        modal: function(params) {
            return  App.Exercise.find(params.exercise_id);
            //return App.Exercise.find(params.exercise_id);
        },
        events: {
          save: function() {
            var exercise = this.modelFor('editExercise');
            this.transitionTo('exercise', exercise);
          }
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
});
