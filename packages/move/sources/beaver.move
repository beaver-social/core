module BeaverSocial {

    struct User has store {
        id: address,
        posts: vector<u64>,
        following: vector<address>,
        followers: vector<address>,
    }

    struct Post has store {
        id: u64,
        creator: address,
        content: string,
        comments: vector<u64>,
        upgraded_to_nft: bool,
    }

    struct Comment has store {
        id: u64,
        post_id: u64,
        creator: address,
        content: string,
    }

    public fun register_user(account: &mut sender) {
        let user = User {
            id: *account,
            posts: Vector::empty<u64>(),
            following: Vector::empty<address>(),
            followers: Vector::empty<address>(),
        };
        move_to(sender, user);
    }

    public fun create_post(account: &mut sender, content: string) {
        let post_id = 0;
        let post = Post {
            id: post_id,
            creator: *account,
            content: content,
            comments: Vector::empty<u64>(),
            upgraded_to_nft: false,
        };
        move_to(sender, post);
        let mut user = borrow_global_mut<User>(sender);
        Vector::push_back(&mut user.posts, post_id);
    }

    public fun upgrade_post_to_nft(account: &mut sender, post_id: u64) {
        let mut post = borrow_global_mut<Post>(post_id);
        assert!(post.creator == *account, 100);
        post.upgraded_to_nft = true;
    }

    public fun add_comment(account: &mut sender, post_id: u64, content: string) {
        let comment_id = 0;
        let comment = Comment {
            id: comment_id,
            post_id: post_id,
            creator: *account,
            content: content,
        };
        move_to(sender, comment);
        let mut post = borrow_global_mut<Post>(post_id);
        Vector::push_back(&mut post.comments, comment_id);
    }

    public fun follow_user(account: &mut sender, user_id: address) {
        let mut user = borrow_global_mut<User>(sender);
        Vector::push_back(&mut user.following, user_id);
        let mut followed_user = borrow_global_mut<User>(user_id);
        Vector::push_back(&mut followed_user.followers, *account);
    }

    public fun unfollow_user(account: &mut sender, user_id: address) {
        let mut user = borrow_global_mut<User>(sender);
        let idx = Vector::position_of(&user.following, &user_id).unwrap();
        Vector::remove(&mut user.following, idx);
        let mut followed_user = borrow_global_mut<User>(user_id);
        let idx = Vector::position_of(&followed_user.followers, &*account).unwrap();
        Vector::remove(&mut followed_user.followers, idx);
    }

    public fun get_user_info(account: address): User {
        borrow_global<User>(account)
    }

    public fun get_post_info(post_id: u64): Post {
        borrow_global<Post>(post_id)
    }

    public fun get_comment_info(comment_id: u64): Comment {
        borrow_global<Comment>(comment_id)
    }

    // Testing functions
    public fun test_register_user() {
        let account = address::new();
        register_user(&mut account);
        let user = get_user_info(account);
        assert!(Vector::length(&user.posts) == 0, 101);
    }

    public fun test_create_post() {
        let account = address::new();
        register_user(&mut account);
        create_post(&mut account, "Hello, world!");
        let user = get_user_info(account);
        let post_id = user.posts[0];
        let post = get_post_info(post_id);
        assert!(post.content == "Hello, world!", 102);
    }

    public fun test_follow_user() {
        let account_1 = address::new();
        let account_2 = address::new();
        register_user(&mut account_1);
        register_user(&mut account_2);
        follow_user(&mut account_1, account_2);
        let user_1 = get_user_info(account_1);
        let user_2 = get_user_info(account_2);
        assert!(Vector::length(&user_1.following) == 1, 103);
        assert!(Vector::length(&user_2.followers) == 1, 104);
    }

    public fun test_unfollow_user() {
        let account_1 = address::new();
        let account_2 = address::new();
        register_user(&mut account_1);
        register_user(&mut account_2);
        follow_user(&mut account_1, account_2);
        unfollow_user(&mut account_1, account_2);
        let user_1 = get_user_info(account_1);
        let user_2 = get_user_info(account_2);
        assert!(Vector::length(&user_1.following) == 0, 105);
        assert!(Vector::length(&user_2.followers) == 0, 106);
    }

    public fun test_add_comment() {
        let account = address::new();
        register_user(&mut account);
        create_post(&mut account, "First post");
        let user = get_user_info(account);
        let post_id = user.posts[0];
        add_comment(&mut account, post_id, "First comment");
        let post = get_post_info(post_id);
        assert!(Vector::length(&post.comments) == 1, 107);
    }

    public fun test_upgrade_post_to_nft() {
        let account = address::new();
        register_user(&mut account);
        create_post(&mut account, "NFT post");
        let user = get_user_info(account);
        let post_id = user.posts[0];
        upgrade_post_to_nft(&mut account, post_id);
        let post = get_post_info(post_id);
        assert!(post.upgraded_to_nft, 108);
    }
}
