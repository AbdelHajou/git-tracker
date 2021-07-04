const router = require('express').Router();
const profileController = require('./profileController');


router.route('/profiles/:userName/views')
    .get(profileController.view);

module.exports = router;