import * as axios from 'axios';
export default class {
    static get<T>(path: string): Promise<axios.AxiosResponse<T>>;
    static put<T>(path: string, data: any): Promise<axios.AxiosResponse<T>>;
    static post<T>(path: string, data?: any): Promise<axios.AxiosResponse<T>>;
    static delete<T>(path: string): Promise<axios.AxiosResponse<T>>;
}
