define([
    'Backbone',
    'moment'
], function (Backbone,moment) {
    'use strict';
    var GroupModel = Backbone.Model.extend({
        idAttribute: '_id',

        defaults: {
            title:'group'
        },

        urlRoot: function () {
            return '/groups/'
        }

    });

    return GroupModel;
});