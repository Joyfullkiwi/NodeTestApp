define([
    'Backbone',
    'Underscore',
    '../models/User/UserModel',
    'text!templates/resetPassword'
], function (Backbone, _, UserModel, resetTemplate) {
    var View = Backbone.View.extend({
        el: "#wrapper",
        template: _.template(resetTemplate),

        events: {
            'click #resetBtn': 'reset'
        },

        initialize: function (options) {
            var self = this;
            var user = new UserModel();

            user.urlRoot = '/reset/' + options.recoveryKey;
            self.model = user;

            self.render();
        },

        recover: function (e) {
            e.preventDefault();

            var self = this;
            var $required = this.$el.find('#password');
            var password = $required.val();

            if(!password) {
                return alert("Please enter new password");
            }

            var data = {
                password: password
            };

            var user = self.model;

            user.save(data, {
                success: function (response, xhr) {
                    if (response.attributes.fail) {
                        alert(response.attributes.fail);
                        console.log(response.attributes.fail);
                    } else {
                        Backbone.history.navigate('myApp/login', {trigger: true});
                    }
                },
                error: function (err, xhr) {
                    alert('Some error');
                }
            });
        },

        render: function () {
            var self = this;

            this.$el.html(this.template());

            return this;
        }
    });

    return View;
});
