const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
app.use(express.static(path.join(__dirname, '../build')));

const apiRoutes = require("./api-routes");

app.use(cors());

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/git-tracker', { useNewUrlParser: true });
var db = mongoose.connection;

if(!db)
    console.log("Error connecting to database")
else
    console.log("Successfully connected to database")

var port = process.env.PORT || 8080;

app.use('/api', apiRoutes);
app.listen(port, function () {
    console.log("Running GitTracker API on port " + port);
});