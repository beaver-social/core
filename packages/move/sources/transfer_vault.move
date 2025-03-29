// SPDX-License-Identifier: Apache-2.0

module beaver_social::transfer_lock;

use std::{
    string,
    dynamic_object_field as dof, 
};
use sui::{
    table
};
use beaver_social::{
    identity_registration as id,
    identity_registration::IdentityRegistration
};

public struct TransferVault has key, store {
    id: UID,
    items : table::Table<string::String, ID>
}

public struct LockedIdentityKey {}

public entry fun lock(identity: IdentityRegistration, vault: &mut TransferVault, ctx: &mut TxContext) {
    let item_id = object::id(&identity);
    table::add(&mut .items, id::suins_domain_name(identity), item_id);
    transfer::transfer(identity, object::id(vault)); 
    dof::add(&mut vault, LockedObjectKey {}, identity);
}
