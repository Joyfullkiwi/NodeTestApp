define([
    'Backbone',
    'Underscore',
    'text!templates/groups/header.html',
    'text!templates/groups/groupsList.html',
    '../../collections/Groups/groupCollection'
], function (Backbone, _, headerTemplate, listTemplate, Collection) {
    'use strict';

    var ListView = Backbone.View.extend({
        el            : '#listWrapper',
        headerTemplate: _.template(headerTemplate),
        listTemplate  : _.template(listTemplate),

        initialize: function (options) {
            this.contentType = options.contentType || 'No contentType';
            this.collection = new Collection({
                page       : 1,
                count      : 20,
                contentType: 'Users'
            });
            this.collection.on('reset', this.renderGroups, this);
            this.collection.on('add change', this.render, this);

            this.render();
        },

        events: {

        },


        renderGroups: function () {
            var $el = this.$el;
            var groups = this.collection.toJSON();

            $el
                .find('#listWrapper')
                .find('[data-id=' + id + ']')
                .replaceWith(this.newRowTemplate(model))
                .html(this.listTemplate({groups: groups}));
        },

        render: function () {

            this.$el.html(this.headerTemplate({contentType: this.contentType}));

            this.collection.fetch({reset: true});

            return this;
        }
    });

    return ListView;
});