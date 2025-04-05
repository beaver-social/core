// SPDX-License-Identifier: Apache-2.0

module beaver_social::registry;

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


/// Constants
const MIN_USERNAME_LENGTH: u64 = 3;
const MAX_USERNAME_LENGTH: u64 = 32;


/// Error messages.
const EMissingSuins: u64 = 100;
const EInvalidSuins: u64 = 101;
const EUsernameTaken: u64 = 102;
const EUsernameTooShort: u64 = 103;
const EUsernameTooLong: u64 = 104;
const EAboutTooLong: u64 = 105;
const EIdentityAlreadyMinted: u64 = 106;


public struct Registry has key, store {
    id: UID,
    minters: table::Table<address, bool>,
    owners: table::Table<string::String, address>,
    owner_changes: table::Table<string::String, table::Table<u64, address>>,
}

fun init(ctx: &mut TxContext) {
    let registry = Registry {
        id: object::new(ctx),
        minters: table::new<address, bool>(ctx),
        owners: table::new<string::String, address>(ctx),
        owner_changes: table::new<string::String, table::Table<u64, address>>(ctx),
    };

    transfer::share_object(registry);
}


/// Protected Methods

public(package) fun mint_(
    registry: &mut Registry,
    owner: address,
    username: string::String,
    about: string::String,
    clock: &clock::Clock,
    ctx: &mut TxContext
): IdentityRegistration {
    let username_length = string::length(&username);
    let about_length = string::length(&about);

    assert!(username_length >= MIN_USERNAME_LENGTH, EUsernameTooShort);
    assert!(username_length <= MAX_USERNAME_LENGTH, EUsernameTooLong);
    assert!(about_length <= 255, EAboutTooLong);

    assert!(!table::contains(&registry.minters, owner), EIdentityAlreadyMinted);
    assert!(!table::contains(&registry.owners, username), EUsernameTaken);

    let registration = registration::new(
        username,
        about,
        owner,
        ctx
    );

    table::add(&mut registry.owners, username, owner);

    let mut owner_changes = table::new<u64, address>(ctx);
    table::add(&mut owner_changes, clock.timestamp_ms(), owner);
    table::add(&mut registry.owner_changes, username, owner_changes);

    return registration
}


/// Public Methods

public entry fun switch_owner(
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

public entry fun mint(
    username: string::String,
    about: string::String,
    registry: &mut Registry,
    clock: &clock::Clock,
    ctx: &mut TxContext
) {
    let sender = tx_context::sender(ctx);

    let registration = mint_(registry, sender, username, about, clock, ctx);

    transfer::public_transfer(registration, sender);
}
