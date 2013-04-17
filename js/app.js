$(function() {
    App = Ember.Application.create({
        name: "Motoriek"
        // When everything is loaded.
        /*ready: function() {

          // Start refresh
          setInterval(function() {
            App.MotionlogsController.refresh();
          }, 5000);

        }*/
    });
    
    DS.RESTAdapter.reopen({
      namespace: 'api/v1'
    });
    
    App.Store = DS.Store.extend({
        revision: 12
    });
    
    App.Motionlog = DS.Modal.extend({
        id: DS.attr('number'),
        x: DS.attr('number'),
        y: DS.attr('number'),
        z: DS.attr('number'),
        sum: function() {
            return parseFloat(this.get('x')) + parseFloat(this.get('y')) + parseFloat(this.get('z'));
        }.property('x', 'y', 'z'),
        created_at: DS.attr('date')
    });
    
    App.MotionlogsController = Ember.ArrayController.create({      
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
    });

    /*App.Router.map(function() {
        this.resources('motionlogs', {path:'motionlogs/:log_id'});
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
