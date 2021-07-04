
const Profile = require('./profileModel');

exports.view = function (req, res) {
    Profile.findOneAndUpdate({ userName: req.params.userName }, { $inc: { views: 1 }, $setOnInsert: { userName: req.params.userName } }, { new: true, upsert: true }, function (err, profile) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                 userName: profile.userName,
                 views: profile.views
            });
        }
    });
};