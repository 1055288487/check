"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// const Tn = require('telnet-client')
const DEBUG = require('debug'), debug = DEBUG('telnet_test:debug');
const net = require("net");
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        let params = {
            host: '192.168.16.12',
            port: 5672,
            timeout: 15000
        };
        let client = net.createConnection(params.port, params.host, () => {
            debug('client connectioned:', client.localAddress);
            // client.write('hello');
            client.end();
        });
        client.on('data', (data) => {
            debug('receive data:', data.toString());
        });
        client.on('end', () => {
            debug('socket end.');
        });
        client.on('error', (err) => {
            debug('client error:', err);
        });
    });
})();
//# sourceMappingURL=telnet_test.js.map