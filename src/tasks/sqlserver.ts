const mssql = require('mssql')
const DEBUG = require('debug'),
    debug = DEBUG('sqlserver:debug');
import '../common/types';
export class Sqlserver implements ITask {
    async execute(task: taskModel): Promise<IResult<string>> {
        return new Promise<IResult<string>>(async function (resolve, reject) {
            try {
                await mssql.connect(task.check.url);
                debug('数据库连接正常:url:%s', task.check.url);
                mssql.close()
                return resolve({
                    success: true,
                    msg: 'ok'
                })
            } catch (error) {
                debug('数据库连接异常:error:%s', error);
                return reject({
                    success: false,
                    msg: error.stack || ''
                });
            }
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
export default new Sqlserver();