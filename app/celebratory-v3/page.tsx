import CelebarytoryV3 from "../components/CelebarytoryV3";
import CommentArea from "@/app/components/CommentArea";

export default function CelebarytoryV3Page() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 px-4 dark:bg-zinc-900">
            <CelebarytoryV3 />
            <div className="w-full max-w-xl mt-12 pb-12">
                <CommentArea slug="celebratory-v3" />
            </div>
        </div>
    );
}
