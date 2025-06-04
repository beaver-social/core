import { Screen, Tab } from "../shared/types/globalUI";
import Posts from "./profile/content/Posts";
import Replies from "./profile/content/Replies";
import Media from "./profile/content/Media";
import ForYou from "./home/content/ForYou";
import Following from "./home/content/Following";
import Mentioned from "./alerts/content/Mentioned";
import AllAlerts from "./alerts/content/AllAlerts";
import ShortsFeed from "./swipes/SwipeFeed";
import Actions from "./profile/content/Actions";

export const tabContent: Record<Screen, Tab[]> = {
  home: [
    {
      id: "default",
      label: "For you",
      content: <ForYou />,
    },
    {
      id: "following",
      label: "Following",
      content: <Following />,
    },
  ],
  profile: [
    {
      id: "default",
      label: "Posts",
      content: <Posts />,
    },
    {
      id: "replies",
      label: "Replies",
      content: <Replies />,
    },
    {
      id: "media",
      label: "Media",
      content: <Media />,
    },
    {
      id: "actions",
      label: "Actions",
      content: <Actions />,
    },
  ],
  alerts: [
    {
      id: "default",
      label: "All",
      content: <AllAlerts />,
    },
    {
      id: "mentioned",
      label: "Mentioned",
      content: <Mentioned />,
    },
  ],
  messages: [],
  settings: [],
  swipes: [
    {
      id: "default",
      label: "For you",
      content: <ShortsFeed />,
    },
    {
      id: "following",
      label: "Following",
      content: <ShortsFeed />,
    },
  ],
  onboarding: [],
  create: [],
};
