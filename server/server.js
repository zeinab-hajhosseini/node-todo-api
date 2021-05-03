var { mongoose } = require('./db/mongoose');
var express = require('express');
var bodyParser = require('body-parser');

const _ = require('lodash');

var { Todo } = require('./models/todo');
const { ObjectId } = require('mongodb');

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
});

app.get('/todo', (req, res) => {
    Todo.find().then((todos) => {
        res.send(todos);
    }, (err) => {
        res.status(400).send(err);
    })
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectId.isValid(id))
        return res.status(404).send();

    Todo.findById(id).then((todo) => {
        if (!todo)
            return res.status(404).send();

        res.send({ todo });
    }).catch((err) => {
        return res.status(404).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectId.isValid(id)) {
        res.status(404).send();
    }

    Todo.findOneAndDelete({ _id: new ObjectId(id) }).then((todo) => {
        if (!todo)
            res.status(404).send();

        res.send({ todo });

    }).catch((err) => {
        res.status(404).send();
    });

});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ["text", "completed"]);

    if (!ObjectId.isValid(id))
        res.status(404).send();

    if (_.isBoolean(body.completed) && body.completed)
        body.completedAt = new Date().getTime();

    else {
        body.completed = false;
        body.completedAt = null
    }

    Todo.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: body }, { new: true }).then((todo) => {
        if (!todo)
            res.status(404).send();
        res.send({ todo });

    }).catch((err) => {
        res.status(404).send();
    })

});

app.listen(3000, () => {
    console.log("Connected On Port 3000");
});

module.exports = { app };