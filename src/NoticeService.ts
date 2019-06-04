import * as Enums from './common/Enums'
import * as channel from './NoticeChannel';
import messageHandler from './common/MessageHandler';
import config from './config'
import './common/types';
import *  as util from 'util';

export class NoticeService {

    static async start() {
        
        await messageHandler.consume(async (e: INotify) => {
            
            let data = e.data;

            for (let i = 0; i < data.notify.length; i++) {
                let item = data.notify[i];
                if (item.type === Enums.PushType.sms) {
                    await channel.sms.send(item.receiver, util.format(config.sms.content, data.name, data.description));
                }
                if (item.type === Enums.PushType.email) {
                    await channel.email.send(item.receiver, util.format(config.email.body, data.name, data.description), util.format(config.email.title, data.name, data.description), util.format(config.email.htmlbody, data.name, data.description));
                }
            }
        });
    }
}

(async function () {
    await NoticeService.start();
}())