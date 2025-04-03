import { Transaction } from "@mysten/sui/transactions"
import { DefaultC } from "../default";

export class User extends DefaultC {
    constructor(defaultc: ConstructorParameters<typeof DefaultC>) {
        super(...defaultc);

        this.logger.info("User interface instantiated");
    }

    public async buildNewIdentityPTB(options: { username: string }) {
        const tx = new Transaction()
    }
}
