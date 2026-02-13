import FamilyPerksAnimation from "@/app/components/FamilyPerksAnimation";

export default function FamilyPerksPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 py-20">
            <div className="text-center">
                <h1 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-white">Family Perks</h1>
                <FamilyPerksAnimation />
            </div>
        </div>
    );
}
