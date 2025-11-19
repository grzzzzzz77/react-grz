export interface Result<T=any> {
    code: number | string;
    message?: string;
    msg?: string;
    data?: T;
}