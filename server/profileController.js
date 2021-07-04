
Profile = require('./profileModel');

exports.view = function (req, res) {
    Profile.findOneAndUpdate({ userName: req.params.userName }, { $inc: { views: 1 } }, { new: true }, function (err, profile) {
        if (err) {
            res.send(err);
        } else {
            res.json({
                data: { views: profile.views }
            });
        }
    });
};