import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Accessibility, 
  Scale, 
  Dumbbell, 
  HeartHandshake, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Compass, 
  ArrowRight 
} from 'lucide-react';

interface PhilosophyPageProps {
  onNavigateToBooking: () => void;
  onOpenBreathingWidget?: () => void;
}

export const PhilosophyPage: React.FC<PhilosophyPageProps> = ({ 
  onNavigateToBooking 
}) => {
  const [activePhilosophyTab, setActivePhilosophyTab] = useState<number>(0);

  return (
    <div className="min-h-screen bg-brand-background text-brand-on-surface">
      {/* 1. Page Hero Banner with clear photo background and warm dark scrim */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-[#261c0b] text-white">
        {/* Ambient Photo Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://postfiles.pstatic.net/MjAyNjA2MzBfMTkg/MDAxNzgyNzQ4Njg4MTU4.dD67WK6nB5StqZiUuoTof9SbqASCWq55XYjnO7QoWdcg.tUWAuHDnf1pWcKKMJZZ-4gTRrqWINdxcZeESZxD_TMQg.PNG/ChatGPT_Image_2026%EB%85%84_6%EC%9B%94_27%EC%9D%BC_%EC%98%A4%ED%9B%84_10_49_14.png?type=w3840" 
            alt="Central Core Pilates Alignment" 
            className="w-full h-full object-cover brightness-[0.88] contrast-[1.05] scale-[1.02]"
            referrerPolicy="no-referrer"
          />
          {/* Balanced warm dark scrim that keeps the photo vividly visible while ensuring text contrast */}
          <div className="absolute inset-0 bg-[#1e1507]/45"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#261c0b] via-transparent to-[#1e1507]/65"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <span className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-[#C4D5DF] font-bold mb-4 inline-block">
              CENTRAL CORE PHILOSOPHY
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight mb-6">
              중심의 힘을 바탕으로 <br />
              <span className="font-normal text-[#C4D5DF]">세워진 정렬 철학</span>
            </h1>
            <p className="text-sm sm:text-base text-[#E5DDD2] font-light leading-relaxed max-w-2xl mx-auto">
              Central Core는 일시적인 체중 감량이나 겉으로 드러나는 근육 팽창 대신, <br className="hidden sm:inline" />
              <strong className="font-semibold text-white">좌우 뼈대의 무결성과 깊은 심부 코어가 만드는 고요한 조율</strong>에 본질적인 가치를 둡니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Core Story & Vision Section */}
      <section className="py-16 lg:py-24 bg-brand-surface border-b border-brand-surface-highest/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Visual Graphic Representation */}
          <div className="relative">
            <div className="aspect-[4/4.3] bg-brand-surface-container overflow-hidden rounded-2xl relative group shadow-md border border-brand-surface-highest/40">
              <img 
                src="https://postfiles.pstatic.net/MjAyNjA2MzBfMTkg/MDAxNzgyNzQ4Njg4MTU4.dD67WK6nB5StqZiUuoTof9SbqASCWq55XYjnO7QoWdcg.tUWAuHDnf1pWcKKMJZZ-4gTRrqWINdxcZeESZxD_TMQg.PNG/ChatGPT_Image_2026%EB%85%84_6%EC%9B%94_27%EC%9D%BC_%EC%98%A4%ED%9B%84_10_49_14.png?type=w3840" 
                alt="Cadillac Pilates movement" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] tracking-widest uppercase font-mono bg-white/20 backdrop-blur-md px-2.5 py-1 rounded">
                  ANATOMICAL PRECISION
                </span>
                <p className="text-xs sm:text-sm mt-2 font-serif font-light text-white/95">
                  "참된 자유는 통제된 중심에서 시작됩니다."
                </p>
              </div>
            </div>

            {/* Decorative Subtle element */}
            <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-brand-secondary-container/30 rounded-full blur-2xl z-0 pointer-events-none"></div>
          </div>

          {/* Philosophy Text & Interactive Tabs */}
          <div className="flex flex-col justify-center">
            <div className="w-12 h-[1px] bg-brand-primary mb-6"></div>
            <span className="font-sans text-xs uppercase tracking-widest text-brand-secondary font-bold mb-3 block">
              OUR CORE APPROACH
            </span>
            
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-brand-primary mb-6 leading-tight">
              해부학적 원리와 <br />
              <span className="font-normal">마인드풀니스의 결합</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-brand-on-surface-variant mb-6 leading-relaxed">
              센트럴 코어는 단순한 운동 시설을 넘어, 일상에 지친 몸과 마음이 원래의 자연스러운 정렬을 회복하도록 돕는 공간입니다. 
              정밀한 기구 제어와 전문 강사진의 1:1 촉진(Tactile Cueing)을 통해 신체 내부의 작은 감각들까지 섬세하게 깨워냅니다.
            </p>

            {/* Interactive Core Tabs */}
            <div className="bg-brand-surface-low p-5 rounded-2xl border border-brand-surface-highest/20 mb-8">
              <div className="flex gap-2 border-b border-brand-surface-highest/40 pb-3 mb-4">
                {['철학과 기원', '호흡의 가치', '안전 관리 원칙'].map((tabLabel, idx) => {
                  const isActive = activePhilosophyTab === idx;
                  return (
                    <button
                      key={tabLabel}
                      onClick={() => setActivePhilosophyTab(idx)}
                      className={`text-xs uppercase tracking-wider font-semibold focus:outline-none px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                        isActive
                          ? 'bg-brand-secondary text-white border border-brand-secondary shadow-sm font-bold'
                          : 'bg-white text-brand-on-surface-variant/80 border border-brand-surface-highest/30 hover:bg-brand-secondary-container/30 hover:text-brand-primary'
                      }`}
                    >
                      {tabLabel}
                    </button>
                  );
                })}
              </div>
              <div className="text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed min-h-[64px] flex items-center">
                {activePhilosophyTab === 0 && (
                  <span>"필라테스는 단순한 운동 루틴이 아닙니다. 신체, 지성, 그리고 영혼이 완전하게 결합하는 통로입니다." 조셉 필라테스의 굳센 신념을 현대 재활 기법과 결합하여 안전한 척추 수명을 완성합니다.</span>
                )}
                {activePhilosophyTab === 1 && (
                  <span>"호흡은 삶의 첫 번째이자 마지막 행동입니다." 코어를 단단하게 지탱하는 갈비뼈 하부 정렬 호흡법을 통해 몸 속 구석구석 신선한 산소를 공급하고 중추 안정성을 가동시킵니다.</span>
                )}
                {activePhilosophyTab === 2 && (
                  <span>최첨단 압력 측정판과 자세 판독 기구를 바탕으로 매 세션 개인별 피로도와 운동 가동 범위를 점검하여 단 한 건의 부상도 허용하지 않는 안전 제일의 재활 정렬을 보장합니다.</span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onNavigateToBooking}
                className="px-6 py-3 rounded-lg bg-brand-primary text-white text-xs sm:text-sm font-semibold hover:bg-brand-primary/90 transition-all cursor-pointer shadow-sm flex items-center gap-2"
              >
                <span>상담 신청하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Three Pillars Section */}
      <section className="py-16 lg:py-24 bg-brand-surface-low border-b border-brand-surface-highest/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-sans text-xs uppercase tracking-widest text-brand-tertiary font-bold mb-3 block">
              THREE PILLARS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-brand-primary mb-4">
              중심을 되찾아주는 삼각 기둥
            </h2>
            <p className="text-sm text-brand-on-surface-variant font-light">
              필라테스의 현대적 재활 재해석. 기구와 정밀 훈련이 도출하는 압도적인 수련 변화를 몸소 느껴 보세요.
            </p>
            <div className="w-16 h-0.5 bg-brand-tertiary-container mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-brand-surface p-8 lg:p-10 rounded-2xl border border-brand-surface-highest/30 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-secondary-container flex items-center justify-center mb-6 text-brand-secondary">
                  <Accessibility className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-brand-primary mb-3">정렬과 자세 (Posture)</h3>
                <p className="text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed">
                  틀어진 골반, 라운드 숄더, 일자목 등 당신의 고질적인 정렬 상태를 진단하고 비대칭을 교정하기 위한 뼈대 위주 정렬을 설계합니다.
                </p>
              </div>
              <ul className="mt-6 pt-4 border-t border-brand-surface-highest/20 text-xs text-brand-on-surface-variant/80 space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#aabcc6]" />
                  <span>3D 체형 불균형 정밀 판독</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#aabcc6]" />
                  <span>경추/흉추/요추 마디 분절 제어</span>
                </li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-brand-surface p-8 lg:p-10 rounded-2xl border border-brand-surface-highest/30 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-secondary-container flex items-center justify-center mb-6 text-brand-secondary">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-brand-primary mb-3">기능적 균형 (Balance)</h3>
                <p className="text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed">
                  일상으로 돌아갔을 때 부상을 방지하고, 통제 가능한 고유 수용 감각을 깨워 신체 통제력을 높이는 상하지 복합 훈련입니다.
                </p>
              </div>
              <ul className="mt-6 pt-4 border-t border-brand-surface-highest/20 text-xs text-brand-on-surface-variant/80 space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#aabcc6]" />
                  <span>좌우 밸런스 회복 트레이닝</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#aabcc6]" />
                  <span>동적 평형성 및 관절 안정화</span>
                </li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-brand-surface p-8 lg:p-10 rounded-2xl border border-brand-surface-highest/30 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-secondary-container flex items-center justify-center mb-6 text-brand-secondary">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-brand-primary mb-3">코어의 심부 근력 (Power)</h3>
                <p className="text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed">
                  단지 가시적인 겉 표면 복근이 아니라 복횡근, 골반저근, 다열근, 횡격막을 조이는 진정한 인간 몸통의 코칭 시스템을 기릅니다.
                </p>
              </div>
              <ul className="mt-6 pt-4 border-t border-brand-surface-highest/20 text-xs text-brand-on-surface-variant/80 space-y-1.5">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#aabcc6]" />
                  <span>심부 코어 머슬 4대 요소 강화</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#aabcc6]" />
                  <span>척추 기립 지속 지구력 향상</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Commitment to Quality & Space */}
      <section className="py-16 lg:py-24 bg-brand-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-[#FAF8F5] border border-[#E8E4DC] rounded-3xl p-8 sm:p-12 lg:p-16">
            <div className="max-w-3xl">
              <span className="text-[11px] font-bold tracking-widest uppercase text-brand-secondary block mb-3">
                OUR PROMISE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-brand-primary mb-6">
                프라이빗 안식처가 약속하는 4가지 기준
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#AABCC6]/20 flex items-center justify-center text-[#aabcc6] shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5 text-[#aabcc6]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-primary mb-1">100% 정규 강사진 직강</h4>
                    <p className="text-xs text-brand-on-surface-variant leading-relaxed">
                      모든 레슨은 국제 인증 및 물리치료/체육학 석박사 이상의 검증된 정규 전담 강사가 직접 집도합니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#AABCC6]/20 flex items-center justify-center text-[#aabcc6] shrink-0 mt-0.5">
                    <Compass className="w-5 h-5 text-[#aabcc6]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-primary mb-1">프리미엄 정품 기구 완비</h4>
                    <p className="text-xs text-brand-on-surface-variant leading-relaxed">
                      미국 Balanced Body 최고급 정품 리포머, 캐딜락, 체어, 바렐만을 사용하여 관절 부담을 최소화합니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#AABCC6]/20 flex items-center justify-center text-[#aabcc6] shrink-0 mt-0.5">
                    <HeartHandshake className="w-5 h-5 text-[#aabcc6]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-primary mb-1">개별 맞춤 모니터링</h4>
                    <p className="text-xs text-brand-on-surface-variant leading-relaxed">
                      매 회차 정렬 각도와 코어 안정성 데이터를 기록하여 개인 맞춤형 피드백을 전달해 드립니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#AABCC6]/20 flex items-center justify-center text-[#aabcc6] shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5 text-[#aabcc6]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-primary mb-1">프라이빗 룸 보장</h4>
                    <p className="text-xs text-brand-on-surface-variant leading-relaxed">
                      타인과의 불필요한 시선 간섭 없이 오롯이 나의 호흡과 움직임에 몰입할 수 있는 쾌적한 환경을 제공합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
