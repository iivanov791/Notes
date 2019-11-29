const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const notesRoute = require('./routes/notes');
const listsRoute = require('./routes/lists');
const defaultRoute = require('./routes/default');
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://iigor_2:iet6Ahto@cluster0-subww.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//     const collection = client.db("StepPrjNotes").collection("notes");
//     // perform actions on the collection object
//     client.close();
// });

const app = express();
const config = dotenv.config().parsed;

try {
    mongoose.connect (config.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false})
            .then(() => {
                app.set('view engine', config.TEMPLATE_ENGINE);
                app.set('views', config.TEMPLATE_VIEW_PATH);

                app.use((req, res, next) => {
                    // set headers
                    // req.db = db;
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

                    next();
                });

                app.use(express.static(config.PUBLIC_ROOT));
                app.use(bodyParser.urlencoded({extended: false}));
                app.use(bodyParser.json());

                app.use('/', defaultRoute());

                app.use('/notes', notesRoute());
                app.use('/api/notes', notesRoute());


                app.use('/lists', listsRoute());
                app.use('/api/lists', listsRoute());

                app.listen(config.PORT || 3000, err => {
                    if (err) {
                        throw new Error(err);
                    }

                    console.log('Everything is fine');
                });
            });
} catch (e) {
    console.log('Something BAD Happened', e);
}
