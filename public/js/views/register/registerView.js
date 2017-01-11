define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/register/registerTemplate.html',
    'models/User/UserModel'
], function ($, _, Backbone,RegisterTemplate, UserModel) {
    var RegisterView;

    RegisterView = Backbone.View.extend({
        el: '#wrapper',

        template: _.template(RegisterTemplate),

        initialize: function () {
            this.model || (this.model = new UserModel());

            this.render();
        },

        events: {
            "submit #regForm": "registration"
        },

        registration: function(event){
            event.preventDefault();

            var self = this;
            var saveData = {};
            var $regform = this.$el.find('#regform');

            var userfname = $regform.find('#ufirstName').val();
            var useremail = $regform.find('#uemail').val();
            var userlogin = $regform.find('#ulogin').val();
            var userpass = $regform.find('#upass').val();

            if (!userfname && !useremail && !userlogin && !userpass) {
                return alert('This is required fields !!')
            }

            saveData = {
                firstName: userfname,
                email:useremail,
                login:userlogin,
                pass:userpass
            };

            $.ajax({
                url: "users/register",
                type: "POST",
                data: saveData,
                success: function () {
                    alert('success' );
                },
                error: function () {
                    alert('error');
                }
            });

            //$.post('users/register', saveData, function () {});
           // var err = "";
           // if (saveData.login.length){
          //      err+="Login must be longer than 5 symbols<br/>";
            //}

           /* userfname && (saveData.firstName = userfname);
            useremail && (saveData.email = useremail);
            userlogin && (saveData.login = userlogin);
            userpass && (saveData.pass = userpass);*/

            /*this.model.save(saveData, {
                wait   : true,
                patch  : true,
                success: function() {
                    self.collection.add(self.model);
                    self.$el.slideUp();
                },
                error  : function() {
                    alert('Error on save');
                }
            });*/

        },

        render: function () {
            var modelData = this.model.toJSON();

            this.$el.html(this.template({
                item: modelData
            }));

            return this;
        }
    });

    return RegisterView;

});