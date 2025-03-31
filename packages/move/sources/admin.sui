module BeaverSocialAdmin {

    use 0x1::Account;
    use 0x1::Cap;
    use BeaverSocial::{User, Post, Comment, register_user, create_post, upgrade_post_to_nft, add_comment, follow_user, unfollow_user, get_user_info, get_post_info, get_comment_info};

    struct AdminCap has store {
        admin: address,
    }

    public fun issue_admin_cap(admin: &mut sender) {
        let admin_cap = AdminCap { admin: *admin };
        move_to(sender, admin_cap);
    }

    public fun is_admin(account: address): bool {
        let admin_cap = borrow_global<AdminCap>(account);
        *admin_cap.admin == account
    }

    public fun create_user_as_admin(admin: &mut sender, user_account: address) {
        assert!(is_admin(*admin), 100);
        register_user(user_account);
    }

    public fun delete_user_as_admin(admin: &mut sender, user_account: address) {
        assert!(is_admin(*admin), 101);
        // Here we would implement user deletion functionality if Move allowed for deleting storage
        // For now, let's assume deletion is just un-registering
        // (or making the user data inaccessible by deleting the resource in the global state).
        // No direct "delete" operation is supported in Move, but we could use other mechanisms.
        // In this case, we could disable access by removing the user's reference from the contract.
    }

    public fun create_post_as_admin(admin: &mut sender, user_account: address, content: string) {
        assert!(is_admin(*admin), 102);
        create_post(user_account, content);
    }

    public fun delete_post_as_admin(admin: &mut sender, post_id: u64) {
        assert!(is_admin(*admin), 103);
        // Post deletion functionality here (like removing post from user's posts list).
        // Again, Move does not directly allow deleting resources, so we'd make the post inaccessible.
        // Delete from the user's list of posts.
    }

    public fun ban_user(admin: &mut sender, user_account: address) {
        assert!(is_admin(*admin), 104);
        // In a real-world scenario, this could flag the user or make their account inactive
        // This is a placeholder function where you could extend your logic.
        // For example, by disabling the ability for this user to interact with the platform.
    }

    public fun view_all_users(admin: &mut sender): vector<address> {
        assert!(is_admin(*admin), 105);
        // Returns all registered user addresses.
        // In practice, storing all addresses in a vector would be inefficient,
        // and we would likely want a more performant storage mechanism for this.
        Vector::empty<address>()  // Placeholder
    }

    public fun view_all_posts(admin: &mut sender): vector<u64> {
        assert!(is_admin(*admin), 106);
        // Returns all posts.
        // As with the user list, we'd typically query all post IDs from the platform.
        Vector::empty<u64>()  // Placeholder
    }

    public fun suspend_user(admin: &mut sender, user_account: address) {
        assert!(is_admin(*admin), 107);
        // In a real scenario, you could flag the user as suspended by adding a field to the user struct.
        // Here, we could add logic to make the user temporarily inaccessible or disable their ability to post.
    }

    public fun transfer_admin_rights(admin: &mut sender, new_admin: address) {
        assert!(is_admin(*admin), 108);
        // Transfer admin rights to another user.
        let new_admin_cap = AdminCap { admin: new_admin };
        move_to(sender, new_admin_cap);
    }

    // Testing functions
    public fun test_issue_admin_cap() {
        let account = address::new();
        issue_admin_cap(&mut account);
        let admin_cap = borrow_global<AdminCap>(account);
        assert!(admin_cap.admin == account, 109);
    }

    public fun test_create_user_as_admin() {
        let account = address::new();
        issue_admin_cap(&mut account);
        let new_user_account = address::new();
        create_user_as_admin(&mut account, new_user_account);
        let user_info = get_user_info(new_user_account);
        assert!(user_info.id == new_user_account, 110);
    }

    public fun test_ban_user() {
        let account = address::new();
        issue_admin_cap(&mut account);
        let user_to_ban = address::new();
        ban_user(&mut account, user_to_ban);
        // Implement ban check here
    }

    public fun test_transfer_admin_rights() {
        let account = address::new();
        issue_admin_cap(&mut account);
        let new_admin = address::new();
        transfer_admin_rights(&mut account, new_admin);
        let new_admin_cap = borrow_global<AdminCap>(new_admin);
        assert!(new_admin_cap.admin == new_admin, 111);
    }
}
