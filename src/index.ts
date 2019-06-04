import * as schedule from 'node-schedule'
import * as  tasks from './tasks/index'
import taskConfigs from './taskConfigs'
import messagepush from './common/MessagePush'
(async function () {

    for (let task of taskConfigs.tasks) {
        await schedule.scheduleJob(task.cron, async () => {
            let ts = tasks as any;
            let itask = ts[task.check.type] as ITask;  // 动态获取
            try {                                  
                let data = await itask.execute(task);
                await messagepush.Push(task, data)
            } catch (error) {
                await messagepush.Push(task, { success: false, msg: error.stack || '' }) // 调用时在外部统一处理错误
            }
        });
    }

}());
