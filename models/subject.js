module.exports = (function () {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var subSchema = mongoose.Schema({
        title    : {type: String, required: true},
        teacher  : [{type: ObjectId, ref: 'teacher', default: null}],
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
        },
    }, {collection: 'subjects'});

    mongoose.model('subject', subSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

  mongoose.Schemas.subject = subSchema;

})();
