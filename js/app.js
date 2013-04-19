$(function() {
    App = Ember.Application.create({LOG_TRANSITIONS: true});
    //Ember.LOG_BINDINGS = true;
    // Prefix voor url
    DS.RESTAdapter.reopen({
      namespace: 'api/v1'
    });
    
    App.Store = DS.Store.extend({
        revision: 11
    });
    
     App.Motionlog = DS.Model.extend({
        //id: DS.attr('number'), Geen id toevoegen
        x: DS.attr('number'),
        y: DS.attr('number'),
        z: DS.attr('number'),
        sum: function() {
            return parseFloat(this.get('x')) + parseFloat(this.get('y')) + parseFloat(this.get('z'));
        }.property('x', 'y', 'z'),
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
    
    /*App.ApplicationRoute = Ember.Route.extend({    
        activate: function() {
            console.log('Hallo index');
        }
    });*/
    
    App.MotionlogsRoute = Ember.Route.extend({    
        model: function(params) {
          return App.Motionlog.find();
        },
        activate: function() {
            console.log('Hallo motionlogs');
            //console.log(App.Motionlog.all());
        },
        deactivate: function() {
    
        }
    });
 
    /*App.MotionlogsController = Ember.ArrayController.create({      
        // Default collection is an empty array.
        content: [],

        // Simple id-to-model mapping for searches and duplicate checks.
        _idCache: {},              
              
        addLog: function(log) {
            var id = log.get("id");
            
            // If we don't already have an object with this id, add it.
            if (typeof this._idCache[id] === "undefined") {
              this.pushObject(log);
              this._idCache[id] = log.id;
            }
        },
        // Public method to fetch more data. Get's called in the loop
        // above as well as whenever the `query` variable changes (via
        // an observer).
        refresh: function() {
          // Poll Log
          
          
          
          var self = this;
          $.getJSON("api/v1/logs/", function(json) {
            // Make a model for each result and add it to the collection.
            for (var i = 0; i < json.length; i++) {
                self.addLog(App.Motionlog.create(json[i]));
            }
          });
        }
    });*/

        
    /*
     * Views
     */
   /*App.MotionlogsView = Ember.CollectionView.create({
        classNames: ['log-item'],
        // the controller is the initial context for the template
        controller: null,
        itemViewClass: Ember.View.extend({
            template: Ember.Handlebars.compile('<p>{{view.id}} {{view.x}}</p>')
        })
    });*/

    /*jQuery.getJSON("api/v1/logs/", function(json) {
        App.MotionlogsController.set('content',json);
    });*/
});
