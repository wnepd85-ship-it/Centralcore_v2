import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Star, 
  Quote, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  MessageSquare,
  ArrowRight,
  Filter
} from 'lucide-react';
import { Review } from '../types';
import { ReviewDetailModal } from './ReviewDetailModal';

interface ReviewsPageProps {
  reviews: Review[];
  onOpenWriteReview: () => void;
  onNavigateToBooking: () => void;
  onNavigateToPrograms?: (programName?: string) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({
  reviews,
  onOpenWriteReview,
  onNavigateToBooking,
  onNavigateToPrograms
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedReviewModal, setSelectedReviewModal] = useState<Review | null>(null);
  const itemsPerPage = 6;

  // Extract unique tags
  const tags = ['all', ...Array.from(new Set(reviews.map(r => r.tag)))];

  const filteredReviews = reviews.filter(r => {
    if (selectedTag === 'all') return true;
    return r.tag === selectedTag;
  });

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-brand-background text-brand-on-surface">
      {/* 1. Header Banner with clear photo background and warm dark scrim */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-[#241a0b] text-white">
        {/* Ambient Photo Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://postfiles.pstatic.net/MjAyNjA2MjdfNzAg/MDAxNzgyNTUxODgwMzc1.oS0dq8goHUjeGP-qOj95NIzEhor8ccAdx-nF_GvlViUg.uGF9ZRULOdZrVs0U76XkcYeZkG0rWm6-eZWTzT-1Ft8g.PNG/ChatGPT_Image_2026%EB%85%84_6%EC%9B%94_27%EC%9D%BC_%EC%98%A4%ED%9B%84_05_10_17.png?type=w3840" 
            alt="Central Core Pilates Community & Reviews" 
            className="w-full h-full object-cover brightness-[0.88] contrast-[1.05] scale-[1.02]"
            referrerPolicy="no-referrer"
          />
          {/* Balanced warm dark scrim that keeps the photo vividly visible while ensuring text contrast */}
          <div className="absolute inset-0 bg-[#1a1106]/45"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#241a0b] via-transparent to-[#1a1106]/65"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-[#C4D5DF] font-bold mb-4 inline-block">
              GENUINE EXPERIENCES
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight mb-6">
              수강생들의 <br />
              <span className="font-normal text-[#C4D5DF]">솔직한 변화 후기</span>
            </h1>
            <p className="text-sm sm:text-base text-[#E5DDD2] font-light leading-relaxed max-w-2xl mx-auto">
              중심부 깊은 정렬부터 달라진 회원님들의 생생한 체험 이야기입니다.<br className="hidden sm:inline" />
              센트럴 코어 필라테스와 함께 삶의 새로운 정렬을 되찾은 실제 후기를 만나보세요.
            </p>

            {/* Quick action */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={onOpenWriteReview}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/15 hover:bg-white text-white hover:text-brand-primary backdrop-blur-md border border-white/30 text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer group"
              >
                <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
                <span>솔직한 수강 후기 남기기</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Review List & Tags */}
      <section className="py-16 lg:py-24 bg-brand-surface border-b border-brand-surface-highest/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Tag Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-brand-surface-highest/30">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand-secondary" />
              <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">주제별 후기 보기:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag(tag);
                    setCurrentPage(1);
                  }}
                  className={`text-xs px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
                    selectedTag === tag
                      ? 'bg-brand-secondary text-white font-bold shadow-xs'
                      : 'bg-[#FAF9F6] border border-[#EBEAE5] text-brand-on-surface-variant hover:text-brand-primary hover:border-brand-secondary'
                  }`}
                >
                  {tag === 'all' ? '전체 후기' : tag}
                </button>
              ))}
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {currentReviews.map((r, idx) => {
              const isHighlighted = idx % 3 === 1;
              return (
                <div 
                  key={r.id}
                  onClick={() => setSelectedReviewModal(r)}
                  className={`rounded-t-[120px] sm:rounded-t-[150px] rounded-b-[20px] sm:rounded-b-[24px] border pt-8 sm:pt-9 px-6 sm:px-7 pb-5 sm:pb-6 flex flex-col justify-between min-h-[300px] sm:min-h-[315px] transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer group ${
                    isHighlighted
                      ? 'bg-[#EEF4F7] border-[#D4E2E9] shadow-[0_4px_20px_rgba(107,136,151,0.08)]'
                      : 'bg-white/95 border-[#E6E0D4] shadow-[0_2px_12px_rgba(0,0,0,0.02)]'
                  }`}
                >
                  <div>
                    {/* 5 Stars Centered */}
                    <div className="flex justify-center items-center gap-1 mb-2.5">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {/* Category Tag Pill Centered */}
                    <div className="flex justify-center mb-3.5">
                      <span className={`inline-flex items-center px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold shadow-2xs border transition-colors ${
                        isHighlighted
                          ? 'bg-white/90 text-[#4D6C7D] border-[#CDDEE7]'
                          : 'bg-[#F0F4F7] text-[#557181] border-[#DBE6ED]'
                      }`}>
                        {r.tag}
                      </span>
                    </div>

                    {/* Quotation Mark */}
                    <div className="text-[#9CB4C2] font-serif text-2xl sm:text-3xl font-bold leading-none mb-1.5 select-none">
                      “
                    </div>

                    {/* Review Content - Strictly 2-3 lines */}
                    <p className="font-serif italic text-[14px] sm:text-[15px] text-[#241a0b] leading-[1.65] font-normal line-clamp-3 mb-2 select-text group-hover:text-[#181207] transition-colors">
                      {r.shortContent || `“${r.content}”`}
                    </p>

                    {/* Click affordance */}
                    <div className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-[#6B8898] group-hover:text-[#241a0b] transition-colors mb-1">
                      <span>전체 후기 보기</span>
                      <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* User Info & Program Link */}
                  <div className={`pt-3.5 border-t flex items-end justify-between gap-3 ${
                    isHighlighted ? 'border-[#D6E3EA]' : 'border-[#ECE6DC]'
                  }`}>
                    <div>
                      <span className="text-sm font-bold text-[#241a0b] block">
                        {r.name.length > 2 
                          ? r.name.slice(0, 1) + '*' + r.name.slice(2) 
                          : r.name.length === 2 
                            ? r.name.slice(0, 1) + '*' 
                            : r.name} <span className="text-xs text-[#7A7166] font-normal">회원님</span>
                      </span>
                      <span className="text-xs text-[#82786D] font-light block mt-0.5">
                        {r.period}
                      </span>
                    </div>
                    
                    <span className="text-[11px] font-bold font-sans tracking-wider text-[#698897] uppercase flex items-center gap-1.5 shrink-0">
                      <span>{r.programEnName || r.programName.toUpperCase()}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-brand-surface-highest/40 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-surface-low transition-colors"
                aria-label="이전 페이지"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentPage === idx + 1
                      ? 'bg-brand-secondary text-white shadow-xs'
                      : 'bg-white border border-brand-surface-highest/40 text-brand-on-surface hover:bg-brand-surface-low'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-brand-surface-highest/40 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-brand-surface-low transition-colors"
                aria-label="다음 페이지"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Bottom Consultation CTA Banner */}
          <div className="bg-[#FAF8F5] border border-[#E8E4DC] p-6 sm:p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 mt-16 shadow-2xs">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-14 h-14 rounded-2xl bg-brand-secondary/15 flex items-center justify-center text-brand-secondary shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg sm:text-xl text-brand-primary font-bold">
                  나만의 변화를 시작할 준비가 되셨나요?
                </h4>
                <p className="text-xs sm:text-sm text-brand-on-surface-variant mt-1 leading-relaxed">
                  센트럴코어의 전문 상담과 함께 통증 없는 건강한 움직임을 경험해 보세요.
                </p>
              </div>
            </div>

            <button 
              onClick={onNavigateToBooking}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#5E5E5E] hover:bg-brand-secondary hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg active:scale-95 shrink-0"
            >
              <span>맞춤 상담 예약하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Review Detail Popup Modal */}
      <ReviewDetailModal
        isOpen={!!selectedReviewModal}
        review={selectedReviewModal}
        onClose={() => setSelectedReviewModal(null)}
        onNavigateToProgram={(programName) => {
          if (onNavigateToPrograms) {
            onNavigateToPrograms(programName);
          }
        }}
        onNavigateToBooking={onNavigateToBooking}
      />
    </div>
  );
};
