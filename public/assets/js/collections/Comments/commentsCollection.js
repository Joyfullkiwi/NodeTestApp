define([
    'Backbone',
    '../../models/Comment/CommentModel'
], function (Backbone, CommentModel) {
    'use strict';
    var CommentsCollection = Backbone.Collection.extend({
        model: CommentModel,
        url  : '/comments/',

        initialize: function (options) {
            //this.fetch(options);
        },

        parse: function (response) {
            return response;
        }
    });

    return CommentsCollection;
});