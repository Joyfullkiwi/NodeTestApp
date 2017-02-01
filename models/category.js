
module.exports = (function () {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var categorySchema = mongoose.Schema({
        name: { type: String, unique: true },
        description: { type: String},
        createdBy: {
            user: { type: ObjectId, ref: 'User', default: null },
            date: { type: Date, default: Date.now }
        },
        editedBy: {
            user: { type: ObjectId, ref: 'User', default: null },
            date: { type: Date }
        },
        removedBy:{
            user: { type: ObjectId, ref: 'User', default: null },
            date: { type: Date, default: Date.now }
        }
    }, {collection: 'categories'});

    mongoose.model('category', userSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }


    mongoose.Schemas['category'] = categorySchema;


})();
