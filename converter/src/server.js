const net = require('net');
const promiseRetry = require('promise-retry');

const provider = {
    host: 'provider',
    port: 8282,
}

var client = new net.Socket();

promiseRetry((retry, number)=> {
    console.log('attempt number', number);
 
    return Promise.resolve()
        .then(()=>client.connect(provider.port, provider.host, () => console.log('connected.')))
        .catch(retry);
})

client.on('data', (data) => console.log('data: ' + data));

client.on('close', () => console.error('Connection closed.'));