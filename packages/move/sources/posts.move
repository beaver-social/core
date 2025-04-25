// SPDX-License-Identifier: Apache-2.0

module beaver_social::posts;

use std::{
    string,
};
use sui::{
    table,
    clock,
    // ed25519,
    // dynamic_object_field as dof,
};
use beaver_social::{
    identity_registration,
    identity_registration::{
        IdentityRegistration,
        username,
        owner,
    }
};


/// Constants
const MIN_POST_CONTENT_LENGTH: u64 = 3;
const MAX_POST_CONTENT_LENGTH: u64 = 32;


/// Error messages.
const EInvalidPostLength: u64 = 107;
const EInvalidAuthor: u64 = 109;
// const EInvalidSignature: u64 = 108;


public struct PostsRegistry has key {
    id: UID,
    postid_post: table::Table<u64, Post>,
    validator: vector<u8> // Public key of the validator
}

public struct Post has key, store {
    id: UID,
    post_id: u64,
    content: string::String,
    author: string::String,
    upgraded_at: u64,
    attested: vector<u8>,
}

public struct MY_BEAVER_POSTS has key, store {
    id: UID,
    username: string::String,
    posts: vector<u64>
}

fun init(ctx: &mut TxContext) {
    let registry = PostsRegistry {
        id: object::new(ctx),
        postid_post: table::new<u64, Post>(ctx),
        validator: vector[],
    };

    transfer::share_object(registry);
}


/// Protected methods

public(package) fun set_validator(
    registry: &mut PostsRegistry,
    new_validator: vector<u8>,
) {
    registry.validator = new_validator;
}


/// Public Methods

public entry fun push(
    registry: &mut PostsRegistry,
    identity: &IdentityRegistration,
    author_username: string::String,
    post_id: u64,
    content: string::String,
    attested: vector<u8>,
    collection: &mut MY_BEAVER_POSTS,
    clock: &clock::Clock,
    ctx: &mut TxContext
) {
    assert!(string::length(&content) >= MIN_POST_CONTENT_LENGTH, EInvalidPostLength);
    assert!(string::length(&content) <= MAX_POST_CONTENT_LENGTH, EInvalidPostLength);

    let identity_data = identity_registration::identity_data(identity);
    let author_address = &owner(identity_data);
    assert!(author_address == tx_context::sender(ctx), EInvalidAuthor);
    
    let identity_username = username(identity);
    assert!(identity_username == author_username, EInvalidAuthor);

    // Impleent the signature verification logic here. once we have the signature
    // let msg = x"00";  // We have to derive this from the input parameters
    // let verify = ed25519::ed25519_verify(&attested, &registry.validator, &msg);
    // assert!(verify, EInvalidSignature);

    assert!(collection.username == author_username, EInvalidAuthor);

    let post = Post {
        id: object::new(ctx),
        post_id,
        content,
        author: author_username,
        upgraded_at: clock::timestamp_ms(clock),
        attested
    };

    vector::push_back(&mut collection.posts, post_id);

    table::add(&mut registry.postid_post, post_id, post);
}
