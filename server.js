var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
// mongoose instance connection url connection
//mongoose.connect('mongodb://localhost/Shares');

//Mongodb atlas connection string
/*var uri = 'mongodb://caudalia-wine-bot_usr1:WINE4All2018@' +
          'botfabricacluster0-shard-00-00-ns9co.mongodb.net:27017,' +
          'botfabricacluster0-shard-00-01-ns9co.mongodb.net:27017,' +
          'botfabricacluster0-shard-00-02-ns9co.mongodb.net:27017/viralBotShare' +
          'ssl=true&replicaSet=botfabricaCluster0-shard-0&authSource=admin&retryWrites=true';*/

//mLab connection string
var uri = 'mongodb://caudalia-wine-bot_usr1:WINE4All2018@ds259820.mlab.com:59820/viralbotshares';
mongoose.connect(uri);
// Create a model
var Schema = mongoose.Schema;
var shareLog = new Schema({
  mcuid: {
    type: Number,
    required: 'Please enter users mcuid',
    default: 1
  },
  count: {
    type: Number,
    default: 1
  }
});
// Create an instance of the model we created before
var caudaliaShare = mongoose.model('caudaliaShare', shareLog);
// Read the url arguements
app.get('/api/users', function(req, res) {
  var user_id = req.query.mcuid;
// Create a database entry from the read params and save it to mongodb using mongoose
  var new_share = new caudaliaShare({ mcuid: req.query.mcuid});
  new_share.save(function (err) {
  if (err) return handleError(err);
  // saved!
});
// Send a 302 redirect towards the bot flow using refurl
  res.redirect('https://m.me/CaudaliaWineBox?ref=Mundial_au');
});

app.listen(port);

console.log('viralBotApi2 RESTful API server started on: ' + port);
