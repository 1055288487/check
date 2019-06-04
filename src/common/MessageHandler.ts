import config from '../config';
import RabbitMQ from '../common/RabbitMQ';
import * as DEBUG from 'debug';
const debug = DEBUG('MessageHandler:debug'),
    logError = DEBUG('MessageHandler:error');

export class MessageHandler {
    private rabbitmq: RabbitMQ;
    constructor() {
        this.rabbitmq = new RabbitMQ(config.rabbitMQ.connection);
    }
    async init() {
        await this.rabbitmq.assertExchange(config.rabbitMQ.publish.exchange, config.rabbitMQ.publish.exchangeType);
        await this.rabbitmq.assertQueues(config.rabbitMQ.publish.mqs.map((e: IQueue) => e.name));
        await this.rabbitmq.bindQueues(config.rabbitMQ.publish.exchange, config.rabbitMQ.publish.mqs);
        debug('init mq:', config.rabbitMQ.publish);
    }

    async publish(data: INotify): Promise<boolean> {
        if (!data) return false;
        return await this.rabbitmq.publishToExchange(config.rabbitMQ.publish.exchange, JSON.stringify(data), '');
    }

    async consume(cb: (data: INotify) => void) {
        await this.rabbitmq.consume(config.rabbitMQ.subscribe.mq, async (data: Buffer) => {
            try {
                let content = data.toString();
                debug('on consume:', content);
                await cb(JSON.parse(content));
            } catch (error) {
                logError(error);
            }

        })

    }
}


const handler = new MessageHandler();
(async function () {
    await handler.init();
}());

export default handler;