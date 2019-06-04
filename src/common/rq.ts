import * as axios from 'axios';
const DEBUG = require('debug'),
    debug = DEBUG('api:debug');
// logError = DEBUG('api:error'),

const options: axios.AxiosRequestConfig = {
    // baseURL: config.api.host,
    headers: {
        'Content-Type': 'application/json'
    },
    // auth: {
    //     username: '826DCC79-3D65-5217-06CC-2EAE1DCEC581',
    //     password: 'thm1'
    // }

};


export default class {

    static async  get<T>(path: string): Promise<axios.AxiosResponse<T>> {
        debug('rq get:%s', path);
        return await axios.default.get<T>(path, options);
    }

    static async put<T>(path: string, data: any): Promise<axios.AxiosResponse<T>> {
        debug('rq put : %s,data:%j', path, data);
        return await axios.default.put<T>(path, data, options);
    }

    static async post<T>(path: string, data?: any): Promise<axios.AxiosResponse<T>> {
        debug('rq post:%s,data:%j', path, data);
        return await axios.default.post<T>(path, data || {}, options);
    }

    static async delete<T>(path: string): Promise<axios.AxiosResponse<T>> {
        debug('rq post:%s', path);
        return await axios.default.delete(path, options);
    }
}