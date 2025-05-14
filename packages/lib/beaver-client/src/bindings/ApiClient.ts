import { hc } from "hono/client";
import Logger from "./Logger";
import type { API } from "server";
import { Api } from "../types/client";

export default class ApiClient {
  private client: Api;
  private logger: Logger;
  private authHeader: { Authorization: `Bearer ${string}` };
  private _baseUrl: string = "https://beaver.xyz/api/v1";

  constructor(logger: Logger) {
    this.logger = logger;
    this.client = this.createClient();
    this.authHeader = { Authorization: "Bearer null" };
    this.logger.info("ApiClient instantiated");
  }

  set baseUrl(url: string) {
    this._baseUrl = url;
    this.client = this.createClient();
  }

  private createClient() {
    return hc<typeof API>(this._baseUrl, {
      headers: () => ({
        ...this.authHeader,
      }),
    });
  }

  get jwtExists() {
    return this.authHeader.Authorization !== "Bearer null";
  }

  get rpc() {
    return this.client;
  }

  setJwt(authToken: string | null) {
    this.authHeader = { Authorization: `Bearer ${authToken}` };
    this.client = this.createClient();
  }
}
