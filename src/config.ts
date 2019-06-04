export default {

    sms: {
        // 'appid': '9352a50f98b94be3811767d3d9f9d714',
        // 'appSecret': '6601ffb684c742af9f93229c6259091d',
        'appid': '4a1fe355fe0f4c18b5b305ce6336131f',
        'appSecret': 'a877d178b0614381bed134cc908af296',
        'api': 'http://smsapi.lxumc.com/sms/send',
        'content': '故障提醒：经系统多次检测，%s(%s)访问异常，请及时处理。',
        'send': 'monitor'
    },
    email: {
        'host': 'smtp.exmail.qq.com',
        'port': 25,
        'user': 'pms@wswin.cn',
        'pass': 'Zjwskj123456',
        'from': 'pms@wswin.cn',
        // 'user': 'support@wswin.cn',
        // 'pass': 'Cmg52739290',
        // 'from': 'support@wswin.cn',
        'title': '故障提醒：%s(%s)访问异常',
        'body': '经系统多次检测，%s(%s)访问异常，请及时处理。',
        'htmlbody': '经系统多次检测，<b>%s(%s)</b>访问异常，请及时处理。'
    },
    rabbitMQ:
        process.env.NODE_ENV === 'dev' ?
            {
                connection: 'amqp://guest:guest@192.168.16.181:5672?heartbeat=40',
                subscribe: {
                    mq: 'app_monitor_dev'
                },
                publish: {
                    exchange: 'app_monitor_ex_dev',
                    exchangeType: 'fanout',
                    mqs: [{
                        name: 'app_monitor_dev',
                        pattern: ''
                    }]

                }
            } :
            {
                connection: 'amqp://guest:guest@192.168.16.181:5672?heartbeat=40',
                subscribe: {
                    mq: 'app_monitor_production'
                },
                publish: {
                    exchange: 'app_monitor_ex_production',
                    exchangeType: 'fanout',
                    mqs: [{
                        name: 'app_monitor_production',
                        pattern: ''
                    }]

                }
            }
}