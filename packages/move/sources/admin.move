// SPDX-License-Identifier: Apache-2.0

module beaver_social::admin;

use std::{
    string,
};
use sui::{
    table,
    clock,
};
use beaver_social::{
    identity_registration as registration,
    identity_registration::{ IdentityRegistration, IdentityData }
};
use suins::suins_registration;

/// Error messages.
const EMissingSuins: u64 = 100;
const EInvalidSuins: u64 = 101;

public struct Registry has key, store {
    id: UID,
    owners: table::Table<string::String, address>,
    owner_changes: table::Table<string::String, table::Table<u64, address>>,
}

fun init(ctx: &mut TxContext) {
    let registry = Registry {
        id: object::new(ctx),
        owners: table::new<string::String, address>(ctx),
        owner_changes: table::new<string::String, table::Table<u64, address>>(ctx),
    };

    transfer::share_object(registry);
}


// === Public methods ===

public entry fun mint(
    registry: &mut Registry,
    username: string::String,
    about: string::String,
    clock: &clock::Clock,
    ctx: &mut TxContext
){
    let sender = tx_context::sender(ctx);

    let registration = registration::new(
        username,
        about,
        ctx
    );

    table::add(&mut registry.owners, username, sender);

    let mut owner_changes = table::new<u64, address>(ctx);
    table::add(&mut owner_changes, clock.timestamp_ms(), sender);
    table::add(&mut registry.owner_changes, username, owner_changes);

    transfer::public_transfer(registration, sender);
}


public entry fun switch_owners(
    registry: &mut Registry,
    identity: &mut IdentityRegistration,
    suins: &suins_registration::SuinsRegistration,
    clock: &clock::Clock,
    ctx: &mut TxContext
) {
    let domain_name: string::String = suins_registration::domain_name(suins);

    let identity_data: &IdentityData = registration::identity_data(identity);
    let reg_domain_name = registration::suins_domain_name(identity_data);
    assert!(option::is_some(&reg_domain_name), EMissingSuins);
    assert!(option::borrow(&reg_domain_name) == &domain_name, EInvalidSuins);

    let sender = tx_context::sender(ctx);
    registration::set_owner(identity, sender);

    let username = registration::username(identity);
    table::add(&mut registry.owners, username, sender);

    let owner_changes = table::borrow_mut(&mut registry.owner_changes, username);
    let now = clock.timestamp_ms();
    table::add(owner_changes, now, sender);
}


