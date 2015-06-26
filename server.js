var net = require('net');
var server = net.createServer();
var clients = [];

server.on('connection', function(socket) {
    console.log('Connection detected');
    socket.setEncoding('utf8');
    clients.push(socket);
    clients.forEach(function(c){
        c.write("Connected users: " + clients.length + "\n");
    });
    socket.on('data', function(data) {
        console.log(data);
        clients.forEach(function(client) {
            if (client != socket) {
                client.write(data);
            }
        });
    });
    socket.on('close', function() {
        console.log("Connection closed");
        var index = clients.indexOf(socket);
        clients.splice(index,1);
        console.log(clients.length);
    });
});
server.on('close', function(closed) {
    console.log("Server is closed");
    console.log(closed);
});
server.on('error', function(err) {
    console.error(err);
});

server.listen(process.env.PORT||4000);
