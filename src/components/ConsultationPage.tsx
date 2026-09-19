import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Check, 
  ChevronRight, 
  ChevronDown, 
  ZoomIn, 
  Loader2,
  Calendar,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Plus,
  Pencil,
  Trash2,
  HelpCircle,
  RotateCcw,
  X,
  AlertCircle
} from 'lucide-react';
import { FaqItem } from '../types';

interface ConsultationPageProps {
  customerName: string;
  setCustomerName: (v: string) => void;
  customerPhone: string;
  setCustomerPhone: (v: string) => void;
  clientEmail: string;
  setClientEmail: (v: string) => void;
  consultationTime: string;
  setConsultationTime: (v: string) => void;
  bookingNotes: string;
  setBookingNotes: (v: string) => void;
  isSubmittingConsultation: boolean;
  consultationSubmitted: boolean;
  handleConsultationSubmit: (e: React.FormEvent) => void;
  handleResetConsultation: () => void;
  setShowLocationModal: (v: boolean) => void;
  // FAQ Management Props
  faqs?: FaqItem[];
  isAdmin?: boolean;
  onAddFaq?: (faq: Omit<FaqItem, 'id' | 'createdAt'>) => Promise<void> | void;
  onUpdateFaq?: (id: string, faq: Partial<FaqItem>) => Promise<void> | void;
  onDeleteFaq?: (id: string) => Promise<void> | void;
  onResetFaqs?: () => Promise<void> | void;
}

