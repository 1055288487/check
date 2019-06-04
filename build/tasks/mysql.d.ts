import '../common/types';
export declare class Mysql implements ITask {
    execute(task: taskModel): Promise<IResult<string>>;
}
declare const _default: Mysql;
export default _default;
