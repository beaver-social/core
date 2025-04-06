export interface ShortVideoData {
  id: string;
  videoUrl: string;
  username: string;
  handle: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  avatarUrl: string;
}

// Using videos from a more reliable source for testing
export const sampleShorts: ShortVideoData[] = [
  {
    id: "1",
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    username: "Wildlife Channel",
    handle: "wildlifechannel",
    caption: "A day in the life of a rabbit 🐰 #wildlife #nature #animation",
    likes: 2456,
    comments: 124,
    shares: 56,
    saves: 10,
    avatarUrl: "/images/user.png",
  },
  {
    id: "2",
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    username: "Dream Studio",
    handle: "dreamstudio",
    caption:
      "Our latest animation project! Let me know what you think 🎬 #animation #creative",
    likes: 3782,
    comments: 245,
    shares: 89,
    saves: 10,
    avatarUrl: "/images/user.png",
  },
  {
    id: "3",
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    username: "Tech Reviews",
    handle: "techreviews",
    caption:
      "The future of streaming is here! 📱 #technology #streaming #review",
    likes: 5921,
    comments: 312,
    shares: 154,
    saves: 10,
    avatarUrl: "/images/user.png",
  },
  {
    id: "4",
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    username: "Travel Vibes",
    handle: "travelvibes",
    caption:
      "Planning your next vacation? Here's some inspiration ✈️ #travel #vacation",
    likes: 4287,
    comments: 178,
    shares: 92,
    saves: 10,
    avatarUrl: "/images/user.png",
  },
  {
    id: "5",
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    username: "Game Masters",
    handle: "gamemasters",
    caption: "Gaming on the go has never been better! 🎮 #gaming #mobile #tech",
    likes: 6843,
    comments: 321,
    shares: 210,
    saves: 10,
    avatarUrl: "/images/user.png",
  },
  {
    id: "6",
    videoUrl:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    username: "Car Enthusiast",
    handle: "carlovers",
    caption:
      "Nothing beats a Sunday drive in my favorite car 🚗 #cars #driving #weekend",
    likes: 3248,
    comments: 156,
    shares: 64,
    saves: 10,
    avatarUrl: "/images/user.png",
  },
];
