var UsersCollection = Backbone.Collection.extend({
    model: UserModel,
    url  : '/users',

    initialize: function (options) {
        this.fetch(options);
    },

    parse: function (response) {
        if (response.data) {
            this.total = response.total || 0;
            return response.data;
        }

        return response;
    }
});