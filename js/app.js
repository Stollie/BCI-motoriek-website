$(function() {
    App = Ember.Application.create({LOG_TRANSITIONS: true});

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
        created_at: DS.attr('date')
    });   
    
    App.MotionlogsController = Ember.ArrayController.extend({});

    App.MotionlogsView = Ember.View.extend({
        templateName: 'motionlogs'
    });
     
    App.Router.map(function() {
      this.resource('motionlogs', function() {
        this.resource('motionlog', {path: '/motionlogs/:motionlog_id'});
      });
    });
        
    App.MotionlogsRoute = Ember.Route.extend({    
        model: function(params) {
          return App.Motionlog.find();
        },
        activate: function() {
            console.log('Hallo motionlogs');
        },
        deactivate: function() {
    
        }
    });
    
});
