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
const config_1 = require("../config");
const RabbitMQ_1 = require("../common/RabbitMQ");
const DEBUG = require("debug");
const debug = DEBUG('MessageHandler:debug'), logError = DEBUG('MessageHandler:error');
class MessageHandler {
    constructor() {
        this.rabbitmq = new RabbitMQ_1.default(config_1.default.rabbitMQ.connection);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.rabbitmq.assertExchange(config_1.default.rabbitMQ.publish.exchange, config_1.default.rabbitMQ.publish.exchangeType);
            yield this.rabbitmq.assertQueues(config_1.default.rabbitMQ.publish.mqs.map((e) => e.name));
            yield this.rabbitmq.bindQueues(config_1.default.rabbitMQ.publish.exchange, config_1.default.rabbitMQ.publish.mqs);
            debug('init mq:', config_1.default.rabbitMQ.publish);
        });
    }
    publish(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data)
                return false;
            return yield this.rabbitmq.publishToExchange(config_1.default.rabbitMQ.publish.exchange, JSON.stringify(data), '');
        });
    }
    consume(cb) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.rabbitmq.consume(config_1.default.rabbitMQ.subscribe.mq, (data) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let content = data.toString();
                    debug('on consume:', content);
                    yield cb(JSON.parse(content));
                }
                catch (error) {
                    logError(error);
                }
            }));
        });
    }
}
exports.MessageHandler = MessageHandler;
const handler = new MessageHandler();
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield handler.init();
    });
}());
exports.default = handler;
//# sourceMappingURL=MessageHandler.js.map