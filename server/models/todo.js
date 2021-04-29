const mongoose = require('mongoose');

var Todo = mongoose.model("Todo",{
    text:{
        type: String,
        minLength: 1,
        trim: true,
        required: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    completedAt:{
        type: Number
    }
});

module.exports = {
    Todo
}