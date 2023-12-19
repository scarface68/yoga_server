const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                // Email validation regex
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: 'Invalid email format'
        }
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    batch: {
        type: String,
        enum: ['6-7AM', '7-8AM', '8-9AM', '5-6PM'],
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
