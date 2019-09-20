var mongoose = require('mongoose');

var bookSchema = mongoose.Schema(
    {   

        isbn: { type: String, unique: false, required: false },
        title: { type: String, required: false },
        image: { type: String, required: false, enum: ["Administrator", "Employee", "Client", "HR Manager"] },
        description: { type: String, required: false },
        author: { type: String, required: false },
        image: { type: String, required: false },
        state: { type: String, required: false, enum: ["Very bad", "Bad", "Average", "Good", "Perfect"] },
        genre: [{ type: String, required: false, enum: ["Fantasy", "Science fiction", "Western", "Romance","Thriller"] }],
        offers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: false }],
        confirmedoffer:{ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: false }
    });

var book = mongoose.model('Book', bookSchema);

module.exports = book;