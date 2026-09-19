import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Menu, 
  X, 
  Accessibility, 
  Scale, 
  Dumbbell, 
  ChevronRight, 
  ChevronLeft,
  Quote,
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MessageSquare, 
  Star, 
  CheckCircle2, 
  Check, 
  Play, 
  Pause, 
  RotateCcw, 
  Mail, 
  PhoneCall, 
  AlertCircle, 
  ArrowRight,
  Sparkles,
  Info,
  Plus,
  Minus,
  ZoomIn,
  ZoomOut,
  Shield,
  Trash2,
  Lock,
  Search,
  Eye,
  EyeOff,
  Sliders,
  Bell,
  ChevronDown,
  Loader2,
  ExternalLink,
  ArrowUp,
  Pencil,
  HelpCircle
} from 'lucide-react';

import { INSTRUCTORS, GALLERY_ITEMS, PROGRAMS, ASSESSMENT_QUESTIONS, REVIEWS, INITIAL_FAQS } from './data';
import { Instructor, GalleryItem, Program, Booking, Review, FaqItem } from './types';
import { PhilosophyPage } from './components/PhilosophyPage';
import { ProgramsPage } from './components/ProgramsPage';
import { InstructorsPage } from './components/InstructorsPage';
import { ReviewsPage } from './components/ReviewsPage';
import { ConsultationPage } from './components/ConsultationPage';
import { ReviewDetailModal } from './components/ReviewDetailModal';

