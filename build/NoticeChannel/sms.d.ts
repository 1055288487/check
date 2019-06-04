export declare class SMS implements IChannel {
    constructor();
    send(receiver: string, content: string): Promise<boolean>;
}
declare const _default: SMS;
export default _default;
