import rq from '../common/rq';
const DEBUG = require('debug'),
    debug = DEBUG('http_post:debug');
export class HttpPost implements ITask {
    async execute(task: taskModel): Promise<IResult<string>> {

        try {
            let data = await rq.post<string>(task.check.url)
            if (data.status === 200) {
                debug('网站服务正常:url:%s', task.check.url);
                return {
                    success: true,
                    msg: 'ok'
                }
            }
            debug('网站服务异常：error:%s', data);
            return {
                success: false,
                msg: '',
                data: 'http code: ' + data.status + ' , statusText:' + data.statusText
            }
        } catch (error) {
            debug('网站服务异常：error:%s', error);
            return {
                success: false,
                msg: error.stack || ''
            }
        }
    }

}
export default new HttpPost();