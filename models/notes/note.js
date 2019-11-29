const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientNote = new Schema ({
    title: String,
    content: String,
    created_at: Date,
    expired_at: Date
});

clientNote.methods.url = function () {
    return `${this._id.toString()}`;
};

const Note = mongoose.model('Note', clientNote);

module.exports = Note;