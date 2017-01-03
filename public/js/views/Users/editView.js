define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/users/editTemplate.html',
    'models/User/UserModel'

], function($, _, Backbone, EditTemp, UserModel) {
    var EditView;
    EditView = Backbone.View.extend({

        el: '#editWrapper',

        template: _.template(EditTemp),

        initialize: function() {
            this.model || (this.model = new UserModel());

            this.render();
        },

        events: {
            'submit #userEditForm': 'hendleUserSave',
            //'click #uSaveBtn':'hendleUserSave',
            'click #uCancelBtn'   : 'handleFormHide'
        },

        hendleUserSave: function(ev) {
            ev.preventDefault();

            var self = this;
            var saveData = {};
            var $formContainer = this.$el.find('#userEditForm');

            var userFname = $formContainer.find('#ufirstName').val();
            var userLname = $formContainer.find('#ulastName').val();
            var userAge = $formContainer.find('#uAge').val();
            var userBday = $formContainer.find('#uBirthday').val();

            if (!userFname) {
                return alert('First name is required field !!')
            }

            userFname && (saveData.firstName = userFname);
            userLname && (saveData.lastName = userLname);
            userAge && (saveData.age = userAge);
            userBday && (saveData.birthDay = userBday);

            this.model.save(saveData, {
                wait   : true,
                patch  : true,
                success: function() {
                    self.collection.add(self.model);
                    self.$el.slideUp();
                },
                error  : function() {
                    alert('Error on save');
                }
            });
        },

        handleFormHide: function(ev) {
            this.$el.slideUp();
        },

        render: function() {
            var modelData = this.model.toJSON();

            this.$el.html(this.template({
                item: modelData
            }));
            this.$el.slideDown();

            return this;
        }

    });

    return EditView;

});
