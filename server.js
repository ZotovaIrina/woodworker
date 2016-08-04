var express = require('express'),
    path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});



var server = app.listen(4000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server has been started');
});