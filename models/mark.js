module.exports = (function () {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var markSchema = mongoose.Schema({
        subject    : [{type: ObjectId, default: null,ref: 'subject'}],
        marks      : {type: Number,required:true},
        student    : [{type: ObjectId, default:null,ref: 'student'}],
        createdBy: {
            user: { type: ObjectId, ref: 'teacher', default: null },
            date: { type: Date, default: Date.now }
        },
        editedBy: {
            user: { type: ObjectId, ref: 'teacher', default: null },
            date: { type: Date }
        },
        visits     : {type: Boolean}

      //  posts    : [{type: Array}]
    }, {collection: 'marks'});

    mongoose.model('mark', markSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

    mongoose.Schemas.mark = markSchema;

})();
