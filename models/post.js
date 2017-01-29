module.exports = (function () {

    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var tagSchema = mongoose.Schema({
        _id: {
            type: String, unique: true
        }
    }, {collection: 'tags'});

    var Tag = mongoose.model('Tag', tagSchema);
    var postSchema = mongoose.Schemas({

        title: String,
        url: {type: String, unique: true},
        category: {type: ObjectId, ref: 'Category'},
        body: String,
        comments: [
            {
                author: {type: ObjectId, ref: 'User'},
                email: String, text: String
            }
        ],
        tags: [{type: String, ref: 'Tag'}],
        published: Boolean,
        createdBy: {
            user: { type: ObjectId, ref: 'User', default: null },
            date: { type: Date, default: Date.now }
        },
        editedBy: {
            user: { type: ObjectId, ref: 'User', default: null },
            date: { type: Date }
        },
        author: {type: ObjectId, ref: 'User'}

    },{collection: 'posts'});

    mongoose.model('post', postSchema);

    if(!mongoose.Schemas)
    {
        mongoose.Schemas = {};
    }
    mongoose.Schemas['post'] = postSchema;


})();