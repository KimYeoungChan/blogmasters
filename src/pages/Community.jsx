import React, { useState } from 'react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { SAMPLE_POSTS } from '../data/mockData';
import { COMMUNITY_CATEGORIES } from '../data/constants';

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  const filteredPosts = SAMPLE_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = !searchKeyword ||
      post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      post.content.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.views - a.views;
      case 'likes':
        return b.likes - a.likes;
      default: // recent
        return new Date(b.date) - new Date(a.date);
    }
  });

  const getCategoryInfo = (categoryId) => {
    return COMMUNITY_CATEGORIES.find(c => c.id === categoryId) || COMMUNITY_CATEGORIES[0];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">💬 커뮤니티</h1>
          <p className="text-gray-600">블로그 마스터즈 회원들과 정보를 공유하고 소통하세요</p>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            {COMMUNITY_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{category.emoji}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Sort */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="게시글 검색..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="recent">최신순</option>
              <option value="popular">인기순</option>
              <option value="likes">좋아요순</option>
            </select>
            <Button>
              + 글쓰기
            </Button>
          </div>
        </Card>

        {selectedPost ? (
          /* Post Detail View */
          <Card>
            <Button variant="outline" onClick={() => setSelectedPost(null)} className="mb-6">
              ← 목록으로
            </Button>

            {/* Post Header */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                {getCategoryInfo(selectedPost.category).emoji}
                <span className="text-sm font-semibold text-primary">
                  {getCategoryInfo(selectedPost.category).name}
                </span>
                {selectedPost.isPinned && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                    📌 공지
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedPost.title}</h1>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {selectedPost.author[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{selectedPost.author}</span>
                        {selectedPost.authorBadge && <Badge type={selectedPost.authorBadge} size="sm" />}
                      </div>
                      <span className="text-sm text-gray-500">{selectedPost.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 text-sm text-gray-500">
                  <span>👁️ {selectedPost.views.toLocaleString()}</span>
                  <span>❤️ {selectedPost.likes}</span>
                  <span>💬 {selectedPost.comments}</span>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selectedPost.content}
              </p>
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-center gap-4 py-6 border-y border-gray-200">
              <Button variant="outline">
                ❤️ 좋아요 {selectedPost.likes}
              </Button>
              <Button variant="outline">
                💬 댓글 {selectedPost.comments}
              </Button>
              <Button variant="outline">
                🔗 공유
              </Button>
            </div>

            {/* Comments Section */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">💬 댓글 {selectedPost.comments}개</h3>

              {/* Comment Form */}
              <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <textarea
                  placeholder="댓글을 입력하세요..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <div className="flex justify-end mt-3">
                  <Button>댓글 작성</Button>
                </div>
              </div>

              {/* Sample Comments */}
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-gray-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        U
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-gray-900">사용자{i}</span>
                          <span className="text-sm text-gray-500">방금 전</span>
                        </div>
                        <p className="text-gray-700">
                          유익한 정보 감사합니다! 저도 이 방법으로 시도해보겠습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ) : (
          /* Post List View */
          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <Card className="text-center py-12">
                <div className="text-6xl mb-4">😢</div>
                <p className="text-gray-600">검색 결과가 없습니다.</p>
              </Card>
            ) : (
              filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  hover
                  className={`cursor-pointer ${post.isPinned ? 'border-2 border-yellow-300' : ''}`}
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Category & Badge */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-primary">
                          {getCategoryInfo(post.category).emoji} {getCategoryInfo(post.category).name}
                        </span>
                        {post.isPinned && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                            📌 공지
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary transition">
                        {post.title}
                      </h3>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {post.author[0]}
                          </div>
                          <span>{post.author}</span>
                          {post.authorBadge && <Badge type={post.authorBadge} size="sm" showName={false} />}
                        </div>
                        <span>•</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>👁️ {post.views.toLocaleString()}</span>
                        <span>•</span>
                        <span>❤️ {post.likes}</span>
                        <span>•</span>
                        <span>💬 {post.comments}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
