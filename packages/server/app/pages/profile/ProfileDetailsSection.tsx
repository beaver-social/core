type Props = {
    data: {
        id: string;
        username: string;
        name: string;
        verified: boolean;
        bio: string;
        location: string;
        website: string;
        birthday: string;
        joined: string;
        followers: number;
        following: number;
        profilePicture: string;
        coverPhoto: string;
    }
}

export default function ProfileDetailsSection({ data }: Props) {
    return (
        <div className="border rounded-t-md">
            <div className="relative">
                <img src={data.coverPhoto} alt="Cover" className="w-full h-40 object-cover rounded-t-md" />

                <img src={data.profilePicture} alt="Profile" className="absolute top-28 left-6 size-32 rounded-full border bg-grey-900" />
            </div>
        </div>
    )
}