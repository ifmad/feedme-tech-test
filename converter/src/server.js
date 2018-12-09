const net = require('net');

const provider = {
    host: 'provider',
    port: 8282,
}

var client = new net.Socket();
client.connect(provider.port, provider.host, () => console.log('connected.'));

client.on('data', (data) => console.log('data: ' + data));

client.on('close', () => console.error('Connection closed.'));