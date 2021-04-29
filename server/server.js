var { mongoose } = require('./db/mongoose');
var express = require('express');
var bodyParser = require('body-parser');

var { Todo } = require('./models/todo');

var app = express();

app.use(bodyParser.json());


app.post('/todo', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    })
})

app.listen(3000, () => {
    console.log("Connected On Port 3000");
});

module.exports = { app };