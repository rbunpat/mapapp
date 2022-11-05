const express = require('express');
fs = require('fs');
url = require('url');
const bodyParser = require('body-parser');
const cors = require('cors');
const getLastLine = require('./fileTools.js').getLastLine
const fileName = 'bruh.txt';
const minLineLength = 1

const app = express();
const port = 80;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.send("yay it works");
    });

app.post('/savePos', function(request, respond) {
    var body = '';
    filePath = 'bruh.txt';
    request.on('data', function(data) {
        body += data;
    });

    request.on('end', function (){
        fs.appendFile(filePath, body, function() {
            respond.end();
        });
    });
});

app.get('/getPos', function(request, respond) {
    getLastLine(fileName, minLineLength).then((lastLine) => {
        respond.send(lastLine);
    });
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = app;