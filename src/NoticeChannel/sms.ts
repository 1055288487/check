import config from '../config';
import rq from '../common/rq';
import utils from '../common/util';
export class SMS implements IChannel {

    constructor() { }

    async send(receiver: string, content: string): Promise<boolean> {
        let data = {
            appid: config.sms.appid,
            token: utils.md5(config.sms.appSecret + Date.now()),
            receivers: receiver,
            msg: content,
            sender: config.sms.send,
            timestamp: Date.now()
        };
        let result = await rq.post<any>(config.sms.api, data);
        return result.data.ret === 1 && result.data.data.length > 0;
    }
}
export default new SMS()