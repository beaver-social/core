// SPDX-License-Identifier: Apache-2.0

module beaver_social::identity_registration;

use std::{
    string
};
use sui::{
    table
};
use suins::suins_registration;

/// Error messages.
const EInvalidOwner: u64 = 0;

public struct IdentityData has store {
    owner: address,
    name: string::String,
    suins_domain_name: Option<string::String>,
    image_url: string::String ,
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
    image_url: string::String,
    about: string::String,
    url: string::String,
    ctx: &mut TxContext,
): IdentityRegistration {
    let sender = tx_context::sender(ctx);

    let identity_data = IdentityData {
        owner: sender,
        name: name,
        suins_domain_name: option::none(),
        image_url: image_url,
        about: about,
        url: url
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

public(package) fun validate_owner(reg: &IdentityRegistration, ctx: &TxContext): bool {
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
public fun new_for_testing(
    name: string::String,
    image_url: string::String,
    about: string::String,
    url: string::String,
    ctx: &mut TxContext
): IdentityRegistration {
    return new(name, image_url, about, url, ctx)
}

#[test_only]
public fun set_expiration_timestamp_ms_for_testing(
    self: &mut SuinsRegistration,
    expiration_timestamp_ms: u64,
) {
    set_expiration_timestamp_ms(self, expiration_timestamp_ms);
}

#[test_only]
public fun update_image_url_for_testing(self: & mut SuinsRegistration, image_url: String) {
    update_image_url(self, image_url);
}

#[test_only]
public fun burn_for_testing(nft: SuinsRegistration) {
    let SuinsRegistration {
        id,
        image_url: _,
        domain: _,
        domain_name: _,
        expiration_timestamp_ms: _,
    } = nft;

    id.delete();
}
