import Celebarytory from "../components/Celebarytory";
import CommentArea from "@/app/components/CommentArea";

export default function CelebarytoryPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 px-4 dark:bg-zinc-900">
            <Celebarytory />
            <div className="w-full max-w-xl mt-12 pb-12">
                <CommentArea slug="celebarytory" />
            </div>
        </div>
    );
}
