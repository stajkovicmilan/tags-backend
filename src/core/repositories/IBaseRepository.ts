export interface IBaseRepository<T> {
    create(Vendor: T): Promise<T>;
    delete(Vendor: T): Promise<boolean>;
    update(Vendor: T): Promise<T>;
    find(query: any): Promise<T[]>;
    findAndSort(query: any, sortQuery?: any, skipLimit?: any): Promise<T[]>;
    findOne(query: any): Promise<T>;
    findAll(): Promise<T[]>;
}
