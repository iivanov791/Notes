const router = require('express').Router();
const Note = require('../models/notes/note');
const mongoose = require('mongoose');


module.exports = function () {
    router.get('/', function (req, res) {
        res.render('noteForm');
    });

    router.get('/:noteId', function (req, res) {
        // console.log(req.params.noteId);
        const noteId = req.params.noteId;
        Note.findById(mongoose.Types.ObjectId(noteId), function (err, note) {
            res.render('note', {
                title: 'Записка' + noteId,
                note
            });
        });
    });

    router.post('/', function (req, res) {
        // const db = req.db;
        // const collection = db.get('Notes');
        const noteData = req.body;

        // console.log(noteData);

        const note = new Note ({
           title: noteData.title,
           content: noteData.content,
           created_at: new Date(),
           expired_at: noteData.expired_at
        });


        note.save(function () {
            res.json(note);
        });
        console.log(note);
        // collection.insert(noteData);
    });



    router.put('/', function (req, res) {

        const noteData = req.body;
        // console.log(noteData);
        Note.findOneAndUpdate({_id: noteData._id}, {
            title: noteData.title,
            content: noteData.content,
            expired_at: noteData.expired_at
        },function (err, note) {
            if(err) throw err;
            res.json(note);
        });

    });

    
    router.delete('/', function (req,res) {
       const id = req.body.id;
        // console.log(id);

        Note.findByIdAndRemove(id, function (err) {
           if (err) throw err;

           res.json({
               messege: `Note was deleted==>${id}`
           });
       });
    });


    return router;
};