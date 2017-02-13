define([
    'Backbone',
    '../../models/User/UserModel'
], function (Backbone, UserModel) {
    'use strict';
    var UsersCollection = Backbone.Collection.extend({
        model: UserModel,
        url  : '/users/',

        initialize: function (options) {
            //this.fetch(options);
        },

        parse: function (response) {
            return response;
        }
    });

    return UsersCollection;
});