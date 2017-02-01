module.exports = (function () {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var ProfileSchema = mongoose.Schema({
        _id: Number,
        profileName: { type: String, default: 'emptyProfile' },
        profileDescription: { type: String, default: 'No description' },
        profileAccess: [{
            module: { type: Number, ref: "modules" },
            access: {
                read: { type: Boolean, default: false },
                editWrite: { type: Boolean, default: false },
                del: { type: Boolean, default: false }
            }
        }],
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
        }
    }, {collection:'profiles'});

    mongoose.model('profile', ProfileSchema);

    if(!mongoose.Schemas){
        mongoose.Schemas = {};
    }

    mongoose.Schemas['profile'] = ProfileSchema;

})();
