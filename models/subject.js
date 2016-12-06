module.exports = (function () {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var subSchema = mongoose.Schema({
        title    : {type: String, required: true},
        students  : [{type: ObjectId, ref: 'student', default: null}],
    }, {collection: 'subjects'});

    mongoose.model('subject', subSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

  mongoose.Schemas.subject = subSchema;

})();
