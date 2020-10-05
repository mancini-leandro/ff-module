export interface IApiResponse<T> {
    data: T;
    error: boolean;
    messages: string[];
}