export const ConsultationPage: React.FC<ConsultationPageProps> = ({
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  clientEmail,
  setClientEmail,
  consultationTime,
  setConsultationTime,
  bookingNotes,
  setBookingNotes,
  isSubmittingConsultation,
  consultationSubmitted,
  handleConsultationSubmit,
  handleResetConsultation,
  setShowLocationModal,
  faqs = [],
  isAdmin = false,
  onAddFaq,
  onUpdateFaq,
  onDeleteFaq,
  onResetFaqs
}) => {
  // FAQ Management State
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('전체');
  const [faqModalMode, setFaqModalMode] = useState<'add' | 'edit' | null>(null);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [formQuestion, setFormQuestion] = useState('');
  const [formAnswer, setFormAnswer] = useState('');
  const [formCategory, setFormCategory] = useState('상담 및 등록');
  const [formOrder, setFormOrder] = useState<number>(1);
  const [isSavingFaq, setIsSavingFaq] = useState(false);
  const [faqActionSuccess, setFaqActionSuccess] = useState<string | null>(null);

  // Extract unique categories
  const categories = ['전체', ...Array.from(new Set(faqs.map(f => f.category || '기타')))];

  const handleOpenAddModal = () => {
    setEditingFaq(null);
    setFormQuestion('');
    setFormAnswer('');
    setFormCategory('상담 및 등록');
    setFormOrder(faqs.length + 1);
    setFaqModalMode('add');
  };

  const handleOpenEditModal = (faq: FaqItem) => {
    setEditingFaq(faq);
    setFormQuestion(faq.question);
    setFormAnswer(faq.answer);
    setFormCategory(faq.category || '상담 및 등록');
    setFormOrder(faq.order ?? 1);
    setFaqModalMode('edit');
  };

  const handleCloseModal = () => {
    setFaqModalMode(null);
    setEditingFaq(null);
  };

  const handleSaveFaqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestion.trim() || !formAnswer.trim()) {
      alert('질문과 답변 내용을 모두 입력해주세요.');
      return;
    }

    setIsSavingFaq(true);
    try {
      if (faqModalMode === 'add') {
        if (onAddFaq) {
          await onAddFaq({
            question: formQuestion.trim(),
            answer: formAnswer.trim(),
            category: formCategory.trim() || '상담 및 등록',
            order: Number(formOrder) || faqs.length + 1
          });
        }
        setFaqActionSuccess('새 질문이 성공적으로 등록되었습니다.');
      } else if (faqModalMode === 'edit' && editingFaq) {
        if (onUpdateFaq) {
          await onUpdateFaq(editingFaq.id, {
            question: formQuestion.trim(),
            answer: formAnswer.trim(),
            category: formCategory.trim() || '상담 및 등록',
            order: Number(formOrder) || 1
          });
        }
        setFaqActionSuccess('질문 내용이 성공적으로 수정되었습니다.');
      }
      handleCloseModal();
      setTimeout(() => setFaqActionSuccess(null), 3500);
    } catch (err: any) {
      alert(`오류가 발생했습니다: ${err?.message || '잠시 후 다시 시도해주세요.'}`);
    } finally {
      setIsSavingFaq(false);
    }
  };

  const handleDeleteFaqClick = async (faq: FaqItem) => {
    if (confirm(`"${faq.question}" 질문을 정말로 삭제하시겠습니까?`)) {
      if (onDeleteFaq) {
        await onDeleteFaq(faq.id);
        setFaqActionSuccess('질문이 삭제되었습니다.');
        setTimeout(() => setFaqActionSuccess(null), 3000);
      }
    }
  };

  const handleResetFaqsClick = async () => {
    if (confirm('자주 묻는 질문을 초기 기본 질문 목록으로 복원하시겠습니까? (기존 수정 내용은 초기화됩니다)')) {
      if (onResetFaqs) {
        await onResetFaqs();
        setFaqActionSuccess('기본 질문 목록으로 복원되었습니다.');
        setTimeout(() => setFaqActionSuccess(null), 3000);
      }
    }
  };

  // Filter and sort FAQs
  const displayedFaqs = faqs
    .filter(f => activeFaqCategory === '전체' || (f.category || '기타') === activeFaqCategory)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  return (
    <div className="min-h-screen bg-brand-background text-brand-on-surface">
      {/* 1. Header Banner with clear photo background and warm dark scrim */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-[#241a0b] text-white">
        {/* Ambient Photo Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://postfiles.pstatic.net/MjAyNjA2MjdfMTcx/MDAxNzgyNTcxNjYwMjEz.9Tsb6y_Lh_NwB9A8vp--3ivRfde6Wh63TXRboJ4Yjusg.sEv0-Ohn0lphKVy9Kb3k5GUghiOdzn1oLO0RtEVKbKIg.PNG/ChatGPT_Image_2026%EB%85%84_6%EC%9B%94_27%EC%9D%BC_%EC%98%A4%ED%9B%84_10_46_43.png?type=w3840" 
            alt="Central Core Private Consultation" 
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
              PRIVATE CONSULTATION
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight mb-6">
              센트럴코어와 함께 <br />
              <span className="font-normal text-[#C4D5DF]">당신의 가치를 찾으세요</span>
            </h1>
            <p className="text-sm sm:text-base text-[#E5DDD2] font-light leading-relaxed max-w-2xl mx-auto">
              전문 상담사가 고객님의 신체 상태와 운동 목표를 세심하게 분석하여 <br className="hidden sm:inline" />
              가장 최적화된 맞춤 프로그램을 제안해 드립니다. 편하신 시간에 맞춰 전문 상담을 경험해 보세요.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Consultation Section (Maintains the exact requested styling: #413723 background, #FAF8F5 cards, #aabcc6 points) */}
      <section className="py-16 lg:py-24 bg-[#413723] text-[#FAF8F5] relative border-t border-[#AABCC6]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            
            {/* LEFT COLUMN: Headings, Contact info, Address, Map Display */}
            <div className="lg:col-span-6 flex flex-col h-full space-y-6">
              <div className="shrink-0">
                <span className="text-[11px] font-bold tracking-[0.25em] text-[#C2D1DB] uppercase block mb-3 font-sans">
                  CONSULTATION
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#FAF8F5] leading-[1.28] tracking-tight font-serif">
                  센트럴코어와 함께<br />
                  당신의 가치를 찾으세요
                </h2>
                <p className="text-sm sm:text-base text-[#FAF8F5]/90 leading-relaxed max-w-lg mt-3.5 font-light">
                  전문 상담사가 고객님의 신체 상태와 운동 목표를 세심하게 분석하여 가장 최적화된 맞춤 프로그램을 제안해 드립니다. 편하신 시간에 맞춰 전문 상담을 경험해 보세요.
                </p>
              </div>

              {/* Contact Cards: 대표전화 & 주소 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 shrink-0">
                {/* Phone */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC] shadow-sm flex items-start gap-3.5 hover:border-[#AABCC6] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#AABCC6]/20 flex items-center justify-center text-[#aabcc6] shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-[#aabcc6]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-semibold text-[#8C827A] uppercase tracking-wider block">대표 상담 전화</span>
                    <a href="tel:02-540-3000" className="text-base font-bold text-[#34270f] hover:text-[#aabcc6] transition-colors block truncate">
                      02-540-3000
                    </a>
                    <span className="text-[11px] text-[#6E665F] block mt-0.5">
                      평일 09:00 - 22:00 / 토 10:00 - 16:00
                    </span>
                  </div>
                </div>

                {/* Address */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC] shadow-sm flex items-start gap-3.5 hover:border-[#AABCC6] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#AABCC6]/20 flex items-center justify-center text-[#aabcc6] shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[#aabcc6]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-semibold text-[#8C827A] uppercase tracking-wider block">스튜디오 위치</span>
                    <span className="text-sm font-bold text-[#34270f] block truncate">
                      강남구 학동로 420 (4층)
                    </span>
                    <span className="text-[11px] text-[#6E665F] block mt-0.5">
                      청담역 9번 출구 도보 3분 · 무료 발렛
                    </span>
                  </div>
                </div>
              </div>

              {/* Map Display Card ("지도표시") */}
              <div className="flex-1 flex flex-col justify-between rounded-3xl bg-[#FAF8F5] border border-[#E8E4DC] p-6 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between mb-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#aabcc6] shadow-[0_0_8px_#aabcc6] animate-pulse" />
                    <span className="text-xs font-bold text-[#34270f] tracking-tight">청담 본점 위치 및 오시는 길</span>
                  </div>
                  <span className="text-[10px] bg-[#EAE6DE] text-[#4C463C] px-2.5 py-1 rounded-full font-medium border border-[#DCD6CA]">
                    7호선 청담역 9번 출구 도보 3분
                  </span>
                </div>

                {/* Interactive Map Canvas Preview */}
                <div 
                  onClick={() => setShowLocationModal(true)}
                  className="relative w-full flex-1 min-h-[220px] rounded-2xl bg-[#F0EBE1] border border-[#E2DDD3] overflow-hidden cursor-pointer group shadow-inner select-none"
                  title="클릭 시 상세 오시는 길 지도가 열립니다"
                >
                  {/* Grid Pattern */}
                  <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ 
                    backgroundImage: 'radial-gradient(circle, #C2B7A3 1px, transparent 1px)', 
                    backgroundSize: '16px 16px' 
                  }} />

                  {/* Han River (Top) */}
                  <div className="absolute top-0 left-0 right-0 h-10 bg-[#D4E4EC] border-b border-[#BED4E0] flex items-center justify-center">
                    <span className="text-[9px] text-[#4A7288] tracking-widest font-serif font-medium">한강 (Hangang River)</span>
                  </div>

                  {/* Cheongdam Park (Bottom Left) */}
                  <div className="absolute bottom-3 left-3 w-28 h-14 bg-[#DCE7D7] border border-[#C5D7BF] rounded-lg flex items-center justify-center">
                    <span className="text-[9px] text-[#4F734A] font-medium">청담공원</span>
                  </div>

                  {/* Roads */}
                  <div className="absolute top-14 left-0 right-0 h-5 bg-[#E4DDD2] border-y border-[#D6CEC1] flex items-center px-4">
                    <span className="text-[8px] text-[#786E63] font-semibold">도산대로</span>
                  </div>

                  {/* Hakdong-ro (Middle Main Road) */}
                  <div className="absolute top-28 left-0 right-0 h-7 bg-[#DDD5C8] border-y border-[#CBC2B3] flex items-center px-4">
                    <div className="w-full border-t border-dashed border-amber-600/40 h-0" />
                    <span className="absolute left-6 bg-white text-[#34270f] text-[8px] font-bold px-1.5 py-0.5 rounded shadow-xs border border-[#D5CEC2]">
                      학동로
                    </span>
                  </div>

                  {/* Walking Path SVG */}
                  <svg className="absolute inset-0 pointer-events-none w-full h-full z-10">
                    <path 
                      d="M 170 125 Q 185 125 185 105 T 235 90" 
                      fill="none" 
                      stroke="#718B99" 
                      strokeWidth="2.5" 
                      strokeDasharray="4,4" 
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Cheongdam Station Subway Exit 9 Marker */}
                  <div className="absolute top-[112px] left-[135px] z-20 flex items-center gap-1">
                    <span className="w-5 h-5 rounded-full bg-[#756A54] text-white flex items-center justify-center text-[9px] font-bold shadow-xs">
                      7
                    </span>
                    <span className="bg-white/95 backdrop-blur-xs text-[10px] font-bold text-[#34270f] px-1.5 py-0.5 rounded shadow-xs border border-[#D5CEC2]">
                      청담역 9번 출구
                    </span>
                  </div>

                  {/* Central Core Pin (Main destination) */}
                  <div className="absolute top-[68px] left-[225px] z-20 flex flex-col items-center">
                    <div className="relative flex items-center justify-center">
                      <span className="absolute -inset-1.5 rounded-full bg-[#AABCC6]/60 animate-ping" />
                      <div className="w-6 h-6 rounded-full bg-[#34270f] text-white border-2 border-white shadow-md flex items-center justify-center">
                        <MapPin className="w-3.5 h-3.5 fill-current text-white" />
                      </div>
                    </div>
                    <div className="bg-[#34270f] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md mt-1 whitespace-nowrap">
                      Central Core (4F)
                    </div>
                  </div>

                  {/* Hover Overlay Prompt */}
                  <div className="absolute inset-0 bg-[#34270f]/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-30">
                    <span className="bg-white text-[#34270f] text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform border border-[#E8E4DC]">
                      <ZoomIn className="w-3.5 h-3.5 text-[#34270f]" />
                      지도 크게보기 & 길찾기 상세
                    </span>
                  </div>
                </div>

                {/* Map Footer Links */}
                <div className="flex flex-wrap items-center justify-between gap-2 mt-3.5 pt-2 border-t border-[#E8E4DC] text-xs shrink-0">
                  <span className="text-[#6E665F] text-[11px] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-[#aabcc6]" />
                    건물 1층 전용 발렛 부스 무료 운영
                  </span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setShowLocationModal(true)}
                      className="text-[11px] font-semibold text-[#aabcc6] hover:text-[#34270f] transition-colors cursor-pointer flex items-center gap-0.5"
                    >
                      오시는 길 안내
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Streamlined Consultation Request Form */}
            <div className="lg:col-span-6 flex flex-col h-full">
              <div className="h-full flex flex-col justify-between bg-[#FAF8F5] rounded-3xl p-7 sm:p-10 shadow-sm border border-[#E8E4DC]">
                
                {consultationSubmitted ? (
                  /* Submission Success State */
                  <div className="py-8 text-center space-y-5">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#34270f] font-serif">
                        상담 신청이 완료되었습니다
                      </h3>
                      <p className="text-xs sm:text-sm text-[#5C534A] mt-2 max-w-md mx-auto leading-relaxed">
                        <strong className="text-[#34270f]">{customerName}</strong>님, 정성스러운 상담 신청에 감사드립니다.<br />
                        남겨주신 연락처(<span className="font-mono text-[#4B6B7C] font-bold">{customerPhone}</span>)로 전문 상담사가 확인 후 빠르게 연락드리겠습니다.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-[#E8E4DC] max-w-md mx-auto text-left text-xs space-y-2.5 shadow-2xs">
                      <div className="flex justify-between py-1 border-b border-[#F0EBE1]">
                        <span className="text-[#786E63] font-medium">신청자 성함</span>
                        <span className="font-bold text-[#34270f]">{customerName}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#F0EBE1]">
                        <span className="text-[#786E63] font-medium">연락처</span>
                        <span className="font-mono font-bold text-[#34270f]">{customerPhone}</span>
                      </div>
                      {clientEmail && (
                        <div className="flex justify-between py-1 border-b border-[#F0EBE1]">
                          <span className="text-[#786E63] font-medium">이메일 주소</span>
                          <span className="font-mono text-[#34270f]">{clientEmail}</span>
                        </div>
                      )}
                      <div className="flex justify-between py-1">
                        <span className="text-[#786E63] font-medium">희망 방문 시간</span>
                        <span className="font-bold text-[#4B6B7C]">{consultationTime}</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={handleResetConsultation}
                        className="px-6 py-3 rounded-xl bg-brand-secondary hover:bg-[#8FA6B2] text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-95"
                      >
                        다른 상담 추가 신청하기
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Form Input State */
                  <form onSubmit={handleConsultationSubmit} className="space-y-4">
                    
                    {/* Row 1: 성함 & 연락처 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#4C463C] mb-1.5">
                          성함 <span className="text-rose-500">*</span>
                        </label>
                        <input 
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="성함을 입력해주세요"
                          className="w-full bg-white border border-[#DCD6CA] rounded-xl px-4 py-3.5 text-sm text-[#211b11] placeholder:text-[#9E958B] focus:outline-none focus:border-[#4B6B7C] focus:ring-1 focus:ring-[#4B6B7C]/20 transition-all shadow-2xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#4C463C] mb-1.5">
                          연락처 <span className="text-rose-500">*</span>
                        </label>
                        <input 
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="010-0000-0000"
                          className="w-full bg-white border border-[#DCD6CA] rounded-xl px-4 py-3.5 text-sm text-[#211b11] placeholder:text-[#9E958B] focus:outline-none focus:border-[#4B6B7C] focus:ring-1 focus:ring-[#4B6B7C]/20 transition-all shadow-2xs font-mono"
                        />
                      </div>
                    </div>

                    {/* Row 2: 이메일 주소 */}
                    <div>
                      <label className="block text-xs font-bold text-[#4C463C] mb-1.5">
                        이메일 주소
                      </label>
                      <input 
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="example@email.com"
                        className="w-full bg-white border border-[#DCD6CA] rounded-xl px-4 py-3.5 text-sm text-[#211b11] placeholder:text-[#9E958B] focus:outline-none focus:border-[#4B6B7C] focus:ring-1 focus:ring-[#4B6B7C]/20 transition-all shadow-2xs"
                      />
                    </div>

                    {/* Row 3: 희망 방문 시간 선택 */}
                    <div>
                      <label className="block text-xs font-bold text-[#4C463C] mb-1.5">
                        희망 방문 시간
                      </label>
                      <div className="relative">
                        <select
                          value={consultationTime}
                          onChange={(e) => setConsultationTime(e.target.value)}
                          className="w-full appearance-none bg-white border border-[#DCD6CA] rounded-xl px-4 py-3.5 text-sm text-[#211b11] focus:outline-none focus:border-[#4B6B7C] focus:ring-1 focus:ring-[#4B6B7C]/20 transition-all shadow-2xs pr-10 cursor-pointer"
                        >
                          <option value="오후 (12:00 - 18:00)">오후 (12:00 - 18:00)</option>
                          <option value="오전 (09:00 - 12:00)">오전 (09:00 - 12:00)</option>
                          <option value="저녁 (18:00 - 21:00)">저녁 (18:00 - 21:00)</option>
                          <option value="시간 무관 (빠른 상담 희망)">시간 무관 (빠른 상담 희망)</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#786E63] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Row 4: 상담 내용 메모 */}
                    <div>
                      <label className="block text-xs font-bold text-[#4C463C] mb-1.5">
                        상담 내용 (선택)
                      </label>
                      <textarea 
                        rows={4}
                        value={bookingNotes}
                        onChange={(e) => setBookingNotes(e.target.value)}
                        placeholder="허리가 안좋아서 수업 받고 싶어요"
                        className="w-full bg-white border border-[#DCD6CA] rounded-xl p-4 text-sm text-[#211b11] placeholder:text-[#9E958B] focus:outline-none focus:border-[#4B6B7C] focus:ring-1 focus:ring-[#4B6B7C]/20 transition-all shadow-2xs resize-none"
                      />
                    </div>

                    {/* Row 5: Submit Button */}
                    <div className="pt-2">
                      {isSubmittingConsultation ? (
                        <button
                          type="button"
                          disabled
                          className="w-full py-4 rounded-xl font-bold text-sm text-white bg-brand-secondary/60 cursor-wait flex items-center justify-center gap-2 shadow-xs"
                        >
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>전송 중...</span>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="w-full py-4 rounded-xl font-bold text-sm text-white bg-brand-secondary hover:bg-[#8FA6B2] active:scale-[0.99] transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                          <span>상담 신청하기</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <p className="text-[11px] text-center text-[#786E63] pt-1">
                      * 작성해주신 개인정보는 상담 안내 목적으로만 안전하게 사용됩니다.
                    </p>

                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Additional FAQ / Guidance Section */}
      <section className="py-16 bg-brand-surface border-t border-brand-surface-highest/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary block mb-2">
              CONSULTATION FAQ
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-brand-primary">
              자주 묻는 질문
            </h3>
            <p className="text-xs sm:text-sm text-brand-on-surface-variant font-light mt-2 max-w-lg mx-auto leading-relaxed">
              센트럴 코어 맞춤 상담과 방문에 관해 고객님들께서 가장 자주 궁금해하시는<br />질문들을 정리했습니다.
            </p>
          </div>

          {/* Admin Notification / Status Toast */}
          <AnimatePresence>
            {faqActionSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center justify-between shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{faqActionSuccess}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFaqActionSuccess(null)}
                  className="text-emerald-700 hover:text-emerald-900 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Admin Control Bar (Visible only when isAdmin is true) */}
          {isAdmin && (
            <div className="mb-8 p-4 rounded-2xl bg-white border-2 border-brand-secondary/40 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-secondary/10 flex items-center justify-center text-brand-secondary shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-primary">관리자 FAQ 관리 모드</span>
                    <span className="text-[10px] bg-brand-secondary/15 text-brand-secondary font-semibold px-2 py-0.5 rounded-full">
                      총 {faqs.length}개 질문
                    </span>
                  </div>
                  <p className="text-[11px] text-[#786E63] mt-0.5">
                    고객에게 표시되는 질문과 답변을 추가하거나 실시간으로 수정·삭제할 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={handleOpenAddModal}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-secondary text-white text-xs font-bold hover:bg-brand-secondary/90 transition-colors shadow-xs cursor-pointer"
                  id="admin-add-faq-btn"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>새 질문 추가</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetFaqsClick}
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-[#D5CFBF] bg-[#FAF9F6] hover:bg-[#F0EEE6] text-[#6E655D] text-xs font-semibold transition-colors cursor-pointer"
                  title="초기 기본 질문으로 복원"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">초기화</span>
                </button>
              </div>
            </div>
          )}

          {/* Category Filter Chips */}
          {categories.length > 2 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 mb-6">
              {categories.map((cat) => {
                const isSelected = activeFaqCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveFaqCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-brand-primary text-[#FAF8F5] shadow-2xs font-semibold'
                        : 'bg-[#FAF9F6] text-[#6E655D] hover:bg-[#F2EFE9] border border-[#E8E5DD]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}

          {/* FAQ Items List */}
          {displayedFaqs.length === 0 ? (
            <div className="text-center py-12 bg-[#FAF9F6] rounded-2xl border border-dashed border-[#DDD7CD]">
              <HelpCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-brand-primary">등록된 질문이 없습니다.</p>
              <p className="text-xs text-[#786E63] mt-1">새로운 질문을 추가하여 고객들의 궁금증을 해소해 보세요.</p>
              {isAdmin && (
                <button
                  type="button"
                  onClick={handleOpenAddModal}
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-secondary text-white text-xs font-bold hover:bg-brand-secondary/90 transition-colors shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>첫 질문 등록하기</span>
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {displayedFaqs.map((faq, index) => {
                return (
                  <motion.div
                    key={faq.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#FAF9F6] border border-[#EBEAE5] hover:border-brand-secondary/30 p-5 sm:p-6 rounded-2xl transition-all shadow-2xs relative group"
                  >
                    {/* Header Row: Category Badge & Admin Action Buttons */}
                    <div className="flex items-center justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2">
                        {faq.category && (
                          <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-wider bg-brand-secondary/10 px-2 py-0.5 rounded-md">
                            {faq.category}
                          </span>
                        )}
                        {isAdmin && (
                          <span className="text-[10px] font-mono text-[#8C8278] bg-white border border-[#E0DFD8] px-1.5 py-0.5 rounded">
                            순서: {faq.order ?? index + 1}
                          </span>
                        )}
                      </div>

                      {/* Admin Edit & Delete buttons */}
                      {isAdmin && (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(faq)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-brand-secondary hover:bg-brand-secondary/10 transition-colors cursor-pointer border border-brand-secondary/20"
                            title="질문 및 답변 수정"
                          >
                            <Pencil className="w-3 h-3" />
                            <span>수정</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteFaqClick(faq)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer border border-red-200"
                            title="질문 삭제"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>삭제</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Question */}
                    <h4 className="font-bold text-sm sm:text-base text-brand-primary mb-2 flex items-start gap-2">
                      <span className="font-serif font-bold text-brand-secondary shrink-0 text-base">Q.</span>
                      <span className="leading-snug">{faq.question}</span>
                    </h4>

                    {/* Answer */}
                    <div className="flex items-start gap-2 text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed font-light pl-0.5">
                      <span className="font-serif font-bold text-[#8C8278] shrink-0 text-base">A.</span>
                      <p className="whitespace-pre-line text-[#4A3E3D] font-normal leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>

                    {/* Optional update stamp */}
                    {faq.updatedAt && (
                      <div className="mt-3 pt-2 border-t border-[#EBEAE5]/60 text-[10px] text-[#9E958C] font-mono">
                        최근 업데이트: {faq.updatedAt}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Admin Add/Edit FAQ Modal */}
      <AnimatePresence>
        {faqModalMode !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="bg-white rounded-2xl max-w-xl w-full border border-[#E0DFD8] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-[#EBEAE5] bg-[#FAF9F6] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                    {faqModalMode === 'add' ? <Plus className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-brand-primary">
                      {faqModalMode === 'add' ? '새로운 자주 묻는 질문(FAQ) 등록' : '자주 묻는 질문(FAQ) 내용 수정'}
                    </h3>
                    <p className="text-[11px] text-[#786E63]">
                      작성하신 질문과 답변은 고객 상담 페이지 FAQ에 즉시 반영됩니다.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSaveFaqSubmit} className="p-6 overflow-y-auto space-y-4">
                {/* Category & Order Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-primary mb-1.5">
                      카테고리 분류 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      placeholder="예: 상담 및 등록, 수업 준비, 시설 및 주차"
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#DDD7CD] rounded-xl text-xs text-brand-primary focus:outline-none focus:border-brand-secondary focus:bg-white"
                      required
                    />
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {['상담 및 등록', '수업 준비', '시설 및 주차', '레슨 안내'].map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setFormCategory(cat)}
                          className="text-[10px] px-2 py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors cursor-pointer"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-primary mb-1.5">
                      노출 순서 (작을수록 상단 배치)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={formOrder}
                      onChange={(e) => setFormOrder(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#DDD7CD] rounded-xl text-xs text-brand-primary focus:outline-none focus:border-brand-secondary focus:bg-white"
                    />
                    <p className="text-[10px] text-[#8C8278] mt-1">
                      현재 등록된 질문 수: {faqs.length}개
                    </p>
                  </div>
                </div>

                {/* Question */}
                <div>
                  <label className="block text-xs font-bold text-brand-primary mb-1.5">
                    질문 내용 (Q.) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formQuestion}
                    onChange={(e) => setFormQuestion(e.target.value)}
                    placeholder="예: 필라테스가 처음인데 1:1 상담 후 바로 등록해야 하나요?"
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#DDD7CD] rounded-xl text-xs sm:text-sm text-brand-primary focus:outline-none focus:border-brand-secondary focus:bg-white font-medium"
                    required
                  />
                </div>

                {/* Answer */}
                <div>
                  <label className="block text-xs font-bold text-brand-primary mb-1.5">
                    답변 내용 (A.) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formAnswer}
                    onChange={(e) => setFormAnswer(e.target.value)}
                    placeholder="고객님께 전달할 정중하고 상세한 답변 내용을 입력해 주세요."
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#DDD7CD] rounded-xl text-xs sm:text-sm text-brand-primary focus:outline-none focus:border-brand-secondary focus:bg-white leading-relaxed resize-none"
                    required
                  />
                </div>

                {/* Live Preview Box */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-[#786E63] uppercase tracking-wider block mb-1.5">
                    실시간 화면 미리보기
                  </span>
                  <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#EBEAE5]">
                    <div className="text-[10px] font-bold text-brand-secondary bg-brand-secondary/10 px-2 py-0.5 rounded inline-block mb-1.5">
                      {formCategory || '카테고리'}
                    </div>
                    <div className="font-bold text-xs text-brand-primary mb-1">
                      Q. {formQuestion || '질문을 입력하시면 여기에 표시됩니다.'}
                    </div>
                    <div className="text-xs text-[#5E554D] leading-relaxed font-light">
                      A. {formAnswer || '답변을 작성하시면 고객에게 보일 레이아웃이 여기에 미리보기로 표시됩니다.'}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-[#EBEAE5] flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2.5 rounded-xl border border-[#DDD7CD] text-xs font-semibold text-[#5E554D] hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingFaq}
                    className="px-5 py-2.5 rounded-xl bg-brand-secondary text-white text-xs font-bold hover:bg-brand-secondary/90 transition-colors shadow-xs cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isSavingFaq && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>{faqModalMode === 'add' ? '새 질문 등록하기' : '수정 사항 저장하기'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
