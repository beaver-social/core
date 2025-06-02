import Layout from "../../layout";
import EditProfile from "./EditProfile";
import SecondaryPanel from "@/pages/explore/SecondaryPanel";

export default function EditProfilePage() {
    return (
        <Layout
            main={
                <EditProfile />
            }
            secondary={<SecondaryPanel />}
        />
    );
} 