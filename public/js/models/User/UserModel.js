define([
    'Backbone',
    'moment'
], function (Backbone,moment) {
    'use strict';
    var UserModel = Backbone.Model.extend({
        idAttribute: '_id',

        defaults: {
            pass : '123454',
            login: 'user_' + new Date().getTime(),
            date : new Date(),
            age  : 18
        },

        urlRoot: function () {
            return '/users/'
        },
        
        parse: function (response) {

            response.birthDay && (response.birthDay = moment(response.birthDay).format('YYYY-MM-DD'));
            return response;
        }
    });

    return UserModel;
});