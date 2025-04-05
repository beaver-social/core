import { Screen, Tab } from "../shared/types/globalUI";
import Posts from "./profile/content/Posts";
import Replies from "./profile/content/Replies";
import Media from "./profile/content/Media";
import Activity from "./profile/content/Activity";
import ForYou from "./home/content/ForYou";
import Following from "./home/content/Following";
export const tabs: Record<Screen, Tab[]> = {
  home: [
    {
      id: "for-you",
      label: "For you",
      content: (<ForYou />),
    },
    {
      id: "following",
      label: "Following",
      content: (<Following />),
    },
  ],
  profile: [
    {
      id: "posts",
      label: "Posts",
      content: (<Posts />),
    },
    {
      id: "replies",
      label: "Replies",
      content: (<Replies />),
    },
    {
      id: "media",
      label: "Media",
      content: (<Media />),
    },
    {
      id: "activity",
      label: "Activity",
      content: (<Activity />),
    },
  ],
  search: [],
  notifications: [],
  messages: [],
  settings: [],
};