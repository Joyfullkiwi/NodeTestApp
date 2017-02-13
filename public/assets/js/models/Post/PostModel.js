define([
    'Backbone',
    'moment'
], function (Backbone,moment) {
    'use strict';
    var PostModel = Backbone.Model.extend({
        idAttribute: '_id',

        defaults: {
            title:'Post',
            body:'body',
            date : new Date()

        },

        urlRoot: function () {
            return '/posts/'
        },

        parse: function (response) {

            response.date && (response.date = moment(response.date).format('YYYY-MM-DD'));
            return response;
        }
    });

    return PostModel;
});