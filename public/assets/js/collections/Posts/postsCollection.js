define([
    'Backbone',
    '../../models/Post/PostModel'
], function (Backbone, PostModel) {
    'use strict';
    var PostsCollection = Backbone.Collection.extend({
        model: PostModel,
        url  : '/posts/',

        initialize: function (options) {
            //this.fetch(options);
        },

        parse: function (response) {
            return response;
        }
    });

    return PostsCollection;
});