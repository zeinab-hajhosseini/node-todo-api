const mongeese = require('mongoose');
const validator = require('validator');

var User = mongeese.model('user', {
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not email format'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    token: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

module.exports = { User }