export class Base {

    /**
     * 返回正确的数据
     * @param _data 
     */
    public ok<T>(_data: T): IResult<T> {
        return {
            success: true,
            msg: 'ok',
            data: _data
        }
    }
    /**
     * 
     * @param _msg 数据异常数据
     * @param _data 
     */
    public bad<T>(_msg?: string, _data?: T): IResult<T> {

        return {
            success: false,
            msg: _msg || '',
            data: _data
        };
    }

}
// export default new Base()