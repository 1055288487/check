export declare class Email implements IChannel {
    constructor();
    send(to: string, textbody: string, subject: string, htmlbody: string): Promise<any>;
}
declare const _default: Email;
export default _default;
