module.exports = (function () {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var studentSchema = mongoose.Schema({
        firstName: {type: String, required: true},
        lastName : {type: String},
        friends  : [{type: ObjectId, ref: 'student', default: null}],

        groups   : [{type:ObjectId ,default:null}],
        subjects : [{type:ObjectId,default:null}],
        teachers : [{type:ObjectId,default:null}],
        marks    : [{type:ObjectId,default:null}],
        birthDay : {type: Date, default: Date.now()},
        age      : {type: Number, enum: [1, 0], default: 0},
        posts    : [{type: Array}]
    }, {collection: 'students'});

    mongoose.model('student', studentSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

    mongoose.Schemas.student =studentSchema;



})();

