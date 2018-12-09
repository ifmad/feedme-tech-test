Promise = require('bluebird');
const net = require('net');

const converter = require('./converter');
const db = require('./db');


const provider = {
    host: 'provider',
    port: 8282,
}

var client = new net.Socket();

Promise.delay(5000)
    .then(() => client.connect(provider.port, provider.host,
        () => console.log('Connected to provider.')));

client.on('data', data => db.save(converter.convert(data)));

client.on('close', () => console.error('Connection closed.'));