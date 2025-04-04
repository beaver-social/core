// SPDX-License-Identifier: Apache-2.0

module beaver_social::admin;

use std::{
    string,
};
use sui::{
    clock,
};
use beaver_social::{
    registry
};

/// Error messages.
const EInvalidAdmin: u64 = 11;

public struct AdminRegistry has key, store {
    id: UID,
    revoked: vector<UID>
}

public struct AdminCap has key, store {
    id: UID,
    accessed: u64
}

fun init(ctx: &mut TxContext) {
    let admin_cap = AdminCap {
        id: object::new(ctx),
        accessed: 0
    };

    transfer::transfer(admin_cap, tx_context::sender(ctx));
}


// Public methods

public entry fun elevate(
    cap: &mut AdminCap,
    receiver: address,
    ctx: &mut TxContext
){
    cap.accessed = cap.accessed + 1;

    let new_admin_cap = AdminCap {
        id: object::new(ctx),
        accessed: 0
    };

    transfer::transfer(new_admin_cap, receiver); 
}

public entry fun mint_for(
    cap: &mut AdminCap,
    username: string::String,
    about: string::String,
    registry: &mut registry::Registry,
    receiver: address,
    clock: &clock::Clock,
    ctx: &mut TxContext
){
    cap.accessed = cap.accessed + 1;

    let registration = registry::mint_(
        registry,
        receiver,
        username,
        about,
        clock,
        ctx
    );

    transfer::public_transfer(registration, receiver);
}
