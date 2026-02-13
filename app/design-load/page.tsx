import DesignLoadAnimation from "@/app/components/DesignLoadAnimation";
import CommentArea from "@/app/components/CommentArea";

export default function DesignLoadPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 py-20">
            <div className="text-center">
                <h1 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-white">DesignLoad</h1>
                <DesignLoadAnimation />
            </div>
            <div className="w-full max-w-xl mt-12">
                <CommentArea slug="design-load" />
            </div>
        </div>
    );
}
