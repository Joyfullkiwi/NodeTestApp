define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/login/loginTemplate.html',
    'models/User/UserModel'
], function ($, _, Backbone,LoginTemplate, UserModel) {
    var LoginView;

    LoginView = Backbone.View.extend({
        el: '#wrapper',

        template: _.template(LoginTemplate),

        initialize: function () {
            this.model || (this.model = new UserModel());

            this.render();
        },

        events: {
            "submit #loginForm": "login"
        },

        login: function(event){
            event.preventDefault();

           // var self = this;
          /*  var saveData = {};
            var $loginform = this.$el.find('#loginform');

            var userlogin = $loginform.find('#ulogin').val();
            var userpass =  $loginform.find('#upass').val();

            if (!userlogin) {
                return alert('Login is required field !!')
            }
            if (!userpass) {
                return alert('Password is required field !!')
            }

            userlogin && (saveData.login = userlogin);
            userpass && (saveData.pass = userpass);

            $.post('users/login', saveData, function () {
                alert('Hello ' + login+ '!');
            });*/
            var data = {
                login: this.$("#ulogin").val(),
                pass: this.$("#upass").val()
            };
            var err = "";
            if (data.login.length<5){
                err+="Login must be longer than 5 symbols<br/>";
            }
            if (data.pass.length<8){
                err+="Password must be longer than 8 symbols";
            }
            if (err){
                $("#error").text('Unable to login.');
               // $("#error").slideDown();
                return;
            }
            if(data.login == "")
            {
                $("#loginForm").addClass("notRegister");
            }
            $.ajax({
                url: "users/login",
                type: "POST",
                data: data,
                success: function () {
                    alert('Hello' + login + '!');
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

    return LoginView;

});