import * as net from 'net';
const DEBUG = require('debug'),
    debug = DEBUG('tcp:debug');

export class TCP implements ITask {
    async execute(task: taskModel): Promise<IResult<string>> {
        return new Promise<IResult<string>>(function (resolve, reject) {
            let socket = new net.Socket();
            socket.connect(task.port, task.check.url, function () {
                socket.end();
                debug('网站服务正常:url:%s', task.check.url);
                resolve({
                    success: true,
                    msg: 'ok'
                })
            })
            socket.on('error', function (err) {
                socket.destroy();
                debug('网站服务异常：err:%s', err);
                reject({
                    success: false,
                    msg: err.stack || ''
                })
            });
        })
        // .then((data) => {
        //     return data
        // }).catch((error) => {
        //     return {
        //         success: false,
        //         msg: error.stack || ''
        //     }
        // })
    }
}



export default new TCP();


