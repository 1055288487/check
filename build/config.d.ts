declare const _default: {
    sms: {
        'appid': string;
        'appSecret': string;
        'api': string;
        'content': string;
        'send': string;
    };
    email: {
        'host': string;
        'port': number;
        'user': string;
        'pass': string;
        'from': string;
        'title': string;
        'body': string;
        'htmlbody': string;
    };
    rabbitMQ: {
        connection: string;
        subscribe: {
            mq: string;
        };
        publish: {
            exchange: string;
            exchangeType: string;
            mqs: {
                name: string;
                pattern: string;
            }[];
        };
    };
};
export default _default;
