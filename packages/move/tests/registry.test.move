#[test_only]
module beaver_social::registry_tests;

use std::{
    string,
    option,
};
use sui::{
    tx_context,
    test_scenario,
    clock,
    object,
    transfer,
};
use beaver_social::{
    test_helpers,
    registry::{
        self,
        Registry,
    },
    identity_registration::{
        self,
        IdentityRegistration,
        identity_data,
        username,
        owner
    },
};
use suins::suins_registration;

#[test]
fun test_mint() {
    let sender = @0xA;
    let mut scenario = test_scenario::begin(sender);

    // Create clock for testing
    let mut ctx = test_scenario::ctx(&mut scenario);
    let clock = clock::create_for_testing(&mut ctx);
    
    // Share Registry object
    test_scenario::next_tx(&mut scenario, sender);
    {
        let ctx = test_scenario::ctx(&mut scenario);
        registry::test_init(ctx);
    };
    
    // Mint a new identity
    test_scenario::next_tx(&mut scenario, sender);
    {
        let mut registry = test_scenario::take_shared<Registry>(&scenario);
        let ctx = test_scenario::ctx(&mut scenario);
        
        registry::mint(
            string::utf8(b"user123"),
            string::utf8(b"about me"),
            &mut registry,
            &clock,
            ctx
        );
        
        test_scenario::return_shared(registry);
    };
    
    // Verify the identity was created
    test_scenario::next_tx(&mut scenario, sender);
    {
        let identity = test_scenario::take_from_sender<IdentityRegistration>(&scenario);
        
        assert!(username(&identity) == string::utf8(b"user123"), 0);
        assert!(identity_registration::about(identity_data(&identity)) == string::utf8(b"about me"), 0);
        
        test_scenario::return_to_sender(&scenario, identity);
    };
    
    clock::destroy_for_testing(clock);
    test_scenario::end(scenario);
}

#[test]
fun test_switch_owner() {
    let original_owner = @0xA;
    let new_owner = @0xB;
    
    let mut scenario = test_scenario::begin(original_owner);

    // Create clock for testing
    let mut ctx = test_scenario::ctx(&mut scenario);
    let clock = clock::create_for_testing(&mut ctx);
    
    // Share Registry object
    test_scenario::next_tx(&mut scenario, original_owner);
    {
        let ctx = test_scenario::ctx(&mut scenario);
        registry::test_init(ctx);
    };
    
    // Mint a new identity
    test_scenario::next_tx(&mut scenario, original_owner);
    {
        let mut registry = test_scenario::take_shared<Registry>(&scenario);
        let ctx = test_scenario::ctx(&mut scenario);
        
        registry::mint(
            string::utf8(b"switchtest"),
            string::utf8(b"testing owner switch"),
            &mut registry,
            &clock,
            ctx
        );
        
        test_scenario::return_shared(registry);
    };
    
    // Attach SuiNS to the identity
    test_scenario::next_tx(&mut scenario, original_owner);
    {
        let mut identity = test_scenario::take_from_sender<IdentityRegistration>(&scenario);
        let ctx = test_scenario::ctx(&mut scenario);
        let suins = test_helpers::new_dummy_suins(ctx);
        
        identity_registration::attach_suins(&mut identity, &suins, ctx);
        
        // Return the identity to original owner before next transaction
        test_scenario::return_to_sender(&scenario, identity);
        suins_registration::burn_for_testing(suins);
    };
    
    // Switch to new transaction with the new owner
    test_scenario::next_tx(&mut scenario, new_owner);
    {
        // Create a SuiNS registration for the new owner
        let ctx = test_scenario::ctx(&mut scenario);
        let suins = test_helpers::new_dummy_suins(ctx);
        
        // Switch back to original owner to transfer identity
        test_scenario::next_tx(&mut scenario, original_owner);
        let mut identity = test_scenario::take_from_sender<IdentityRegistration>(&scenario);
        let mut registry = test_scenario::take_shared<Registry>(&scenario);
        let ctx = test_scenario::ctx(&mut scenario);
        
        // Switch owner using the registry
        registry::switch_owner(&mut registry, &mut identity, &suins, &clock, ctx);
        
        // Verify new owner
        assert!(owner(identity_data(&identity)) == new_owner, 0);
        
        test_scenario::return_to_sender(&scenario, identity);
        test_scenario::return_shared(registry);
        suins_registration::burn_for_testing(suins);
    };
    
    clock::destroy_for_testing(clock);
    test_scenario::end(scenario);
}