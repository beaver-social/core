import Logger from "../logger";

export default class User {
    /** @hidden */
    // apiClient: apiClient;
    /** @hidden */
    // suiClient: suiClient;
    /** @hidden */
    logger: Logger;

    /** @hidden */
    static CREATE_ERROR = "unable to create profile";
    /** @hidden */
    static UPDATE_ERROR = "unable to update profile";

    /** @hidden */
    constructor(
        // apiClient: apiClient,
        // suiClient: suiClient,
        logger: Logger,
    ) {
        this.logger = logger;
        // this.apiClient = apiClient;
        // this.suiClient = suiClient;
    }

    /**
     * getByID - Retrieves a user based on their id.
     * @param {String} id - The on chain id of the identity object associated with the user.
     * @returns {Promise<any>} - A promise that resolves to the User, or null.
     */
    public async getByID(id: string): Promise<any> {
        // const response = await this.suiClient.get(getProfileByAddress(address));

        // if (
        //     response && response?.data?.users &&
        //     Array.isArray(response?.data?.users)
        // ) {
        //     return response?.data?.users[0];
        // }

        // return null;
    }
}
