import { PushType } from './Enums';
declare global {

    interface IQueue {
        name: string;
        pattern: string;
    }

    interface INotify {
        data: taskModel;
    }

    /**
    * RESTful返回结果
    */
    interface IResult<T> {
        success: boolean;
        msg: string;
        data?: T;
    }

    interface ITask {
        execute(task: taskModel): Promise<IResult<string>>;
    }

    type taskModel = {
        name: string,
        description: string,
        check: {
            url: string,
            type: string
        },
        port?: any,
        cron: string,
        errorLimit?: any,
        notify: { type: PushType, receiver: string }[]
        data?: any
    };

    interface IChannel {
        send(receiver: string, content: string, subject?: string, htmlbody?: string): Promise<boolean>;
    }

}

export { };
