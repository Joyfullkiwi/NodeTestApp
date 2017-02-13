define([
    'Backbone',
    'moment'
], function (Backbone,moment) {
    'use strict';
    var CommentModel = Backbone.Model.extend({
        idAttribute: '_id',

        defaults: {
            title:'Comment',
            body:'body',
            date : new Date()

        },

        urlRoot: function () {
            return '/comments/'
        },

        parse: function (response) {

            response.date && (response.date = moment(response.date).format('YYYY-MM-DD'));
            return response;
        }
    });


    return CommentModel;
});