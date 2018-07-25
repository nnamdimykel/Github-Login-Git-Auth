var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({

    github         : {
        id           : String,
        token        : String,
        name         : String,
        email        : String
    }

},
{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
);

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
