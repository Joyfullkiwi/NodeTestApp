define([
    'Backbone',
    'Underscore',
    'jQuery',
    'views/mainView',
    'views/loginView',
    'views/registerView'
], function (Backbone, _, $, MainView, LoginView, RegisterView) {
    'use strict';

    var appRouter = Backbone.Router.extend({

        routes: {
            'home': 'any',
            'login': 'login',
            'register': 'register',
            'reset': 'reset',
            'reset/:resKey': 'resetPass',
            'Users': 'goToUsers',
            'People': 'goToUsers',
            ':contentType(/p=:page)(/c=:countPerPage)(/filter=:filter)': 'goToContent',
            '*any': 'any'
        },

        /*  goToCreateView: function () {
         alert('create');
         },*/

        initialize: function () {
            // alert('Router Init');
        },


        goToUsers: function () {
            var self = this;

            function loadContent() {
                var contentViewUrl = 'views/Users/listView';

                require([contentViewUrl], function (ContentView) {
                    var contentViewOpts = {
                        el: '#tableWrapper',
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
                        options: {
                            el: '#listWrapper',
                            contentType: contentType
                        }
                    };
                    collectionOpts = {
                        Constructor: ContentCollection,
                        options: {
                            page: page,
                            count: countPerPage,
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
                context: self,
                contentType: contentType,
                page: page,
                countPerPage: countPerPage,
                filter: filter
            });

        },

        any: function () {
            var url = 'Users';

            return Backbone.history.navigate('#' + url, {trigger: true});
        },

        login: function () {
            var self = this;
            App.authorised = localStorage.getItem('loggedIn');
            var loginViewUrl = 'views/loginView';
            if (App.authorised) {
                Backbone.history.navigate('#main', {trigger: true});
            } else {
                require([loginViewUrl], function (LoginView) {
                    if (self.view) {
                        self.view.undelegateEvents();
                    }
                    self.view = new LoginView();
                });
            }
        },


        register: function () {
            var self = this;
            App.authorised = localStorage.getItem('loggedIn');
            var registerViewUrl = 'views/registerView';
            if (App.authorised) {
                Backbone.history.navigate('#main', {trigger: true});
            } else {
                require([registerViewUrl], function (RegisterView) {
                    if (self.view) {
                        self.view.undelegateEvents();
                    }
                    self.view = new RegisterView();
                });
            }
        },

        reset: function () {
            var self = this;
            App.authorised = localStorage.getItem('loggedIn');
            var resetViewUrl = 'views/reset';

            if (App.authorised) {
                Backbone.history.navigate('#main', {trigger: true});
            } else {
                require([resetViewUrl], function (ResetView) {
                    if (self.view) {
                        self.view.undelegateEvents();
                    }
                    self.view = new ResetView();
                });
            }
        },

        resetPass: function (resKey) {
            var self = this;
            App.authorised = localStorage.getItem('loggedIn');
            var resetViewUrl = 'views/resetPassword';
            if (App.authorised) {
                Backbone.history.navigate('#main', {trigger: true});
            } else {
                require([resetViewUrl], function (ResetPassView) {
                    if (self.view) {
                        self.view.undelegateEvents();
                    }
                    self.view = new ResetPassView({recoveryKey: recoveryKey});
                });
            }
        }


    });

    return appRouter;
});
