"use client";

import CommentArea from "../components/CommentArea";

export default function CommentsPage() {
    return (
        <div className="min-h-screen bg-zinc-50 py-12">
            <div className="max-w-2xl mx-auto px-4 mb-8 text-center">
                <h1 className="text-3xl font-black text-zinc-900 mb-2">Community Discussion</h1>
                <p className="text-zinc-500">Share your thoughts and photos with the community.</p>
            </div>

            <CommentArea slug="comments-page" />

            <div className="fixed bottom-0 left-0 right-0 p-4 text-center text-xs text-zinc-400 pointer-events-none">
                <p>Running in Docker Environment</p>
            </div>
        </div>
    );
}
