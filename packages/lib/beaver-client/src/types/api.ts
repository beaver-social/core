import { ApiClient } from "./client";

export type ApiParams<T extends (...args: any) => any> = Parameters<T>[0];

export type ApiResponse<T extends (...args: any) => any> = Awaited<
  ReturnType<Awaited<ReturnType<T>>["json"]>
>["data"];

export type UserInfo = ApiResponse<ApiClient["users"]["$get"]>;
