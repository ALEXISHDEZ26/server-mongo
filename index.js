const express = require('express');
const bodyParser= require('body-parser');
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient

var ObjectId = require('mongodb').ObjectID;
let db;

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({extended: true}));

app.post('/categories', (req, res) => {
    db.collection('categorias').save(req.body, (err, result) => {
        if (err) return console.log(err)
    
        console.log('saved to database')
        res.send(result);
    })
});

app.get('/categories', (req, res) => {
    db.collection('categorias').find().toArray( (err, results) => {
        console.log(results)
        // send HTML file populated with quotes here
        res.send(results);
      });
});

app.get('/categories/index', (req, res) => {
    db.collection('categorias').find().toArray( (err, results) => {
        console.log(results)
        // send HTML file populated with quotes here
        res.render('categories', {categories : results});
    });
});

app.get('/categories/:idCategory',  (req, res) => {
    db.collection('categorias').findOne({ _id: new ObjectId(req.params.idCategory)}, (err, document) => {
        console.log('Object', err, document);
        res.render('category', { category : document});
    });
});

const urlDatabase = 'mongodb://oscar:gIBRAN21..@cluster0-shard-00-00-tbg0o.mongodb.net:27017,cluster0-shard-00-01-tbg0o.mongodb.net:27017,cluster0-shard-00-02-tbg0o.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';



const client = new MongoClient(urlDatabase, { useNewUrlParser: true });

client.connect( err => {
    // ... start the server
    if (err) return console.log(err)
    db = client.db('rainbowsix'); // whatever your database name is
    app.listen(3000, function() {
        console.log('listening on 3000 right now');
    });
});
