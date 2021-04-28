const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number
    }
});

var newTodo = new Todo({
    text: "      New Todo       "
});

newTodo.save().then((doc) => {
    console.log(`Doc: ${doc}`);
}, (err) => {
    console.log(`Error: ${err}`);
});