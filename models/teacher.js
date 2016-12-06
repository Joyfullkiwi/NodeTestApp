/**
 * Created by Asus on 22.11.2016.
 */
module.exports = (function () {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var teacherSchema = mongoose.Schema({
        firstName: {type: String, required: true},
        lastName : {type: String},
        groups   : [{type: ObjectId, ref: 'group', default: null}],
        subjects : [{type: ObjectId, ref: 'subject', default: null}],
        admin    : [{type: ObjectId, default: null}],
        birthDay : {type: Date, default: Date.now()},
        age      : {type: Number, enum: [1, 0], default: 0},
        posts    : [{type: Array}]
    }, {collection: 'teachers'});

    mongoose.model('teacher', teacherSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }

    mongoose.Schemas.teacher = teacherSchema;

})();
