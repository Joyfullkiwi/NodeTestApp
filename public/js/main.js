var App = App || {
        File: {
            MAXSIZE           : 10485760, // size in kilobytes  = 3 MB
            MaxFileSizeDisplay: '10 MB'
        }
    };

require.config({
    // baseUrl: '../public',

    paths: {
        jQuery    : './libs/jquery/dist/jquery',
        Underscore: './libs/underscore/underscore',
        Backbone  : './libs/backbone/backbone',
        templates : '../templates',
        jqueryui  : './libs/jquery-ui.min',
        text      : './libs/text/text',
        moment    : './libs/moment/moment'
    },

    shim: {
        Underscore: {
            exports: '_'
        },

        jQuery: {
            exports: '$'
        },

        Backbone: ['Underscore', 'jQuery'],

        jqueryui: ['jQuery'],

        app: ['Backbone'] //, //'jqueryui']
    }
});

require(['Backbone', 'jQuery', 'app'], function (Backbone, $, app) {
   //App ={};//namespace  global key
    app.initialize();
});
