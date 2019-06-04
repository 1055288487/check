// const Tn = require('telnet-client')
const DEBUG = require('debug'),
    debug = DEBUG('telnet_test:debug');
import * as net from 'net';

(async function () {
    let params = {
        host: '192.168.16.12', // task.check.url,
        port: 5672,
        timeout: 15000
    }
    let client = net.createConnection(params.port, params.host, () => {
        debug('client connectioned:', client.localAddress);
       // client.write('hello');
       client.end();
    });

    client.on('data', (data) => {
        debug('receive data:', data.toString());
    })

    client.on('end', () => {
        debug('socket end.')
    });

    client.on('error', (err) => {
        debug('client error:', err);
    })
  
})();
