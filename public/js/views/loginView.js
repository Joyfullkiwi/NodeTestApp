define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/login/login.html',
    '../models/User/UserModel'
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

            'click #uLoginBtn': 'login'
        },

        login: function(event){
            event.preventDefault();

            var userlogin = $loginform.find('#ulogin').val();
            var userpass =  $loginform.find('#upass').val();

            var data = {
                login: userlogin,
                pass: userpass
            };

            var user = new UserModel(data);
            user.urlRoot = '/login';
            user.save(null, {
                success: function (response, xhr) {
                    if (response.attributes.fail) {
                        alert(response.attributes.fail);
                        console.log(response.attributes.fail);
                    } else {


                        App.authorised = true;
                        localStorage.setItem('loggedIn', 'true');

                        App.myId = response.id;
                        localStorage.setItem('myId', App.myId);

                        App.me = response;

                        Backbone.history.navigate('/main', {trigger: true});
                    }
                },
                error  : function (err, xhr) {
                    alert('Some error');
                }
            });
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
            });
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
            }*/
           // if(data.login == "")
           // {
              //  $("#loginForm").addClass("notRegister");
            //}


           /* $.ajax({
                url: "users/login",
                type: "POST",
                data: data,
                success: function () {
                    alert('Hello' + login + '!');
                },
                error: function () {
                    alert('error');
                }
            });*/


        },

        render: function () {

            var self = this;
            this.$el.html(this.template());
            return this;
        }
    });

    return LoginView;

});