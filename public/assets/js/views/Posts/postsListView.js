define([
    'Backbone',
    'Underscore',
    'text!templates/blog/header.html',
    'text!templates/blog/postList.html',
    '../../collections/Posts/postsCollection'
], function (Backbone, _, headerTemplate, listTemplate, Collection) {
    'use strict';

    var ListView = Backbone.View.extend({
        el            : '#listWrapper',
        headerTemplate: _.template(headerTemplate),
        listTemplate  : _.template(listTemplate),

        initialize: function (options) {
            this.contentType = options.contentType || 'No contentType';
            this.collection = new Collection({
                page       : 1,
                count      : 20,
                contentType: 'Users'
            });
            this.collection.on('reset', this.renderPosts, this);
            this.collection.on('add change', this.render, this);

            this.render();
        },

        events: {
            'click #addPost':'addPost'
        },

        addPost: function (ev) {
            ev.preventDefault();

            var self = this;
            var saveData = {};
            var $formContainer = this.$el.find('#postForm');

            var title = $formContainer.find('#title').val();
            var shortDescr = $formContainer.find('#shortDescr').val();
            var body = $formContainer.find('#body').val();
            var postDate = $formContainer.find('#postDate').val();
            var postAuthor = $formContainer.find('#postAuthor').val();
            var category = $formContainer.find('#category').val();

            title && (saveData.title = title);
            shortDescr && (saveData.shotDescription = shortDescr);
            body && (saveData.body = body);
            postDate && (saveData.date = postDate);
            postAuthor && (saveData.author = postAuthor);
            category && (saveData.category = category);

            this.model.save(saveData, {
                wait   : true,
                patch  : true,
                success: function() {
                    self.collection.add(self.model);
                },
                error  : function() {
                    alert('Error on save');
                }
            });
        },



        renderPosts: function () {
            var $el = this.$el;
            var posts = this.collection.toJSON();

            $el
                .find('#listWrapper')
                .find('[data-id=' + id + ']')
                .replaceWith(this.newRowTemplate(model))
                .html(this.listTemplate({posts: posts}));
        },

        render: function () {


            this.$el.html(this.headerTemplate({contentType: this.contentType}));

            this.collection.fetch({reset: true});

            return this;
        }
    });

    return ListView;
});