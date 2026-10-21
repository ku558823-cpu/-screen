import React, { useState } from 'react';
import { FeedPost } from '../types';
import { FEED_POSTS } from '../data/mockData';
import { ImageWithFallback } from './ImageWithFallback';
import { Heart, Bookmark, MessageSquare, Share2, Plus, Send, X } from 'lucide-react';

export const FeedScreen: React.FC = () => {
  const [posts, setPosts] = useState<FeedPost[]>(FEED_POSTS);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<{ [key: string]: string }>({});
  const [commentsByPost, setCommentsByPost] = useState<{
    [postId: string]: { id: string; user: string; text: string; time: string }[];
  }>({
    fp1: [
      {
        id: 'c1',
        user: 'Mia Vance',
        text: 'The acoustic dampening curve in your planar model is remarkable.',
        time: '45m ago',
      },
    ],
    fp2: [
      {
        id: 'c2',
        user: 'Liam O’Connor',
        text: 'Clerestory window integration completely changes interior thermal loads.',
        time: '1h ago',
      },
    ],
  });
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newCategory, setNewCategory] = useState('Design Systems');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
  };

  const toggleBookmark = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === postId ? { ...post, isSaved: !post.isSaved } : post))
    );
  };

  const handleAddComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = commentInput[postId]?.trim();
    if (!text) return;

    const newComment = {
      id: `c-${Date.now()}`,
      user: 'You (Lead Architect)',
      text,
      time: 'Just now',
    };

    setCommentsByPost((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));

    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p))
    );

    setCommentInput((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleShare = (postId: string) => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedId(postId);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const newPost: FeedPost = {
      id: `fp-${Date.now()}`,
      authorName: 'You (Studio Member)',
      authorHandle: '@member.studio',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      timestamp: 'Just now',
      category: newCategory,
      title: newTitle,
      content: newContent,
      imageUrl: newImageUrl || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
      likes: 0,
      commentsCount: 0,
      tags: ['Innovation', 'StudioDispatch'],
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setNewImageUrl('');
    setIsNewPostModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Feed Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Design & Architecture Dispatches
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Curated field notes, prototype photography, and mechanical research logs.
          </p>
        </div>

        <button
          onClick={() => setIsNewPostModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Publish Field Dispatch</span>
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-slate-300 transition-colors"
          >
            {/* Author & Header */}
            <div className="p-6 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <ImageWithFallback
                    src={post.authorAvatar}
                    alt={post.authorName}
                    fallbackTitle={post.authorName}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{post.authorName}</div>
                  {/* Zero-Pill unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span>{post.authorHandle}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.timestamp}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(post.id)}
                  title={post.isSaved ? 'Remove from Saved' : 'Save Article'}
                  className={`p-2 rounded-lg border transition-colors ${
                    post.isSaved
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare(post.id)}
                  title="Share dispatch"
                  className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Post Title & Content */}
            <div className="px-6 pb-4 space-y-2">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 text-balance">
                {post.title}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {post.content}
              </p>
            </div>

            {/* Hero Photography Asset (Hotlinked with Zero-Broken-Image Policy) */}
            <div className="aspect-16/9 bg-slate-100 overflow-hidden relative border-y border-slate-100">
              <ImageWithFallback
                src={post.imageUrl}
                alt={post.title}
                fallbackTitle={post.title}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Footer & Interactions */}
            <div className="p-6 pt-4 space-y-4">
              <div className="flex items-center justify-between text-xs">
                {/* Tags (Zero-Pill: Clean unboxed text) */}
                <div className="flex items-center gap-2 text-slate-500">
                  {post.tags.map((tag, idx) => (
                    <React.Fragment key={tag}>
                      <span>#{tag}</span>
                      {idx < post.tags.length - 1 && <span aria-hidden="true">·</span>}
                    </React.Fragment>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 transition-colors font-medium ${
                      post.isLiked ? 'text-rose-600' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-600' : ''}`} />
                    <span className="font-mono tabular-nums">{post.likes}</span>
                  </button>

                  <button
                    onClick={() =>
                      setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)
                    }
                    className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors font-medium"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-mono tabular-nums">{post.commentsCount}</span>
                  </button>
                </div>
              </div>

              {/* Share Toast */}
              {copiedId === post.id && (
                <div className="text-[11px] text-emerald-600 font-medium bg-emerald-50 py-1.5 px-3 rounded border border-emerald-200">
                  Dispatch link copied to clipboard.
                </div>
              )}

              {/* Expandable Comments Drawer */}
              {activeCommentPostId === post.id && (
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <div className="space-y-3">
                    {(commentsByPost[post.id] || []).map((c) => (
                      <div key={c.id} className="text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="flex items-center justify-between text-slate-500 mb-1">
                          <span className="font-semibold text-slate-900">{c.user}</span>
                          <span className="text-[10px]">{c.time}</span>
                        </div>
                        <p className="text-slate-700">{c.text}</p>
                      </div>
                    ))}
                  </div>

                  <form
                    onSubmit={(e) => handleAddComment(post.id, e)}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Add an architectural observation..."
                      value={commentInput[post.id] || ''}
                      onChange={(e) =>
                        setCommentInput({ ...commentInput, [post.id]: e.target.value })
                      }
                      className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-slate-500 bg-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Send className="w-3 h-3" />
                      <span>Post</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* New Post Modal */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Publish Field Dispatch</h3>
              <button
                onClick={() => setIsNewPostModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Dispatch Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Thermal Drift Analysis in Gotland Limestone"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Category / Discipline</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-500 bg-white"
                >
                  <option value="Industrial Design">Industrial Design</option>
                  <option value="Spatial Systems">Spatial Systems</option>
                  <option value="Materials Science">Materials Science</option>
                  <option value="Acoustic Engineering">Acoustic Engineering</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Hotlinked Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Notes / Text</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe empirical observations and metallurgical parameters..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800"
                >
                  Publish Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
