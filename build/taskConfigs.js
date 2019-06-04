"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums = require("./common/Enums");
exports.default = {
    'version': 0.1,
    tasks: [
        {
            name: 'http_oa',
            description: '万赛科技OA系统',
            check: {
                url: 'http://oa.wswin.cn',
                type: 'http_get'
            },
            cron: '*/15 * * * * *',
            errorLimit: 5,
            notify: [
                // { type: Enums.PushType.sms, receiver: '15757189180,13336105851' },
                { type: Enums.PushType.email, receiver: '1055288487@qq.com,joe@wswin.cn' }
            ]
        },
        {
            name: 'http_zjdpf',
            description: '浙江省残疾人联合会业务系统',
            check: {
                url: 'http://sso.zjdpf.org.cn',
                type: 'http_get'
            },
            cron: '*/20 * * * * *',
            errorLimit: 5,
            notify: [
                // { type: Enums.PushType.sms, receiver: '15757189180,13336105851' },
                { type: Enums.PushType.email, receiver: '1055288487@qq.com,joe@wswin.cn' }
            ]
        },
        {
            name: 'http_smsapi',
            description: '短信API接口',
            check: {
                url: 'http://smsapi.lxumc.com/',
                type: 'http_get'
            },
            cron: '*/21 * * * * *',
            errorLimit: 5,
            notify: [
                // { type: Enums.PushType.sms, receiver: '15757189180,13336105851' },
                { type: Enums.PushType.email, receiver: '1055288487@qq.com,joe@wswin.cn' }
            ]
        },
        // {
        //     name: 'mongodb',
        //     description: 'mongodb数据库',
        //     check: {
        //         url: 'mongodb://192.168.16.181:27017',
        //         type: 'mongodb'
        //     },
        //     cron: '*/5 * * * * *',
        //     errorLimit: 3,   // 错误达到三次才提醒 如果配置里没有错误次数,则默认为3次
        //     notify: [
        //         // { type: Enums.PushType.sms, receiver: '15757189180,13336105851' },
        //         { type: Enums.PushType.email, receiver: '1055288487@qq.com,joe@wswin.cn' }
        //     ]
        // },
        {
            name: 'mysql',
            description: 'mysql数据库',
            check: {
                url: 'mysql://root:root@192.168.16.151:3306/',
                type: 'mysql'
            },
            cron: '*/6 * * * * *',
            errorLimit: 5,
            notify: [
                // { type: Enums.PushType.sms, receiver: '15757189180,13336105851' },
                { type: Enums.PushType.email, receiver: '1055288487@qq.com,joe@wswin.cn' }
            ]
        },
        {
            name: 'sqlserver',
            description: 'sqlserver数据库',
            check: {
                url: 'mssql://sa:zjwsrjkj@192.168.16.115/',
                type: 'sqlserver'
            },
            cron: '*/7 * * * * *',
            errorLimit: 5,
            notify: [
                // { type: Enums.PushType.sms, receiver: '15757189180,13336105851' },
                { type: Enums.PushType.email, receiver: '1055288487@qq.com,joe@wswin.cn' }
            ]
        },
        {
            name: 'app_file_sync',
            description: 'app_file_sync',
            check: {
                url: 'http://202.107.249.133:8127/',
                type: 'http_get'
            },
            cron: '*/5 * * * * *',
            errorLimit: 5,
            notify: [
                // { type: Enums.PushType.sms, receiver: '15757189180,13336105851' },
                { type: Enums.PushType.email, receiver: '1055288487@qq.com,joe@wswin.cn' }
            ]
        },
        {
            name: 'app_websocket',
            description: 'app_websocket',
            check: {
                url: 'http://202.107.249.133:30000/',
                type: 'http_get'
            },
            cron: '*/5 * * * * *',
            errorLimit: 5,
            notify: [
                // { type: Enums.PushType.sms, receiver: '15757189180,13336105851' },
                { type: Enums.PushType.email, receiver: '1055288487@qq.com,joe@wswin.cn' }
            ]
        },
        {
            name: 'app_http',
            description: 'app_http',
            check: {
                url: 'http://202.107.249.133:30001/uploads/headImages/icon/0.png',
                type: 'http_get'
            },
            cron: '*/5 * * * * *',
            errorLimit: 5,
            notify: [
                // { type: Enums.PushType.sms, receiver: '15757189180,13336105851' },
                { type: Enums.PushType.email, receiver: '1055288487@qq.com,joe@wswin.cn' }
            ]
        },
        // {
        //     name: 'tbl_user_count',
        //     description: 'tbl_user_count',
        //     check: {
        //         url: 'mysql://readonly_user:zjcl123456@192.168.2.91:3306/',
        //         type: 'count'
        //     },
        //     cron: '0 0 21 * * *',
        //     notify: [
        //         { type: Enums.PushType.sms, receiver: '18058167724' },
        //         // { type: Enums.PushType.email, receiver: '1055288487@qq.com,joe@wswin.cn' }
        //     ]
        // },
        // 2018.11.1增加监控内容
        {
            name: 'gateway_lxumc',
            description: 'gateway_lxumc',
            check: {
                url: 'http://gateway.lxumc.com:8082/app/user/joe',
                type: 'http'
            },
            cron: '0 */5 * * * ?',
            errorLimit: 5,
            notify: [
                // { type: Enums.PushType.sms, receiver: '15757189180,13336105851' },
                { type: Enums.PushType.email, receiver: '1055288487@qq.com,joe@wswin.cn' }
            ]
        },
        {
            name: 'appServer',
            description: 'appServer',
            check: {
                url: 'http://ls.winws.cn',
                type: 'tcp'
            },
            port: 30001,
            cron: '0 */5 * * * ?',
            errorLimit: 5,
            notify: [
                // { type: Enums.PushType.sms, receiver: '15757189180,13336105851' },
                { type: Enums.PushType.email, receiver: '1055288487@qq.com,joe@wswin.cn' }
            ]
        },
        {
            name: 'groupServer',
            description: 'groupServer',
            check: {
                url: 'oa.wswin.cn',
                type: 'tcp'
            },
            port: 16715,
            cron: '0 */5 * * * ?',
            errorLimit: 5,
            notify: [
                // { type: Enums.PushType.sms, receiver: '15757189180,13336105851' },
                { type: Enums.PushType.email, receiver: '1055288487@qq.com,joe@wswin.cn' }
            ]
        }, {
            name: 'chatServer',
            description: 'chatServer',
            check: {
                url: 'ls.winws.cn',
                type: 'tcp'
            },
            port: 30000,
            cron: '0 */5 * * * ?',
            errorLimit: 5,
            notify: [
                // { type: Enums.PushType.sms, receiver: '15757189180,13336105851' },
                { type: Enums.PushType.email, receiver: '1055288487@qq.com,joe@wswin.cn' }
            ]
        }, {
            name: 'fileServer',
            description: 'fileServer',
            check: {
                url: 'ls.winws.cn',
                type: 'tcp'
            },
            port: 8124,
            cron: '0 */5 * * * ?',
            errorLimit: 5,
            notify: [
                // { type: Enums.PushType.sms, receiver: '15757189180,13336105851' },
                { type: Enums.PushType.email, receiver: '1055288487@qq.com,joe@wswin.cn' }
            ]
        }, {
            name: 'downServer',
            description: 'downServer',
            check: {
                url: 'ls.winws.cn',
                type: 'tcp'
            },
            port: 8125,
            cron: '0 */5 * * * ?',
            errorLimit: 5,
            notify: [
                // { type: Enums.PushType.sms, receiver: '15757189180,13336105851' },
                { type: Enums.PushType.email, receiver: '1055288487@qq.com,joe@wswin.cn' }
            ]
        }, {
            name: 'updateUrl',
            description: 'updateUrl',
            check: {
                url: 'http://gateway.lxumc.com:8082/app/update/{clientType}/{version}',
                type: 'http'
            },
            cron: '0 */5 * * * ?',
            errorLimit: 5,
            notify: [
                // { type: Enums.PushType.sms, receiver: '15757189180,13336105851' },
                { type: Enums.PushType.email, receiver: '1055288487@qq.com,joe@wswin.cn' }
            ]
        }, {
            name: 'netdisk',
            description: 'netdisk',
            check: {
                url: 'http://oa.wswin.cn',
                type: 'tcp'
            },
            port: 81,
            cron: '0 */5 * * * ?',
            errorLimit: 5,
            notify: [
                // { type: Enums.PushType.sms, receiver: '15757189180,13336105851' },
                { type: Enums.PushType.email, receiver: '1055288487@qq.com,joe@wswin.cn' }
            ]
        }
    ]
};
//# sourceMappingURL=taskConfigs.js.map