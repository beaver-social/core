import { Image } from "@/shared/components/Image";

export function BackgroundEffect() {
    return (
        <div className="relative">
            {/* Dark matte background with subtle texture */}
            <div className="lg:hidden">
                <div className="absolute inset-0 bg-zinc-950 bg-opacity-95" />

                {/* Placeholder for abstract image 1 */}
                <div className="absolute top-10 -left-64 w-[800px] h-[800px] opacity-10 blur-3xl rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 mix-blend-screen" />

                {/* Placeholder for abstract image 2 */}
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] opacity-10 blur-3xl rounded-full bg-gradient-to-r from-rose-500 to-orange-400 mix-blend-screen" />

                {/* Apple-style light leaks */}
                <div
                    className="absolute -top-96 left-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-[0.07] blur-3xl"
                />

                <div
                    className="absolute -bottom-32 right-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-400 opacity-[0.07] blur-3xl"
                />

                <div
                    className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-orange-400 via-rose-400 to-red-500 opacity-[0.07] blur-3xl"
                />
            </div>

            <Image src="/images/landing/4.jpg" alt="Background Effect" className="hidden lg:block absolute w-full inset-0 opacity-20" />
        </div>
    );
} 