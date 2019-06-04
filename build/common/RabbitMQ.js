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
const amqplib = require("amqplib");
const DEBUG = require("debug");
const debug = DEBUG('rabbitmq:debug'), logError = DEBUG('rabbitmq:error');
class default_1 {
    /**
     *
     * @param _connectionString amqp://{loginName}:{password}@host?heartbeat=40 如：amqp://guest:guest@loalhost:5672?heartbeat=40
     */
    constructor(_connectionString) {
        this.connectionString = _connectionString;
    }
    ensureConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let me = this;
                if (me.channel) {
                    //  debug('服务已连接，返回已有channel.');
                    return;
                }
                debug('Begin connect rabbitMQ server:%s', me.connectionString);
                let connection = yield amqplib.connect(me.connectionString || 'amqp://guest:guest@loalhost:5672?heartbeat=40', { keepAlive: true });
                let ch = yield connection.createChannel();
                ch.on('error', (err) => {
                    me.channel = null;
                    ch.close();
                    logError('channel error:', err);
                });
                ch.on('close', () => {
                    me.channel = null;
                    debug('channel is closed.');
                });
                me.channel = ch;
                debug('connect rabbitMQ server success:%s', me.connectionString);
            }
            catch (error) {
                logError('ensureConnect error:', error);
            }
        });
    }
    assertQueue(queue, option) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureConnect();
            if (!this.channel) {
                logError('assertQueue RabbitMQ服务器未连接成功');
                return;
            }
            try {
                let result = yield this.channel.assertQueue(queue, option || {
                    durable: true,
                    autoDelete: false
                });
                debug('assertQueue:%j', result);
            }
            catch (err) {
                logError('assertQueue error:', err);
            }
        });
    }
    assertQueues(queues, option) {
        return __awaiter(this, void 0, void 0, function* () {
            let me = this;
            queues.forEach((e) => __awaiter(this, void 0, void 0, function* () {
                yield me.assertQueue(e, option);
            }));
        });
    }
    assertExchange(exchange, type, option) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureConnect();
            if (!this.channel) {
                logError('assertExchange RabbitMQ服务器未连接成功');
                return;
            }
            try {
                let result = yield this.channel.assertExchange(exchange, type || 'fanout', option || {
                    durable: true,
                    autoDelete: false
                });
                debug('assertExchange:%j', result);
            }
            catch (error) {
                logError('assertExchange error:', error);
            }
        });
    }
    bindQueue(exchange, queue) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureConnect();
            if (!this.channel) {
                logError('bindQueue RabbitMQ服务器未连接成功');
                return;
            }
            try {
                yield this.channel.bindQueue(queue.name, exchange, queue.pattern || '');
                debug('bindQueue success,exchange:%s,queue:%j', exchange, queue);
            }
            catch (error) {
                logError('bindQueue error:', error);
            }
        });
    }
    bindQueues(exchange, queues) {
        return __awaiter(this, void 0, void 0, function* () {
            let me = this;
            queues.forEach((q) => __awaiter(this, void 0, void 0, function* () {
                yield me.bindQueue(exchange, q);
            }));
        });
    }
    publishToQueue(queue, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureConnect();
            if (!this.channel) {
                logError('publishToQueue RabbitMQ服务器未连接成功');
                return false;
            }
            // if (!Buffer.isBuffer(data)) {
            // }
            let buff = Buffer.from(data);
            return this.channel.sendToQueue(queue, buff);
        });
    }
    publishToExchange(exchange, data, key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureConnect();
            if (!this.channel) {
                logError('publishToExchange RabbitMQ服务器未连接成功');
                return false;
            }
            return this.channel.publish(exchange, key || '', Buffer.from(data));
        });
    }
    consume(queue, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let me = this;
            yield me.ensureConnect();
            if (!me.channel) {
                logError('consume RabbitMQ服务器未连接成功');
                return;
            }
            me.channel.consume(queue, (msg) => __awaiter(this, void 0, void 0, function* () {
                if (msg) {
                    yield callback(msg.content);
                    if (me.channel) {
                        me.channel.ack(msg);
                        // debug('ack message:',msg.fields);
                    }
                }
            }));
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=RabbitMQ.js.map