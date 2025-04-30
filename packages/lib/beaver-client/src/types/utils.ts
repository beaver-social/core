export type ApiParams<T extends (...args: any) => any> = Parameters<T>[0];
