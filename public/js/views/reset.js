define([
    'Backbone',
    'Underscore',
    '../models/User/UserModel',
    'text!templates/reset.html'
], function (Backbone, _, UserModel, resetTemplate) {
    var View = Backbone.View.extend({
        el: "#wrapper",
        template: _.template(resetTemplate),

        events: {
            'click #resetBtn': 'reset'
        },

        initialize: function (options) {
            this.render();
        },

        reset: function (e) {
            e.preventDefault();

            var $reset = this.$el.find('#uemail');
            var email = $reset.val();

            if(!email) {
                return alert("Is required field! Enter your email!");
            }

            var saveData = {
                email: email
            };

            var user = new UserModel(saveData);
            user.urlRoot = '/reset';

            user.save(null, {
                success: function (response, xhr) {
                    if (response.attributes.fail) {
                        alert(response.attributes.fail);
                        console.log(response.attributes.fail);
                    } else {
                        Backbone.history.navigate('/login', {trigger: true});
                    }
                },
                error: function (err, xhr) {
                    alert('Error');
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
