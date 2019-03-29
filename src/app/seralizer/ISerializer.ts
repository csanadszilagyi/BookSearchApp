export interface ISerializer<T> {
    fromJson(json: any): T;
    toJson(obj: T): string;
}
