import * as mysql from 'mysql';
const DEBUG = require('debug'),
    debug = DEBUG('mysql:debug');
import '../common/types';
import sms from '../NoticeChannel/sms'
import *  as util from 'util';

export class Count implements ITask {
    async execute(task: taskModel): Promise<IResult<string>> {

        return new Promise<IResult<string>>(function (resolve, reject): any {   // promise的泛型定义

            let connection = mysql.createConnection(task.check.url);

            connection.connect(function (err: any) {
                if (err) {
                    debug('数据库连接异常:error:%s', err);
                    return reject({
                        success: false,
                        msg: err.stack || ''
                    })
                } else {
                    debug('数据库连接正常:url:%s', task.check.url);
                    connection.end();
                    return resolve({
                        success: true,
                        msg: 'ok'
                    });
                }
            })
            let result = connection.query('SELECT COUNT(1) FROM tbl_user');
            sms.send(task.notify[0].receiver, util.format('tbl_user 总条数为：%s', result));
        })

    }
}
export default new Count();