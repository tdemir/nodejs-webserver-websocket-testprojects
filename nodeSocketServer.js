var serverPort = 9099;

var net = require('net');

var _fncClientConnected = function (_client) {
    //client bilgileri yazılır.
    console.log('client connected');
    console.log('client IP Address: ' + _client.remoteAddress);
    console.log('is IPv6: ' + net.isIPv6(_client.remoteAddress));
    server.getConnections(function (_err, _count) {
        console.log('total server connections: ' + _count);
    });
    _client.setKeepAlive(true, 3000);
};

var _fncClientDisconnected = function (_client) {
    console.log('client disconnected');
};

var _fncClientOnError = function (_client, _err) {
    console.log("Caught flash policy server socket error: ");
    console.log(_err.stack);
    _fncClientDisconnected(client);
};

var _fncClientOnDataRead = function (_client, _data) {
    console.log('received data: ' + _data.toString());

    //Server'dan Client socket'e data gönderilir. 
    _client.write('Bu mesaj Serverdan gonderilmistir.');
};

var server = net.createServer(function (client) {

    _fncClientConnected(client);


    // Client'dan gelicek data beklenir. 
    client.on('data', (data) => _fncClientOnDataRead(client, data));

    // Client'ın socket'i kapattığı olay yakalanır.. 
    client.on('end', () => _fncClientDisconnected(client));

    client.on("error", (err) => _fncClientOnError(client, err));
});

server.on('error', function (err) {
    console.log('server error');
    console.log(err);
    //server.close();
});

server.listen(serverPort, function () {
    console.log('server started on port ' + serverPort);
});