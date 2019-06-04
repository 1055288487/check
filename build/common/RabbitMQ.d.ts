import * as amqplib from 'amqplib';
export default class {
    channel: amqplib.Channel | null;
    connectionString: string;
    /**
     *
     * @param _connectionString amqp://{loginName}:{password}@host?heartbeat=40 如：amqp://guest:guest@loalhost:5672?heartbeat=40
     */
    constructor(_connectionString: string);
    ensureConnect(): Promise<void>;
    assertQueue(queue: string, option?: amqplib.Options.AssertQueue): Promise<void>;
    assertQueues(queues: string[], option?: amqplib.Options.AssertQueue): Promise<void>;
    assertExchange(exchange: string, type?: string, option?: amqplib.Options.AssertQueue): Promise<void>;
    bindQueue(exchange: string, queue: IQueue): Promise<void>;
    bindQueues(exchange: string, queues: IQueue[]): Promise<void>;
    publishToQueue(queue: string, data: string): Promise<boolean>;
    publishToExchange(exchange: string, data: string, key?: string): Promise<boolean>;
    consume(queue: string, callback: Function): Promise<void>;
}
