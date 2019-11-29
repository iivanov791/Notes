const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientList = new Schema ({
    title: String,
    content: Array,
    checked: Array,
    created_at: Date
});

clientList.methods.url = function () {
    return `${this._id.toString()}`;
};

const List = mongoose.model('List', clientList);

module.exports = List;