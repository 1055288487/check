import '../common/types';
export declare class Sqlserver implements ITask {
    execute(task: taskModel): Promise<IResult<string>>;
}
declare const _default: Sqlserver;
export default _default;
