// import * as Mongodb from 'mongodb';
// const MongoClient = Mongodb.MongoClient;
import * as assert from 'assert';
const MongoClient = require('mongodb').MongoClient
const DEBUG = require('debug'),
    debug = DEBUG('mongodb:debug');
import '../common/types';
export class Mongodb implements ITask {
    async execute(task: taskModel): Promise<IResult<string>> {
        return new Promise<IResult<string>>(function (resolve, reject) {
            let url = task.check.url;
            MongoClient.connect(url, function (err: Error, db: any) {
                try {
                    assert.equal(null, err);
                    debug('数据库连接正常:url:%s', task.check.url);
                    db.close();
                    resolve({
                        success: true,
                        msg: 'ok'
                    });
                } catch (error) {
                    debug('数据库连接异常:error:%s', error);
                    reject({
                        success: false,
                        msg: error.stack || ''
                    });
                }
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
export default new Mongodb();