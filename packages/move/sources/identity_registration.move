// SPDX-License-Identifier: Apache-2.0

module beaver_social::identity_registration;

use std::{
    string
};
use sui::{
    table,
    display,
    package
};
use suins::suins_registration;

/// Constants
const BASE_URL: vector<u8> = b"http://xksgo8ggkwsgooc84o0ok0c8.176.57.188.144.sslip.io";

/// Error messages.
const EInvalidOwner: u64 = 200;
const ENewAboutTooLong: u64 = 201;

public struct IdentityData has store {
    owner: address,
    suins_domain_name: Option<string::String>,
    about: string::String,
}

public struct IdentityRegistration has key, store {
    id: UID,
    username: string::String,
    identity_data: IdentityData,
}

public struct IDENTITY_REGISTRATION has drop {}

public struct FollowRegistry has key {
    id: UID,
    followers: table::Table<address, vector<address>>,
    following: table::Table<address, vector<address>>
}

fun init(otw: IDENTITY_REGISTRATION,ctx: &mut TxContext) {
    let mut url = string::utf8(BASE_URL);
    string::append(&mut url, b"/api/v1/user/{id}".to_string());

    let mut img_url = string::utf8(BASE_URL);
    string::append(&mut img_url, b"/api/v1/nft/img/{id}".to_string());

    let keys = vector[
        b"name".to_string(),
        b"link".to_string(),
        b"image_url".to_string(),
        b"description".to_string(),
        b"project_url".to_string(),
        b"creator".to_string(),
    ];

    let values = vector[
        b"@{username}".to_string(),
        url,
        img_url,
        b"Beaver Social - The social layer of the decentralized web".to_string(),
        string::utf8(BASE_URL),
        b"Beaver Social".to_string(),
    ];

    let publisher = package::claim(otw, ctx);

    let mut display = display::new_with_fields<IdentityRegistration>(
        &publisher, keys, values, ctx
    );

    // Commit first version of `Display` to apply changes.
    display.update_version();

    transfer::public_transfer(publisher, tx_context::sender(ctx));
    transfer::public_transfer(display, tx_context::sender(ctx));


    let followRegistry = FollowRegistry{
        id: object::new(ctx),
        followers: table::new<address, vector<address>>(ctx),
        following: table::new<address, vector<address>>(ctx)
    };

    transfer::share_object(followRegistry);
}
 
 
/// Protected methods

public(package) fun new(
    username: string::String,
    about: string::String,
    owner: address,
    ctx: &mut TxContext
): IdentityRegistration {
    let identity_data = IdentityData {
        owner: owner,
        suins_domain_name: option::none(),
        about: about,
    };
    
    let identity_registration = IdentityRegistration {
        id: object::new(ctx),
        username: username,
        identity_data: identity_data,
    };

    return identity_registration
}

public(package) fun burn(reg: IdentityRegistration) {
    let IdentityRegistration { 
        id, 
        username: _,
        identity_data: IdentityData { 
            owner: _,
            suins_domain_name: _,
            about: _,
            } 
        } = reg;
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


/// Public methods

public entry fun attach_suins(
    reg: &mut IdentityRegistration, 
    suins: &suins_registration::SuinsRegistration, 
    ctx: &mut TxContext
) {     
    assert!(reg.identity_data.owner == tx_context::sender(ctx), EInvalidOwner);
    reg.identity_data.suins_domain_name = option::some(suins_registration::domain_name(suins)); 
}

public entry fun set_about(
    reg: &mut IdentityRegistration,
    about: string::String,
    ctx: &mut TxContext
) {
    let about_length = string::length(&about);
    assert!(about_length <= 255, ENewAboutTooLong);

    let sender = tx_context::sender(ctx);
    assert!(reg.identity_data.owner == sender, EInvalidOwner);

    reg.identity_data.about = about;
}


/// Getters

public fun identity_data(reg: &IdentityRegistration): &IdentityData { &reg.identity_data }

public fun username(reg: &IdentityRegistration): string::String { reg.username }

public fun uid(reg: &IdentityRegistration): &UID { &reg.id }

public fun uid_mut(reg: &mut IdentityRegistration): &mut UID { &mut reg.id }

public fun about(data: &IdentityData): string::String { data.about }

public fun owner(data: &IdentityData): address { data.owner }

public fun suins_domain_name(data: &IdentityData): Option<string::String> { data.suins_domain_name }
