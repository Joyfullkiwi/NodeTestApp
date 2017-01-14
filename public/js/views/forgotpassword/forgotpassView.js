define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/forgot/forgotPassTemplate.html',
    'models/User/UserModel'
], function ($, _, Backbone,ForgotPassTempl, UserModel) {
    var ForgotPassView;

    ForgotPassView = Backbone.View.extend({
        el: '#wrapper',

        template: _.template(ForgotPassTempl),

        initialize: function () {
            this.model || (this.model = new UserModel());

            this.render();
        },

        events: {
            "submit #forgotform": "forgotpassword"
        },

        forgotpassword: function(event){
            event.preventDefault();


            var data = {
                email: this.$("#uemail").val(),

            };

            $.ajax({
                url: "users/forgotpassword",
                type: "POST",
                data: data,
                success: function () {
                   alert('' + data.email + '!');
                },
                error: function () {
                    alert('error');
                }
            });


        },

        render: function () {
            var modelData = this.model.toJSON();

            this.$el.html(this.template({
                item: modelData
            }));


            return this;
        }
    });

    return ForgotPassView;

});