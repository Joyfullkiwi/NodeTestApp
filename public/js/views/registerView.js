define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/register/register.html',
    '../models/User/UserModel'
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
            'click #registerBtn': 'register'
        },

        register: function(event){
            event.preventDefault();


            var saveData = {};
            var $regform = this.$el.find('#regform');

            var userfname = $regform.find('#ufirstName').val();
            var userlname = $regform.find('#ulastName').val();
            var udataofbirth = $regform.find('#dateOfBirth').val();
            var useremail = $regform.find('#uemail').val();
            var userlogin = $regform.find('#ulogin').val();
            var userpass = $regform.find('#upass').val();

            //if (!userfname && !useremail && !userlogin && !userpass && !udataofbirth) {
              //  return alert('This is required fields !!')
           // }

            saveData = {
                firstName: userfname,
                lastName: userlname,
                birthDay: udataofbirth,
                email:useremail,
                login:userlogin,
                pass:userpass
            };

            var user = new UserModel(saveData);
            user.urlRoot = '/register';
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
                    alert('Some error');
                }
            });
            /*$.ajax({
                url: "users/register",
                type: "POST",
                data: saveData,
                success: function () {
                    alert('success' );
                },
                error: function () {
                    alert('error');
                }
            });*/

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

           /* this.$el.html(this.template({
                item: modelData
            }));*/
            var self = this;

            this.$el.html(this.template());

            return this;
        }
    });

    return RegisterView;

});