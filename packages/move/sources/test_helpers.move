module beaver_social::test_helpers;

use std::{
    string
};
use sui::{
    clock
};
use suins::{
    suins_registration,
    domain
};

#[test_only]
public(package) fun new_dummy_suins(): suins_registration::SuinsRegistration {
    let mut ctx = tx_context::dummy();
    let clock = clock::create_for_testing(&mut ctx);
    let suins = suins_registration::new_for_testing(
        domain::new(string::utf8(b"test.sui")),
        1,
        &clock,
        &mut ctx
    );

    clock.destroy_for_testing();

    return suins
}