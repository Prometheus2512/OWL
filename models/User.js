var mongoose = require('mongoose');

var userSchema = mongoose.Schema(
    {   email:{ type: String, required: false },
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        firstName: { type: String, required: false },
        lastName: { type: String, required: false },
        avatar: { type: String, required: false },
        lastLogin: { type: Date, required: false },
        books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: false }],

    });

var user = mongoose.model('User', userSchema);

module.exports = user;