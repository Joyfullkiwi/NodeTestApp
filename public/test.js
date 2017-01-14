var model;
var usersCollection = new UsersCollection({
    reset  : true,
    success: function (models) {
        model = usersCollection.get({_id: "582b01474203352ab132603e"});
        model.on('invalid', function (model, errors) {
            console.dir(errors);
        });
        model.save({
            firstName: 'test1',
            name     : 'One'
        }, {
            patch  : true,
            success: function (model) {
                alert('Ok');
            },
            error  : function (xhr) {
                alert(xhr.message);
            }
        });
    }
});



