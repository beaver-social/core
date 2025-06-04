import { useParams } from "react-router";
import { useEffect } from "react";
import Layout from "../layout";
import SecondaryPanel from "../explore/SecondaryPanel";
import ProfileHeader from "./ProfileHeader";
import Tabs from "@/shared/components/Tabs";
import { useScreen } from "@/shared/hooks/useScreen";
import BasicInfo from "./BasicInfo";
import { useBeaver } from "@beaver/react";
import Icon from "@/shared/components/Icon";

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const beaver = useBeaver();
  const {
    data: profile,
    isLoading,
    isSuccess,
  } = beaver.profile.getProfile({
    type: "username",
    value: username || "ishtails",
  });

  const { setScreen } = useScreen();
  useEffect(() => {
    setScreen("profile");
  }, []);

  return (
    <Layout
      main={
        <div className="border mb-10 rounded-t-2xl">
          {isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <Icon name="LoaderCircle" className="size-10 animate-spin" />
            </div>
          ) : isSuccess ? (
            <div>
              <ProfileHeader data={profile} />
              <BasicInfo data={profile} />
              <Tabs />
            </div>
          ) : (
            <div className="flex justify-center items-center h-screen">
              <p className="text-2xl text-gray-500">Error loading profile</p>
            </div>
          )}
        </div>
      }
      secondary={<SecondaryPanel />}
    />
  );
}
