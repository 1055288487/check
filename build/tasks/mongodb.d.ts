import '../common/types';
export declare class Mongodb implements ITask {
    execute(task: taskModel): Promise<IResult<string>>;
}
declare const _default: Mongodb;
export default _default;
