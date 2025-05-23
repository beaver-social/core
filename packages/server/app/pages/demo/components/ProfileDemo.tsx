import { useState } from 'react';
import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/Icon";
import { motion } from "framer-motion";
import { Image } from "@/shared/components/Image";
import { useBeaver } from "@beaver/react";

export default function ProfileDemo() {
    const beaver = useBeaver();
    const user = beaver.user;

    if (!user) {
        return (
            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-medium">User Profile</h2>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">View your profile details</p>
                </div>

                <div className="h-60 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <Icon name="UserX" className="h-12 md:h-16 w-12 md:w-16 text-muted-foreground/30 mb-3" />
                        <p className="text-muted-foreground text-center text-sm md:text-base">
                            Not logged in. Please authenticate to view your profile.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-medium">User Profile</h2>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">Your profile details</p>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4 p-4 border border-gray-200 rounded-lg"
            >
                <div className="flex items-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3 md:mr-4">
                        {user.imageUrl ? (
                            <Image
                                src={user.imageUrl}
                                alt={user.username}
                                className="w-12 h-12 md:w-16 md:h-16 rounded-full"
                            />
                        ) : (
                            <Icon name="User" className="h-6 w-6 md:h-8 md:w-8" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-base md:text-xl font-bold">@{user.username}</h3>
                        {user.fullName && (
                            <p className="text-xs md:text-sm text-muted-foreground">{user.fullName}</p>
                        )}
                        <div className="flex items-center mt-1 text-muted-foreground text-xs md:text-sm">
                            <Icon name="Calendar" className="h-3 w-3 mr-1" />
                            <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                {user.about && (
                    <p className="text-xs md:text-sm text-muted-foreground border-t border-gray-200 pt-4 mt-4">
                        {user.about}
                    </p>
                )}

                {user.identity && (
                    <div className="pt-4 mt-2 border-t border-gray-200">
                        <h4 className="font-medium mb-2 text-sm md:text-base">BeaverIdentity</h4>
                        <p className="font-mono text-xs break-all bg-grey-800/50 p-3 rounded-md">
                            {user.identity}
                        </p>
                    </div>
                )}

                {user.address && (
                    <div className="pt-4 mt-2 border-t border-gray-200">
                        <h4 className="font-medium mb-2 text-sm md:text-base">Wallet Address</h4>
                        <p className="font-mono text-xs break-all bg-grey-800/50 p-3 rounded-md">
                            {user.address}
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
} 