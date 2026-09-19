import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  GraduationCap, 
  CheckCircle2,
  Quote,
  Target,
  ChevronDown
} from 'lucide-react';
import { Instructor } from '../types';

interface InstructorsPageProps {
  instructors: Instructor[];
  onSelectInstructor?: (inst: Instructor) => void;
  onNavigateToBooking?: (programId?: string, instructorId?: string) => void;
}

export const InstructorsPage: React.FC<InstructorsPageProps> = ({
  instructors
}) => {
  const [selectedInstructorId, setSelectedInstructorId] = useState<string | null>(null);

  const scrollToInstructor = (id: string) => {
    setSelectedInstructorId(id);
    const element = document.getElementById(`instructor-${id}`);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-background text-brand-on-surface">
      {/* 1. Header Banner with clear photo background and warm dark scrim */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-[#241a0b] text-white">
        {/* Ambient Photo Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://postfiles.pstatic.net/MjAyNjA2MjdfMTY1/MDAxNzgyNTUxODY5MjY4.UN7044IQIzZTL_b0GsU_enGSBBUDIREHex_b3Of0W3og.4uTX8n2sFBewrxzYr3fA6qGi108zfUynjfStIqZftqsg.PNG/ChatGPT_Image_2026%EB%85%84_6%EC%9B%94_27%EC%9D%BC_%EC%98%A4%ED%9B%84_05_05_24.png?type=w3840" 
            alt="Central Core Master Instructors" 
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
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#C4D5DF] font-bold mb-3 inline-block">
              THE FACULTY DOSSIER
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight mb-4">
              센트럴 코어 <br />
              <span className="font-normal text-[#C4D5DF]">전담 마스터 강사진</span>
            </h1>
            <p className="text-sm sm:text-base text-[#E5DDD2] font-light leading-relaxed max-w-xl mx-auto">
              공인된 해부학적 전문 지식과 신체 정렬 지도 경력을 갖춘 전문 강사진의 핵심 프로필입니다.
            </p>
          </motion.div>

          {/* Quick Anchor Jump Bar */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-2 sm:gap-3 max-w-3xl mx-auto">
            <span className="text-[11px] font-bold text-[#E5DDD2]/80 uppercase tracking-widest mr-1">
              강사 바로가기 :
            </span>
            {instructors.map((inst) => (
              <button
                key={inst.id}
                onClick={() => scrollToInstructor(inst.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 border backdrop-blur-md ${
                  selectedInstructorId === inst.id
                    ? 'bg-[#C4D5DF] text-brand-primary border-[#C4D5DF] shadow-sm font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-[#C4D5DF]'
                }`}
              >
                <span>{inst.name}</span>
                <span className="text-[10px] opacity-75 font-normal">({inst.position})</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Streamlined & High-Impact Instructors List */}
      <section className="py-14 lg:py-20 bg-brand-surface">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 space-y-16 lg:space-y-24">
          {instructors.map((inst, index) => (
            <div 
              key={inst.id}
              id={`instructor-${inst.id}`}
              className="scroll-mt-28 bg-[#FAF9F6] border border-[#E8E6E0] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Profile Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-brand-surface-highest/40">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-brand-secondary/15 text-brand-secondary font-mono font-bold text-xs flex items-center justify-center">
                    0{index + 1}
                  </span>
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-brand-secondary font-bold block">
                      {inst.enSpecialty}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-brand-primary font-bold">
                      {inst.name} <span className="text-base sm:text-lg font-sans font-light text-brand-on-surface-variant">({inst.enName})</span>
                    </h2>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-brand-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {inst.position}
                  </span>
                  {inst.experience && (
                    <span className="bg-[#EFECE6] text-brand-primary text-xs font-semibold px-3 py-1 rounded-full border border-[#DFDAD0]">
                      {inst.experience}
                    </span>
                  )}
                  {inst.totalSessions && (
                    <span className="bg-[#EFECE6] text-brand-primary text-xs font-medium px-3 py-1 rounded-full border border-[#DFDAD0]">
                      {inst.totalSessions}
                    </span>
                  )}
                </div>
              </div>

              {/* Main Two-Column Structure */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* Left Column: Portrait & Title Tag */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-brand-surface-low border border-brand-surface-highest/50 shadow-inner relative group">
                    <img 
                      src={inst.image} 
                      alt={`${inst.name} 강사 프로필`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-xs font-semibold opacity-95 leading-snug">{inst.title}</p>
                      <p className="text-[11px] opacity-80 mt-0.5">{inst.specialty}</p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Key High-Impact Editorial Elements */}
                <div className="lg:col-span-8 space-y-7">
                  
                  {/* Highlighted Quote / Motto (강조된 대표 카피 메시지) */}
                  {inst.motto && (
                    <div className="relative p-5 sm:p-6 bg-white border-l-4 border-brand-secondary rounded-2xl shadow-xs">
                      <Quote className="w-6 h-6 text-brand-secondary/40 mb-2" />
                      <p className="font-serif text-base sm:text-lg text-brand-primary font-bold italic leading-relaxed">
                        {inst.motto}
                      </p>
                    </div>
                  )}

                  {/* Highlighted Target Areas & Recommended Candidates (중점 케어 & 추천 대상 대폭 강조) */}
                  {inst.targetAreas && inst.targetAreas.length > 0 && (
                    <div className="bg-[#F4EFEA] p-5 sm:p-6 rounded-2xl border border-[#E5DDD2]">
                      <div className="flex items-center gap-2 mb-3.5">
                        <div className="w-6 h-6 rounded-full bg-brand-secondary text-white flex items-center justify-center shrink-0">
                          <Target className="w-3.5 h-3.5" />
                        </div>
                        <h3 className="text-sm font-bold tracking-tight text-brand-primary">
                          중점 케어 및 맞춤 추천 대상
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {inst.targetAreas.map((area, aIdx) => (
                          <div 
                            key={aIdx}
                            className="flex items-center gap-2.5 bg-white px-3.5 py-2.5 rounded-xl border border-[#E0D7CB] shadow-2xs"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary shrink-0" />
                            <span className="text-xs font-semibold text-brand-primary leading-tight">
                              {area}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Two-Column Grid: Education & Certifications (한눈에 들어오는 핵심 자격/이력) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Education & Clinical Career */}
                    {inst.education && inst.education.length > 0 && (
                      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E5DF] space-y-3">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-brand-secondary" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                            학력 및 주요 이력
                          </h4>
                        </div>
                        <ul className="space-y-2 text-xs text-brand-on-surface-variant font-normal">
                          {inst.education.map((edu, eIdx) => (
                            <li key={eIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary/70 shrink-0 mt-1.5" />
                              <span className="leading-snug">{edu}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Certifications */}
                    {inst.certifications && inst.certifications.length > 0 && (
                      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E5DF] space-y-3">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-brand-secondary" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                            국제 및 국가 공인 자격
                          </h4>
                        </div>
                        <ul className="space-y-2 text-xs text-brand-on-surface-variant font-normal">
                          {inst.certifications.map((cert, cIdx) => (
                            <li key={cIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-secondary shrink-0 mt-0.5" />
                              <span className="leading-snug font-medium text-brand-primary">{cert}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
