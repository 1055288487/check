import * as amqplib from 'amqplib';
import * as DEBUG from 'debug';
const debug = DEBUG('rabbitmq:debug'),
    logError = DEBUG('rabbitmq:error');
export default class {

    channel: amqplib.Channel | null;
    connectionString: string;
    /**
     * 
     * @param _connectionString amqp://{loginName}:{password}@host?heartbeat=40 如：amqp://guest:guest@loalhost:5672?heartbeat=40
     */
    constructor(_connectionString: string) {
        this.connectionString = _connectionString;
    }
    async ensureConnect() {

        try {
            let me = this;
            if (me.channel) {
                //  debug('服务已连接，返回已有channel.');
                return;
            }

            debug('Begin connect rabbitMQ server:%s', me.connectionString);
            let connection = await amqplib.connect(me.connectionString || 'amqp://guest:guest@loalhost:5672?heartbeat=40', { keepAlive: true });

            let ch = await connection.createChannel();

            ch.on('error', (err: Error) => {
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

        } catch (error) {
            logError('ensureConnect error:', error);
        }


    }

    async assertQueue(queue: string, option?: amqplib.Options.AssertQueue) {
        await this.ensureConnect();
        if (!this.channel) {
            logError('assertQueue RabbitMQ服务器未连接成功');
            return;
        }

        try {
            let result = await this.channel.assertQueue(queue, option || {
                durable: true,
                autoDelete: false
            });
            debug('assertQueue:%j', result);
        } catch (err) {
            logError('assertQueue error:', err);
        }

    }

    async assertQueues(queues: string[], option?: amqplib.Options.AssertQueue) {
        let me = this;
        queues.forEach(async e => {
            await me.assertQueue(e, option);
        })

    }


    async assertExchange(exchange: string, type?: string, option?: amqplib.Options.AssertQueue) {
        await this.ensureConnect();
        if (!this.channel) {
            logError('assertExchange RabbitMQ服务器未连接成功');
            return;
        }
        try {
            let result = await this.channel.assertExchange(exchange, type || 'fanout', option || {
                durable: true,
                autoDelete: false
            });
            debug('assertExchange:%j', result);
        } catch (error) {
            logError('assertExchange error:', error);
        }

    }

    async  bindQueue(exchange: string, queue: IQueue) {
        await this.ensureConnect();
        if (!this.channel) {
            logError('bindQueue RabbitMQ服务器未连接成功');
            return;
        }
        try {
            await this.channel.bindQueue(queue.name, exchange, queue.pattern || '');
            debug('bindQueue success,exchange:%s,queue:%j', exchange, queue);
        } catch (error) {
            logError('bindQueue error:', error);
        }

    }

    async  bindQueues(exchange: string, queues: IQueue[]) {
        let me = this;
        queues.forEach(async q => {
            await me.bindQueue(exchange, q);
        })
    }

    async  publishToQueue(queue: string, data: string): Promise<boolean> {
        await this.ensureConnect();
        if (!this.channel) {
            logError('publishToQueue RabbitMQ服务器未连接成功');
            return false;
        }
        // if (!Buffer.isBuffer(data)) {
        // }

        let buff = Buffer.from(data);
        return this.channel.sendToQueue(queue, buff);
    }

    async publishToExchange(exchange: string, data: string, key?: string): Promise<boolean> {
        await this.ensureConnect();
        if (!this.channel) {
            logError('publishToExchange RabbitMQ服务器未连接成功');
            return false;
        }
        return this.channel.publish(exchange, key || '', Buffer.from(data));
    }

    async consume(queue: string, callback: Function) {
        let me = this;
        await me.ensureConnect();
        if (!me.channel) {
            logError('consume RabbitMQ服务器未连接成功');
            return;
        }

        me.channel.consume(queue, async (msg) => {
            if (msg) {
                await callback(msg.content);
                if (me.channel) {

                    me.channel.ack(msg);
                    // debug('ack message:',msg.fields);
                }
            }

        });
    }
}
