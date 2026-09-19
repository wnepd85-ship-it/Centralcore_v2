import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Users, 
  Check, 
  Layers, 
  Target,
  Zap
} from 'lucide-react';
import { Program, GalleryItem } from '../types';

interface ProgramsPageProps {
  programs: Program[];
  galleryItems: GalleryItem[];
  onSelectProgram: (prog: Program) => void;
  onOpenEquipmentDetail: (item: GalleryItem) => void;
  onNavigateToBooking: (programId?: string) => void;
  onOpenAssessment?: () => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  programs,
  galleryItems,
  onOpenEquipmentDetail,
  onNavigateToBooking
}) => {
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('all');

  const filteredPrograms = programs.filter(p => {
    if (selectedLevelFilter === 'all') return true;
    if (selectedLevelFilter === 'beginner' && (p.level === 'Beginner' || p.level === 'All Levels')) return true;
    if (selectedLevelFilter === 'intermediate' && (p.level === 'Intermediate' || p.level === 'All Levels')) return true;
    if (selectedLevelFilter === 'advanced' && (p.level === 'Advanced' || p.level === 'All Levels')) return true;
    return false;
  });

  return (
    <div className="min-h-screen bg-brand-background text-brand-on-surface">
      {/* 1. Header Banner with clear photo background and warm dark scrim */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-[#241b0b] text-white">
        {/* Ambient Photo Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://postfiles.pstatic.net/MjAyNjA2MjdfMjM2/MDAxNzgyNTUxODUyNDc2.cK0JYKNpHuwLc3nY_GaqAYzXBBGsEZ6V36e2ksdYle8g.fw-ElLF9sxrLqIC2K7yb04RAVOwp_5qCE7MSb7OOGZkg.PNG/ChatGPT_Image_2026%EB%85%84_6%EC%9B%94_27%EC%9D%BC_%EC%98%A4%EC%A0%84_07_36_57.png?type=w3840" 
            alt="Pilates Apparatus Curriculum" 
            className="w-full h-full object-cover brightness-[0.88] contrast-[1.05] scale-[1.02]"
            referrerPolicy="no-referrer"
          />
          {/* Balanced warm dark scrim that keeps the photo vividly visible while ensuring text contrast */}
          <div className="absolute inset-0 bg-[#1a1206]/45"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#241b0b] via-transparent to-[#1a1206]/65"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-[#C4D5DF] font-bold mb-4 inline-block">
              CENTRAL CORE CURRICULUM
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight mb-6">
              정교하게 설계된 <br />
              <span className="font-normal text-[#C4D5DF]">필라테스 프로그램</span>
            </h1>
            <p className="text-sm sm:text-base text-[#E5DDD2] font-light leading-relaxed max-w-2xl mx-auto">
              개인의 신체 역학적 상태와 운동 목적에 맞춰 세분화된 기구 레슨으로,<br className="hidden sm:inline" />
              가장 이상적인 근골격계 밸런스와 심부 코어 힘을 길러드립니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Programs List with Filter */}
      <section className="py-16 lg:py-24 bg-brand-surface border-b border-brand-surface-highest/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-brand-secondary block mb-1">
                ALL COURSES
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-brand-primary">
                정규 코스 상세 안내
              </h2>
            </div>

            {/* Level Filter */}
            <div className="flex gap-2 bg-[#F5EFE6] p-1.5 rounded-xl border border-brand-surface-highest/50">
              {[
                { id: 'all', label: '전체 보기' },
                { id: 'beginner', label: '입문/기초' },
                { id: 'intermediate', label: '중급 정렬' },
                { id: 'advanced', label: '숙련/심화' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedLevelFilter(f.id)}
                  className={`text-xs px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-medium ${
                    selectedLevelFilter === f.id
                      ? 'bg-brand-secondary text-white font-bold shadow-xs'
                      : 'text-brand-on-surface-variant hover:text-brand-primary'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPrograms.map((p) => (
              <div 
                key={p.id}
                className="bg-[#FAF9F6] border border-[#EBEAE5] rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  {/* Aspect Ratio Image Container */}
                  <div className="aspect-[4/3] w-full overflow-hidden relative bg-brand-surface-highest/10">
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] tracking-wider uppercase font-semibold text-[#fbfaf7] bg-brand-secondary px-2.5 py-1 rounded-md shadow-xs">
                        {p.level}
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6">
                    <div className="mb-3">
                      <h3 className="font-serif text-lg sm:text-xl text-brand-primary font-bold group-hover:text-brand-secondary transition-colors">
                        {p.title}
                      </h3>
                      <p className="font-sans text-[11px] sm:text-xs text-brand-secondary/90 mt-0.5 tracking-wider uppercase font-medium">
                        {p.enTitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed whitespace-pre-line min-h-[54px] font-light">
                      {p.description}
                    </p>

                    {/* Key Benefits Taglets */}
                    {p.benefits && (
                      <div className="mt-4 pt-3 border-t border-[#EBEAE5] space-y-1.5">
                        {p.benefits.slice(0, 2).map((b, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-brand-on-surface-variant">
                            <Check className="w-3.5 h-3.5 text-[#aabcc6] shrink-0" />
                            <span className="truncate">{b}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Metadata & Booking Button */}
                <div className="px-6 pb-6 pt-4 border-t border-brand-surface-highest/20 flex justify-between items-center text-brand-on-surface-variant/75 mt-auto">
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="w-3.5 h-3.5 text-brand-secondary" />
                    <span>{p.duration}</span>
                  </div>
                  <button 
                    onClick={() => onNavigateToBooking(p.id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-[#5E5E5E] bg-[#F2F1EC] hover:bg-brand-secondary hover:text-white hover:border-brand-secondary transition-all duration-300 cursor-pointer border border-[#E0DFD8] shadow-2xs"
                  >
                    <span>상담 신청</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Equipment Showcase (Linked Gallery) */}
          <div className="mt-20 pt-16 border-t border-brand-surface-highest/30">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase font-bold tracking-widest text-brand-secondary block mb-2">
                BALANCED BODY APPARATUS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-brand-primary">
                수업에 사용되는 최고급 정품 기구
              </h3>
              <p className="text-xs sm:text-sm text-brand-on-surface-variant mt-2 font-light">
                클릭하시면 각 기구의 특징과 신체 교정 효과를 상세히 확인하실 수 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onOpenEquipmentDetail(item)}
                  className="bg-white border border-[#E8E4DC] rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-all group"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[#34270f] text-[11px] font-bold px-2.5 py-1 rounded-md">
                      {item.title}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-brand-on-surface-variant line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-3 text-[11px] font-semibold text-brand-secondary flex items-center gap-1 group-hover:text-brand-primary transition-colors">
                      <span>상세 스펙 보기</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Counseling CTA Banner */}
          <div className="bg-[#FAF9F6] border border-[#EBEAE5] p-6 sm:p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 mt-16 shadow-2xs">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-14 h-14 rounded-2xl bg-brand-secondary/15 flex items-center justify-center text-brand-secondary shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg sm:text-xl text-brand-primary font-bold">
                  나에게 딱 맞는 프로그램과 기구가 고민되시나요?
                </h4>
                <p className="text-xs sm:text-sm text-brand-on-surface-variant mt-1 leading-relaxed">
                  센트럴코어 전문 상담사가 체형 판독 후 최적의 1:1 커리큘럼을 안내해 드립니다.
                </p>
              </div>
            </div>

            <button 
              onClick={() => onNavigateToBooking()}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#5E5E5E] hover:bg-brand-secondary hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg active:scale-95 shrink-0"
            >
              <span>맞춤 상담 예약하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};
