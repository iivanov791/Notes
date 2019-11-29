const router = require('express').Router();
const List = require('../models/lists/list');
const mongoose = require('mongoose');


module.exports = function () {
    router.get('/', function (req, res) {
        res.render('listForm', {
            title: 'Create list'
        });
    });

    router.get('/:listId', function (req, res) {
        // console.log(req.params.noteId);
        const listId = req.params.listId;
        List.findById(mongoose.Types.ObjectId(listId), function (err, list) {
            res.render('list', {
                title: 'Список задач' + listId,
                list
            });
        });
    });


    router.post('/', function (req, res) {
        // const db = req.db;
        // const collection = db.get('Notes');
        const listData = req.body;

        // console.log(noteData);

        const list = new List ({
            title: listData.title,
            content: listData.content,
            checked: [],
            created_at: new Date()
        });


        list.save(function () {
            res.json(list);
        });
        console.log(list);
        // collection.insert(noteData);
    });


    router.put('/', function (req, res) {

        const listData = req.body;
        // console.log(listData);
        List.findOneAndUpdate({_id: listData._id}, {
            title: listData.title,
            content: listData.content,
            checked: []
        },function (err, list) {
            if(err) throw err;
            res.json(list);
        });

    });

    router.delete('/', function (req,res) {
        const id = req.body.id;
        // console.log(id);

        List.findByIdAndRemove(id, function (err) {
            if (err) throw err;

            res.json({
                message: `List was deleted==>${id}`
            });
        });
    });


    return router;
};


