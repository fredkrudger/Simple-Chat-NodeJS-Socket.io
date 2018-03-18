var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server); 

app.use(express.static('client'));

app.get('/test', function(req, res){
	res.status(200).send('Pagina Principal');
});

var messages = [{
	id: 1,
	text: 'Bienvenido al Chat Privado de Freddy, realizado con socket.io y Node.js',
	nickname: 'Bot - Fredkrudger'
}];

io.on('connection', function(socket){
	console.log('el cliente con la IP : '+socket.handshake.address+' Esta conectado...');
	socket.emit('messages', messages);

	socket.on('add-message', function(data){
		messages.push(data);

		io.sockets.emit('messages', messages);
	});

});

server.listen(3000, function(){
	console.log('Servidor Corriendo en http:localhost:3000');
});
