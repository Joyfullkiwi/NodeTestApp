module.exports = (function () {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var groupSchema = mongoose.Schema({
        groupName : {type:String, default:'emptyGroup'},
        url       : {type: String, unique: true},
        students  : [{type: ObjectId, ref: 'students', default: null}],
        createdBy: {
            user: { type: ObjectId, ref: 'User', default: null },
            date: { type: Date, default: Date.now }
        },
        editedBy: {
            user: { type: ObjectId, ref: 'User', default: null },
            date: { type: Date }
        },
        teachers  : [{type: ObjectId, ref: 'teachers', default: null}],
        posts     : [{type: ObjectId, ref: 'posts', default: null}]
    }, {collection: 'groups'});

    mongoose.model('group', groupSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

    mongoose.Schemas.group = groupSchema;

})();

