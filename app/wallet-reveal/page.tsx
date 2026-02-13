import WalletRevealAnimation from "../components/WalletRevealAnimation";
import CommentArea from "@/app/components/CommentArea";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-100">
      <WalletRevealAnimation />
      <div className="w-full max-w-xl mt-12 pb-12">
        <CommentArea slug="wallet-reveal" />
      </div>
    </div>
  );
}
