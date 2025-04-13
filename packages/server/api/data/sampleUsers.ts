export const generateSampleUsers = () => {
  return [
    {
      identity:
        "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", // Example Sui address
      username: "brucewayne",
      fullName: "Bruce Wayne",
      about:
        "Billionaire philanthropist and CEO of Wayne Enterprises, dedicated to fighting crime in Gotham.",
      imageUrl: "https://example.com/brucewayne.jpg",
      bannerUrl: "https://example.com/wayneenterprises.jpg",
      address:
        "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      suinsDomainName: "brucewayne.sui",
      email: "bruce.wayne@wayneenterprises.com",
      isVerified: true,
      timezone: 0, // UTC timezone
      pinnedPost: null,
      pinnedShort: null,
    },
    {
      identity:
        "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
      username: "alfredpennyworth",
      fullName: "Alfred Pennyworth",
      about:
        "Loyal butler and guardian to the Wayne family, providing strategic support and wisdom.",
      imageUrl: "https://example.com/alfredpennyworth.jpg",
      bannerUrl: "https://example.com/wayneestate.jpg",
      address:
        "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
      suinsDomainName: "alfredpennyworth.sui",
      email: "alfred.pennyworth@wayneenterprises.com",
      isVerified: true,
      timezone: -5, // Eastern Standard Time
      pinnedPost: null,
      pinnedShort: null,
    },
    {
      identity:
        "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234",
      username: "commissionergordon",
      fullName: "James Gordon",
      about:
        "Dedicated police commissioner of Gotham City, ally in the fight against corruption and crime.",
      imageUrl: "https://example.com/jamesgordon.jpg",
      bannerUrl: "https://example.com/gothampd.jpg",
      address:
        "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234",
      suinsDomainName: "commissionergordon.sui",
      email: "james.gordon@gothampd.com",
      isVerified: true,
      timezone: 8, // China Standard Time
      pinnedPost: null,
      pinnedShort: null,
    },
    {
      identity:
        "0x4567890abcdef1234567890abcdef1234567890abcdef1234567890abcde",
      username: "harleyquinn",
      fullName: "Harleen Quinzel",
      about:
        "Former psychiatrist turned anti-hero, known for her unpredictable charm and acrobatic skills.",
      imageUrl: "https://example.com/harleyquinn.jpg",
      bannerUrl: "https://example.com/gothamunderworld.jpg",
      address: "0x4567890abcdef1234567890abcdef1234567890abcdef1234567890abcde",
      suinsDomainName: "harleyquinn.sui",
      email: "harleen.quinzel@gotham.com",
      isVerified: false,
      timezone: 1, // Central European Time
      pinnedPost: null,
      pinnedShort: null,
    },
    {
      identity:
        "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
      username: "thejoker",
      fullName: "Jack Napier",
      about:
        "Infamous agent of chaos in Gotham, mastermind behind elaborate schemes and heists.",
      imageUrl: "https://example.com/thejoker.jpg",
      bannerUrl: "https://example.com/chaosinc.jpg",
      address: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
      suinsDomainName: "thejoker.sui",
      email: "jack.napier@gotham.com",
      isVerified: false,
      timezone: -8, // Pacific Standard Time
      pinnedPost: null,
      pinnedShort: null,
    },
    {
      identity:
        "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab",
      username: "selinakyle",
      fullName: "Selina Kyle",
      about:
        "Enigmatic cat burglar and vigilante, balancing theft with a code of honor in Gotham.",
      imageUrl: "https://example.com/selinakyle.jpg",
      bannerUrl: "https://example.com/catwomanlair.jpg",
      address: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab",
      suinsDomainName: "selinakyle.sui",
      email: "selina.kyle@gotham.com",
      isVerified: true,
      timezone: 5, // India Standard Time
      pinnedPost: null,
      pinnedShort: null,
    },
    {
      identity:
        "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12",
      username: "dickgrayson",
      fullName: "Dick Grayson",
      about:
        "Acrobatic vigilante and former Robin, now protecting Bludhaven as Nightwing.",
      imageUrl: "https://example.com/dickgrayson.jpg",
      bannerUrl: "https://example.com/nightwinghq.jpg",
      address: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12",
      suinsDomainName: "dickgrayson.sui",
      email: "dick.grayson@bludhaven.com",
      isVerified: true,
      timezone: 2, // Eastern European Time
      pinnedPost: null,
      pinnedShort: null,
    },
    {
      identity: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234",
      username: "barbaragordon",
      fullName: "Barbara Gordon",
      about:
        "Tech-savvy information broker and former Batgirl, fighting crime through intelligence.",
      imageUrl: "https://example.com/barbaragordon.jpg",
      bannerUrl: "https://example.com/oracleops.jpg",
      address: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234",
      suinsDomainName: "barbaragordon.sui",
      email: "barbara.gordon@gotham.com",
      isVerified: false,
      timezone: 9, // Japan Standard Time
      pinnedPost: null,
      pinnedShort: null,
    },
    {
      identity: "0x4567890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
      username: "timdrake",
      fullName: "Tim Drake",
      about:
        "Brilliant detective and current Robin, using strategy and gadgets to aid Batman.",
      imageUrl: "https://example.com/timdrake.jpg",
      bannerUrl: "https://example.com/robinhq.jpg",
      address: "0x4567890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
      suinsDomainName: "timdrake.sui",
      email: "tim.drake@gotham.com",
      isVerified: true,
      timezone: -6, // Central Standard Time
      pinnedPost: null,
      pinnedShort: null,
    },
    {
      identity: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890a",
      username: "damianwayne",
      fullName: "Damian Wayne",
      about:
        "Trained assassin and son of Batman, striving to prove himself as a hero in Gotham.",
      imageUrl: "https://example.com/damianwayne.jpg",
      bannerUrl: "https://example.com/batfamily.jpg",
      address: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890a",
      suinsDomainName: "damianwayne.sui",
      email: "damian.wayne@gotham.com",
      isVerified: false,
      timezone: 10, // Australian Eastern Time
      pinnedPost: null,
      pinnedShort: null,
    },
  ];
};
