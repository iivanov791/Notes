const router = require('express').Router();
const List = require('../models/lists/list');
const Note = require('../models/notes/note');

module.exports = function () {
    List
        .find({})
        .exec(function (err, lists) {
            Note
                .find({})
                .exec(function (err, notes){
                    router.get ('/', function (req, res) {
                        res.render('main', {
                            title: 'Keeps',
                            lists,
                            notes
                        });
                    });
                });
        });

    return router;
};

