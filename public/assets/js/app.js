define([
    'Backbone',
    'router'
], function(Backbone, Router) {

    var initialize = function() {
        'use strict';

        var url = 'Users';

        App.Router = new Router();

        if (!Backbone.History.started) {
            Backbone.history.start({silent: true});
        }

        Backbone.history.fragment = '';
        Backbone.history.navigate(url, {trigger: true});
    };

    return {
        initialize: initialize
    };
});