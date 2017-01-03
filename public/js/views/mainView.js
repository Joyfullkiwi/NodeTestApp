define([
    'jQuery',
    'Underscore',
    'Backbone',
    'views/Users/editView',
    'views/Users/listView',
    'text!templates/users/mainTemplate.html'
], function($, _, Backbone,EditView,ListView, MainTemplate) {
    var MainView;

    MainView = Backbone.View.extend({

        el: '#wrapper',

        template: _.template(MainTemplate),

        initialize: function() {

           // this.collection = new Collection();

            this.render();

           // this.collection.fetch({reset: true});
          //  this.collection.on('reset', this.renderListView, this);
        },

        events: {
            'click #addUsrBtn': 'handleAddUserButton',
            'click .uEditBtn' : 'letsEditUser'
        },

        handleAddUserButton: function() {
            this.renderEditView();
        },

        renderListView: function() {

           this.listView = new ListView({collection: this.collection});
        },

        letsEditUser: function(ev) {
            var $target = $(ev.target);
            var $userRow = $target.closest('tr');
            var userId = $userRow.data('id');
            var userModel = this.collection.get(userId);

            this.renderEditView(userModel);
        },

        renderEditView: function(model) {

            var viewData = {
                collection: this.collection
            };

            if (this.editView && this.editView.undelegateEvents) {
                this.editView.undelegateEvents();
            }

            model && (viewData.model = model);

            this.editView = new EditView(viewData);
        },

        render: function() {

            this.$el.html(this.template());

            this.renderEditView();
            return this;
        }

    });

    return MainView;

});