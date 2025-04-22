#[test_only]
module beaver_social::contracts_tests;

use std::{
    string,
    option,
    vector,
};
use sui::{
    tx_context,
    test_scenario,
};
use beaver_social::{
    test_helpers
};
use beaver_social::identity_registration::{
    identity_data,
    username,
    IdentityRegistration,
    attach_suins,
    suins_domain_name,
    burn,
    new,
    about,
    set_about
};
use suins::{
    suins_registration,
    domain
};


/// Testing

#[test_only]
fun burn_for_testing(reg: IdentityRegistration) {
    burn(reg);
}

#[test_only]
fun new_for_testing(ctx: &mut TxContext): IdentityRegistration {
    return new(
        string::utf8(b"test_user"),
        string::utf8(b"test_about"),
        tx_context::sender(ctx),
        ctx
    )
}

#[test]
fun test_new_identity() {
    let sender = @0xA;
    let mut scenario = test_scenario::begin(sender);

    let ctx = test_scenario::ctx(&mut scenario);

    let reg = new_for_testing(ctx);

    assert!(username(&reg) == string::utf8(b"test_user"), 0);
    assert!(about(identity_data(&reg)) == string::utf8(b"test_about"), 0);

    burn_for_testing(reg);
    test_scenario::end(scenario);
}

#[test]
fun test_attach_suins() {
    let sender = @0xA;
    let mut scenario = test_scenario::begin(sender);

    let mut ctx = test_scenario::ctx(&mut scenario);

    let mut reg = new_for_testing(ctx);
    let suins = test_helpers::new_dummy_suins(ctx);

    attach_suins(&mut reg, &suins, ctx);

    let reg_data = identity_data(&reg);
    let suins_opt = suins_domain_name(reg_data);

    assert!(option::is_some(&suins_opt), 0);
    assert!(option::borrow(&suins_opt) == suins_registration::domain_name(&suins), 0);

    suins_registration::burn_for_testing(suins);
    burn_for_testing(reg);

    test_scenario::end(scenario);
}

#[test]
fun test_set_about() {
    let sender = @0xA;
    let mut scenario = test_scenario::begin(sender);

    // Initialize
    let mut ctx = test_scenario::ctx(&mut scenario);
    let mut reg = new_for_testing(ctx);

    // Verify initial about text
    let reg_data = identity_data(&reg);
    assert!(about(reg_data) == string::utf8(b"test_about"), 0);

    // Change the about text
    let new_about = string::utf8(b"This is my updated about text!");
    set_about(&mut reg, new_about, ctx);

    // Verify the about text was updated
    let updated_reg_data = identity_data(&reg);
    assert!(about(updated_reg_data) == string::utf8(b"This is my updated about text!"), 0);

    burn_for_testing(reg);
    test_scenario::end(scenario);
}

#[test]
#[expected_failure(abort_code = beaver_social::identity_registration::ENewAboutTooLong)]
fun test_set_about_too_long() {
    let sender = @0xA;
    let mut scenario = test_scenario::begin(sender);

    let mut ctx = test_scenario::ctx(&mut scenario);
    let mut reg = new_for_testing(ctx);

    // Create an about text that is too long (> 255 characters)
    let long_text = string::utf8(b"This is an extremely long about text that exceeds the maximum length allowed. It keeps going and going and going with no end in sight. This is absolutely too many characters for an about section according to our smart contract specifications. We need to make sure this gets rejected properly by our validation logic.");
    
    // This should fail with ENewAboutTooLong error
    set_about(&mut reg, long_text, ctx);
    
    // We should not reach this point
    burn_for_testing(reg);
    test_scenario::end(scenario);
}

#[test]
#[expected_failure(abort_code = beaver_social::identity_registration::EInvalidOwner)]
fun test_set_about_invalid_owner() {
    let owner = @0xA;
    let non_owner = @0xB;
    let mut scenario = test_scenario::begin(owner);

    // Create registration under the owner address
    let mut ctx = test_scenario::ctx(&mut scenario);
    let mut reg = new_for_testing(ctx);

    // Switch to non-owner
    test_scenario::next_tx(&mut scenario, non_owner);
    ctx = test_scenario::ctx(&mut scenario);
    
    // This should fail with EInvalidOwner error
    set_about(&mut reg, string::utf8(b"Trying to change about as non-owner"), ctx);
    
    // Should not reach this point
    burn_for_testing(reg);
    test_scenario::end(scenario);
}

// const ENotImplemented: u64 = 0;

// #[test]
// fun test_contracts() {
//     // pass
// }

// #[test, expected_failure(abort_code = ::contracts::contracts_tests::ENotImplemented)]
// fun test_contracts_fail() {
//     abort ENotImplemented
// }
