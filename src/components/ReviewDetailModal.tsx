import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Calendar, Clock, User, ArrowRight, Sparkles } from 'lucide-react';
import { Review } from '../types';

interface ReviewDetailModalProps {
  isOpen: boolean;
  review: Review | null;
  onClose: () => void;
  onNavigateToProgram?: (programName: string) => void;
  onNavigateToBooking?: () => void;
}

export const ReviewDetailModal: React.FC<ReviewDetailModalProps> = ({
  isOpen,
  review,
  onClose,
  onNavigateToProgram,
  onNavigateToBooking
}) => {
  if (!isOpen || !review) return null;

  const maskedName = review.name.length > 2 
    ? review.name.slice(0, 1) + '*' + review.name.slice(2) 
    : review.name.length === 2 
      ? review.name.slice(0, 1) + '*' 
      : review.name;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        id="review-detail-modal-container"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1E1915]/60 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-lg bg-[#FAF7F2] border border-[#E6E0D4] rounded-3xl shadow-2xl overflow-hidden z-10 my-auto"
          id="review-detail-modal"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Decorative Header */}
          <div className="bg-gradient-to-b from-[#EEF4F7] to-[#FAF7F2] px-6 sm:px-8 pt-6 sm:pt-7 pb-4 border-b border-[#ECE6DC] relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#73695E] hover:text-[#241a0b] flex items-center justify-center transition-all border border-[#E2DCD1] cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
              aria-label="닫기"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2.5">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#4D6C7D] border border-[#CDDEE7] shadow-2xs">
                {review.tag}
              </span>
              <span className="text-[11px] font-sans font-medium text-[#7A7166] bg-[#ECE5DA]/60 px-2.5 py-0.5 rounded-full">
                {review.period}
              </span>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 my-2">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1.5 text-xs font-bold text-[#241a0b] font-mono">5.0 / 5.0</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-[#241a0b] font-normal tracking-tight mt-1">
              수강생 후기 상세
            </h3>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
            {/* Quotation & Review Body */}
            <div className="relative bg-white/80 border border-[#EBE5DB] rounded-2xl p-5 sm:p-6 shadow-2xs">
              <div className="text-[#A2BAC7] font-serif text-4xl sm:text-5xl font-bold leading-none -mt-1 mb-2 select-none">
                “
              </div>
              <p className="font-serif text-[15px] sm:text-[16px] text-[#241a0b] leading-[1.8] font-normal select-text whitespace-pre-line">
                {review.content}
              </p>
              <div className="text-[#A2BAC7] font-serif text-4xl sm:text-5xl font-bold leading-none text-right -mb-3 select-none">
                ”
              </div>
            </div>

            {/* Reviewer Details Box */}
            <div className="bg-[#F3EFE9] border border-[#E5DFD4] rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#6B8898]/15 text-[#4D6C7D] flex items-center justify-center font-bold">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-[#241a0b] block text-sm">
                    {maskedName} 회원님
                  </span>
                  <span className="text-[#7A7166] text-[11px] font-sans">
                    작성일: {review.date}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-[#7A7166] block font-light">수강 프로그램</span>
                <span className="font-bold text-[#4D6C7D] text-xs font-sans tracking-wide">
                  {review.programName}
                </span>
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="px-6 sm:px-8 py-4 bg-[#F5F0E8] border-t border-[#ECE5DA] flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#DCD5C9] bg-white text-[#554E46] text-xs sm:text-sm font-semibold hover:bg-[#F2ECE3] transition-colors cursor-pointer"
            >
              닫기
            </button>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              {onNavigateToProgram && (
                <button
                  onClick={() => {
                    onNavigateToProgram(review.programName);
                    onClose();
                  }}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#C5D7E1] bg-[#EEF4F7] text-[#3D5B6C] text-xs sm:text-sm font-semibold hover:bg-[#E3EDF2] transition-colors cursor-pointer"
                >
                  <span>프로그램 소개</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {onNavigateToBooking && (
                <button
                  onClick={() => {
                    onNavigateToBooking();
                    onClose();
                  }}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#554E46] hover:bg-[#3E3832] text-white text-xs sm:text-sm font-semibold transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>상담 예약하기</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
