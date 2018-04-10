var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'); 

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

//stylus css compiler

function compile(str, path) {
    return stylus(str).set('filename', path);
}
//config section
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'))
app.use(stylus.middleware(
    {
        src: __dirname + 'public',
        compile: compile
    }
));
app.use(bodyParser.urlencoded({'extended': true}));
app.use(bodyParser.json());

//add static routing as we don't have any route to anywhere at this point
app.use(express.static(__dirname + '/public'));


//database logic
 mongoose.connect('mongodb://localhost/multivision');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('multivision db opened');
})

// mongodb schema create
var messageSchema = mongoose.Schema({message: String});
// an object model called Message will be defined by the schema
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
//the message object will be the one to query on the db
Message.findOne().exec(function(err, messageDoc) {
    mongoMessage = messageDoc.message;
});

//views
app.get('/partials/:partialPath', function(req,res) {
    res.render('partials/' + req.params.partialPath); 
});

app.get('*', function(req, res) {
    res.render('index', {
        mongoMessage: mongoMessage
    });
}) ;

var port = process.env.port || 3031;
app.listen(port);

console.log('listen port:' + port + 'seems running fine');