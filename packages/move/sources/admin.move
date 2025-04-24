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
use beaver_social::posts;


/// Error messages.
const EInvalidAdmin: u64 = 113;
const ECanNotRemovePastAdmin: u64 = 112;

public struct AdminsRecord has key, store {
    id: UID,
    admin_caps: vector<ID>,
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

    let mut admin_record = AdminsRecord {
        id: object::new(ctx),
        admin_caps: vector::empty<ID>()
    };

    vector::push_back(&mut admin_record.admin_caps, object::id(&admin_cap));

    transfer::public_share_object(admin_record);
    transfer::transfer(admin_cap, tx_context::sender(ctx));
}

/// Internal functions
fun validate_admin(cap: &AdminCap, record: &AdminsRecord) {
    let valid: bool = vector::contains(&record.admin_caps, &object::id(cap));
    if(!valid) {
        abort EInvalidAdmin
    };
}


/// Public methods

public entry fun elevate(
    cap: &mut AdminCap,
    record: &mut AdminsRecord,
    receiver: address,
    ctx: &mut TxContext
){
    validate_admin(cap, record);

    cap.accessed = cap.accessed + 1;

    let new_admin_cap = AdminCap {
        id: object::new(ctx),
        accessed: 0
    };

    vector::push_back(&mut record.admin_caps, object::id(&new_admin_cap));

    transfer::transfer(new_admin_cap, receiver); 
}

public entry fun mint_for(
    cap: &mut AdminCap,
    record: &AdminsRecord,
    username: string::String,
    about: string::String,
    registry: &mut registry::Registry,
    receiver: address,
    clock: &clock::Clock,
    ctx: &mut TxContext
){
    validate_admin(cap, record);

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

public entry fun set_posts_validator(
    registry: &mut posts::PostsRegistry,
    new_validator: vector<u8>,
    admin_cap: &AdminCap,
    record: &mut AdminsRecord,
){
    validate_admin(admin_cap, record);
    posts::set_validator(registry, new_validator);
}

public entry fun revoke(
    cap: &mut AdminCap,
    record: &mut AdminsRecord,
    admin_cap_id: ID
) {
    validate_admin(cap, record);

    let (_, index) = vector::index_of(&record.admin_caps, &admin_cap_id);
    let (__, caller_index) = vector::index_of(&record.admin_caps, &object::id(cap));
    
    assert!(caller_index <= index, ECanNotRemovePastAdmin);

    cap.accessed = cap.accessed + 1;

    vector::remove(&mut record.admin_caps, index);
}