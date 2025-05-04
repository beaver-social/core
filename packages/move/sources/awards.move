// SPDX-License-Identifier: Apache-2.0

module beaver_social::awards;

use std::{
    string
};
use sui::{
    display,
    package,
    clock,
    table,
    coin,
    sui::SUI,
};
use beaver_social::registry as identity_registry;


/// Constants
const BASE_URL: vector<u8> = b"http://xksgo8ggkwsgooc84o0ok0c8.176.57.188.144.sslip.io";


/// Error messages.
const EInsufficientPayment: u64 = 1001;
const EInvalidAwardType: u64 = 1002;

public struct AwardsData has key, store {
    id: UID,
    award_names: vector<string::String>,
    award_costs: vector<u64>,
    post_awards: table::Table<u64, vector<ID>>,
}

public struct Award has key, store {
    id: UID,
    username: string::String,
    name: string::String,
    created_at: u64,
    recipient: address,
    sender: address,
    post_id: u64
}

public struct AWARDS has drop {}

fun init(otw: AWARDS, ctx: &mut TxContext) {
    let mut award_names = vector::empty<string::String>();
    let mut award_costs = vector::empty<u64>();

    vector::push_back(&mut award_names, b"Gold".to_string());
    vector::push_back(&mut award_costs, 1000);

    vector::push_back(&mut award_names, b"Silver".to_string());
    vector::push_back(&mut award_costs, 500);

    vector::push_back(&mut award_names, b"Bronze".to_string());
    vector::push_back(&mut award_costs, 250);

    let awards_data = AwardsData {
        id: object::new(ctx),
        award_names: award_names,
        award_costs: award_costs,
        post_awards: table::new(ctx)
    };

    let mut url = string::utf8(BASE_URL);
    string::append(&mut url, b"/api/v1/awards/?address={id}".to_string());

    let mut img_url = string::utf8(BASE_URL);
    string::append(&mut img_url, b"/api/v1/awards/nft/img/{id}".to_string());

    let keys = vector[
        b"name".to_string(),
        b"link".to_string(),
        b"image_url".to_string(),
        b"description".to_string(),
        b"project_url".to_string(),
        b"creator".to_string(),
    ];

    let values = vector[
        b"{name} for @{username}".to_string(),
        url,
        img_url,
        b"Gifted by {sender}".to_string(),
        string::utf8(BASE_URL),
        b"Beaver Social".to_string(),
    ];

    let publisher = package::claim(otw, ctx);

    let mut display = display::new_with_fields<Award>(
        &publisher, keys, values, ctx
    );

    // Commit first version of `Display` to apply changes.
    display.update_version();

    transfer::public_transfer(publisher, tx_context::sender(ctx));
    transfer::public_transfer(display, tx_context::sender(ctx));

    transfer::share_object(awards_data);
}

 
/// Public methods

public entry fun gift(
    awards_data: &mut AwardsData,
    registry: &identity_registry::Registry,
    recipient: address,
    award_type: u64,
    payment: coin::Coin<SUI>,
    post_id: u64,
    clock: &clock::Clock,
    ctx: &mut TxContext
) {
    let sender = tx_context::sender(ctx);

    // Validate award type
    assert!(award_type < vector::length(&awards_data.award_names), EInvalidAwardType);

    let award_id = object::new(ctx);
    let award_id_inner = object::uid_to_inner(&award_id);

    let award = Award {
        id: award_id,
        username: identity_registry::username(registry, sender),
        name: awards_data.award_names[award_type],
        created_at: clock.timestamp_ms(),
        recipient: recipient,
        sender: tx_context::sender(ctx),
        post_id: post_id
    };

    if (!table::contains(&awards_data.post_awards, post_id)) {
        table::add(&mut awards_data.post_awards, post_id, vector::empty<ID>());
    };
    let post_award_ids = table::borrow_mut(&mut awards_data.post_awards, post_id);
    vector::push_back(post_award_ids, award_id_inner);

    // Validate payment amount
    assert!(coin::value(&payment) >= awards_data.award_costs[award_type], EInsufficientPayment);

    transfer::public_transfer(payment, sender);
    transfer::transfer(award, recipient);
}


/// Getters


