const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
        validate: {
            validator: function(value) {
                // Calculate age based on date of birth
                const age = Math.floor((new Date() - new Date(value)) / (365.25 * 24 * 60 * 60 * 1000));
                return age >= 18 && age <= 65;
            },
            message: 'Age should be between 18 and 65'
        }
    },
    batch: {
        type: String,
        enum: ['6-7AM', '7-8AM', '8-9AM', '5-6PM'],
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
