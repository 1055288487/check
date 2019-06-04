import './types';
export declare class MessagePush {
    filter: Map<string, number>;
    /**
     * 过滤数组(连续三次错误则丢进队列提醒,只发一次)
     * @param data
     */
    Push(task: taskModel, data: IResult<string>): Promise<void>;
}
declare const _default: MessagePush;
export default _default;
