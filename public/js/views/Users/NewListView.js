define([
    'Backbone',
    'Underscore',
    'text!templates/users/listTemplate.html',
    'template'
], function(Backbone, _, listTemplate){
    'use strict';
    var ListView = Backbone.View.extend({
        el: '#listWrapper',
        listTemplate: _.template(listTemplate),

        initialize: function (options) {
            this.collection = options.collection;

            this.render();
        },

        render: function() {
            var users = this.collection.toJSON();

            this.$el.html(this.listTemplate({users: users}));
            return this;
        }
    });

    return ListView;
});