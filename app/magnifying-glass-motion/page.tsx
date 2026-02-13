import MagnifyingGlassMotion from "../components/MagnifyingGlassMotion";
import CommentArea from "@/app/components/CommentArea";

export default function MagnifyingGlassPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 px-4 dark:bg-zinc-900">
      <MagnifyingGlassMotion />
      <div className="w-full max-w-xl mt-12 pb-12">
        <CommentArea slug="magnifying-glass-motion" />
      </div>
    </div>
  );
}
