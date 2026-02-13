"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Comment {
    id: string;
    text: string;
    image?: string;
    createdAt: string;
}

export default function CommentArea({ slug }: { slug: string }) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [text, setText] = useState("");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch comments on mount
    useEffect(() => {
        if (!slug) return;
        fetch(`/api/comments?slug=${slug}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setComments(data);
            })
            .catch(err => console.error("Failed to load comments", err));
    }, [slug]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim() && !selectedImage) return;

        setIsLoading(true);

        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text,
                    image: selectedImage,
                    slug,
                }),
            });

            if (res.ok) {
                const newComment = await res.json();
                setComments([newComment, ...comments]);
                setText("");
                setSelectedImage(null);
            }
        } catch (error) {
            console.error("Failed to post comment", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        setDeletingCommentId(commentId);

        try {
            const res = await fetch(`/api/comments?id=${encodeURIComponent(commentId)}&slug=${encodeURIComponent(slug)}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setComments((prev) => prev.filter((comment) => comment.id !== commentId));
            }
        } catch (error) {
            console.error("Failed to delete comment", error);
        } finally {
            setDeletingCommentId(null);
        }
    };

    return (
        <section className="max-w-2xl mx-auto mt-14 mb-10 px-4">
            <div className="rounded-3xl border-2 border-zinc-300 bg-zinc-50/95 shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-5 sm:p-6 dark:border-zinc-700 dark:bg-zinc-900/95">
                <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Discussion</h2>

                {/* Input Area */}
                <div className={`bg-white dark:bg-zinc-900 rounded-2xl shadow-md border-2 border-zinc-200 dark:border-zinc-700 p-4 mb-8 transition-opacity ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Write a comment..."
                            className="w-full resize-none bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-400 text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 min-h-[90px]"
                        />

                        {selectedImage && (
                            <div className="relative w-fit">
                                <img
                                    src={selectedImage}
                                    alt="Preview"
                                    className="h-32 w-auto rounded-lg object-cover border border-zinc-200 dark:border-zinc-700"
                                />
                                <button
                                    type="button"
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute -top-2 -right-2 bg-zinc-900 text-white rounded-full p-1 shadow-md hover:bg-zinc-700 transition-colors"
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                        )}

                        <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-3">
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="p-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                                    title="Add Image"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                        <polyline points="21 15 16 10 5 21"></polyline>
                                    </svg>
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!text.trim() && !selectedImage}
                                className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {isLoading ? 'Posting...' : 'Post Comment'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                    <AnimatePresence initial={false} mode="popLayout">
                        {comments.map((comment) => (
                            <motion.div
                                key={comment.id}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                layout
                                className="flex gap-4 p-4 bg-white dark:bg-zinc-900 rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 shadow-sm"
                            >
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                    U
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-baseline justify-between mb-1">
                                    <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">User</span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-zinc-400">
                                            {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteComment(comment.id)}
                                            disabled={deletingCommentId === comment.id}
                                            className="text-xs font-medium text-red-500 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {deletingCommentId === comment.id ? "Deleting..." : "Delete"}
                                        </button>
                                    </div>
                                </div>

                                {comment.text && (
                                    <p className="text-zinc-600 dark:text-zinc-300 text-sm mb-2 break-words">{comment.text}</p>
                                )}

                                {comment.image && (
                                    <img
                                        src={comment.image}
                                        alt="Comment attachment"
                                        className="rounded-lg max-h-60 w-auto object-cover border border-zinc-100 dark:border-zinc-800"
                                    />
                                )}
                            </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {comments.length === 0 && (
                        <div className="text-center py-12 text-zinc-500 dark:text-zinc-400 text-sm bg-white/70 dark:bg-zinc-900/60 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl">
                            No comments yet for this page.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
