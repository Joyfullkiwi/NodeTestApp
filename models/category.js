
module.exports = (function () {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var categorySchema = mongoose.Schema({
        name: { type: String, unique: true },
        description: { type: String}
    }, {collection: 'categories'});

    mongoose.model('category', userSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }


    mongoose.Schemas['category'] = categorySchema;


})();
