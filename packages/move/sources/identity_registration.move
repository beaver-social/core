// SPDX-License-Identifier: Apache-2.0

module beaver_social::identity_registration;

use std::{
    string
};
use sui::{
    table
};
use suins::suins_registration;
use beaver_social::test_helpers;

/// Error messages.
const EInvalidOwner: u64 = 0;

public struct IdentityData has store {
    owner: address,
    username: string::String,
    suins_domain_name: Option<string::String>,
    about: string::String,
    url: string::String,
}

public struct IdentityRegistration has key {
    id: UID,
    identity_data: IdentityData,
}

public struct FollowRegistry has key {
    id: UID,
    followers: table::Table<address, vector<address>>,
    following: table::Table<address, vector<address>>
}

fun init(ctx: &mut TxContext) {
    let followRegistry = FollowRegistry{
        id: object::new(ctx),
        followers: table::new<address, vector<address>>(ctx),
        following: table::new<address, vector<address>>(ctx)
    };

    transfer::share_object(followRegistry);
}
 
 
// === Protected methods ===

public(package) fun new(
    name: string::String,
    about: string::String,
    ctx: &mut TxContext,
): IdentityRegistration {
    let sender = tx_context::sender(ctx);

    let identity_data = IdentityData {
        owner: sender,
        suins_domain_name: option::none(),
        about: about,
    };
    
    let identity_registration = IdentityRegistration {
        id: object::new(ctx),
        identity_data: identity_data,
    };

    return identity_registration
}

public(package) fun burn(reg: IdentityRegistration) {
    let IdentityRegistration { id, identity_data: IdentityData { 
        owner: _,
        name: _,
        suins_domain_name: _,
        image_url: _,
        about: _,
        url: _
    } } = reg;
    object::delete(id);
}

public(package) fun is_valid_owner(reg: &IdentityRegistration, ctx: &TxContext): bool {
    return reg.identity_data.owner == tx_context::sender(ctx)
}

public(package) fun set_owner(
    reg: &mut IdentityRegistration,
    new_owner: address
) {
    reg.identity_data.owner = new_owner;
}


// === Public methods ===

public entry fun attach_suins(
    reg: &mut IdentityRegistration, 
    suins: &suins_registration::SuinsRegistration, 
    ctx: &mut TxContext
) {     
    assert!(reg.identity_data.owner == tx_context::sender(ctx), EInvalidOwner);
    reg.identity_data.suins_domain_name = option::some(suins_registration::domain_name(suins)); 
}


// === Getters ===

public fun identity_data(reg: &IdentityRegistration): &IdentityData { &reg.identity_data }

public fun uid(reg: &IdentityRegistration): &UID { &reg.id }

public fun uid_mut(reg: &mut IdentityRegistration): &mut UID { &mut reg.id }

public fun name(data: &IdentityData): string::String { data.name }

public fun about(data: &IdentityData): string::String { data.about }

public fun url(data: &IdentityData): string::String { data.url }

public fun suins_domain_name(data: &IdentityData): Option<string::String> { data.suins_domain_name }

public fun image_url(data: &IdentityData): string::String { data.image_url }


// === Testing ===

#[test_only]
fun burn_for_testing(reg: IdentityRegistration) {
    burn(reg);
}

#[test_only]
fun new_for_testing(ctx: &mut TxContext): IdentityRegistration {
    return new(
        string::utf8(b"name"),
        string::utf8(b"img"),
        string::utf8(b"about"),
        string::utf8(b"example"),
        ctx
    )
}

#[test]
fun test_new_identity() {
    let sender = @0xA;
    let mut scenario = test_scenario::begin(sender);

    let ctx = test_scenario::ctx(&mut scenario);

    let reg = new_for_testing(ctx);

    assert!(reg.identity_data.name == string::utf8(b"name"), 0);
    assert!(reg.identity_data.image_url == string::utf8(b"img"), 0);
    assert!(reg.identity_data.about == string::utf8(b"about"), 0);
    assert!(reg.identity_data.url == string::utf8(b"example"), 0);
    assert!(reg.identity_data.suins_domain_name == option::none(), 0);

    burn_for_testing(reg);
}

#[test]
fun test_attach_suins() {
    let ctx = &mut tx_context::dummy();

    let mut reg = new_for_testing(ctx);
    let suins = test_helpers::new_dummy_suins();

    attach_suins(&mut reg, &suins, ctx);

    let reg_data = identity_data(&reg);
    let suins_opt = suins_domain_name(reg_data);

    assert!(option::is_some(&suins_opt));
    assert!(option::borrow(&suins_opt) == suins_registration::domain_name(&suins), 0);

    suins_registration::burn_for_testing(suins);
    burn_for_testing(reg);
}
