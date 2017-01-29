module.exports = (function () {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var groupSchema = mongoose.Schema({
        title     : {type:String},
        url       : {type: String, unique: true},
        createdBy: {
            user: { type: ObjectId, ref: 'User', default: null },
            date: { type: Date, default: Date.now }
        },
        editedBy: {
            user: { type: ObjectId, ref: 'User', default: null },
            date: { type: Date }
        },
        students  : [{type: ObjectId, ref: 'student', default: null}],
        teachers  : [{type: ObjectId, ref: 'teacher', default: null}],
        posts     : [{type: Array}]
    }, {collection: 'groups'});

    mongoose.model('group', groupSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

    mongoose.Schemas.group = groupSchema;
   // mongoose.Schemas.groups
  //  mongoose.Schemas.group = studentSchema;

})();

