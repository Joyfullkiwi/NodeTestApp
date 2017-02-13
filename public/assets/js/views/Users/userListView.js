define([
    'Backbone',
    'Underscore',
    'text!templates/users/header.html',
    'text!templates/users/usersList.html',
    '../../collections/Users/collection'
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
            this.collection.on('reset', this.renderUsers, this);
            this.collection.on('add change', this.render, this);

            this.render();
        },

        events: {
            'click .uEditBtn':'editUser',
            'click .uDeleteBtn': 'deleteUser'
        },



        deleteUser: function (ev) {
            if (!confirm('Do you realy want to delete this user ??')) {
                return;
            }

            var $target = $(ev.target);
            var $userRow = $target.closest('tr');
            var userId = $userRow.data('id');
            var userModel = this.collection.get(userId);

            userModel.destroy({
                success: function () {
                    $userRow.remove();
                },
                error  : function () {
                    alert('Error on delete');
                }
            });
        },

        renderUsers: function () {
            var $el = this.$el;
            var users = this.collection.toJSON();

            $el
                .find('#listWrapper')
                .find('[data-id=' + id + ']')
                .replaceWith(this.newRowTemplate(model))
                .html(this.listTemplate({users: users}));
        },

        render: function () {

            // this.$el.html(this.listTemplate({users: users}));
            this.$el.html(this.headerTemplate({contentType: this.contentType}));

            this.collection.fetch({reset: true});

            return this;
        }
    });

    return ListView;
});