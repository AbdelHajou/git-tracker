const mongoose = require('mongoose');
const profileSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: false
    }
});

var Profile = module.exports = mongoose.model('profile', profileSchema);
module.exports.get = function (callback, limit) {
    Profile.find(callback).limit(limit);
}