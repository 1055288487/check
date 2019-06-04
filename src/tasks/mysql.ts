import * as mysql from 'mysql';
const DEBUG = require('debug'),
    debug = DEBUG('mysql:debug');
import '../common/types';
export class Mysql implements ITask {
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
        })

        // .then((data) => {
        //         return data
        //     }).catch((error) => {
        //         return {
        //             success: false,
        //             msg: error.stack || ''
        //         }
        //     })
    }
}
export default new Mysql();