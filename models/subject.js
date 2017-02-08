module.exports = (function () {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var subSchema = mongoose.Schema({
        marks    : {type: ObjectId, ref:'mark'},
        title    : {type: String, required: true},
        teacher  : [{type: ObjectId, ref: 'teacher', default: null}]
    }, {collection: 'subjects'});

    mongoose.model('subject', subSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

  mongoose.Schemas.subject = subSchema;

})();
