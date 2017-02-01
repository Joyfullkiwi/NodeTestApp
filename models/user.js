/**
 * Created by Asus on 21.11.2016.
 */
module.exports = (function () {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var userSchema = mongoose.Schema({

        firstName: {type: String, required:true},
        lastName : {type: String},
        email    : { type: String, unique: true, required: true},
        friends  : [{type: ObjectId, ref: 'user', default: null}],
        birthDay : {type: Date, default: Date.now()},
        age      : {type: Number, enum: [1, 0], default: 0},
        posts    : [{type: Array}],
        login    : {type:String},
        pass     : {type:String},
        admin    : {type: Boolean},
        photo    : {
            type   : String,
            default: "http://1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png"
        }
    }, {collection: 'users'});

    mongoose.model('user', userSchema);

    if (!mongoose.Schemas) {
        mongoose.Schemas = {};
    }


     mongoose.Schemas.user = userSchema;

  //  mongoose.Schemas.user
})();
