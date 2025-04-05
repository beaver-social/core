import { Screen, Tab } from "../shared/types/globalUI";
import Posts from "./profile/content/Posts";
import Replies from "./profile/content/Replies";
import Media from "./profile/content/Media";
import Activity from "./profile/content/Activity";

export const tabs: Record<Screen, Tab[]> = {
  home: [],
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