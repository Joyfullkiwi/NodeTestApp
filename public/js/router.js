define([
    'Backbone',
    'Underscore',
    'jQuery',
    'views/mainView',
    'views/login/loginView',
    'views/register/registerView'
], function (Backbone, _, $, MainView, LoginView,RegisterView){
    'use strict';

    var appRouter = Backbone.Router.extend({

        routes: {

            'home'                                                     : 'any',
            'login'                                                    : 'login',
            'register'                                                 : 'register',
            'Users'                                                    : 'goToUsers',
            'People'                                                   : 'goToUsers',
            ':contentType(/p=:page)(/c=:countPerPage)(/filter=:filter)': 'goToContent',
            '*any'                                                     : 'any'
        },

      /*  goToCreateView: function () {
            alert('create');
        },*/

        initialize: function (){
            alert('Router Init');
        },


        goToUsers: function () {
            var self = this;

            function loadContent() {
                var contentViewUrl = 'views/Users/listView';

                require([contentViewUrl], function (ContentView) {
                    var contentViewOpts = {
                        el         : '#tableWrapper',
                        contentType: Backbone.history.fragment || 'Users'
                    };

                    var contentView = new ContentView(contentViewOpts);

                    self.changeView(contentView);
                });
            }

            if (!this.mainView) {
                this.main('Users', function () {
                    loadContent();
                });
            } else {
                loadContent();
            }
        },

        getContent: function (options) {
            var context = options.context;
            var contentType = options.contentType;
            var countPerPage = options.countPerPage;
            var page = options.page || 1;
            var filter = options.filter;

            var self = context;
            var contentViewUrl = 'views/' + contentType + '/listView';
            var collectionUrl = 'collections/' + contentType + '/collection';
            var requireArray = [contentViewUrl, collectionUrl];

            function loadContent() {
                require(requireArray, function (ContentView, ContentCollection) {
                    var contentViewOpts;
                    var collectionOpts;

                    filter = filter ? JSON.parse(decodeURIComponent(filter)) : null;

                    contentViewOpts = {
                        Constructor: ContentView,
                        options    : {
                            el         : '#listWrapper',
                            contentType: contentType
                        }
                    };
                    collectionOpts = {
                        Constructor: ContentCollection,
                        options    : {
                            page       : page,
                            count      : countPerPage,
                            contentType: contentType
                        }
                    };

                    self.createViews(contentViewOpts, collectionOpts);
                }, function () {
                    self.any();
                });
            }

            if (!context.mainView) {
                context.main(contentType, function () {
                    loadContent();
                });
            } else {
                loadContent();
            }
        },
        createViews: function (viewOpts, collectionOpts) {
            var self = this;
            var ContentView = viewOpts.Constructor;
            var viewOptions = viewOpts.options || {};
            var Collection = collectionOpts.Constructor;
            var collectionOptions = collectionOpts.options;
            var collection = new Collection(collectionOptions);

            viewOptions.collection = collection;

            collection.on('reset', _.bind(function () {
                var contentView;

                collection.off('reset');

                contentView = new ContentView(viewOptions);
                contentView.render();

                self.changeView(contentView);
            }, self));

            collection.fetch({reset: true});
        },

        changeView: function (view) {
            if (this.view) {
                this.view.undelegateEvents();
            }

            this.view = view;
        },

        main: function (contentType, cb) {
            if (!this.mainView) {
                this.mainView = new MainView({
                    contentType: contentType
                });
            }

            this.changeWrapperView(this.mainView);

            if (cb && typeof cb === 'function') {
                cb();
            }
        },

        changeWrapperView: function (wrapperView) {
            if (this.wrapperView) {
                this.wrapperView.undelegateEvents();
            }

            this.wrapperView = wrapperView;
        },

        goToContent: function (contentType, page, countPerPage, filter) {
            var self = this;

            if (!contentType) {
                return this.any();
            }

            if (typeof contentType !== 'string') {
                contentType = 'Users';
                page = contentType;
            }

            self.getContent({
                context     : self,
                contentType : contentType,
                page        : page,
                countPerPage: countPerPage,
                filter      : filter
            });

        },

        any: function () {
            var url = 'Users';

            return Backbone.history.navigate('#' + url, {trigger: true});
        },

        login: function () {
            var self = this;
            require(LoginView,function (View) {
                self.wrapperView = new View();
            });
           // this.changeView(new LoginView());
        },

        register: function () {
            this.changeView(new RegisterView);
        }


});

    return appRouter;
});
