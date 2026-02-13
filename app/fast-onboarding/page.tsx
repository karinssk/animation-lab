import FastOnboardingAnimation from "../components/FastOnboardingAnimation";
import CommentArea from "@/app/components/CommentArea";

export default function FastOnboardingPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
            <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
                <FastOnboardingAnimation />
            </div>
            <div className="w-full max-w-xl mt-12">
                <CommentArea slug="fast-onboarding" />
            </div>
        </main>
    );
}
