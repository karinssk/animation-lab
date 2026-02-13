import CongratulationsFoodFound from "../components/CongratulationsFoodFound";
import CommentArea from "@/app/components/CommentArea";

export default function CongratulationsFoodFoundPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 px-4 dark:bg-zinc-900">
            <CongratulationsFoodFound />
            <div className="w-full max-w-xl mt-12 pb-12">
                <CommentArea slug="congratulations-food-found" />
            </div>
        </div>
    );
}
