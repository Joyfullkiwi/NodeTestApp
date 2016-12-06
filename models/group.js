module.exports = (function () {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var groupSchema = mongoose.Schema({
        title     : {type:String,required:true},
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

