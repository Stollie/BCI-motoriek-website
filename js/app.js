$(function() {
    App = Ember.Application.create({});
    DS.RESTAdapter.configure('App.Motionlog', {
        sideloadsAs: 'motionlogs'
    });

    // Prefix voor url
    DS.RESTAdapter.reopen({
      namespace: 'api/v1'
    });
    // Data Store
    App.Store = DS.Store.extend({
        revision: 11
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
    /*
     * Exercise model
     */
    App.Exercise = DS.Model.extend({
        name: DS.attr('string'),
        created_at: DS.attr('date'),
        updated_at: DS.attr('date'),
        motionlogs: DS.hasMany('App.Motionlog')
    });
    
    App.MotionlogsController = Ember.ArrayController.extend({});
    App.ExercisesController = Ember.ArrayController.extend({});

    App.Router.map(function() {
        this.resource('exercise', {path: '/exercises/:exercise_id'});
    });
    
    App.ExerciseRoute = Ember.Route.extend({
        modal: function(params) {
            return App.Exercise.find(params.exercise_id);
        }
    });
    
    App.ApplicationRoute = Ember.Route.extend({
        model: function() {
            return App.Exercise.find();
        }
//        activate: function() {
//            console.log('Hallo');
//        }         
    });
});
