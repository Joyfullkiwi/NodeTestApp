module.exports = (function () {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var markSchema = mongoose.Schema({
        subject    : [{type: ObjectId, default: null,ref: 'subject'}],
        marks      : {type: Number,required:true},
        student    : [{type: ObjectId, default:null,ref: 'student'}],
        visits     : {type: Number,default: null}

    }, {collection: 'marks'});

    mongoose.model('mark', markSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

    mongoose.Schemas.mark = markSchema;

})();
