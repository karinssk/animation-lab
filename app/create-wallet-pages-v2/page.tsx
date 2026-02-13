import WalletAnimationV2 from "../components/WalletAnimationV2";
import CommentArea from "@/app/components/CommentArea";

export default function CreateWalletPageV2() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 px-4 dark:bg-zinc-900">
      <WalletAnimationV2 />
      <div className="w-full max-w-xl mt-12 pb-12">
        <CommentArea slug="create-wallet-pages-v2" />
      </div>
    </div>
  );
}
