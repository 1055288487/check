import * as Enums from './common/Enums';
declare const _default: {
    'version': number;
    tasks: ({
        name: string;
        description: string;
        check: {
            url: string;
            type: string;
        };
        cron: string;
        errorLimit: number;
        notify: {
            type: Enums.PushType;
            receiver: string;
        }[];
        port?: undefined;
    } | {
        name: string;
        description: string;
        check: {
            url: string;
            type: string;
        };
        port: number;
        cron: string;
        errorLimit: number;
        notify: {
            type: Enums.PushType;
            receiver: string;
        }[];
    })[];
};
export default _default;
