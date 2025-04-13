export const generateSamplePosts = () => {
  return [
    {
      authorId: 1, // Assuming this links to a sample user, e.g., Bruce Wayne
      content:
        "The night in Gotham is full of shadows and secrets. Who will rise to protect the innocent? #Batman",
      parentId: null, // No parent for top-level posts
      isPinned: false,
      viewCount: 150,
      likesCount: 50,
      repliesCount: 10,
      sharesCount: 20,
      repostsCount: 5,
      tags: "Batman, Gotham, Justice",
      mentions: "brucewayne",
      nsfw: false,
      suiAddress:
        "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", // Example from user schema
      actionId: null, // Assuming no specific action for samples
      subscriberOnly: false,
      createdAt: Date.now(), // Sample value for createdAt
      deletedAt: null, // Sample value for deletedAt
    },
    {
      authorId: 2, // e.g., Alfred Pennyworth
      content:
        "A loyal ally is the backbone of any great endeavor. Reflections on service in the shadows of Gotham.",
      parentId: null,
      isPinned: true,
      viewCount: 200,
      likesCount: 60,
      repliesCount: 15,
      sharesCount: 25,
      repostsCount: 10,
      tags: "Batman, Loyalty, Gotham",
      mentions: "alfredpennyworth",
      nsfw: false,
      suiAddress:
        "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
      actionId: null,
      subscriberOnly: false,
      createdAt: Date.now(),
      deletedAt: null,
    },
    {
      authorId: 3, // e.g., James Gordon
      content:
        "Corruption runs deep, but the law will prevail. Standing together against the chaos in Gotham. #CommissionerGordon",
      parentId: null,
      isPinned: false,
      viewCount: 180,
      likesCount: 55,
      repliesCount: 12,
      sharesCount: 18,
      repostsCount: 8,
      tags: "GothamPD, Justice, Batman",
      mentions: "commissionergordon",
      nsfw: false,
      suiAddress:
        "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234",
      actionId: null,
      subscriberOnly: false,
      createdAt: Date.now(),
      deletedAt: null,
    },
    {
      authorId: 4, // e.g., Harley Quinn
      content:
        "Life's a circus, and Gotham's the best show in town! Who's up for some fun and games?",
      parentId: 1, // Reply to the first post
      isPinned: false,
      viewCount: 220,
      likesCount: 70,
      repliesCount: 20,
      sharesCount: 30,
      repostsCount: 15,
      tags: "HarleyQuinn, Chaos, Gotham",
      mentions: "thejoker",
      nsfw: true,
      suiAddress:
        "0x4567890abcdef1234567890abcdef1234567890abcdef1234567890abcde",
      actionId: null,
      subscriberOnly: false,
      createdAt: Date.now(),
      deletedAt: null,
    },
    {
      authorId: 5, // e.g., The Joker
      content:
        "Why so serious? Let's turn Gotham upside down with a smile! My latest prank is just the beginning.",
      parentId: null,
      isPinned: false,
      viewCount: 300,
      likesCount: 40,
      repliesCount: 25,
      sharesCount: 35,
      repostsCount: 20,
      tags: "Joker, Chaos, Gotham",
      mentions: "harleyquinn",
      nsfw: true,
      suiAddress:
        "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
      actionId: null,
      subscriberOnly: false,
      createdAt: Date.now(),
      deletedAt: null,
    },
    {
      authorId: 6, // e.g., Selina Kyle
      content:
        "Stalking the rooftops under the moonlit sky. Gotham's treasures are mine for the taking, but justice calls. #Catwoman",
      parentId: null,
      isPinned: false,
      viewCount: 160,
      likesCount: 45,
      repliesCount: 8,
      sharesCount: 15,
      repostsCount: 6,
      tags: "Catwoman, Gotham, Mystery",
      mentions: "brucewayne",
      nsfw: false,
      suiAddress:
        "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab",
      actionId: null,
      subscriberOnly: false,
      createdAt: Date.now(),
      deletedAt: null,
    },
    {
      authorId: 7, // e.g., Dick Grayson
      content:
        "From the circus to the streets, fighting crime as Nightwing. Bludhaven needs a hero tonight.",
      parentId: 3, // Reply to Gordon's post
      isPinned: true,
      viewCount: 190,
      likesCount: 65,
      repliesCount: 18,
      sharesCount: 22,
      repostsCount: 12,
      tags: "Nightwing, Batman, Heroes",
      mentions: "brucewayne",
      nsfw: false,
      suiAddress:
        "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12",
      actionId: null,
      subscriberOnly: false,
      createdAt: Date.now(),
      deletedAt: null,
    },
    {
      authorId: 8, // e.g., Barbara Gordon
      content:
        "Information is power. Hacking through Gotham's underbelly to expose the truth. #Oracle",
      parentId: null,
      isPinned: false,
      viewCount: 210,
      likesCount: 75,
      repliesCount: 22,
      sharesCount: 28,
      repostsCount: 14,
      tags: "Oracle, Tech, Gotham",
      mentions: "commissionergordon",
      nsfw: false,
      suiAddress:
        "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234",
      actionId: null,
      subscriberOnly: false,
      createdAt: Date.now(),
      deletedAt: null,
    },
    {
      authorId: 9, // e.g., Tim Drake
      content:
        "Strategy and gadgets: the modern way to outsmart villains. Robin's back in action!",
      parentId: 5, // Reply to Joker's post
      isPinned: false,
      viewCount: 170,
      likesCount: 50,
      repliesCount: 14,
      sharesCount: 16,
      repostsCount: 7,
      tags: "Robin, Batman, Strategy",
      mentions: "dickgrayson",
      nsfw: false,
      suiAddress:
        "0x4567890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
      actionId: null,
      subscriberOnly: false,
      createdAt: Date.now(),
      deletedAt: null,
    },
    {
      authorId: 10, // e.g., Damian Wayne
      content:
        "Born into legacy, forged in battle. The new generation of the Bat-family strikes hard.",
      parentId: null,
      isPinned: true,
      viewCount: 240,
      likesCount: 80,
      repliesCount: 30,
      sharesCount: 40,
      repostsCount: 18,
      tags: "DamianWayne, Batman, Legacy",
      mentions: "brucewayne",
      nsfw: false,
      suiAddress:
        "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890a",
      actionId: null,
      subscriberOnly: false,
      createdAt: Date.now(),
      deletedAt: null,
    },
  ];
};
