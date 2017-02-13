define([
    'Backbone',
    'moment'
], function (Backbone,moment) {
    'use strict';
    var UserModel = Backbone.Model.extend({
        idAttribute: '_id',

        defaults: {
            pass : 'qwertyasdf',
            login: 'user_' + new Date().getTime(),
            date : new Date(),
            birthday: Date.now()

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