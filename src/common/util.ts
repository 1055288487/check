import * as crypto from 'crypto';
export default class {

    public static md5(value: string): string {
        return crypto.createHash('md5').update(value).digest('hex');
    }
    
}