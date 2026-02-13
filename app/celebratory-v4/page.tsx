import CelebarytoryV4 from "../components/CelebarytoryV4";
import CommentArea from "@/app/components/CommentArea";

export default function CelebarytoryV4Page() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4">
            <CelebarytoryV4 />
            <div className="w-full max-w-xl mt-12 pb-12">
                <CommentArea slug="celebratory-v4" />
            </div>
        </div>
    );
}
