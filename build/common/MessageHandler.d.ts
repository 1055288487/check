export declare class MessageHandler {
    private rabbitmq;
    constructor();
    init(): Promise<void>;
    publish(data: INotify): Promise<boolean>;
    consume(cb: (data: INotify) => void): Promise<void>;
}
declare const handler: MessageHandler;
export default handler;
