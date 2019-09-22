var http = require('http');

//urlify'ın yaratılması ve options detayları
var my_urlify = require('urlify').create({
    addEToUmlauts: true,
    szToSs: true,
    spaces: "_",
    nonPrintable: "_",
    trim: true
});


var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    if (req.url == '/') {
        res.write('Welcome');
        res.end();
    } else {
        if (req.url == '/about') {
            var str = my_urlify('That is about page');
            res.write(str);
            res.end();
        } else if (req.url == '/contact') {
            res.write('That is contact page');
            res.end();
        } else {
            res.write('Page not found');
            res.end();
        }
    }

});
server.on('listening', function () {
    console.log('ok, server is running');
});
server.listen(1010, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1010/');