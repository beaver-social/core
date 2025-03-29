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
// const ENameNotPointingToAddress: u64 = 1;
// const ENameExpired: u64 = 2;

public struct IdentityRegistration has key {
    id: UID,
    owner: address,
    owner_changes: table::Table<u64, address>,
    name: string::String,
    suins_domain_name: Option<string::String>,
    image_url: string::String ,
    about: string::String,
    url: string::String
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

/// Can only be called by the `registry` module.
public(package) fun create_identity(
    name: string::String,
    image_url: string::String,
    about: string::String,
    url: string::String,
    ctx: &mut TxContext,
): IdentityRegistration {
    let mut identity = IdentityRegistration {
        id: object::new(ctx),
        owner: tx_context::sender(ctx),
        owner_changes: table::new<>(),
        name: name,
        suins_domain_name: option::none(),
        image_url: option::none(),
        about: about,
        url: url
    };
    if (string::length(&image_url) > 0) {
        identity.image_url = option::some(image_url);
    };

    return identity
}

/// Can only be called by the `registry` module.
public(package) fun burn(self: IdentityRegistration) {
    let IdentityRegistration { 
        id,
        owner: _,
        name: _,
        suins_domain_name: _,
        image_url: _,
        about: _,
        url: _,
    } = self;

    id.delete();
}


// === Public methods ===

public entry fun attach_suins(
    self: &mut IdentityRegistration, 
    suins: &suins_registration::SuinsRegistration, 
    ctx: &mut TxContext
) {
    assert!(self.owner == tx_context::sender(ctx), EInvalidOwner);
    self.suins_domain_name = option::some(suins_registration::domain_name(suins)); 
}


// === Getters ===

public fun name(self: &IdentityRegistration): string::String { self.name }

public fun about(self: &IdentityRegistration): string::String { self.about }

public fun url(self: &IdentityRegistration): string::String { self.url }

public fun suins_domain_name(self: &IdentityRegistration): Option<string::String> { self.suins_domain_name }

public fun image_url(self: &IdentityRegistration): Option<string::String> { self.image_url }

public fun uid(self: &IdentityRegistration): &UID { &self.id }

public fun uid_mut(self: &mut IdentityRegistration): &mut UID { &mut self.id }

// === Testing ===

// #[test_only]
// public fun new_for_testing(
//     domain: Domain,
//     no_years: u8,
//     clock: &Clock,
//     ctx: &mut TxContext,
// ): SuinsRegistration {
//     new(domain, no_years, clock, ctx)
// }

// #[test_only]
// public fun set_expiration_timestamp_ms_for_testing(
//     self: &mut SuinsRegistration,
//     expiration_timestamp_ms: u64,
// ) {
//     set_expiration_timestamp_ms(self, expiration_timestamp_ms);
// }

// #[test_only]
// public fun update_image_url_for_testing(self: &mut SuinsRegistration, image_url: String) {
//     update_image_url(self, image_url);
// }

// #[test_only]
// public fun burn_for_testing(nft: SuinsRegistration) {
//     let SuinsRegistration {
//         id,
//         image_url: _,
//         domain: _,
//         domain_name: _,
//         expiration_timestamp_ms: _,
//     } = nft;

//     id.delete();
// }
