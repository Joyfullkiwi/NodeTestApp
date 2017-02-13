define([
    'Backbone',
    '../../models/Group/GroupModel'
], function (Backbone, GroupModel) {
    'use strict';

    var GroupsCollection = Backbone.Collection.extend({
        model: GroupModel,
        url  : '/groups/',

        initialize: function (options) {
            //this.fetch(options);
        },

        parse: function (response) {
            return response;
        }
    });

    return GroupsCollection;
});