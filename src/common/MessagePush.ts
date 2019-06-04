import MessageHandler from '../common/MessageHandler';
const DEBUG = require('debug'),
    debug = DEBUG('MessagePush:debug');
import './types';
import * as log from './log';


export class MessagePush {

    filter: Map<string, number> = new Map<string, number>();
    // filter: Set<string> = new Set<string>();
    /**
     * 过滤数组(连续三次错误则丢进队列提醒,只发一次)
     * @param data 
     */
    async Push(task: taskModel, data: IResult<string>) {

        if (data.success === false) {
            log.errorLog.error('检测内容：%s，检测结果：%s', JSON.stringify(task), JSON.stringify(data))
        }

        if (data.success && this.filter.has(task.name) && this.filter.delete(task.name)) {
            return;
        }
        // log.errorLog.error('检测内容：%s，检测结果：%s', JSON.stringify(task), JSON.stringify(data))
        if (!task.errorLimit) { task.errorLimit = 3 }
        if (this.filter.has(task.name)) {
            let count: any = this.filter.get(task.name)
            if (count === task.errorLimit) {
                task.data = data.data;
                debug('队列信息：%s', task)
                await MessageHandler.publish({ data: task });


            }
            debug('失败次数：%s', this.filter.get(task.name))
            count++;
            this.filter.set(task.name, count)
            return
        }
        this.filter.set(task.name, 1)
    }
}

export default new MessagePush();