import * as React from "react";
import { motion } from "framer-motion";

export function BackgroundEffect() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Dark matte background with subtle texture */}
            <div className="absolute inset-0 bg-zinc-950 bg-opacity-95" />

            {/* Abstract patterns */}
            <div className="absolute inset-0 opacity-[0.02] mix-blend-soft-light">
                <div className="absolute h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMGgzMHYzMEgweiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9nPjwvc3ZnPg==')]" />
            </div>

            {/* Placeholder for abstract image 1 */}
            <div className="absolute top-10 -left-64 w-[800px] h-[800px] opacity-10 blur-3xl rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 mix-blend-screen" />

            {/* Placeholder for abstract image 2 */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] opacity-10 blur-3xl rounded-full bg-gradient-to-r from-rose-500 to-orange-400 mix-blend-screen" />

            {/* Apple-style light leaks */}
            <motion.div
                className="absolute -top-96 left-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-[0.07] blur-3xl"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.04, 0.06, 0.04],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute -bottom-32 right-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-400 opacity-[0.07] blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.03, 0.07, 0.03],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />

            <motion.div
                className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-orange-400 via-rose-400 to-red-500 opacity-[0.07] blur-3xl"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.04, 0.08, 0.04],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
            />

            {/* Subtle noise texture overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-10" />

            {/* Very subtle grid pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMTUpIiBkPSJNMCAwaDYwdjYwSDB6Ii8+PHBhdGggZD0iTTMwIDMwaDMwdjMwSDMwek0wIDBoMzB2MzBIMHoiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMSkiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvZz48L3N2Zz4=')] opacity-20" />
        </div>
    );
} 