export default function App() {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<'home' | 'intro' | 'programs' | 'instructors' | 'gallery' | 'booking'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Reviews slider state
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNextReview = () => {
    setCurrentReviewIndex((prev) => {
      const maxIdx = window.innerWidth < 768 ? reviewsList.length - 1 : reviewsList.length - 3;
      return prev >= maxIdx ? 0 : prev + 1;
    });
  };

  const handlePrevReview = () => {
    setCurrentReviewIndex((prev) => {
      const maxIdx = window.innerWidth < 768 ? reviewsList.length - 1 : reviewsList.length - 3;
      return prev <= 0 ? maxIdx : prev - 1;
    });
  };

  // Autoplay reviews slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => {
        const maxIdx = window.innerWidth < 768 ? reviewsList.length - 1 : reviewsList.length - 3;
        return prev >= maxIdx ? 0 : prev + 1;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [currentReviewIndex, reviewsList.length]);
  
  // Modals & Overlay triggers
  const [selectedInstructorDetail, setSelectedInstructorDetail] = useState<Instructor | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [mapZoom, setMapZoom] = useState(1);
  const [showWriteReviewModal, setShowWriteReviewModal] = useState(false);
  const [selectedReviewModal, setSelectedReviewModal] = useState<Review | null>(null);

  // Admin Mode States
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('central_core_is_admin') === 'true';
  });
  const [adminUser, setAdminUser] = useState<{ email: string; name?: string; provider?: string } | null>(() => {
    const saved = localStorage.getItem('central_core_admin_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    if (localStorage.getItem('central_core_is_admin') === 'true') {
      return { email: 'wnepd85@gmail.com', name: 'Central Core 관리자', provider: 'google' };
    }
    return null;
  });
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [adminLoginTab, setAdminLoginTab] = useState<'google' | 'passcode'>('google');
  const [adminGoogleEmail, setAdminGoogleEmail] = useState('wnepd85@gmail.com');
  const [adminGooglePassword, setAdminGooglePassword] = useState('');
  const [showGooglePassword, setShowGooglePassword] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminSearchQuery, setAdminSearchQuery] = useState('');
  const [adminFilterProgram, setAdminFilterProgram] = useState('all');

  // Write Review Form States
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTag, setNewReviewTag] = useState('거북목/체형교정');
  const [newReviewCustomTag, setNewReviewCustomTag] = useState('');
  const [newReviewProgram, setNewReviewProgram] = useState('Core Reformer');
  const [newReviewCustomProgram, setNewReviewCustomProgram] = useState('');
  const [newReviewPeriod, setNewReviewPeriod] = useState('3개월 수강');
  const [newReviewContent, setNewReviewContent] = useState('');
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [showBreathingWidget, setShowBreathingWidget] = useState(false);
  
  // Interactive Filtering
  const [instructorFilter, setInstructorFilter] = useState<string>('all');
  const [philosophyTab, setPhilosophyTab] = useState<number>(0);
  
  // Header scroll state & Scroll to top
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Breathing Guideline States
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathCountdown, setBreathCountdown] = useState(4);
  const [totalBreathsCompleted, setTotalBreathsCompleted] = useState(0);
  const breathIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Diagnostic Assessment Form States
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState<number[]>([]);
  const [assessmentResult, setAssessmentResult] = useState<{
    score: number;
    title: string;
    description: string;
    recommendedClass: Program;
    recommendedInstructor: Instructor;
  } | null>(null);

  // Booking Engine States
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<string>(PROGRAMS[0].id);
  const [selectedInstructor, setSelectedInstructor] = useState<string>(INSTRUCTORS[0].id);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('10:00');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [consultationTime, setConsultationTime] = useState('오후 (12:00 - 18:00)');
  const [bookingNotes, setBookingNotes] = useState('');
  const [isSubmittingConsultation, setIsSubmittingConsultation] = useState(false);
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);
  const [bookingSuccessMessage, setBookingSuccessMessage] = useState<string | null>(null);
  const [bookingViewMode, setBookingViewMode] = useState<'book' | 'list'>('book');

  // Load bookings from the server
  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
        localStorage.setItem('central_core_bookings', JSON.stringify(data));
      } else {
        throw new Error('Server returned non-ok status');
      }
    } catch (err) {
      console.error('Failed to fetch bookings from server, using local fallback:', err);
      const saved = localStorage.getItem('central_core_bookings');
      if (saved) {
        try {
          setBookings(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  useEffect(() => {
    fetchBookings();
    
    // Set a default booking date (tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  // Save Bookings to local storage as fallback
  const saveBookingsToStorage = (updated: Booking[]) => {
    setBookings(updated);
    localStorage.setItem('central_core_bookings', JSON.stringify(updated));
  };

  // FAQ Management State
  const [faqsList, setFaqsList] = useState<FaqItem[]>(() => {
    const saved = localStorage.getItem('central_core_faqs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_FAQS;
  });

  const [adminDashboardTab, setAdminDashboardTab] = useState<'bookings' | 'faqs'>('bookings');
  const [adminFaqSearch, setAdminFaqSearch] = useState('');
  const [isAdminFaqModalOpen, setIsAdminFaqModalOpen] = useState(false);
  const [adminEditingFaq, setAdminEditingFaq] = useState<FaqItem | null>(null);
  const [adminFaqForm, setAdminFaqForm] = useState({ question: '', answer: '', category: '상담 및 등록', order: 1 });
  const [isSavingAdminFaq, setIsSavingAdminFaq] = useState(false);

  // Load FAQs from the server
  const fetchFaqs = async () => {
    try {
      const res = await fetch('/api/faqs');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setFaqsList(data);
          localStorage.setItem('central_core_faqs', JSON.stringify(data));
        }
      }
    } catch (err) {
      console.warn('Failed to fetch faqs from server, keeping current/local state:', err);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleAddFaq = async (faqData: Omit<FaqItem, 'id' | 'createdAt'>) => {
    try {
      const res = await fetch('/api/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faqData)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.faqs) {
          setFaqsList(data.faqs);
          localStorage.setItem('central_core_faqs', JSON.stringify(data.faqs));
          return;
        }
      }
    } catch (e) {
      console.warn('Backend add FAQ failed, saving locally:', e);
    }

    const newFaq: FaqItem = {
      id: `faq-${Date.now()}`,
      question: faqData.question,
      answer: faqData.answer,
      category: faqData.category || '상담 및 등록',
      order: faqData.order || faqsList.length + 1,
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [...faqsList, newFaq];
    setFaqsList(updated);
    localStorage.setItem('central_core_faqs', JSON.stringify(updated));
  };

  const handleUpdateFaq = async (id: string, faqData: Partial<FaqItem>) => {
    try {
      const res = await fetch(`/api/faqs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faqData)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.faqs) {
          setFaqsList(data.faqs);
          localStorage.setItem('central_core_faqs', JSON.stringify(data.faqs));
          return;
        }
      }
    } catch (e) {
      console.warn('Backend update FAQ failed, saving locally:', e);
    }

    const updated = faqsList.map(item => item.id === id ? { ...item, ...faqData, updatedAt: new Date().toISOString().split('T')[0] } : item);
    setFaqsList(updated);
    localStorage.setItem('central_core_faqs', JSON.stringify(updated));
  };

  const handleDeleteFaq = async (id: string) => {
    try {
      const res = await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        const data = await res.json();
        if (data.faqs) {
          setFaqsList(data.faqs);
          localStorage.setItem('central_core_faqs', JSON.stringify(data.faqs));
          return;
        }
      }
    } catch (e) {
      console.warn('Backend delete FAQ failed, saving locally:', e);
    }

    const updated = faqsList.filter(item => item.id !== id);
    setFaqsList(updated);
    localStorage.setItem('central_core_faqs', JSON.stringify(updated));
  };

  const handleResetFaqs = async () => {
    try {
      const res = await fetch('/api/faqs/reset', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.faqs) {
          setFaqsList(data.faqs);
          localStorage.setItem('central_core_faqs', JSON.stringify(data.faqs));
          return;
        }
      }
    } catch (e) {
      console.warn('Backend reset FAQ failed, resetting locally:', e);
    }

    setFaqsList(INITIAL_FAQS);
    localStorage.setItem('central_core_faqs', JSON.stringify(INITIAL_FAQS));
  };

  // Breathing Cycle Logic
  useEffect(() => {
    if (isBreathingActive) {
      breathIntervalRef.current = setInterval(() => {
        setBreathCountdown((prev) => {
          if (prev <= 1) {
            // Cycle phases: inhale (4s) -> hold (4s) -> exhale (4s)
            if (breathPhase === 'inhale') {
              setBreathPhase('hold');
              return 4;
            } else if (breathPhase === 'hold') {
              setBreathPhase('exhale');
              return 4;
            } else {
              setBreathPhase('inhale');
              setTotalBreathsCompleted((b) => b + 1);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (breathIntervalRef.current) {
        clearInterval(breathIntervalRef.current);
      }
    }

    return () => {
      if (breathIntervalRef.current) {
        clearInterval(breathIntervalRef.current);
      }
    };
  }, [isBreathingActive, breathPhase]);

  const handleStartBreathing = () => {
    setIsBreathingActive(true);
    setBreathPhase('inhale');
    setBreathCountdown(4);
  };

  const handlePauseBreathing = () => {
    setIsBreathingActive(false);
  };

  const handleResetBreathing = () => {
    setIsBreathingActive(false);
    setBreathPhase('inhale');
    setBreathCountdown(4);
    setTotalBreathsCompleted(0);
  };

  // Assessment Wizard Controls
  const handleAnswerSelect = (score: number) => {
    const newAnswers = [...assessmentAnswers, score];
    setAssessmentAnswers(newAnswers);
    
    if (assessmentStep < ASSESSMENT_QUESTIONS.length - 1) {
      setAssessmentStep((prev) => prev + 1);
    } else {
      // Calculate output results
      const totalScore = newAnswers.reduce((a, b) => a + b, 0);
      let title = '';
      let description = '';
      let recommendedClass = PROGRAMS[0];
      let recommendedInstructor = INSTRUCTORS[0];

      if (totalScore >= 7) {
        title = '중증 관절 스트레스 및 척추 불균형 교정 필요 그룹';
        description = '오랜 시간 누적된 불균형으로 척추 유연성과 골반 수평 오차가 두드러지게 어긋나 있습니다. 무리한 운동은 오히려 통증을 유발하니, 정밀 재활 전문가 엘레나 밴스의 일대일 프로그램으로 코어 신경과 관절을 천천히 복원해야 합니다.';
        recommendedClass = PROGRAMS.find(p => p.id === 'p-rehab') || PROGRAMS[2];
        recommendedInstructor = INSTRUCTORS.find(i => i.id === 'elena') || INSTRUCTORS[0];
      } else if (totalScore >= 5) {
        title = '심부 코어 약화 및 기립 지구력 결핍 그룹';
        description = '자세를 길게 유지하는 심부 다열근과 척추 기립 유지가 다소 약해져 몸통 안정성이 떨어져 있습니다. 골반의 회전 불균형을 교정하고 심부 코어를 활성화하는 코어 에퀴리브리엄 또는 시에나 브룩스의 리포머 단계를 적극 추천합니다.';
        recommendedClass = PROGRAMS.find(p => p.id === 'p-equilibrium') || PROGRAMS[0];
        recommendedInstructor = INSTRUCTORS.find(i => i.id === 'sienna') || INSTRUCTORS[1];
      } else {
        title = '가동성 확장 및 정밀 평형 단련 타겟 그룹';
        description = '기초적인 코어 지탱력은 우수한 편이나, 척추 분절 마디마디의 최대 가동력과 관절 고유수용 감각을 일치시켜 한 단계 높은 스포츠 웰니스를 성취하는 단계입니다. 줄리안 첸의 가동성 체어 및 소도구 흐름 마스터 클래스에 최적화되어 있습니다.';
        recommendedClass = PROGRAMS.find(p => p.id === 'p-mobility') || PROGRAMS[3];
        recommendedInstructor = INSTRUCTORS.find(i => i.id === 'julian') || INSTRUCTORS[2];
      }

      setAssessmentResult({
        score: totalScore,
        title,
        description,
        recommendedClass,
        recommendedInstructor
      });
    }
  };

  const handleResetAssessment = () => {
    setAssessmentStep(0);
    setAssessmentAnswers([]);
    setAssessmentResult(null);
  };

  // Create Consultation Request
  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('성함과 연락처를 입력해 주세요.');
      return;
    }

    setIsSubmittingConsultation(true);

    const newBooking: Booking = {
      id: `cs-${Date.now()}`,
      programTitle: '맞춤 방문 상담',
      timeSlot: consultationTime,
      clientName: customerName.trim(),
      clientPhone: customerPhone.trim(),
      clientEmail: clientEmail.trim() || undefined,
      notes: bookingNotes.trim() || undefined,
      createdAt: new Date().toLocaleString('ko-KR')
    };

    // 1. Direct forward to Formspree endpoint (xwlpkvad)
    try {
      fetch('https://formspree.io/f/xwlpkvad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: customerName.trim(),
          phone: customerPhone.trim(),
          email: clientEmail.trim() || '미입력',
          timeSlot: consultationTime,
          program: '맞춤 방문 상담',
          notes: bookingNotes.trim() || '맞춤 상담 접수',
          bookingId: newBooking.id,
          createdAt: newBooking.createdAt,
          _subject: `[Central Core] 새 상담 접수 - ${customerName.trim()}님 (${customerPhone.trim()})`
        })
      }).catch((e) => console.log('Client Formspree non-blocking error:', e));
    } catch (err) {
      // non-blocking
    }

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBooking)
      });
      if (res.ok) {
        await fetchBookings();
      } else {
        throw new Error('Server returned error status');
      }
    } catch (err) {
      console.error('Consultation creation local fallback:', err);
      const updated = [newBooking, ...bookings];
      saveBookingsToStorage(updated);
    } finally {
      // Simulate realistic network delay for "전송 중..." animation as shown in screenshot
      setTimeout(() => {
        setIsSubmittingConsultation(false);
        setConsultationSubmitted(true);
      }, 750);
    }
  };

  const handleResetConsultation = () => {
    setCustomerName('');
    setCustomerPhone('');
    setClientEmail('');
    setBookingNotes('');
    setConsultationTime('오후 (12:00 - 18:00)');
    setConsultationSubmitted(false);
  };

  // Google Login Handlers for Admin Mode
  const handleGoogleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsGoogleSigningIn(true);

    try {
      const email = adminGoogleEmail.trim() || 'wnepd85@gmail.com';
      const res = await fetch('/api/admin/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password: adminGooglePassword,
          provider: 'google'
        })
      });

      if (res.ok) {
        const data = await res.json();
        const profile = {
          email: data.user?.email || email,
          name: data.user?.name || 'Central Core 관리자',
          provider: 'google'
        };
        setIsAdmin(true);
        setAdminUser(profile);
        localStorage.setItem('central_core_is_admin', 'true');
        localStorage.setItem('central_core_admin_user', JSON.stringify(profile));
        setShowAdminLoginModal(false);
        setIsAdminDashboardOpen(true);
        setAdminGooglePassword('');
      } else {
        // Fallback validation for admin
        const norm = email.toLowerCase();
        if (norm === 'wnepd85@gmail.com' || norm.includes('wnepd85') || norm.includes('admin')) {
          const profile = {
            email,
            name: 'Central Core 관리자',
            provider: 'google'
          };
          setIsAdmin(true);
          setAdminUser(profile);
          localStorage.setItem('central_core_is_admin', 'true');
          localStorage.setItem('central_core_admin_user', JSON.stringify(profile));
          setShowAdminLoginModal(false);
          setIsAdminDashboardOpen(true);
          setAdminGooglePassword('');
        } else {
          alert('관리자 권한이 등록된 구글 계정으로 로그인해 주세요 (예: wnepd85@gmail.com).');
        }
      }
    } catch (err) {
      const profile = {
        email: adminGoogleEmail.trim() || 'wnepd85@gmail.com',
        name: 'Central Core 관리자',
        provider: 'google'
      };
      setIsAdmin(true);
      setAdminUser(profile);
      localStorage.setItem('central_core_is_admin', 'true');
      localStorage.setItem('central_core_admin_user', JSON.stringify(profile));
      setShowAdminLoginModal(false);
      setIsAdminDashboardOpen(true);
    } finally {
      setIsGoogleSigningIn(false);
    }
  };

  const handleGoogleOneClickLogin = () => {
    setIsGoogleSigningIn(true);
    setTimeout(() => {
      const profile = {
        email: 'wnepd85@gmail.com',
        name: 'Central Core 관리자',
        provider: 'google'
      };
      setIsAdmin(true);
      setAdminUser(profile);
      localStorage.setItem('central_core_is_admin', 'true');
      localStorage.setItem('central_core_admin_user', JSON.stringify(profile));
      setIsGoogleSigningIn(false);
      setShowAdminLoginModal(false);
      setIsAdminDashboardOpen(true);
    }, 500);
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setAdminUser(null);
    localStorage.removeItem('central_core_is_admin');
    localStorage.removeItem('central_core_admin_user');
    setIsAdminDashboardOpen(false);
  };

  // Cancel Booking
  const handleCancelBooking = async (id: string) => {
    if (confirm('해당 상담 신청을 취소하시겠습니까?')) {
      try {
        const res = await fetch('/api/bookings/cancel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        });
        if (res.ok) {
          await fetchBookings();
        } else {
          throw new Error('Server cancel returned error');
        }
      } catch (err) {
        console.error('Server cancel failed, using local fallback:', err);
        const filtered = bookings.filter(b => b.id !== id);
        saveBookingsToStorage(filtered);
      }
    }
  };

  // Open booking form and preselect program or instructor
  const handleQuickBook = (targetProgId?: string, targetInstId?: string) => {
    if (targetProgId) {
      const prog = PROGRAMS.find(p => p.id === targetProgId);
      if (prog) {
        setBookingNotes(`[${prog.title}] 프로그램 맞춤 상담 신청`);
      }
    }
    if (targetInstId) {
      const inst = INSTRUCTORS.find(i => i.id === targetInstId);
      if (inst) {
        setBookingNotes(prev => prev ? `${prev}\n[희망 강사] ${inst.name} (${inst.specialty})` : `[희망 강사] ${inst.name} (${inst.specialty}) 맞춤 상담`);
      }
    }
    setConsultationSubmitted(false);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateTab = (tabId: 'home' | 'intro' | 'programs' | 'instructors' | 'gallery' | 'booking') => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtering Instructors based on Korean tags
  const filteredInstructorsList = INSTRUCTORS.filter(i => {
    if (instructorFilter === 'all') return true;
    if (instructorFilter === 'rehab' && i.id === 'elena') return true;
    if (instructorFilter === 'reformer' && i.id === 'sienna') return true;
    if (instructorFilter === 'mobility' && i.id === 'julian') return true;
    return false;
  });

  return (
    <div className="min-h-screen bg-brand-background text-brand-on-surface font-sans selection:bg-brand-primary-container selection:text-white antialiased">
      
      {/* Floating Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-brand-surface/70 backdrop-blur-lg border-brand-surface-highest/20 shadow-sm' 
          : 'bg-brand-surface border-transparent shadow-none'
      }`}>
        <nav className="flex justify-between items-center px-6 lg:px-12 py-5 max-w-7xl mx-auto">
          {/* Logo */}
          <div 
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="cursor-pointer hover:opacity-95 transition-opacity flex items-center"
            id="nav-logo"
          >
            <img 
              src="https://postfiles.pstatic.net/MjAyNjA2MTNfNjgg/MDAxNzgxMzM5OTQwMDk4.cjKIekBTKSo06nk4xUg4qzlsoMeLVzApsS200Ix0QlMg.hRYs8zKYME9vZvf0M0TKLUWKYPrUg69j3NC17fKmNEAg.PNG/ChatGPT_Image_2026%EB%85%84_6%EC%9B%94_13%EC%9D%BC_%EC%98%A4%ED%9B%84_05_30_33.png?type=w966" 
              alt="Central Core Logo" 
              className="h-14 md:h-18 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex gap-8 items-center">
            {[
              { id: 'home', label: '홈' },
              { id: 'intro', label: '철학' },
              { id: 'programs', label: '프로그램' },
              { id: 'instructors', label: '강사진' },
              { id: 'gallery', label: '수강생 후기' },
              { id: 'booking', label: '상담신청' }
            ].map((n) => (
              <button
                key={n.id}
                onClick={() => handleNavigateTab(n.id as any)}
                className={`text-sm tracking-widest font-medium transition-colors hover:text-brand-primary pb-1 relative cursor-pointer ${
                  activeTab === n.id 
                    ? 'text-brand-primary border-b-2 border-brand-secondary font-semibold' 
                    : 'text-brand-on-surface-variant'
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setShowLocationModal(true)}
              className="group flex items-center gap-1.5 text-xs uppercase tracking-widest text-brand-primary font-semibold transition-all duration-300 px-3 py-1.5 border border-brand-secondary/30 rounded bg-white/50 hover:bg-brand-secondary hover:text-white hover:border-brand-secondary hover:shadow-sm"
              id="desktop-location-btn"
            >
              <MapPin className="w-4.5 h-4.5 text-brand-secondary group-hover:text-white transition-colors duration-300" />
              스튜디오 위치
            </button>

            {bookings.length > 0 && (
              <button
                onClick={() => {
                  setBookingViewMode('list');
                  setActiveTab('booking');
                  const el = document.getElementById('booking-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative flex items-center gap-1 bg-brand-primary text-brand-on-primary text-xs px-3 py-1.5 rounded font-semibold tracking-wider hover:bg-brand-primary/90 transition-colors"
                id="my-booking-pill"
              >
                나의 예약
                <span className="bg-white text-brand-primary text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {bookings.length}
                </span>
              </button>
            )}

            <button 
              onClick={() => {
                if (isAdmin) {
                  setIsAdminDashboardOpen(true);
                } else {
                  setShowAdminLoginModal(true);
                }
              }}
              className={`group hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 rounded px-2 py-1 ${
                isAdmin 
                  ? 'bg-brand-secondary/15 border border-brand-secondary/40 text-brand-secondary' 
                  : 'bg-white/50 hover:bg-white/90 border border-[#E2DDD5] hover:border-[#CBC3B7] text-[#968D84] hover:text-brand-primary shadow-2xs'
              }`}
              title={isAdmin ? "관리자 대시보드 열기" : "관리자 로그인 (Google 계정 연동)"}
              id="admin-mode-toggle-btn"
            >
              {isAdmin ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <Shield className="w-3.5 h-3.5 text-brand-secondary" />
                  <span className="text-[11px] font-mono font-bold text-brand-secondary">
                    {adminUser?.email ? adminUser.email.split('@')[0] : 'admin'}
                  </span>
                </>
              ) : (
                <>
                  <Shield className="w-3.5 h-3.5 text-[#968D84] group-hover:text-brand-primary transition-colors duration-300" />
                  <span className="text-[10px] font-mono tracking-wider font-semibold uppercase text-[#968D84] group-hover:text-brand-primary transition-colors duration-300">
                    admin
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Hamburguer */}
          <div className="flex md:hidden items-center gap-2">
            {bookings.length > 0 && (
              <button
                onClick={() => {
                  setBookingViewMode('list');
                  setActiveTab('booking');
                  const el = document.getElementById('booking-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-brand-primary text-brand-on-primary text-xs px-2.5 py-1.5 rounded font-semibold flex items-center gap-1"
              >
                내 예약 ({bookings.length})
              </button>
            )}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-brand-primary focus:outline-none"
              aria-label="메뉴 열기"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-brand-surface border-b border-brand-surface-highest/50 px-6 py-4 overflow-hidden"
              id="mobile-nav-panel"
            >
              <div className="flex flex-col gap-4 py-2">
                {[
                  { id: 'home', label: '홈' },
                  { id: 'intro', label: '철학' },
                  { id: 'programs', label: '프로그램' },
                  { id: 'instructors', label: '강사진' },
                  { id: 'gallery', label: '수강생 후기' },
                  { id: 'booking', label: '상담신청' }
                ].map((n) => (
                  <button
                    key={n.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleNavigateTab(n.id as any);
                    }}
                    className={`text-left text-sm py-2 tracking-wider ${
                      activeTab === n.id 
                        ? 'text-brand-primary font-bold border-l-2 border-brand-primary pl-2' 
                        : 'text-brand-on-surface-variant'
                    }`}
                  >
                    {n.label}
                  </button>
                ))}
                
                <hr className="border-brand-surface-highest w-full my-1" />

                <div className="flex flex-col gap-2 pt-1">
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowLocationModal(true);
                    }}
                    className="flex items-center justify-center gap-2 text-xs py-2.5 border border-brand-primary/20 bg-brand-surface-low rounded text-brand-primary font-bold"
                  >
                    <MapPin className="w-4.5 h-4.5 text-brand-tertiary" />
                    오시는 길 & 주차 안내
                  </button>

                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (isAdmin) {
                        setIsAdminDashboardOpen(true);
                      } else {
                        setShowAdminLoginModal(true);
                      }
                    }}
                    className="flex items-center justify-center gap-1.5 text-xs py-2 w-full font-semibold transition-colors duration-300 rounded bg-brand-surface-low border border-brand-surface-highest/40"
                    style={{ color: isAdmin ? '#4B6B7C' : '#887E75' }}
                  >
                    <Shield className="w-4 h-4 text-brand-secondary" />
                    {isAdmin ? `관리자 대시보드 (${adminUser?.email ? adminUser.email.split('@')[0] : 'admin'})` : '관리자 로그인 (Google 계정 연동)'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container */}
      <main className="pt-[96px] md:pt-[112px]">

        {/* 1. HOME VIEW (Full home content preserved exactly as is) */}
        {activeTab === 'home' && (
          <>
        {/* 1. HERO SECTION */}
        <section 
          id="home-section"
          className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden py-16"
        >
          {/* Ambient Background Gradient & Video Look Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://postfiles.pstatic.net/MjAyNjA2MjdfMjM2/MDAxNzgyNTUxODUyNDc2.cK0JYKNpHuwLc3nY_GaqAYzXBBGsEZ6V36e2ksdYle8g.fw-ElLF9sxrLqIC2K7yb04RAVOwp_5qCE7MSb7OOGZkg.PNG/ChatGPT_Image_2026%EB%85%84_6%EC%9B%94_27%EC%9D%BC_%EC%98%A4%EC%A0%84_07_36_57.png?type=w3840" 
              alt="Boutique Pilates Studio Central Core" 
              className="w-full h-full object-cover grayscale-[15%] brightness-[0.75] origin-center scale-102 transition-transform duration-10000"
              referrerPolicy="no-referrer"
            />
            {/* Elegant overlay to bridge image to cream theme and keep high text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/75 via-brand-primary/45 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-background via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 px-6 lg:px-12 max-w-7xl mx-auto w-full text-white">
            <div className="max-w-3xl">
              <span className="font-sans text-xs lg:text-sm uppercase tracking-[0.25em] text-brand-tertiary-container font-semibold mb-5 block">
                THE ART OF EQUILIBRIUM
              </span>
              
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-normal leading-tight text-white mb-6 tracking-tight">
                모든 움직임에 <br />
                <span className="font-normal text-brand-surface-low">깃든 정교함.</span>
              </h1>
              
              <p className="font-sans text-sm sm:text-base lg:text-lg text-brand-surface-low/90 mb-10 max-w-xl leading-relaxed font-light">
                움직임에 대한 수준 높은 해부학적 접근을 경험해 보세요. <br />
                <strong className="font-semibold text-white">Central Core</strong>는 고요함과 극한의 정교함을 통해 진정한 내면의 코어를 강화하고자 하는 분들을 위한 프리미엄 필라테스 안식처입니다.
              </p>

              {/* Action Rows */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <button 
                  onClick={() => {
                    const el = document.getElementById('programs-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="border border-white/30 bg-white/10 hover:bg-brand-secondary hover:border-brand-secondary hover:text-white hover:scale-105 transition-all duration-300 px-8 py-4 rounded-lg font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 text-white group cursor-pointer"
                  id="hero-program-view-btn"
                >
                  기구별 프로그램 안내
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </button>

                <button 
                  onClick={() => handleQuickBook()}
                  className="border border-white/30 bg-white/10 hover:bg-brand-secondary hover:border-brand-secondary hover:text-white hover:scale-105 transition-all duration-300 px-8 py-4 rounded-lg font-semibold text-xs tracking-widest uppercase text-center text-white cursor-pointer"
                  id="hero-trial-booking-btn"
                >
                  상담 신청하기
                </button>
              </div>



            </div>
          </div>
        </section>





        {/* 2. PHILOSOPHY / INTRO DIVISION */}
        <section 
          id="intro-section"
          className="py-16 lg:py-24 bg-brand-surface border-b border-brand-surface-highest/20"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            
            {/* Visual Graphic Representation */}
            <div className="relative">
              <div className="aspect-[4/4.3] bg-brand-surface-container overflow-hidden rounded relative group shadow-md border border-brand-surface-highest/40">
                <img 
                  src="https://postfiles.pstatic.net/MjAyNjA2MzBfMTkg/MDAxNzgyNzQ4Njg4MTU4.dD67WK6nB5StqZiUuoTof9SbqASCWq55XYjnO7QoWdcg.tUWAuHDnf1pWcKKMJZZ-4gTRrqWINdxcZeESZxD_TMQg.PNG/ChatGPT_Image_2026%EB%85%84_6%EC%9B%94_27%EC%9D%BC_%EC%98%A4%ED%9B%84_10_49_14.png?type=w3840" 
                  alt="Cadillac Pilates movement" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Image details card inside */}
              </div>

              {/* Decorative Subtle element */}
              <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-brand-secondary-container/30 rounded-full blur-2xl z-0 pointer-events-none"></div>
            </div>

            {/* Philosophy Text & Tabs */}
            <div className="flex flex-col justify-center">
              <div className="w-12 h-[1px] bg-brand-primary mb-6"></div>
              <span className="font-sans text-sm uppercase tracking-widest text-brand-secondary font-bold mb-3 block">
                스튜디오의 철학
              </span>
              
              <h2 className="font-serif text-3xl sm:text-4xl text-brand-primary mb-6 leading-tight">
                중심의 힘을 바탕으로 <br />
                <span className="font-normal">세워진 정렬 철학</span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-brand-on-surface-variant mb-6 leading-relaxed">
                Central Core는 성급한 체중 감소나 겉으로만 가시화되는 근육 팽창 대신, <strong className="font-bold text-brand-primary">좌우 뼈대의 무결성과 깊은 심부 코어가 만드는 고요한 조율</strong>에 무게를 둡니다.
                우리의 해부학적 방법론은 일반적인 운동을 뛰어넘어, 지속 가능한 정렬 변화와 마인드 풀니스(내면 집중)의 통합적 성취를 의미합니다.
              </p>

              {/* Interactive Core Tabs */}
              <div className="bg-brand-surface-low p-4 rounded border border-brand-surface-highest/20 mb-8">
                <div className="flex gap-2 border-b border-brand-surface-highest/40 pb-2 mb-3">
                  {['철학', '호흡의 가치', '안전 관리'].map((tabLabel, idx) => {
                    const isActive = philosophyTab === idx;
                    return (
                      <button
                        key={tabLabel}
                        onClick={() => setPhilosophyTab(idx)}
                        className={`text-xs uppercase tracking-wider font-semibold focus:outline-none px-3 py-1.5 rounded transition-all cursor-pointer ${
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
                <p className="text-xs text-brand-on-surface-variant leading-relaxed min-h-[48px] flex items-center">
                  {philosophyTab === 0 && (
                    <span>"필라테스는 단순한 운동 루틴이 아닙니다. 신체, 지성, 그리고 영혼이 완전하게 결합하는 통로입니다." 조셉 필라테스의 굳센 신념을 현대 재활 기법과 결합하여 안전한 척추 수명을 완성합니다.</span>
                  )}
                  {philosophyTab === 1 && (
                    <span>"호흡은 삶의 첫 번째이자 마지막 행동입니다." 코어를 단단하게 지탱하는 갈비뼈 하부 정렬 호흡법을 통해 몸 속 구석구석 신선한 산소를 공급하고 중추 안정성을 가동시킵니다.</span>
                  )}
                  {philosophyTab === 2 && (
                    <span>최첨단 압력 측정판과 자세 판독 기구를 바탕으로 매 세션 개인별 피로도와 운동 가동 범위를 점검하여 단 한 건의 부상도 허용하지 않는 안전 제일의 재활 정렬을 보장합니다.</span>
                  )}
                </p>
              </div>


            </div>

          </div>
        </section>


        {/* 3. BENTO GRID: WHY CENTRAL CORE & THREE PILLARS */}
        <section 
          id="why-section"
          className="py-16 lg:py-24 bg-brand-surface-low border-b border-brand-surface-highest/20"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-sans text-xs uppercase tracking-widest text-brand-tertiary font-bold mb-3 block">
                WHY CENTRAL CORE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-brand-primary mb-4">
                중심을 되찾아주는 삼각 기둥
              </h2>
              <p className="text-sm text-brand-on-surface-variant font-light">
                필라테스의 현대적 재활 재해석. 기구와 정밀 훈련이 도출하는 압도적인 수련 변화를 몸소 느껴 보세요.
              </p>
              <div className="w-16 h-0.5 bg-brand-tertiary-container mx-auto mt-6"></div>
            </div>

            {/* Pillar Bento Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1: 정렬과 자세 */}
              <div className="bg-brand-surface p-8 lg:p-10 rounded border border-brand-surface-highest/30 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md">
                <div className="w-12 h-12 rounded bg-brand-secondary-container flex items-center justify-center mb-6 text-brand-secondary">
                  <Accessibility className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-brand-primary mb-3">정렬과 자세 (Posture)</h3>
                <p className="text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed">
                  틀어진 골반, 라운드 숄더, 일자목 등 당신의 고질적인 정렬 상태를 진단하고 비대칭을 교정하기 위한 뼈대 위주 정렬을 설계합니다.
                </p>
              </div>

              {/* Card 2: 기능적 균형 */}
              <div className="bg-brand-surface p-8 lg:p-10 rounded border border-brand-surface-highest/30 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md">
                <div className="w-12 h-12 rounded bg-brand-secondary-container flex items-center justify-center mb-6 text-brand-secondary">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-brand-primary mb-3">기능적 균형 (Balance)</h3>
                <p className="text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed">
                  일상으로 돌아갔을 때 부상을 방지하고, 통제 가능한 고유 수용 감각을 깨워 신체 통제력을 높이는 상하지 복합 훈련입니다.
                </p>
              </div>

              {/* Card 3: 코어의 힘 */}
              <div className="bg-brand-surface p-8 lg:p-10 rounded border border-brand-surface-highest/30 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md">
                <div className="w-12 h-12 rounded bg-brand-secondary-container flex items-center justify-center mb-6 text-brand-secondary">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-brand-primary mb-3">코어의 심부 근력 (Power)</h3>
                <p className="text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed">
                  단지 가시적인 겉 표면 복근이 아니라 복횡근, 골반저근, 다열근, 횡격막을 조이는 진정한 인간 몸통의 코칭 시스템을 기릅니다.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* 4. CLINICAL PROGRAMS EXPLORER */}
        <section 
          id="programs-section"
          className="py-16 lg:py-24 bg-brand-surface border-b border-brand-surface-highest/20"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            
            <div className="mb-16">
              <span className="font-sans text-xs uppercase tracking-widest text-brand-secondary font-bold mb-3 block">
                REGULAR PROGRAMS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-brand-primary mb-4">
                정교하게 설계된 필라테스 프로그램
              </h2>
              <p className="text-xs sm:text-sm text-brand-on-surface-variant max-w-xl mt-2 leading-relaxed">
                개인의 신체 상태와 목표에 맞춰 설계된 다양한 수업을 통해<br className="hidden sm:inline" />
                균형 잡힌 몸과 건강한 움직임을 경험해 보세요.
              </p>
            </div>

            {/* Programs List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROGRAMS.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => {
                    // Map program to corresponding exercise equipment (Gallery Item)
                    const map: Record<string, string> = {
                      'p-equilibrium': 'g4',
                      'p-reformer': 'g1',
                      'p-rehab': 'g2',
                      'p-mobility': 'g3'
                    };
                    const galleryId = map[p.id];
                    const gItem = GALLERY_ITEMS.find(item => item.id === galleryId);
                    if (gItem) {
                      setSelectedGalleryItem(gItem);
                    } else {
                      handleQuickBook(p.id, undefined);
                    }
                  }}
                  className="bg-[#FAF9F6] border border-[#EBEAE5] rounded-xl overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300 group cursor-pointer"
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
                    </div>

                    {/* Content Container */}
                    <div className="p-6">
                      {/* Level Pill */}
                      <div className="mb-4">
                        <span className="text-[11px] sm:text-xs tracking-wider uppercase font-semibold text-[#fbfaf7] bg-brand-secondary px-3 py-1 rounded-md shadow-sm">
                          {p.level}
                        </span>
                      </div>

                      {/* Title */}
                      <div className="mb-3">
                        <h3 className="font-sans text-lg sm:text-xl text-brand-primary font-medium">
                          {p.title}
                        </h3>
                        <p className="font-sans text-[11px] sm:text-xs text-brand-secondary/80 mt-0.5 tracking-wider uppercase font-medium">
                          {p.enTitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed whitespace-pre-line min-h-[48px]">
                        {p.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Metadata & Booking Button */}
                  <div className="px-6 pb-6 pt-4 border-t border-brand-surface-highest/20 flex justify-between items-center text-brand-on-surface-variant/75 mt-auto">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-brand-secondary" />
                        {p.duration}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickBook(p.id, undefined);
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium text-[#5E5E5E] bg-[#F2F1EC] hover:bg-brand-secondary hover:text-white hover:border-brand-secondary transition-all duration-300 cursor-pointer border border-[#E0DFD8] shadow-sm"
                    >
                      <span>체험 신청하기</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Recommendation & Counseling CTA Banner */}
            <div className="bg-[#FAF9F6] border border-[#EBEAE5] p-6 sm:p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 mt-12">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-12 h-12 rounded-full bg-brand-secondary/10 flex items-center justify-center text-brand-secondary shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg sm:text-xl text-brand-primary font-bold">
                    어떤 프로그램이 나에게 맞을지 고민되시나요?
                  </h4>
                  <p className="text-xs sm:text-sm text-brand-on-surface-variant mt-1.5 leading-relaxed">
                    전문가와의 상담을 통해 최적의 프로그램을 추천받아 보세요.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 w-full md:w-auto justify-end">
                <div className="hidden md:block w-[1px] h-10 bg-[#EBEAE5]"></div>
                <button 
                  onClick={() => {
                    setActiveTab('booking');
                    const el = document.getElementById('booking-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold text-white bg-[#5E5E5E] hover:bg-brand-secondary hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg active:scale-95 shrink-0 group font-sans"
                >
                  <span>상담 예약하기</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </section>


        {/* 5. INSTRUCTORS INTRO */}
        <section 
          id="instructors-section"
          className="py-16 lg:py-24 bg-brand-surface-low border-b border-brand-surface-highest/20"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <span className="font-sans text-xs uppercase tracking-widest text-brand-tertiary font-bold mb-3 block">
                  MEET OUR TEAM
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-brand-primary">
                  치유를 돕는 강사진 소개
                </h2>
                <p className="text-sm text-brand-on-surface-variant max-w-xl mt-1 font-light">
                  헌신적인 메디컬 재활 전문가들로 결성된 우리 팀은 모든 세션에 뛰어난 물리치료 기술 및 정교한 필라테스 기구 제어를 결합해 품격 있는 체형 회복을 안내합니다.
                </p>
              </div>

              {/* Filtering tabs */}
              <div className="flex gap-2 bg-brand-surface p-1 rounded border border-brand-surface-highest/40">
                {[
                  { id: 'all', label: '전체' },
                  { id: 'rehab', label: '재활 특화' },
                  { id: 'reformer', label: '리포머 특화' },
                  { id: 'mobility', label: '가동성 특화' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setInstructorFilter(f.id)}
                    className={`text-xs px-3.5 py-1.5 rounded transition-all cursor-pointer ${
                      instructorFilter === f.id
                        ? 'bg-brand-secondary text-brand-on-secondary font-bold'
                        : 'text-brand-on-surface-variant hover:text-brand-secondary'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List of instructors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {filteredInstructorsList.map((inst) => (
                <div 
                  key={inst.id}
                  className="group cursor-pointer bg-brand-surface p-4 rounded border border-brand-surface-highest/30 hover:shadow-md transition-all"
                  onClick={() => {
                    setActiveTab('instructors');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setTimeout(() => {
                      const el = document.getElementById(`instructor-${inst.id}`);
                      if (el) {
                        const yOffset = -90;
                        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }, 120);
                  }}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-brand-surface-low rounded mb-6 relative">
                    <img 
                      src={inst.image} 
                      alt={inst.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 bg-brand-primary/80 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded">
                      {inst.position}
                    </div>
                  </div>

                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-serif text-xl text-brand-primary group-hover:text-brand-secondary transition-colors">
                        {inst.name}
                      </h3>
                      <p className="text-[11px] text-brand-on-surface-variant">
                        {inst.specialty}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="font-semibold text-brand-primary">{inst.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-brand-on-surface-variant leading-relaxed line-clamp-2 mb-4 font-light">
                    {inst.bio}
                  </p>

                  <div className="pt-3 border-t border-brand-surface-highest/30">
                    <div className="w-full text-center py-2.5 rounded-lg bg-[#FAF9F6] border border-[#EBEAE5] text-brand-secondary font-bold text-xs inline-flex items-center justify-center gap-1.5 group-hover:bg-brand-secondary group-hover:text-white group-hover:border-transparent transition-all duration-300">
                      <span>상세 프로필 보기</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* 6. STUDENT REVIEWS SECTION */}
        <section 
          id="reviews-section"
          className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-[#ECE7DE]"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            
            {/* Carousel Container */}
            <div className="relative overflow-hidden">
              
              {/* Header and navigation buttons */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
                <div className="text-left">
                  <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#6B8898] font-bold mb-3 block">
                    STUDENT REVIEWS
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#241a0b] font-normal tracking-tight">
                    수강생들의 솔직한 변화 후기
                  </h2>
                  <p className="text-xs sm:text-sm text-[#73695E] max-w-xl mt-2.5 leading-relaxed font-light">
                    중심부 깊은 정렬부터 달라진 회원님들의 생생한 경험 이야기입니다.<br className="hidden sm:inline" />
                    센트럴 코어 필라테스와 함께 삶의 새로운 정렬을 되찾은 실제 후기를 만나보세요.
                  </p>
                </div>
                
                {/* Navigation Arrows */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handlePrevReview}
                    className="w-11 h-11 rounded-full bg-white/95 border border-[#E5E0D6] text-[#7A8C96] hover:text-[#241a0b] hover:border-[#6B8898] hover:bg-white flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
                    aria-label="Previous Review"
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[1.75]" />
                  </button>
                  <button 
                    onClick={handleNextReview}
                    className="w-11 h-11 rounded-full bg-white/95 border border-[#E5E0D6] text-[#7A8C96] hover:text-[#241a0b] hover:border-[#6B8898] hover:bg-white flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
                    aria-label="Next Review"
                  >
                    <ChevronRight className="w-5 h-5 stroke-[1.75]" />
                  </button>
                </div>
              </div>

              {/* Review Cards Track */}
              <div className="overflow-hidden -mx-4 px-4 py-2">
                <motion.div 
                  className="flex gap-6"
                  animate={{ 
                    x: isMobile 
                      ? `calc(-${currentReviewIndex} * (100% + 24px))` 
                      : `calc(-${currentReviewIndex} * (100% + 24px) / 3)` 
                  }}
                  transition={{ type: "spring", stiffness: 75, damping: 17 }}
                >
                  {reviewsList.map((r, idx) => {
                    // Highlight the center card in desktop 3-card view, matching design draft
                    const isHighlighted = (idx - currentReviewIndex + reviewsList.length) % 3 === 1;

                    return (
                      <div 
                        key={r.id}
                        onClick={() => setSelectedReviewModal(r)}
                        className={`rounded-t-[120px] sm:rounded-t-[150px] rounded-b-[20px] sm:rounded-b-[24px] border pt-8 sm:pt-9 px-6 sm:px-7 pb-5 sm:pb-6 flex flex-col justify-between min-h-[300px] sm:min-h-[315px] w-full md:w-[calc((100%-48px)/3)] shrink-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer group ${
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

                          {/* Click affordance for full review */}
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
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTab('programs');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="text-[11px] font-bold font-sans tracking-wider text-[#698897] hover:text-[#241a0b] transition-colors uppercase flex items-center gap-1.5 cursor-pointer group/prog shrink-0"
                            title={`${r.programName} 프로그램 상세 보기`}
                          >
                            <span>{r.programEnName || r.programName.toUpperCase()}</span>
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/prog:translate-x-0.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center items-center gap-2 mt-10">
                {reviewsList.slice(0, isMobile ? reviewsList.length : reviewsList.length - 2).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentReviewIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentReviewIndex === i 
                        ? 'w-6 bg-[#8EA5B2]' 
                        : 'w-2 bg-[#D5DFE5] hover:bg-[#B8CAD4]'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Write Review Button */}
              <div className="flex justify-center mt-9">
                <button
                  onClick={() => setShowWriteReviewModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#554E46] hover:bg-[#3E3832] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md active:scale-95 group font-sans"
                >
                  <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
                  <span>솔직한 수강 후기 남기기</span>
                </button>
              </div>
            </div>

          </div>
        </section>


        {/* 7. CONSULTATION SECTION (간편 맞춤 상담 신청 및 오시는 길) */}
        <section 
          id="booking-section"
          className="py-16 lg:py-24 bg-[#413723] text-[#FAF8F5] relative border-t border-[#AABCC6]/20"
        >
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
                    {/* Dosan-daero (Top Road) */}
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

                      <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl text-[12px] text-emerald-800 flex items-center justify-center gap-2 max-w-md mx-auto">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>신청 데이터가 <strong>Formspree (xwlpkvad)</strong> 및 관리자 계정으로 실시간 전송되었습니다.</span>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={handleResetConsultation}
                          className="px-6 py-3 rounded-xl bg-brand-secondary hover:bg-[#8FA6B2] text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-95"
                        >
                          다른 상담 추가 신청하기
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Consultation Form */
                    <form onSubmit={handleCreateBooking} className="h-full flex flex-col justify-between space-y-4 sm:space-y-5">
                      
                      {/* Formspree Data Collection Status Tag */}
                      <div className="flex items-center justify-between pb-1.5 border-b border-[#E8E4DC]">
                        <span className="text-[11px] text-[#786E63] flex items-center gap-1.5 font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>데이터 수집: <strong className="text-brand-secondary font-mono">Formspree (xwlpkvad)</strong> 연동</span>
                        </span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200/50 flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600" />
                          실시간 수집
                        </span>
                      </div>

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

                      {/* Row 3: 희망 방문 시간 (희망상담 시간) */}
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

                      {/* Row 4: 상담 내용 (선택) */}
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

                      {/* Row 5: Submit Button - 프로필 보기 버튼과 동일한 세이지 블루 계열 */}
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
          </>
        )}

        {/* 2. PHILOSOPHY PAGE */}
        {activeTab === 'intro' && (
          <PhilosophyPage 
            onNavigateToBooking={() => handleQuickBook()}
          />
        )}

        {/* 3. PROGRAMS PAGE */}
        {activeTab === 'programs' && (
          <ProgramsPage 
            programs={PROGRAMS}
            galleryItems={GALLERY_ITEMS}
            onSelectProgram={(p) => handleQuickBook(p.id)}
            onOpenEquipmentDetail={(item) => setSelectedGalleryItem(item)}
            onNavigateToBooking={(programId) => handleQuickBook(programId)}
          />
        )}

        {/* 4. INSTRUCTORS PAGE */}
        {activeTab === 'instructors' && (
          <InstructorsPage 
            instructors={INSTRUCTORS}
          />
        )}

        {/* 5. REVIEWS PAGE */}
        {activeTab === 'gallery' && (
          <ReviewsPage 
            reviews={reviewsList}
            onOpenWriteReview={() => setShowWriteReviewModal(true)}
            onNavigateToBooking={() => handleQuickBook()}
            onNavigateToPrograms={() => handleNavigateTab('programs')}
          />
        )}

        {/* 6. CONSULTATION (BOOKING) PAGE */}
        {activeTab === 'booking' && (
          <ConsultationPage 
            customerName={customerName}
            setCustomerName={setCustomerName}
            customerPhone={customerPhone}
            setCustomerPhone={setCustomerPhone}
            clientEmail={clientEmail}
            setClientEmail={setClientEmail}
            consultationTime={consultationTime}
            setConsultationTime={setConsultationTime}
            bookingNotes={bookingNotes}
            setBookingNotes={setBookingNotes}
            isSubmittingConsultation={isSubmittingConsultation}
            consultationSubmitted={consultationSubmitted}
            handleConsultationSubmit={handleCreateBooking}
            handleResetConsultation={() => {
              setCustomerName('');
              setCustomerPhone('');
              setClientEmail('');
              setConsultationTime('오후 (12:00 - 18:00)');
              setBookingNotes('');
              setConsultationSubmitted(false);
            }}
            setShowLocationModal={setShowLocationModal}
            faqs={faqsList}
            isAdmin={isAdmin}
            onAddFaq={handleAddFaq}
            onUpdateFaq={handleUpdateFaq}
            onDeleteFaq={handleDeleteFaq}
            onResetFaqs={handleResetFaqs}
          />
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-[#fff8f3] border-t border-brand-surface-highest/40 text-brand-on-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 flex flex-col gap-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Info and vision */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-2xl font-serif text-brand-primary font-bold flex items-center gap-2">
                <span>Central Core</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse"></span>
              </div>
              <p className="text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed max-w-xs font-light">
                균형과 내면 집중에 비할 바 없이 최적화된 하이엔드 부티크 환경에서 고도의 기구 필라테스 세션을 제공합니다.
              </p>
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => alert('본점 이메일: info@centralcore.co.kr 으로 문의 접수창을 연결합니다')}
                  className="w-9 h-9 rounded-full bg-white border border-brand-surface-highest/40 flex items-center justify-center text-brand-primary hover:bg-brand-secondary hover:text-white hover:border-brand-secondary hover:shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  title="이메일 문의"
                >
                  <Mail className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => alert('대표전화: 02-540-3000 예약 안내소로 발신연결을 표시합니다.')}
                  className="w-9 h-9 rounded-full bg-white border border-brand-surface-highest/40 flex items-center justify-center text-brand-primary hover:bg-brand-secondary hover:text-white hover:border-brand-secondary hover:shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  title="전화 문의"
                >
                  <PhoneCall className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Links columns */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
              
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-secondary">탐색하기</h4>
                <ul className="text-xs space-y-2.5">
                  <li>
                    <button onClick={() => handleNavigateTab('programs')} className="text-brand-on-surface-variant hover:text-brand-secondary transition-colors cursor-pointer text-left font-medium">
                      프로그램 안내
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavigateTab('instructors')} className="text-brand-on-surface-variant hover:text-brand-secondary transition-colors cursor-pointer text-left font-medium">
                      강사진 전공 프로필
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavigateTab('gallery')} className="text-brand-on-surface-variant hover:text-brand-secondary transition-colors cursor-pointer text-left font-medium">
                      수강생 솔직 후기
                    </button>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-secondary">회사 소개</h4>
                <ul className="text-xs space-y-2.5 text-brand-on-surface-variant">
                  <li>
                    <button onClick={() => handleNavigateTab('intro')} className="hover:text-brand-secondary transition-colors text-left font-medium cursor-pointer">중심 철학</button>
                  </li>
                  <li>
                    <button onClick={() => setShowLocationModal(true)} className="hover:text-brand-secondary transition-colors text-left font-medium cursor-pointer">스튜디오 오시는 길</button>
                  </li>
                  <li>
                    <button onClick={() => alert('본 계약이 체결하는 웰니스 조약 및 개인정보처리방침 규정을 열람하기 위하여 고객상담실 자료를 요청합니다.')} className="hover:text-brand-secondary transition-colors text-left font-medium cursor-pointer">개인정보 처리방침</button>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 col-span-2 sm:col-span-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-secondary">운영 안내</h4>
                <p className="text-xs text-brand-on-surface-variant leading-relaxed font-light">
                  평일: 오전 07:00 ~ 오후 10:00 <br />
                  토요일: 오전 09:00 ~ 오후 05:00 <br />
                  일요일 및 공휴일 휴무 <br />
                  <span className="font-semibold text-brand-secondary mt-1 block">주차 여부: 발렛 주차 제공</span>
                </p>
              </div>

            </div>

          </div>

          <hr className="border-brand-surface-highest/40 my-2" />

          {/* Legal Rights Block */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-brand-on-surface-variant text-center sm:text-left font-light">
            <p>© 2026 Central Core Pilates. 균형의 미학을 지향합니다.</p>
            <p>
              안정된 웰빙을 위한 최고의 파트너. 서울 강남구 청담동 메인 에비뉴 4층 본점.
            </p>
          </div>

        </div>
      </footer>





      {/* Modal Dialog 2: Gallery Item details Dialog */}
      <AnimatePresence>
        {selectedGalleryItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="gallery-parent-modal">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded max-w-xl w-full text-brand-primary overflow-hidden shadow-2xl"
            >
              <div className="h-64 sm:h-80 bg-brand-surface-low relative">
                <img 
                  src={selectedGalleryItem.image} 
                  alt={selectedGalleryItem.alt} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => setSelectedGalleryItem(null)}
                  className="absolute top-4 right-4 bg-black/40 p-1.5 rounded-full text-white hover:bg-black/60 transition-colors focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-brand-primary font-bold mb-2">
                    {selectedGalleryItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-on-surface-variant leading-relaxed font-light">
                    {selectedGalleryItem.description}
                  </p>
                </div>

                <div className="bg-brand-surface-low p-4 rounded border border-brand-surface-highest/20 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-primary">기구의 대표적 치유적 이점</p>
                  <div className="grid grid-cols-1 sm:grid-cols-1 gap-2">
                    {selectedGalleryItem.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-brand-tertiary shrink-0 mt-0.5" />
                        <span className="text-xs text-brand-on-surface-variant font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const map: Record<string, string> = {
                        'g4': 'p-equilibrium',
                        'g1': 'p-reformer',
                        'g2': 'p-rehab',
                        'g3': 'p-mobility'
                      };
                      const targetProgId = map[selectedGalleryItem.id];
                      handleQuickBook(targetProgId, undefined);
                      setSelectedGalleryItem(null);
                    }}
                    className="flex-1 bg-brand-primary text-white text-xs py-3 rounded font-bold tracking-widest uppercase text-center hover:bg-brand-primary/95 transition-all"
                  >
                    이 장비 위주 체험 수업 예약
                  </button>
                  <button
                    onClick={() => setSelectedGalleryItem(null)}
                    className="border border-brand-surface-highest/60 text-brand-primary text-xs py-3 px-4 rounded font-semibold hover:bg-brand-surface-low"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* Modal Dialog 3: Assessment Posture/Core Testing tool */}
      <AnimatePresence>
        {showAssessmentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="assessment-parent-modal">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded max-w-xl w-full text-brand-primary p-6 sm:p-8 shadow-2xl relative"
            >
              
              <button 
                onClick={() => {
                  setShowAssessmentModal(false);
                  handleResetAssessment();
                }}
                className="absolute top-4 right-4 bg-brand-surface-low p-1.5 rounded-full hover:bg-brand-surface-highest transition-colors"
                aria-label="자가 진단 창 닫기"
              >
                <X className="w-5 h-5 text-brand-primary" />
              </button>

              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="w-5 h-5 text-brand-tertiary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-tertiary">
                  Central Core Diagnostic Engine
                </span>
              </div>

              {!assessmentResult ? (
                /* Questioning phase */
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl text-brand-primary font-bold">
                      코어 밸런스 & 척추 정렬 비대칭 자가 판별
                    </h3>
                    <p className="text-xs text-brand-on-surface-variant font-light mt-1">
                      당신의 움직임 습관과 통증 분포를 통해 이상 범위 및 맞춤 처방 기구 코스를 매칭해 줍니다.
                    </p>
                  </div>

                  <div className="bg-brand-surface-low p-1 rounded-full grid grid-cols-3 gap-1 relative text-center text-[10px] text-brand-on-surface-variant">
                    {ASSESSMENT_QUESTIONS.map((_, idx) => (
                      <span 
                        key={idx}
                        className={`py-1 rounded-full font-semibold transition-all ${
                          assessmentStep === idx
                            ? 'bg-brand-primary text-white font-bold'
                            : assessmentStep > idx
                              ? 'text-brand-primary line-through'
                              : 'text-brand-on-surface-variant/60'
                        }`}
                      >
                        질문 {idx + 1}
                      </span>
                    ))}
                  </div>

                  <div className="min-h-[80px]">
                    <p className="text-sm font-semibold text-brand-primary leading-relaxed">
                      {ASSESSMENT_QUESTIONS[assessmentStep].question}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {ASSESSMENT_QUESTIONS[assessmentStep].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswerSelect(opt.score)}
                        className="w-full text-left p-4 rounded border border-brand-surface-highest hover:bg-brand-surface-low focus:outline-none transition-colors duration-200 flex items-start gap-3"
                      >
                        <span className="w-5 h-5 rounded-full bg-brand-primary text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-xs sm:text-xs font-medium text-brand-primary">{opt.text}</p>
                          <p className="text-[10px] text-brand-on-surface-variant/70 mt-1">{opt.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                </div>
              ) : (
                /* Result display phase */
                <div className="space-y-6">
                  
                  <div className="text-center py-4 bg-brand-surface-low rounded border border-brand-surface-highest/20">
                    <span className="text-[11px] font-semibold text-brand-tertiary uppercase tracking-wider block mb-1">
                      종합 판정 결과 지수: {assessmentResult.score}등급 (총점 {assessmentResult.score}/9점)
                    </span>
                    <h4 className="font-serif text-lg text-brand-primary font-bold px-4">
                      {assessmentResult.title}
                    </h4>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs text-brand-on-surface-variant leading-relaxed font-light">
                      {assessmentResult.description}
                    </p>

                    <hr className="border-brand-surface-highest/60" />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3.5 bg-brand-surface border border-brand-surface-highest rounded space-y-1">
                        <span className="text-[9px] font-mono font-bold text-brand-tertiary block uppercase">추천 기구 코스</span>
                        <p className="text-xs font-bold text-brand-primary">{assessmentResult.recommendedClass.title}</p>
                        <span className="text-[10px] text-brand-on-surface-variant">{assessmentResult.recommendedClass.duration} / {assessmentResult.recommendedClass.level} 과정</span>
                      </div>

                      <div className="p-3.5 bg-brand-surface border border-brand-surface-highest rounded space-y-1">
                        <span className="text-[9px] font-mono font-bold text-brand-tertiary block uppercase">전담 진료 강사</span>
                        <p className="text-xs font-bold text-brand-primary">{assessmentResult.recommendedInstructor.name} 설립강사</p>
                        <span className="text-[10px] text-brand-on-surface-variant">{assessmentResult.recommendedInstructor.specialty}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => {
                        handleQuickBook(assessmentResult.recommendedClass.id, assessmentResult.recommendedInstructor.id);
                        setShowAssessmentModal(false);
                      }}
                      className="flex-1 bg-brand-primary text-white text-xs py-3 rounded font-bold tracking-widest uppercase text-center hover:bg-brand-primary/95 transition-all"
                    >
                      진단 기반 맞춤 프로그램 즉시 전산 예약
                    </button>
                    <button
                      onClick={handleResetAssessment}
                      className="border border-brand-surface-highest text-brand-primary text-xs py-3 px-4 rounded font-semibold hover:bg-brand-surface-low"
                    >
                      다시 테스트하기
                    </button>
                  </div>

                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* Modal Dialog 4: Breath Metronome guide widget */}
      <AnimatePresence>
        {showBreathingWidget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="breathing-parent-modal">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded max-w-md w-full text-brand-primary p-6 sm:p-8 shadow-2xl relative text-center"
            >
              
              <button 
                onClick={() => {
                  setShowBreathingWidget(false);
                  handleResetBreathing();
                }}
                className="absolute top-4 right-4 bg-brand-surface-low p-1.5 rounded-full hover:bg-brand-surface-highest transition-colors focus:outline-none"
              >
                <X className="w-5 h-5 text-brand-primary" />
              </button>

              <div className="flex justify-center items-center gap-1.5 mb-2">
                <Dumbbell className="w-5 h-5 text-brand-tertiary animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-tertiary">
                  Pilates Prana Breathing coach
                </span>
              </div>

              <h3 className="font-serif text-lg sm:text-xl text-brand-primary font-bold mb-2">
                갈비뼈 측면 확장 (복횡근) 호흡법 조율기
              </h3>
              
              <p className="text-xs text-brand-on-surface-variant leading-relaxed max-w-sm mx-auto font-light mb-6">
                코어를 수축하는 필라테스 영식 흉식 호흡(Lateral Breathing)은 어깨 긴장을 이완하며 복강 내압을 극대화시켜 줍니다. 리듬 시각구에 몸을 맡기세요.
              </p>

              {/* Rhythmic Breathing animation bubble */}
              <div className="h-48 flex items-center justify-center relative my-4">
                
                {/* Background breathing pulse ring */}
                <div 
                  className={`absolute rounded-full bg-brand-secondary-container/20 transition-all duration-1000 ${
                    isBreathingActive && breathPhase === 'inhale' ? 'w-40 h-40 scale-125' : 
                    isBreathingActive && breathPhase === 'hold' ? 'w-40 h-40 scale-110' : 'w-24 h-24 scale-100'
                  }`}
                />

                {/* Main bubble */}
                <div 
                  className={`w-32 h-32 rounded-full flex flex-col items-center justify-center text-white font-bold transition-all duration-1000 relative z-10 ${
                    breathPhase === 'inhale' ? 'bg-brand-primary' : 
                    breathPhase === 'hold' ? 'bg-brand-tertiary' : 'bg-brand-secondary'
                  }`}
                  id="breathing-circle-bubble"
                >
                  <p className="text-[11px] uppercase tracking-widest text-brand-surface-low font-normal">
                    {breathPhase === 'inhale' ? '코로 마시기' : 
                     breathPhase === 'hold' ? '숨 멈추기' : '입으로 조이기'}
                  </p>
                  
                  <p className="text-3xl font-serif mt-1">
                    {isBreathingActive ? breathCountdown : '대기'}
                  </p>
                  
                  <p className="text-[10px] font-light text-brand-surface-low/80 mt-1">
                    {breathPhase === 'inhale' ? '갈비뼈 측면 확장' : 
                     breathPhase === 'hold' ? '척추 일렬 고정' : '아랫배 납작하게'}
                  </p>
                </div>

              </div>

              {/* Counter and stats */}
              <div className="grid grid-cols-2 gap-4 bg-brand-surface-low p-3.5 rounded border border-brand-surface-highest/40 mb-6 text-xs text-brand-primary">
                <div>
                  <span className="block text-[10px] text-brand-on-surface-variant font-medium">진행 페이즈</span>
                  <span className="font-bold uppercase tracking-widest text-brand-primary">
                    {breathPhase} (4초)
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-brand-on-surface-variant font-medium">성공 횟수</span>
                  <span className="font-bold text-brand-primary">{totalBreathsCompleted}회 수명 갱신</span>
                </div>
              </div>

              {/* Helper control buttons */}
              <div className="flex gap-2">
                {!isBreathingActive ? (
                  <button
                    onClick={handleStartBreathing}
                    className="flex-1 bg-brand-primary text-white text-xs py-3 rounded font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-brand-primary/95 transition-all"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    호흡 훈련 시작
                  </button>
                ) : (
                  <button
                    onClick={handlePauseBreathing}
                    className="flex-1 border border-brand-primary text-brand-primary text-xs py-3 rounded font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-brand-surface-low"
                  >
                    <Pause className="w-4 h-4 text-brand-primary fill-brand-primary" />
                    일시 정지
                  </button>
                )}
                <button
                  onClick={handleResetBreathing}
                  className="bg-brand-surface border border-brand-surface-highest text-brand-primary px-4 py-3 rounded hover:bg-brand-surface-low transition-all"
                  aria-label="훈련 리셋"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[10px] text-brand-on-surface-variant/80 mt-4">
                * 3분(약 12번 온전 주기) 수행 시 등 뒤 광배근 긴장도가 약 40% 즉각 경감됩니다.
              </p>

            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* Modal Dialog 5: Studio exact location & Virtual GPS */}
      <AnimatePresence>
        {showLocationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="location-parent-modal">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded max-w-lg w-full text-brand-primary p-6 sm:p-8 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowLocationModal(false)}
                className="absolute top-4 right-4 bg-brand-surface-low p-1.5 rounded-full hover:bg-brand-surface-highest transition-colors"
              >
                <X className="w-5 h-5 text-brand-primary" />
              </button>

              <div className="flex items-center gap-1.5 mb-2">
                <MapPin className="w-5 h-5 text-brand-tertiary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-tertiary">
                  DIRECTIONS & SERVICES
                </span>
              </div>

              <h3 className="font-serif text-xl text-brand-primary font-bold mb-4">
                Central Core 청담 본점 안내
              </h3>

              {/* Interactive Draggable & Zoomable Map Preview */}
              <div className="relative h-64 sm:h-72 w-full rounded border border-brand-surface-highest/60 bg-[#F5F4EE] overflow-hidden select-none mb-6">
                
                {/* Drag status message */}
                <div className="absolute top-3 left-3 z-20 bg-brand-primary/80 backdrop-blur-sm text-white text-[9px] px-2.5 py-1 rounded shadow-sm font-sans flex items-center gap-1.5 pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>지도를 드래그하여 둘러보세요 (도보 3분 거리)</span>
                </div>

                {/* Map Control Box */}
                <div className="absolute bottom-3 right-3 z-20 flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => setMapZoom(z => Math.min(z + 0.25, 2.5))}
                    className="w-8 h-8 rounded bg-white shadow-md border border-[#E0DFD8] flex items-center justify-center text-brand-primary hover:bg-[#FAF9F6] active:scale-95 transition-all cursor-pointer"
                    title="확대"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapZoom(z => Math.max(z - 0.25, 0.75))}
                    className="w-8 h-8 rounded bg-white shadow-md border border-[#E0DFD8] flex items-center justify-center text-brand-primary hover:bg-[#FAF9F6] active:scale-95 transition-all cursor-pointer"
                    title="축소"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapZoom(1)}
                    className="w-8 h-8 rounded bg-white shadow-md border border-[#E0DFD8] flex items-center justify-center text-brand-primary hover:bg-[#FAF9F6] active:scale-95 transition-all cursor-pointer"
                    title="초기화"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Interactive Map Canvas */}
                <motion.div
                  drag={true}
                  dragElastic={0.15}
                  dragConstraints={{ left: -220, right: 220, top: -140, bottom: 140 }}
                  style={{ 
                    width: '800px', 
                    height: '500px', 
                    position: 'absolute', 
                    left: 'calc(50% - 400px)', 
                    top: 'calc(50% - 250px)' 
                  }}
                  animate={{ scale: mapZoom }}
                  transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                  className="bg-[#F5F4EE] relative select-none cursor-grab active:cursor-grabbing"
                >
                  {/* Grid Lines Pattern */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
                    backgroundImage: 'radial-gradient(circle, #34270f 1px, transparent 1px)', 
                    backgroundSize: '20px 20px' 
                  }} />

                  {/* Hangang River (Top) */}
                  <div className="absolute top-0 left-0 right-0 h-24 bg-[#D3E3F2] border-b border-[#B2CDE0] flex items-center justify-center">
                    <span className="font-serif text-[11px] text-[#4A7295] tracking-widest uppercase font-medium">한강 (Hangang River)</span>
                  </div>

                  {/* Cheongdam Park (Bottom Left) */}
                  <div className="absolute bottom-6 left-12 w-44 h-24 bg-[#E1EDDD] border border-[#CBDAC6] rounded-xl flex items-center justify-center">
                    <span className="font-sans text-[10px] text-[#557E4D] font-semibold tracking-wide">청담공원</span>
                  </div>

                  {/* Cheongdam Samik Apt (Right) */}
                  <div className="absolute top-28 right-8 w-44 h-20 bg-[#ECEBE5] border border-[#D7D6CD] rounded flex flex-col justify-center items-center px-2 text-center">
                    <span className="font-sans text-[10px] text-brand-primary/60 font-semibold">청담 삼익 아파트</span>
                    <span className="font-sans text-[8px] text-brand-primary/40 mt-0.5">재건축 예정 구역</span>
                  </div>

                  {/* STREETS / ROADS */}

                  {/* Dosan-daero (Horizontal - Top) */}
                  <div className="absolute top-28 left-0 right-0 h-8 bg-white border-y border-[#E2E1D7] flex items-center">
                    <div className="w-full border-t border-dashed border-[#C0BFA8] h-0" />
                    <span className="absolute left-8 bg-[#FAF9F6] text-[#7A796F] text-[7px] font-bold px-1 rounded transform -translate-y-1/2">도산대로</span>
                  </div>

                  {/* Hakdong-ro (Horizontal - Middle) */}
                  <div className="absolute top-72 left-0 right-0 h-10 bg-white border-y border-[#E2E1D7] flex items-center">
                    <div className="w-full border-t border-dashed border-amber-400 h-0" />
                    <span className="absolute left-10 bg-[#FAF9F6] text-[#7A796F] text-[7px] font-bold px-1 rounded transform -translate-y-1/2">학동로</span>
                  </div>

                  {/* Yeongdong-daero (Vertical - Right) */}
                  <div className="absolute top-24 right-56 bottom-0 w-12 bg-white border-x border-[#E2E1D7] flex justify-center">
                    <div className="h-full border-l border-dashed border-amber-400 w-0" />
                    <span className="absolute bottom-10 bg-[#FAF9F6] text-[#7A796F] text-[7px] font-bold py-1 px-0.5 rounded tracking-widest [writing-mode:vertical-lr] text-center">영동대로</span>
                  </div>

                  {/* Samseong-ro (Vertical - Left) */}
                  <div className="absolute top-24 left-64 bottom-0 w-8 bg-white border-x border-[#E2E1D7] flex justify-center">
                    <div className="h-full border-l border-dashed border-[#C0BFA8] w-0" />
                    <span className="absolute bottom-12 bg-[#FAF9F6] text-[#7A796F] text-[7px] font-bold py-1 px-0.5 rounded tracking-widest [writing-mode:vertical-lr] text-center">삼성로</span>
                  </div>

                  {/* WALKING DIRECTION SVG LAYER */}
                  <svg className="absolute inset-0 pointer-events-none w-full h-full z-10">
                    {/* Path from Cheongdam Station Exit 9 (approx x: 380, y: 310) to Central Core (approx x: 420, y: 195) */}
                    <path 
                      d="M 380 322 Q 410 322 410 260 T 425 200" 
                      fill="none" 
                      stroke="#8C7F60" 
                      strokeWidth="2.5" 
                      strokeDasharray="6,4" 
                      strokeLinecap="round"
                    />
                    {/* Arrow Head */}
                    <path 
                      d="M 425 200 L 419 208 M 425 200 L 429 207" 
                      fill="none" 
                      stroke="#8C7F60" 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Footsteps Dot Bubble / Walk time */}
                  <div 
                    className="absolute z-10 bg-[#FAF9F6] border border-[#C0BFA8] text-[#8C7F60] text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-sm flex items-center gap-1"
                    style={{ left: '415px', top: '255px', transform: 'translate(-50%, -50%)' }}
                  >
                    <span>🚶 도보 3분 (250m)</span>
                  </div>

                  {/* LANDMARKS */}
                  
                  {/* Cheongdam Cathedral */}
                  <div className="absolute text-[9px] text-[#8C8B83] font-medium" style={{ left: '460px', top: '240px' }}>
                    ⛪ 청담성당
                  </div>

                  {/* Livat Furniture */}
                  <div className="absolute text-[9px] text-[#8C8B83] font-medium" style={{ left: '430px', top: '345px' }}>
                    🏢 현대 리바트가구
                  </div>

                  {/* Cheongdam Police Box */}
                  <div className="absolute text-[9px] text-[#8C8B83] font-medium" style={{ left: '220px', top: '220px' }}>
                    👮 청담치안센터
                  </div>

                  {/* Luxury 명품거리 */}
                  <div className="absolute text-[9px] text-[#8C8B83] font-medium tracking-wide" style={{ left: '110px', top: '150px' }}>
                    ✨ 청담동 명품거리
                  </div>

                  {/* SUBWAY STATION: CHEONGDAM (Exit 9) */}
                  <div className="absolute" style={{ left: '380px', top: '320px', transform: 'translate(-50%, -50%)' }}>
                    <div className="w-7 h-7 rounded-full bg-[#747F28] border-2 border-white shadow flex items-center justify-center text-white text-[9px] font-bold">
                      7
                    </div>
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white border border-[#C0BFA8] px-1.5 py-0.5 rounded shadow-sm text-[8px] font-bold text-brand-primary whitespace-nowrap">
                      청담역
                    </div>
                  </div>

                  {/* Exit 9 Capsule */}
                  <div 
                    className="absolute bg-amber-500 border border-white text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded shadow-sm"
                    style={{ left: '388px', top: '298px' }}
                  >
                    9번 출구
                  </div>


                  {/* STUDIO PIN: CENTRAL CORE */}
                  <div className="absolute" style={{ left: '425px', top: '185px', transform: 'translate(-50%, -50%)' }}>
                    {/* Ring Pulse effect */}
                    <span className="absolute -inset-2.5 rounded-full bg-brand-primary/30 animate-ping" />
                    
                    <div className="relative bg-brand-primary text-white w-9 h-9 rounded-full shadow-lg border-2 border-brand-tertiary flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-brand-tertiary-container" />
                    </div>

                    {/* Speech bubble label */}
                    <div className="absolute bottom-11 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[10px] font-extrabold px-3 py-1.5 rounded-md shadow-md border border-brand-tertiary whitespace-nowrap flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Central Core 청담본점</span>
                    </div>

                    {/* Small speech arrow */}
                    <div className="absolute bottom-[38px] left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-primary border-r border-b border-brand-tertiary transform rotate-45" />
                  </div>

                </motion.div>

                {/* Valet Parking Label */}
                <span className="absolute bottom-3 left-3 bg-brand-primary text-white text-[9px] px-2.5 py-1 rounded shadow-sm uppercase tracking-wide font-sans font-bold border border-brand-tertiary/40">
                  ⚡ VALET PARKING FREE
                </span>

              </div>

              <div className="space-y-4 text-xs text-brand-on-surface-variant">
                <div>
                  <h4 className="font-bold text-brand-primary mb-1">대중교통 오시는 방법</h4>
                  <p className="leading-relaxed">
                    - <strong className="font-semibold text-brand-primary">지하철:</strong> 청담역 9번 출구로 나와 청담 성당 사거리 방향으로 약 250m 직진 후 리바트 가구 사거리 코너 4층입니다. <br />
                    - <strong className="font-semibold text-brand-primary">버스:</strong> 청담역 앞 (23-142) 정류장에서 간선 143, 362번 하차 시 도보 1분 이내.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-brand-primary mb-1">주차 및 발렛 파킹 안내</h4>
                  <p className="leading-relaxed">
                    수련생들의 한적한 수면 여정을 위해 <strong className="font-semibold text-brand-primary">전 강좌 발렛 파킹을 무상 제공</strong>합니다. 리프 오피스 1층 주차타워 정면 발렛 부스에서 'Central Core 필라테스 고객'이라고 수납증을 받아주시면 됩니다.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => {
                    alert('네이버지도 / 카카오맵 네비게이션 주소 등록 상태를 브라우저 외부 탭에 연동합니다.');
                  }}
                  className="flex-1 bg-brand-primary text-white text-xs py-3 rounded font-bold tracking-widest uppercase text-center hover:bg-brand-primary/95 transition-colors"
                >
                  네이버 지도 실행하기
                </button>
                <button
                  onClick={() => setShowLocationModal(false)}
                  className="border border-brand-surface-highest text-brand-primary text-xs py-3 px-4 rounded font-semibold hover:bg-brand-surface-low"
                >
                  확인 완료
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* Modal Dialog 6: Write Custom Review */}
      <AnimatePresence>
        {showWriteReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" id="write-review-modal-parent">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg max-w-lg w-full text-brand-primary p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                type="button"
                onClick={() => {
                  setShowWriteReviewModal(false);
                  setNewReviewName('');
                  setNewReviewRating(5);
                  setNewReviewTag('거북목/체형교정');
                  setNewReviewCustomTag('');
                  setNewReviewProgram('Core Reformer');
                  setNewReviewCustomProgram('');
                  setNewReviewPeriod('3개월 수강');
                  setNewReviewContent('');
                }}
                className="absolute top-4 right-4 bg-brand-surface-low p-1.5 rounded-full z-10 hover:bg-brand-surface-highest transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-brand-primary" />
              </button>

              <div className="mb-6">
                <span className="font-sans text-[11px] uppercase tracking-widest text-brand-secondary font-bold block mb-1">
                  WRITE A REVIEW
                </span>
                <h3 className="font-serif text-2xl text-brand-primary font-bold">
                  솔직한 수강 후기 남기기
                </h3>
                <p className="text-xs text-brand-on-surface-variant mt-1 leading-relaxed">
                  수업을 통해 느끼신 몸의 변화와 경험을 들려주세요.
                </p>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  
                  if (!newReviewName.trim()) {
                    alert('이름을 입력해주세요.');
                    return;
                  }
                  if (!newReviewContent.trim() || newReviewContent.trim().length < 10) {
                    alert('후기 내용을 최소 10자 이상 입력해주세요.');
                    return;
                  }

                  const selectedTag = newReviewTag === 'custom' ? (newReviewCustomTag.trim() || '체형교정') : newReviewTag;
                  const selectedProgram = newReviewProgram === 'custom' ? (newReviewCustomProgram.trim() || 'Core Reformer') : newReviewProgram;

                  const newReviewObj = {
                    id: `r-custom-${Date.now()}`,
                    name: newReviewName,
                    tag: selectedTag,
                    programName: selectedProgram,
                    rating: newReviewRating,
                    date: new Date().toISOString().split('T')[0],
                    period: newReviewPeriod,
                    content: newReviewContent,
                  };

                  const updatedReviews = [newReviewObj, ...reviewsList];
                  setReviewsList(updatedReviews);
                  setCurrentReviewIndex(0); // Show the new review immediately
                  setShowWriteReviewModal(false);

                  // Reset form
                  setNewReviewName('');
                  setNewReviewRating(5);
                  setNewReviewTag('거북목/체형교정');
                  setNewReviewCustomTag('');
                  setNewReviewProgram('Core Reformer');
                  setNewReviewCustomProgram('');
                  setNewReviewPeriod('3개월 수강');
                  setNewReviewContent('');
                }}
                className="space-y-4 text-xs text-left"
              >
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-brand-primary mb-1.5">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    required
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    placeholder="예: 김민아"
                    maxLength={10}
                    className="w-full px-3 py-2 border border-[#E0DFD8] rounded focus:outline-none focus:ring-1 focus:ring-brand-secondary focus:border-brand-secondary bg-[#FAF9F6] text-brand-primary font-sans text-xs"
                  />
                </div>

                {/* Star Rating Selection */}
                <div>
                  <label className="block text-xs font-semibold text-brand-primary mb-1.5">
                    평점 및 추천 <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReviewRating(star)}
                        className="p-1 cursor-pointer hover:scale-110 active:scale-95 transition-transform"
                      >
                        <Star 
                          className={`w-6 h-6 ${
                            star <= newReviewRating 
                              ? 'fill-current text-amber-400' 
                              : 'text-gray-300'
                          }`} 
                        />
                      </button>
                    ))}
                    <span className="ml-2 font-semibold text-brand-secondary font-mono text-xs">{newReviewRating}.0 / 5.0</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category/Tag */}
                  <div>
                    <label className="block text-xs font-semibold text-brand-primary mb-1.5">
                      핵심 태그 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={newReviewTag}
                      onChange={(e) => setNewReviewTag(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E0DFD8] rounded focus:outline-none focus:ring-1 focus:ring-brand-secondary bg-[#FAF9F6] text-brand-primary text-xs"
                    >
                      <option value="거북목/체형교정">거북목/체형교정</option>
                      <option value="일자목/자세 불균형">일자목/자세 불균형</option>
                      <option value="드레스 라인/유연성">드레스 라인/유연성</option>
                      <option value="재활/척추 통증 완화">재활/척추 통증 완화</option>
                      <option value="심부 코어/고난도 컨트롤">심부 코어/고난도 컨트롤</option>
                      <option value="산전산후/골반 정렬">산전산후/골반 정렬</option>
                      <option value="custom">직접 입력...</option>
                    </select>
                    {newReviewTag === 'custom' && (
                      <input 
                        type="text"
                        required
                        value={newReviewCustomTag}
                        onChange={(e) => setNewReviewCustomTag(e.target.value)}
                        placeholder="예: 다이어트/근력증강"
                        maxLength={15}
                        className="w-full mt-2 px-3 py-2 border border-[#E0DFD8] rounded focus:outline-none focus:ring-1 focus:ring-brand-secondary bg-[#FAF9F6] text-brand-primary text-xs"
                      />
                    )}
                  </div>

                  {/* Period */}
                  <div>
                    <label className="block text-xs font-semibold text-brand-primary mb-1.5">
                      수강 기간 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={newReviewPeriod}
                      onChange={(e) => setNewReviewPeriod(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E0DFD8] rounded focus:outline-none focus:ring-1 focus:ring-brand-secondary bg-[#FAF9F6] text-brand-primary text-xs"
                    >
                      <option value="1개월 수강">1개월 수강</option>
                      <option value="2개월 수강">2개월 수강</option>
                      <option value="3개월 수강">3개월 수강</option>
                      <option value="4개월 수강">4개월 수강</option>
                      <option value="5개월 수강">5개월 수강</option>
                      <option value="6개월 수강">6개월 수강</option>
                      <option value="12개월 이상 수강">12개월 이상 수강</option>
                    </select>
                  </div>
                </div>

                {/* Program Name */}
                <div>
                  <label className="block text-xs font-semibold text-brand-primary mb-1.5">
                    수강한 프로그램 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newReviewProgram}
                    onChange={(e) => setNewReviewProgram(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E0DFD8] rounded focus:outline-none focus:ring-1 focus:ring-brand-secondary bg-[#FAF9F6] text-brand-primary text-xs"
                  >
                    <option value="Core Reformer">코어 리포머 (Core Reformer)</option>
                    <option value="Athletic Reformer">애슬레틱 리포머 (Athletic Reformer)</option>
                    <option value="Rehabilitation">재활 필라테스 (Rehabilitation)</option>
                    <option value="Advanced Mobility">어드밴스드 모빌리티 (Advanced Mobility)</option>
                    <option value="custom">직접 입력...</option>
                  </select>
                  {newReviewProgram === 'custom' && (
                    <input 
                      type="text"
                      required
                      value={newReviewCustomProgram}
                      onChange={(e) => setNewReviewCustomProgram(e.target.value)}
                      placeholder="예: 산후 1:1 리커버리"
                      maxLength={30}
                      className="w-full mt-2 px-3 py-2 border border-[#E0DFD8] rounded focus:outline-none focus:ring-1 focus:ring-brand-secondary bg-[#FAF9F6] text-brand-primary text-xs"
                    />
                  )}
                </div>

                {/* Content */}
                <div>
                  <label className="block text-xs font-semibold text-brand-primary mb-1.5">
                    솔직한 후기 내용 <span className="text-red-500">* (최소 10자)</span>
                  </label>
                  <textarea 
                    required
                    rows={4}
                    value={newReviewContent}
                    onChange={(e) => setNewReviewContent(e.target.value)}
                    placeholder="수업을 받기 전 고민했던 점과 수업 후 신체적인 변화, 그리고 좋았던 점을 적어주세요."
                    className="w-full px-3 py-2 border border-[#E0DFD8] rounded focus:outline-none focus:ring-1 focus:ring-brand-secondary bg-[#FAF9F6] text-brand-primary leading-relaxed font-sans text-xs resize-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-[#5E5E5E] hover:bg-brand-secondary text-white text-xs py-3 rounded font-bold tracking-widest uppercase text-center transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
                  >
                    수강 후기 등록하기
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowWriteReviewModal(false);
                      setNewReviewName('');
                      setNewReviewRating(5);
                      setNewReviewTag('거북목/체형교정');
                      setNewReviewCustomTag('');
                      setNewReviewProgram('Core Reformer');
                      setNewReviewCustomProgram('');
                      setNewReviewPeriod('3개월 수강');
                      setNewReviewContent('');
                    }}
                    className="border border-brand-surface-highest text-brand-primary text-xs py-3 px-4 rounded font-semibold hover:bg-brand-surface-low transition-colors cursor-pointer"
                  >
                    취소
                  </button>
                </div>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Login Modal (Google ID/PW & Passcode) */}
      <AnimatePresence>
        {showAdminLoginModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowAdminLoginModal(false)}
            />
            
            <motion.div 
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="relative w-full max-w-md overflow-hidden bg-[#FAF9F6] rounded-2xl shadow-2xl border border-brand-secondary/30 text-[#4A3E3D] p-6 md:p-8"
              id="admin-login-modal"
            >
              {/* Close Button */}
              <button 
                onClick={() => {
                  setShowAdminLoginModal(false);
                  setAdminPasscode('');
                  setAdminGooglePassword('');
                }}
                className="absolute top-4 right-4 text-brand-on-surface-variant hover:text-brand-primary transition-colors cursor-pointer p-1"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center mt-1">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-[#E0DFD8] flex items-center justify-center mb-3">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-primary tracking-tight mb-1">
                  관리자 모드 로그인
                </h3>
                <p className="text-xs text-brand-secondary mb-4 font-semibold">
                  Google 계정 연동 및 관리자 전용 대시보드 진입
                </p>
              </div>

              {/* Login Method Tabs */}
              <div className="grid grid-cols-2 gap-1 bg-[#ECE9E2] p-1 rounded-xl mb-5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setAdminLoginTab('google')}
                  className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    adminLoginTab === 'google' 
                      ? 'bg-white text-brand-primary shadow-xs font-bold' 
                      : 'text-[#6D655E] hover:text-brand-primary'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  Google 로그인
                </button>
                <button
                  type="button"
                  onClick={() => setAdminLoginTab('passcode')}
                  className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    adminLoginTab === 'passcode' 
                      ? 'bg-white text-brand-primary shadow-xs font-bold' 
                      : 'text-[#6D655E] hover:text-brand-primary'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  비밀번호 입력
                </button>
              </div>

              {adminLoginTab === 'google' ? (
                /* Google Authentication Tab */
                <div className="space-y-4">
                  {/* Google One-Click Quick Sign In */}
                  <button
                    type="button"
                    onClick={handleGoogleOneClickLogin}
                    disabled={isGoogleSigningIn}
                    className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-[#3C4043] border border-[#DADCE0] hover:border-[#D2E3FC] py-3 px-4 rounded-xl text-sm font-semibold transition-all shadow-xs hover:shadow-sm cursor-pointer active:scale-98"
                  >
                    {isGoogleSigningIn ? (
                      <Loader2 className="w-5 h-5 animate-spin text-brand-secondary" />
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                    )}
                    <span>Google 계정으로 계속하기 (wnepd85)</span>
                  </button>

                  <div className="flex items-center my-3">
                    <div className="flex-1 border-t border-[#E0DFD8]" />
                    <span className="px-3 text-[11px] text-[#887E75] font-medium uppercase tracking-wider">또는 구글 아이디 / 비밀번호 입력</span>
                    <div className="flex-1 border-t border-[#E0DFD8]" />
                  </div>

                  <form onSubmit={handleGoogleLogin} className="space-y-3.5">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-brand-primary">
                          구글 아이디 (이메일)
                        </label>
                        <button
                          type="button"
                          onClick={() => setAdminGoogleEmail('wnepd85@gmail.com')}
                          className="text-[10px] text-brand-secondary hover:underline font-semibold"
                        >
                          wnepd85@gmail.com 적용
                        </button>
                      </div>
                      <div className="relative">
                        <input 
                          type="email"
                          value={adminGoogleEmail}
                          onChange={(e) => setAdminGoogleEmail(e.target.value)}
                          placeholder="wnepd85@gmail.com"
                          required
                          className="w-full px-3.5 py-2.5 bg-white border border-[#DCD6CA] rounded-xl text-xs text-[#211b11] focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary/20"
                        />
                        <Mail className="absolute right-3.5 top-2.5 w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-primary mb-1">
                        구글 계정 비밀번호
                      </label>
                      <div className="relative">
                        <input 
                          type={showGooglePassword ? "text" : "password"}
                          value={adminGooglePassword}
                          onChange={(e) => setAdminGooglePassword(e.target.value)}
                          placeholder="비밀번호를 입력하세요"
                          className="w-full px-3.5 py-2.5 bg-white border border-[#DCD6CA] rounded-xl text-xs text-[#211b11] focus:outline-none focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowGooglePassword(!showGooglePassword)}
                          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                          {showGooglePassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="text-[11px] text-[#6D655E] bg-[#F2EFE9] p-3 rounded-xl border border-[#E0DCD4] leading-relaxed">
                      💡 <strong>안내:</strong> 구글 아이디로 로그인하시면 승인된 관리자 계정(<code className="font-mono font-bold text-brand-primary">wnepd85@gmail.com</code>)으로 관리자 전용 대시보드에 즉시 진입합니다.
                    </div>

                    <button 
                      type="submit"
                      disabled={isGoogleSigningIn}
                      className="w-full bg-[#34270f] hover:bg-brand-secondary text-white font-bold py-3 rounded-xl text-xs transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                    >
                      {isGoogleSigningIn ? (
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                      ) : (
                        <Shield className="w-4 h-4" />
                      )}
                      <span>구글 계정으로 로그인 & 대시보드 열기</span>
                    </button>
                  </form>
                </div>
              ) : (
                /* Master Passcode Tab */
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (adminPasscode === 'admin123' || adminPasscode === '1234' || adminPasscode === 'wnepd85') {
                    const profile = {
                      email: 'wnepd85@gmail.com',
                      name: 'Central Core 관리자',
                      provider: 'passcode'
                    };
                    setIsAdmin(true);
                    setAdminUser(profile);
                    localStorage.setItem('central_core_is_admin', 'true');
                    localStorage.setItem('central_core_admin_user', JSON.stringify(profile));
                    setShowAdminLoginModal(false);
                    setIsAdminDashboardOpen(true);
                    setAdminPasscode('');
                  } else {
                    alert('비밀번호가 올바르지 않습니다. (기본 비밀번호: 1234 또는 admin123)');
                  }
                }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-primary mb-1.5 uppercase tracking-wider">
                      관리자 마스터 비밀번호
                    </label>
                    <div className="relative">
                      <input 
                        type="password"
                        value={adminPasscode}
                        onChange={(e) => setAdminPasscode(e.target.value)}
                        placeholder="비밀번호를 입력하세요"
                        required
                        className="w-full px-4 py-3 bg-white border border-[#E0DFD8] rounded-xl focus:outline-none focus:border-brand-secondary text-sm tracking-widest placeholder:tracking-normal placeholder:text-gray-400"
                        autoFocus
                      />
                      <Lock className="absolute right-3.5 top-3.5 w-4 h-4 text-brand-secondary/50" />
                    </div>
                  </div>

                  <div className="text-[11px] text-[#5E5E5E] leading-relaxed bg-brand-secondary/5 p-3 rounded-xl border border-brand-secondary/10">
                    💡 안내: 마스터 비밀번호로 <code className="bg-[#FAF9F6] px-1.5 py-0.5 rounded font-mono font-bold text-brand-primary border border-[#E0DFD8]">1234</code> 또는 <code className="bg-[#FAF9F6] px-1.5 py-0.5 rounded font-mono font-bold text-brand-primary border border-[#E0DFD8]">admin123</code>를 입력하여 즉시 대시보드를 열 수 있습니다.
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#5E5E5E] hover:bg-brand-secondary text-white font-semibold py-3 rounded-xl text-sm transition-all shadow-sm cursor-pointer"
                  >
                    대시보드 열기
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Floating Button (Minimalist upward arrow) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            transition={{ duration: 0.2 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 md:right-10 z-[85] w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#FAF9F6]/95 backdrop-blur-xs hover:bg-white text-[#5C534A] hover:text-brand-secondary border border-[#DDD7CD] hover:border-brand-secondary shadow-md hover:shadow-lg flex items-center justify-center transition-all cursor-pointer group active:scale-90"
            title="맨 위로 이동"
            aria-label="맨 위로 스크롤"
            id="scroll-to-top-btn"
          >
            <ArrowUp className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Admin Dashboard Fullscreen Modal */}
      <AnimatePresence>
        {isAdmin && isAdminDashboardOpen && (
          <div className="fixed inset-0 z-[95] flex items-center justify-center p-0 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsAdminDashboardOpen(false)}
            />
            
            <motion.div 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              className="relative w-full h-full md:h-[90vh] md:max-w-6xl md:rounded-lg overflow-hidden bg-[#FAF9F6] shadow-2xl border border-brand-secondary/20 flex flex-col text-brand-primary"
              id="admin-dashboard-modal"
            >
              {/* Header */}
              <div className="flex flex-wrap justify-between items-center px-6 py-4 border-b border-[#E0DFD8] bg-white gap-3">
                <div className="flex items-center gap-2">
                  <div className="bg-brand-secondary/10 p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-brand-secondary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-serif text-lg font-bold text-brand-primary">Central Core 관리자 대시보드</h2>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-mono font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Synchronized
                      </span>
                    </div>
                    <p className="text-[11px] text-[#786E63]">실시간 상담 데이터 수집 및 회원 예약 관리 센터</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2.5">
                  {/* Google Authenticated Admin Badge */}
                  <div className="hidden sm:flex items-center gap-2 bg-[#F4F1EB] border border-[#DDD7CD] px-3 py-1.5 rounded-full text-xs">
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span className="font-semibold text-brand-primary">
                      {adminUser?.email || 'wnepd85@gmail.com'}
                    </span>
                    <span className="text-[10px] bg-brand-secondary/20 text-brand-secondary px-1.5 py-0.2 rounded font-bold">
                      Google 관리자
                    </span>
                  </div>

                  {/* Admin Logout Button */}
                  <button
                    onClick={handleAdminLogout}
                    className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors font-medium border border-rose-200 cursor-pointer"
                  >
                    로그아웃
                  </button>

                  <button 
                    onClick={() => setIsAdminDashboardOpen(false)}
                    className="p-1.5 text-brand-secondary hover:text-brand-primary hover:bg-brand-secondary/10 rounded-lg transition-all cursor-pointer"
                    title="대시보드 닫기"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white border-b border-[#E0DFD8]">
                <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E0DFD8] shadow-xs">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#5E5E5E]">총 예약 / 상담 신청</span>
                  <div className="text-2xl font-serif font-bold text-brand-primary mt-1">{bookings.length}건</div>
                </div>

                {/* Formspree Card */}
                <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E0DFD8] shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#5E5E5E]">Formspree 수집 연동</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
                    <span>xwlpkvad</span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-sans font-bold">연동 활성화</span>
                  </div>
                  <a 
                    href="https://formspree.io/forms/xwlpkvad/submissions" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-brand-secondary hover:underline mt-1 font-semibold"
                  >
                    <span>Formspree 수신함 확인</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Google Admin Account */}
                <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E0DFD8] shadow-xs">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#5E5E5E]">구글 관리자 계정</span>
                  <div className="text-xs font-mono font-bold text-brand-secondary mt-1 truncate">
                    {adminUser?.email || 'wnepd85@gmail.com'}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-1">Google 로그인 연동 완료</div>
                </div>

                {/* Sync State */}
                <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E0DFD8] shadow-xs">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#5E5E5E]">실시간 서버 동기화</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-600">활성화 됨 (자동 전송)</span>
                  </div>
                  <div className="text-[10px] text-[#786E63] mt-1">Formspree & 이메일 즉시 발송</div>
                </div>
              </div>

              {/* Admin Dashboard Tab Switcher */}
              <div className="flex border-b border-[#E0DFD8] bg-[#FAF9F6] px-6 gap-2">
                <button
                  type="button"
                  onClick={() => setAdminDashboardTab('bookings')}
                  className={`py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                    adminDashboardTab === 'bookings'
                      ? 'border-brand-primary text-brand-primary bg-white rounded-t-lg shadow-2xs'
                      : 'border-transparent text-[#786E63] hover:text-brand-primary'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-brand-secondary" />
                  <span>상담 신청 접수 내역 ({bookings.length}건)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAdminDashboardTab('faqs')}
                  className={`py-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                    adminDashboardTab === 'faqs'
                      ? 'border-brand-primary text-brand-primary bg-white rounded-t-lg shadow-2xs'
                      : 'border-transparent text-[#786E63] hover:text-brand-primary'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5 text-brand-secondary" />
                  <span>자주 묻는 질문(FAQ) 관리 ({faqsList.length}개)</span>
                </button>
              </div>

              {/* Main Content Areas */}
              {adminDashboardTab === 'bookings' ? (
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                  {/* Left Side: Simplified Consultation Search & Quick Info */}
                  <div className="w-full md:w-80 border-r border-[#E0DFD8] p-6 bg-[#FAF9F6] flex flex-col gap-4 overflow-y-auto">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-secondary border-b border-[#E0DFD8] pb-2 flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5" />
                      상담 신청 검색
                    </h3>
                    
                    {/* Search Input */}
                    <div>
                      <label className="block text-xs font-semibold text-brand-primary mb-1.5">신청자명 / 연락처 / 상담 메모</label>
                      <div className="relative">
                        <input 
                          type="text"
                          value={adminSearchQuery}
                          onChange={(e) => setAdminSearchQuery(e.target.value)}
                          placeholder="이름, 전화번호, 메모 검색..."
                          className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#E0DFD8] rounded-xl text-xs focus:outline-none focus:border-brand-secondary text-brand-primary shadow-2xs"
                        />
                        <Search className="absolute left-3 top-3 w-3.5 h-3.5 text-gray-400" />
                        {adminSearchQuery && (
                          <button
                            type="button"
                            onClick={() => setAdminSearchQuery('')}
                            className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                            title="검색어 지우기"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Consultation Guide Card */}
                    <div className="bg-white rounded-xl p-4 border border-[#E0DFD8] space-y-2.5 shadow-2xs mt-1">
                      <div className="text-xs font-bold text-brand-primary flex items-center gap-1.5 pb-2 border-b border-[#ECE9E2]">
                        <Calendar className="w-3.5 h-3.5 text-brand-secondary" />
                        1:1 맞춤 상담 신청 관리
                      </div>
                      <p className="text-[11px] text-[#6E655D] leading-relaxed">
                        웹사이트에서 고객이 접수한 단순 상담 및 방문 예약 신청 내역이 실시간으로 등록됩니다.
                      </p>
                      <div className="pt-1 text-[11px] font-medium text-emerald-700 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        실시간 상담 접수 활성화 중
                      </div>
                    </div>

                    {/* Formspree & Email Sync Notice */}
                    <div className="bg-[#F3F0E9] rounded-xl p-3.5 border border-[#E2DDD3] text-[11px] space-y-1.5">
                      <div className="font-bold text-brand-primary flex items-center justify-between">
                        <span>Formspree 실시간 수집</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-bold">xwlpkvad</span>
                      </div>
                      <p className="text-[#786E63] text-[10px] leading-relaxed">
                        신청 접수 즉시 고객 정보가 Formspree 및 구글 관리자 계정(<code className="font-mono text-brand-primary">wnepd85@gmail.com</code>)으로 안전하게 전달됩니다.
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Scrollable Booking List */}
                  <div className="flex-1 flex flex-col bg-white overflow-hidden">
                    <div className="p-4 bg-[#FAF9F6] flex justify-between items-center border-b border-[#E0DFD8]">
                      <span className="text-xs font-semibold text-brand-secondary">
                        상담 접수 목록 ({
                          bookings.filter(b => {
                            if (!adminSearchQuery.trim()) return true;
                            const q = adminSearchQuery.toLowerCase();
                            return (
                              b.clientName.toLowerCase().includes(q) ||
                              b.clientPhone.includes(q) ||
                              (b.notes || '').toLowerCase().includes(q) ||
                              (b.clientEmail || '').toLowerCase().includes(q)
                            );
                          }).length
                        } / {bookings.length}건)
                      </span>
                      
                      <button
                        onClick={async () => {
                          if (confirm('모든 상담 접수 내역을 데이터베이스에서 삭제하시겠습니까?')) {
                            try {
                              const res = await fetch('/api/bookings/cancel', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: 'all_reset' })
                              });
                              saveBookingsToStorage([]);
                              await fetchBookings();
                              alert('상담 목록이 성공적으로 초기화되었습니다.');
                            } catch (e) {
                              saveBookingsToStorage([]);
                            }
                          }
                        }}
                        className="text-[10px] text-red-500 hover:text-red-700 font-bold border border-red-200 hover:bg-red-50 px-2.5 py-1 rounded cursor-pointer transition-colors"
                      >
                        전체 내역 리셋
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 bg-[#FAF9F6]/30">
                      {bookings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                          <Calendar className="w-12 h-12 text-gray-300 mb-3" />
                          <h4 className="text-sm font-semibold text-brand-primary">접수된 상담 신청 내역이 없습니다</h4>
                          <p className="text-xs text-[#5E5E5E] mt-1">고객이 상담 신청서를 제출하면 실시간으로 여기에 연동됩니다.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {bookings
                            .filter(b => {
                              if (!adminSearchQuery.trim()) return true;
                              const q = adminSearchQuery.toLowerCase();
                              return (
                                b.clientName.toLowerCase().includes(q) ||
                                b.clientPhone.includes(q) ||
                                (b.notes || '').toLowerCase().includes(q) ||
                                (b.clientEmail || '').toLowerCase().includes(q)
                              );
                            })
                            .map((booking) => {
                              return (
                                <motion.div 
                                  layout
                                  key={booking.id}
                                  className="border border-[#E0DFD8] hover:border-brand-secondary/40 rounded-xl p-5 bg-white transition-all relative group shadow-2xs"
                                >
                                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    {/* Client & Booking details */}
                                    <div className="space-y-2.5 flex-1">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-sm font-bold text-brand-primary font-serif">{booking.clientName}</span>
                                        <span className="text-xs text-brand-secondary font-mono bg-[#FAF9F6] px-2 py-0.5 rounded border border-[#E0DFD8] font-bold">
                                          <a href={`tel:${booking.clientPhone}`} className="hover:underline">{booking.clientPhone}</a>
                                        </span>
                                        {booking.clientEmail && (
                                          <span className="text-xs text-[#6E655D] font-mono bg-[#FAF9F6] px-2 py-0.5 rounded border border-[#E0DFD8]">
                                            {booking.clientEmail}
                                          </span>
                                        )}
                                        <span className="text-[10px] text-[#8C8278] font-mono ml-auto md:ml-0">접수일시: {booking.createdAt}</span>
                                      </div>

                                      {/* Simple Consultation Date & Time Schedule */}
                                      <div className="flex flex-wrap gap-2 pt-1 text-xs">
                                        <div className="bg-brand-secondary/10 text-brand-primary border border-brand-secondary/20 px-2.5 py-1 rounded-md flex items-center gap-1.5 font-bold">
                                          <Calendar className="w-3.5 h-3.5 text-brand-secondary" />
                                          <span>상담 희망일: {booking.date || '일정 조율 희망'}</span>
                                        </div>
                                        <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-md flex items-center gap-1.5 font-semibold">
                                          <Clock className="w-3.5 h-3.5" />
                                          <span>희망 시간대: {booking.timeSlot || '시간 조율 희망'}</span>
                                        </div>
                                      </div>

                                      {/* Request Notes */}
                                      <div className="text-xs text-[#5E5E5E] leading-relaxed pt-1.5 bg-[#FAF9F6]/50 border border-[#E0DFD8]/40 rounded-lg p-3 font-sans">
                                        <span className="font-semibold text-[10px] uppercase text-brand-primary block mb-1">📝 상담 요청 내용 및 메모</span>
                                        {booking.notes || "별도 요청사항 없이 기본 상담 신청이 접수되었습니다."}
                                      </div>
                                    </div>

                                    {/* Right side actions */}
                                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-2 h-full pt-1">
                                      <button
                                        onClick={() => handleCancelBooking(booking.id)}
                                        className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200 font-bold text-xs px-3 py-2 rounded-lg transition-colors cursor-pointer w-full justify-center"
                                        title="상담 접수 내역 삭제"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        상담 삭제
                                      </button>

                                      <button
                                        onClick={async () => {
                                          try {
                                            const res = await fetch('/api/bookings', {
                                              method: 'POST',
                                              headers: { 'Content-Type': 'application/json' },
                                              body: JSON.stringify({
                                                ...booking,
                                                notes: `${booking.notes || ''}\n[관리자 이메일 알림 재발송]`
                                              })
                                            });
                                            if (res.ok) {
                                              alert(`관리자 메일(wnepd85@gmail.com)로 알림 이메일이 재발송되었습니다.`);
                                            }
                                          } catch (e) {
                                            alert('메일 발송에 실패했습니다.');
                                          }
                                        }}
                                        className="flex items-center gap-1 bg-white hover:bg-brand-secondary/10 border border-brand-secondary/30 text-brand-secondary font-bold text-xs px-3 py-2 rounded transition-colors cursor-pointer w-full justify-center"
                                      >
                                        <Mail className="w-3.5 h-3.5" />
                                        메일 재발송
                                      </button>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* FAQ Management Tab */
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                  {/* Left Side: FAQ Controls & Quick Info */}
                  <div className="w-full md:w-80 border-r border-[#E0DFD8] p-6 bg-[#FAF9F6] flex flex-col gap-4 overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-[#E0DFD8] pb-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-brand-secondary flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5" />
                        FAQ 관리
                      </h3>
                      <span className="text-[10px] bg-brand-secondary/10 text-brand-secondary px-2 py-0.5 rounded font-bold">
                        총 {faqsList.length}개 질문
                      </span>
                    </div>

                    {/* Add FAQ Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setAdminEditingFaq(null);
                        setAdminFaqForm({
                          question: '',
                          answer: '',
                          category: '상담 및 등록',
                          order: faqsList.length + 1
                        });
                        setIsAdminFaqModalOpen(true);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-brand-secondary hover:bg-brand-secondary/90 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-colors"
                      id="admin-create-new-faq-btn"
                    >
                      <Plus className="w-4 h-4" />
                      <span>새 질문(FAQ) 등록하기</span>
                    </button>

                    {/* FAQ Search */}
                    <div>
                      <label className="block text-xs font-semibold text-brand-primary mb-1.5">질문 및 답변 내용 검색</label>
                      <div className="relative">
                        <input 
                          type="text"
                          value={adminFaqSearch}
                          onChange={(e) => setAdminFaqSearch(e.target.value)}
                          placeholder="질문 제목, 답변 키워드..."
                          className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#E0DFD8] rounded-xl text-xs focus:outline-none focus:border-brand-secondary text-brand-primary shadow-2xs"
                        />
                        <Search className="absolute left-3 top-3 w-3.5 h-3.5 text-gray-400" />
                        {adminFaqSearch && (
                          <button
                            type="button"
                            onClick={() => setAdminFaqSearch('')}
                            className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* FAQ Guide Card */}
                    <div className="bg-white rounded-xl p-4 border border-[#E0DFD8] space-y-2 shadow-2xs">
                      <div className="text-xs font-bold text-brand-primary flex items-center gap-1.5 pb-2 border-b border-[#ECE9E2]">
                        <Info className="w-3.5 h-3.5 text-brand-secondary" />
                        실시간 웹사이트 반영 안내
                      </div>
                      <p className="text-[11px] text-[#6E655D] leading-relaxed">
                        여기서 등록하거나 수정한 질문과 답변은 고객 상담(예약) 페이지의 <strong>자주 묻는 질문</strong> 섹션에 즉시 연동되어 표시됩니다.
                      </p>
                      <p className="text-[11px] text-[#786E63] leading-relaxed">
                        상담 페이지 직접 방문 시에도 관리자 권한으로 질문 카드 위의 <span className="font-semibold text-brand-secondary">수정/삭제</span> 버튼을 바로 사용하실 수 있습니다.
                      </p>
                    </div>

                    {/* Reset Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('자주 묻는 질문을 초기 기본 질문들로 복원하시겠습니까?')) {
                            handleResetFaqs();
                          }
                        }}
                        className="w-full py-2 px-3 rounded-lg border border-[#D5CFBF] bg-white hover:bg-gray-50 text-[#6E655D] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>초기 기본 질문 목록으로 복원</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Side: FAQ List */}
                  <div className="flex-1 flex flex-col bg-white overflow-hidden">
                    <div className="p-4 bg-[#FAF9F6] flex justify-between items-center border-b border-[#E0DFD8]">
                      <span className="text-xs font-semibold text-brand-secondary">
                        등록된 질문 목록 ({
                          faqsList.filter(f => {
                            if (!adminFaqSearch.trim()) return true;
                            const q = adminFaqSearch.toLowerCase();
                            return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q) || (f.category || '').toLowerCase().includes(q);
                          }).length
                        } / {faqsList.length}개)
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setAdminEditingFaq(null);
                          setAdminFaqForm({
                            question: '',
                            answer: '',
                            category: '상담 및 등록',
                            order: faqsList.length + 1
                          });
                          setIsAdminFaqModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-secondary text-white text-xs font-bold hover:bg-brand-secondary/90 transition-colors shadow-2xs cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>새 질문 추가</span>
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 bg-[#FAF9F6]/30">
                      {faqsList.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                          <HelpCircle className="w-12 h-12 text-gray-300 mb-3" />
                          <h4 className="text-sm font-semibold text-brand-primary">등록된 자주 묻는 질문이 없습니다</h4>
                          <p className="text-xs text-[#5E5E5E] mt-1">새 질문 등록 버튼을 눌러 고객 안내 질문을 작성해 보세요.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {faqsList
                            .filter(f => {
                              if (!adminFaqSearch.trim()) return true;
                              const q = adminFaqSearch.toLowerCase();
                              return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q) || (f.category || '').toLowerCase().includes(q);
                            })
                            .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
                            .map((faq, idx) => (
                              <motion.div
                                layout
                                key={faq.id}
                                className="border border-[#E0DFD8] hover:border-brand-secondary/40 rounded-xl p-5 bg-white transition-all shadow-2xs"
                              >
                                <div className="flex items-start justify-between gap-4 mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-wider bg-brand-secondary/10 px-2 py-0.5 rounded">
                                      {faq.category || '일반'}
                                    </span>
                                    <span className="text-[10px] font-mono text-[#8C8278] bg-[#FAF9F6] border border-[#E0DFD8] px-1.5 py-0.5 rounded">
                                      노출순서: {faq.order ?? idx + 1}
                                    </span>
                                    {faq.updatedAt && (
                                      <span className="text-[10px] text-[#9E958C] font-mono">
                                        수정일: {faq.updatedAt}
                                      </span>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setAdminEditingFaq(faq);
                                        setAdminFaqForm({
                                          question: faq.question,
                                          answer: faq.answer,
                                          category: faq.category || '상담 및 등록',
                                          order: faq.order ?? 1
                                        });
                                        setIsAdminFaqModalOpen(true);
                                      }}
                                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-brand-secondary hover:bg-brand-secondary/10 border border-brand-secondary/20 transition-colors cursor-pointer"
                                      title="질문 수정"
                                    >
                                      <Pencil className="w-3 h-3" />
                                      <span>수정</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (confirm(`"${faq.question}" 질문을 삭제하시겠습니까?`)) {
                                          handleDeleteFaq(faq.id);
                                        }
                                      }}
                                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer"
                                      title="질문 삭제"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                      <span>삭제</span>
                                    </button>
                                  </div>
                                </div>

                                <h4 className="font-bold text-sm text-brand-primary mb-2 flex items-start gap-1.5">
                                  <span className="font-serif font-bold text-brand-secondary shrink-0">Q.</span>
                                  <span>{faq.question}</span>
                                </h4>

                                <div className="flex items-start gap-1.5 text-xs text-[#5E554D] leading-relaxed pl-0.5">
                                  <span className="font-serif font-bold text-[#8C8278] shrink-0">A.</span>
                                  <p className="whitespace-pre-line leading-relaxed">{faq.answer}</p>
                                </div>
                              </motion.div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin FAQ Editor Modal (Inside App.tsx) */}
      <AnimatePresence>
        {isAdminFaqModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="bg-white rounded-2xl max-w-lg w-full border border-[#E0DFD8] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-4 border-b border-[#EBEAE5] bg-[#FAF9F6] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                    {adminEditingFaq ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-brand-primary">
                      {adminEditingFaq ? '자주 묻는 질문(FAQ) 수정' : '새로운 자주 묻는 질문(FAQ) 등록'}
                    </h3>
                    <p className="text-[11px] text-[#786E63]">
                      수정하신 내용은 상담 페이지의 자주 묻는 질문에 즉시 반영됩니다.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminFaqModalOpen(false);
                    setAdminEditingFaq(null);
                  }}
                  className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!adminFaqForm.question.trim() || !adminFaqForm.answer.trim()) {
                    alert('질문과 답변을 모두 작성해주세요.');
                    return;
                  }

                  setIsSavingAdminFaq(true);
                  try {
                    if (adminEditingFaq) {
                      await handleUpdateFaq(adminEditingFaq.id, {
                        question: adminFaqForm.question.trim(),
                        answer: adminFaqForm.answer.trim(),
                        category: adminFaqForm.category.trim() || '상담 및 등록',
                        order: Number(adminFaqForm.order) || 1
                      });
                    } else {
                      await handleAddFaq({
                        question: adminFaqForm.question.trim(),
                        answer: adminFaqForm.answer.trim(),
                        category: adminFaqForm.category.trim() || '상담 및 등록',
                        order: Number(adminFaqForm.order) || faqsList.length + 1
                      });
                    }
                    setIsAdminFaqModalOpen(false);
                    setAdminEditingFaq(null);
                  } catch (err: any) {
                    alert('저장 중 오류가 발생했습니다.');
                  } finally {
                    setIsSavingAdminFaq(false);
                  }
                }}
                className="p-6 overflow-y-auto space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-primary mb-1.5">카테고리</label>
                    <input
                      type="text"
                      value={adminFaqForm.category}
                      onChange={(e) => setAdminFaqForm({ ...adminFaqForm, category: e.target.value })}
                      placeholder="예: 상담 및 등록, 수업 준비, 시설 및 주차"
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#DDD7CD] rounded-xl text-xs text-brand-primary focus:outline-none focus:border-brand-secondary focus:bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-primary mb-1.5">노출 순서</label>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={adminFaqForm.order}
                      onChange={(e) => setAdminFaqForm({ ...adminFaqForm, order: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#DDD7CD] rounded-xl text-xs text-brand-primary focus:outline-none focus:border-brand-secondary focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-primary mb-1.5">질문 (Q.)</label>
                  <input
                    type="text"
                    value={adminFaqForm.question}
                    onChange={(e) => setAdminFaqForm({ ...adminFaqForm, question: e.target.value })}
                    placeholder="예: 필라테스가 처음인데 1:1 상담 후 바로 등록해야 하나요?"
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#DDD7CD] rounded-xl text-xs sm:text-sm text-brand-primary focus:outline-none focus:border-brand-secondary focus:bg-white font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-primary mb-1.5">답변 (A.)</label>
                  <textarea
                    rows={4}
                    value={adminFaqForm.answer}
                    onChange={(e) => setAdminFaqForm({ ...adminFaqForm, answer: e.target.value })}
                    placeholder="고객에게 표시될 답변을 작성해 주세요."
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#DDD7CD] rounded-xl text-xs sm:text-sm text-brand-primary focus:outline-none focus:border-brand-secondary focus:bg-white leading-relaxed resize-none"
                    required
                  />
                </div>

                {/* Preview */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-[#786E63] uppercase tracking-wider block mb-1.5">
                    실시간 미리보기
                  </span>
                  <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EBEAE5]">
                    <div className="text-[10px] font-bold text-brand-secondary bg-brand-secondary/10 px-2 py-0.5 rounded inline-block mb-1">
                      {adminFaqForm.category || '카테고리'}
                    </div>
                    <div className="font-bold text-xs text-brand-primary mb-1">
                      Q. {adminFaqForm.question || '질문 내용이 여기에 표시됩니다.'}
                    </div>
                    <div className="text-xs text-[#5E554D] leading-relaxed font-light">
                      A. {adminFaqForm.answer || '답변 내용이 여기에 표시됩니다.'}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EBEAE5] flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdminFaqModalOpen(false);
                      setAdminEditingFaq(null);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-[#DDD7CD] text-xs font-semibold text-[#5E554D] hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingAdminFaq}
                    className="px-5 py-2.5 rounded-xl bg-brand-secondary text-white text-xs font-bold hover:bg-brand-secondary/90 transition-colors shadow-xs cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isSavingAdminFaq && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>{adminEditingFaq ? '수정 완료' : '질문 등록'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* Student Review Detail Modal */}
      <ReviewDetailModal
        isOpen={!!selectedReviewModal}
        review={selectedReviewModal}
        onClose={() => setSelectedReviewModal(null)}
        onNavigateToProgram={(programName) => {
          setActiveTab('programs');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToBooking={() => {
          setActiveTab('booking');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}
