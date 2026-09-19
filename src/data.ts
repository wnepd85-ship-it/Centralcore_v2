import { Instructor, GalleryItem, Program, Question, Review, FaqItem } from './types';
import pEquilibriumImg from './assets/p-equilibrium.png';
import pReformerImg from './assets/p-reformer.png';
import pRehabImg from './assets/p-rehab.png';
import pMobilityImg from './assets/p-mobility.png';

export const INSTRUCTORS: Instructor[] = [
  {
    id: 'elena',
    name: '김민지',
    enName: 'Minji Kim',
    position: '설립자',
    title: '센트럴 코어 대표원장 / 재활 총괄 마스터',
    experience: '재활 임상 12년 경력',
    totalSessions: '12,000+ 누적 세션 지도',
    specialty: '재활 필라테스 & 체형 교정',
    enSpecialty: 'Clinical Rehabilitation & Posture Correction',
    motto: '“틀어진 뼈를 억지로 맞추는 것이 아니라, 척추를 지지하는 심부 속근육의 균형을 되찾아 몸 스스로 바르게 정렬하도록 돕습니다.”',
    bio: '국제 재활 필라테스 협회 마스터 러너이자, 12년 경력의 신체 정렬 전문가입니다. 부상 극복과 해부학적 맞춤 가이드를 지향합니다.',
    longBio: '김민지 대표원장은 깊은 임상 해부학 지식을 바탕으로 겉근육의 과긴장을 풀고 심부 복횡근과 다열근부터 다시 살려내는 정밀한 움직임을 설계합니다. 만성 허리 통증, 척추측만, 거북목, 출산 후 골반 비대칭으로 고통받던 수많은 회원들이 그녀의 손길을 통해 온전한 신체 정렬과 일상의 평온을 되찾았습니다.',
    image: 'https://postfiles.pstatic.net/MjAyNjA2MjdfMTY1/MDAxNzgyNTUxODY5MjY4.UN7044IQIzZTL_b0GsU_enGSBBUDIREHex_b3Of0W3og.4uTX8n2sFBewrxzYr3fA6qGi108zfUynjfStIqZftqsg.PNG/ChatGPT_Image_2026%EB%85%84_6%EC%9B%94_27%EC%9D%BC_%EC%98%A4%ED%9B%84_05_05_24.png?type=w3840',
    rating: 4.9,
    education: [
      '고려대학교 대학원 스포츠의학 석사 (운동역학 및 재활 전공)',
      '한국체육대학교 운동건강관리학과 학사 수석 졸업',
      '전 서울아산병원 스포츠재활센터 임상 운동치료 자문',
      '현 센트럴 코어 필라테스 아카데미 대표원장'
    ],
    certifications: [
      'PMA-CPT (Pilates Method Alliance) 국제 공인 자격',
      'STOTT PILATES Full Certified (Reformer, Cadillac, Chair, Barrels)',
      'Clinical Spine Rehabilitation Specialist (척추 재활 전문 마스터)',
      'Pre & Post Natal Pilates Specialist (산전·산후 골반 안정화 전문 과정 수료)'
    ],
    targetAreas: [
      '목·허리 디스크 및 척추협착 재활',
      '골반 틀어짐 및 좌우 다리 길이 불균형 교정',
      '일자목·거북목 및 굽은 등(흉추 후만) 리셋',
      '산전·산후 복직근 이개 회복 및 골반 기저근 강화'
    ],
    methodology: [
      {
        title: '3D 모션 & 정적 체형 정밀 측정',
        desc: '육안 관찰을 넘어 골반 경사각, 척추 만곡, 견갑골 회전을 과학적으로 분석하여 개인별 취약 부위를 정확히 도출합니다.'
      },
      {
        title: '심부 안정화 근육 타깃팅',
        desc: '무조건적인 고강도 동작을 배제하고, 호흡과 함께 골반기저근 및 복횡근을 활성화하여 관절에 부하 없는 회복을 유도합니다.'
      },
      {
        title: '일상 속 바른 정렬 홈케어 처방',
        desc: '스튜디오 수업에 그치지 않고, 직장 및 수면 시 바른 척추 자세를 유지할 수 있는 1:1 맞춤 홈루틴을 제공합니다.'
      }
    ],
    reviews: [
      '“단 한 세션만으로도 만성적으로 찌릿하던 허리 통증이 가라앉고 가동 범위가 완전히 달라졌어요. 정말 은인 같은 분이십니다.” - 회원 이○○ 님 (3년 수강)',
      '“통증의 근본적인 원인을 엑스레이 보듯 정확히 짚어내고 알기 쉽게 설명해주셔서 운동에 대한 확신이 생겼습니다.” - 회원 정○○ 님 (1년 6개월 수강)',
      '“출산 후 골반 통증과 복직근 벌어짐으로 힘들었는데, 원장님의 섬세한 티칭 덕분에 출산 전보다 코어가 더 단단해졌어요.” - 회원 박○○ 님'
    ]
  },
  {
    id: 'sienna',
    name: '이루리',
    enName: 'Ruri Lee',
    position: '시니어',
    title: '수석 시니어 인스트럭터 / 애슬레틱 팀 리드',
    experience: '전문 티칭 9년 경력',
    totalSessions: '8,500+ 누적 세션 지도',
    specialty: '애슬레틱 리포머 & 코어 컨디셔닝',
    enSpecialty: 'Athletic Reformer & Dynamic Core Strengthening',
    motto: '“호흡과 척추 분절이 하나가 될 때, 무리하지 않고도 속에서부터 단단하게 차오르는 진정한 코어의 힘을 경험하게 됩니다.”',
    bio: '체조 선수 출신으로 활기차고 에너지 넘치는 동작 구성을 자랑합니다. 호흡의 균형과 폭발적인 심부 근육 발달을 목표로 합니다.',
    longBio: '이루리 수석 강사는 엘리트 체조 선수 시절 체득한 유려한 신체 컨트롤 능력과 필라테스의 정밀한 기구 매커니즘을 결합하여 가동성과 근력을 동시에 극대화합니다. 그녀의 리포머 세션은 코어 근육 구석구석을 깨우며, 땀 흘리는 즐거움과 함께 일상 속 당당하고 탄탄한 바디 라인을 완성해 드립니다.',
    image: 'https://postfiles.pstatic.net/MjAyNjA2MjdfNzAg/MDAxNzgyNTUxODgwMzc1.oS0dq8goHUjeGP-qOj95NIzEhor8ccAdx-nF_GvlViUg.uGF9ZRULOdZrVs0U76XkcYeZkG0rWm6-eZWTzT-1Ft8g.PNG/ChatGPT_Image_2026%EB%85%84_6%EC%9B%94_27%EC%9D%BC_%EC%98%A4%ED%9B%84_05_10_17.png?type=w3840',
    rating: 4.8,
    education: [
      '한국예술종합학교 무용원 신체운동학 학사 졸업',
      '전 국가대표 체조 상비군 트레이닝 컨디셔너',
      '미국 Balanced Body Comprehensive Master Course 수료',
      '현 센트럴 코어 필라테스 수석 시니어 강사'
    ],
    certifications: [
      'Balanced Body University (BBU) Comprehensive Certified',
      'BASI Pilates Comprehensive Certification',
      'FMS (Functional Movement Screen) Level 1 & 2',
      'Core & Flow Reformer Specialty Instructor Certificate'
    ],
    targetAreas: [
      '체지방 연소와 근력 탄력 증진을 원하는 다이어트 코어',
      '라운드 숄더 및 흉곽 축소, 바디 라인 슬리밍',
      '약해진 둔근(엉덩이 근육) 활성화 및 하체 라인 교정',
      '지구력 및 활력 증진을 원하는 직장인 컨디셔닝'
    ],
    methodology: [
      {
        title: '다이내믹 리포머 플로우',
        desc: '끊김 없이 이어지는 스프링 텐션 시퀀스를 통해 지루할 틈 없이 심박수를 끌어올리고 전신 칼로리를 소모합니다.'
      },
      {
        title: '정확한 척추 분절과 흉식 호흡',
        desc: '모든 동작의 시작과 끝을 호흡과 일치시켜 늑골 벌어짐을 닫아주고 허리 라인을 잘록하게 정돈합니다.'
      },
      {
        title: '밸런스 & 림프 순환 케어',
        desc: '하체 부종과 림프 정체를 해소하는 스트레칭을 매 수업 후반부에 배치해 가볍고 상쾌한 컨디션을 완성합니다.'
      }
    ],
    reviews: [
      '“땀이 촉촉하게 나면서도 관절은 전혀 무리하지 않고 몸이 가뿐해지는 역동적인 50분이에요! 수업이 너무 기다려집니다.” - 회원 한○○ 님 (2년 수강)',
      '“코어 깊숙한 속근육의 느낌을 처음으로 알게 해준 최고의 선생님. 늘 밝은 에너지로 몸과 마음을 채워주세요.” - 회원 송○○ 님 (10개월 수강)',
      '“운동 전후 거울을 볼 때마다 라인이 달라지는 게 눈으로 보여요. 지루한 헬스보다 백배 재밌습니다!” - 회원 최○○ 님'
    ]
  },
  {
    id: 'julian',
    name: '박민혁',
    enName: 'Minhyuk Park',
    position: '시니어',
    title: '수석 시니어 인스트럭터 / 스포츠 메디컬 전담',
    experience: '물리치료 & 필라테스 8년 경력',
    totalSessions: '7,200+ 누적 세션 지도',
    specialty: '가동성 트레이닝 & 스포츠 메디컬',
    enSpecialty: 'Mobility Training & Sports Medicine Pilates',
    motto: '“통증은 신체가 보내는 정렬의 경고등입니다. 정확한 관절 가동 범위 평가와 과학적인 기구 운동 처방으로 통증 없는 자유로운 일상을 되찾아 드립니다.”',
    bio: '물리치료사 면허를 보유한 정밀 운동 전문가입니다. 관절의 제한 범위를 해소하고 일상 가동 능력을 극대화시킵니다.',
    longBio: '박민혁 수석 강사는 보건복지부 공인 물리치료사 면허를 바탕으로 근골격계 불균형과 스포츠 손상을 예방하는 과학적 운동을 전담합니다. 골프, 테니스, 러닝 등 특정 관절을 편측으로 많이 사용하는 현대인들의 회전 가동성을 극대화하며, 부상 없는 건강한 신체 메커니즘을 만들어 드립니다.',
    image: 'https://postfiles.pstatic.net/MjAyNjA2MjdfMTcx/MDAxNzgyNTcxNjYwMjEz.9Tsb6y_Lh_NwB9A8vp--3ivRfde6Wh63TXRboJ4Yjusg.sEv0-Ohn0lphKVy9Kb3k5GUghiOdzn1oLO0RtEVKbKIg.PNG/ChatGPT_Image_2026%EB%85%84_6%EC%9B%94_27%EC%9D%BC_%EC%98%A4%ED%9B%84_10_46_43.png?type=w3840',
    rating: 4.9,
    education: [
      '연세대학교 물리치료학과 학사 졸업',
      '전 분당서울대학교병원 재활의학과 임상 물리치료사',
      '대한물리치료사협회 정회원 & 척추도수치료 학회 정회원',
      '현 센트럴 코어 스포츠 메디컬 전담 수석 강사'
    ],
    certifications: [
      '보건복지부 공인 물리치료사 국가 면허',
      'Polestar Pilates Comprehensive Rehab Certified',
      'SFMA (Selective Functional Movement Assessment) Certified',
      'TPI (Titleist Performance Institute) 골프 메디컬 레벨 1 인증'
    ],
    targetAreas: [
      '골프·테니스 엘보 및 어깨 회전근개 손상 예방',
      '무릎·발목 관절 수술 후 재활 및 고유수용감각 훈련',
      '고관절 찝힘(충돌증후군) 완화 및 관절 가동성 회복',
      '골프 비거리 향상을 위한 흉추 회전각 및 코어 축 안정화'
    ],
    methodology: [
      {
        title: 'SFMA 기능적 움직임 진단',
        desc: '통증 부위뿐만 아니라 인접 관절의 보상 작용(상호 억제 및 보상 운동)을 추적해 통증의 뿌리를 찾아냅니다.'
      },
      {
        title: '캐딜락 & 체어 기반 3D 회전 훈련',
        desc: '스프링의 저항 방향을 다각도로 조절하여 회전 운동 시 척추에 가해지는 압박력을 최소화하고 회전축을 안정시킵니다.'
      },
      {
        title: '관절별 가동성(Mobility)과 안정성(Stability) 듀얼 매칭',
        desc: '가동되어야 할 흉추/고관절은 부드럽게 열어주고, 지탱해야 할 요추/견갑대는 견고하게 고정하는 인체역학적 원리를 구현합니다.'
      }
    ],
    reviews: [
      '“골프 라운딩 후마다 허리가 끊어질 듯 아팠는데, 박민혁 강사님께 흉추 회전과 고관절 분리 운동을 배운 뒤 통증이 씻은 듯 사라지고 비거리도 늘었습니다.” - 회원 강○○ 님 (1년 2개월 수강)',
      '“물리치료사 출신이라 그런지 근육 하나하나의 작용을 너무나 논리적이고 명료하게 설명해주셔서 몸에 대한 이해도가 확 올라갔습니다.” - 회원 윤○○ 님 (6개월 수강)',
      '“어깨를 올릴 때마다 뚝뚝 소리가 나고 불편했는데, 체어와 캐딜락 기구 교정으로 완벽하게 편안해졌습니다.” - 회원 서○○ 님'
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: '리포머 필라테스 (Reformer)',
    alt: '리포머 필라테스 기구',
    description: '적절한 저항을 제공하는 스프링과 가변식 도르래가 장착된 리포머는 전신 근육의 비대칭을 진단하고, 균형 있게 발달시키기 위한 최적의 올인원 기구입니다.',
    benefits: [
      '전신 정렬 및 비대칭 체형 교정',
      '관절 스트레스 없는 근력 단단한 강화',
      '고유수용감각 발달 및 유연성 향상'
    ],
    image: pReformerImg,
    size: 'large'
  },
  {
    id: 'g2',
    title: '캐딜락 디테일 (Cadillac)',
    alt: '캐딜락 기구',
    description: '하늘에 매달린 행잉 스프링과 스트랩을 활용해 척추 마디마디의 분절 및 가동성을 정교하게 깨워내고 극강의 코어 힘을 길러줍니다.',
    benefits: [
      '심층 코어 머슬의 완전한 집중 개입',
      '척추 및 골반 분절 가동범위 극대화',
      '부상 후 조절 능력의 재활 훈련 특화'
    ],
    image: pRehabImg,
    size: 'small'
  },
  {
    id: 'g3',
    title: '운다 체어 (Wunda Chair)',
    alt: '운다 체어',
    description: '작은 지지 면적 위에서 체중부하 제어를 필요로 하는 고난도 밸런스 및 하체 근육 단련용 기구로, 강인한 하복부 및 정렬 안정성을 제공합니다.',
    benefits: [
      '하체 정렬과 고관절 밸런싱',
      '골반저근 및 기립근 등 후면 사슬 강화',
      '고난도 균형 감각 촉진'
    ],
    image: pMobilityImg,
    size: 'tall'
  },
  {
    id: 'g4',
    title: '핸드 루프 & 로프 (Loops)',
    alt: '핸드 루프 디테일',
    description: '최상급의 부드럽고 질긴 가죽 및 커스텀 원단을 활용해 사용자의 손끝, 발끝에 닿는 촉감부터 안정적으로 지탱하며 신체의 완전한 이완과 긴장을 돕습니다.',
    benefits: [
      '부드러운 압력 분포로 피부 및 힘줄 자극 없음',
      '다각도 수축 작용을 위한 고탄성 로프 연동',
      '정밀하고 미세한 저항 조절 매커니즘'
    ],
    image: pEquilibriumImg,
    size: 'small'
  }
];

export const PROGRAMS: Program[] = [
  {
    id: 'p-equilibrium',
    title: '코어 리포머',
    enTitle: 'Core Reformer',
    level: 'Beginner',
    duration: '50min',
    intensity: 'Low',
    description: '코어 안정성과 자세 정렬을 위한 기초 리포머 프로그램',
    benefits: [
      '골반 정렬 수평 오차 즉각적 완화',
      '코어 하단 유기적 힘 자가 인지',
      '호흡 조절 중심선 각성 패턴 습득'
    ],
    capacity: 4,
    image: 'https://raw.githubusercontent.com/wnepd85-ship-it/centralcore/main/public/images/core-reformer.png'
  },
  {
    id: 'p-reformer',
    title: '애슬레틱 리포머',
    enTitle: 'Athletic Reformer',
    level: 'Intermediate',
    duration: '50min',
    intensity: 'Medium',
    description: '근력과 탄력을 동시에 향상시키는 역동적인 리포머 프로그램',
    benefits: [
      '전체 근섬유 활성도를 높이는 저항 운동',
      '사지 유연 가동력 증강',
      '둔근 및 대퇴 사슬 정렬 성취'
    ],
    capacity: 6,
    image: 'https://raw.githubusercontent.com/wnepd85-ship-it/centralcore/main/public/images/athletic-reformer.png'
  },
  {
    id: 'p-rehab',
    title: '재활 필라테스',
    enTitle: 'Rehabilitation',
    level: 'All Levels',
    duration: '50min',
    intensity: 'Low',
    description: '통증 완화와 자세 교정을 위한 맞춤형 재활 프로그램',
    benefits: [
      '일자목 및 거북목 압박 완화',
      '분마디 척추 정렬 재설정',
      '부상 부위 근 신경 재활 활성화'
    ],
    capacity: 2,
    image: 'https://raw.githubusercontent.com/wnepd85-ship-it/centralcore/main/public/images/rehabilitation.png'
  },
  {
    id: 'p-mobility',
    title: '어드밴스드 모빌리티',
    enTitle: 'Advanced Mobility',
    level: 'Advanced',
    duration: '50min',
    intensity: 'High',
    description: '고난도 컨트롤과 유연성 향상을 위한 프리미엄 프로그램',
    benefits: [
      '전방 사슬 확장 및 유연 유동력 확보',
      '극단적인 밸런싱 기법을 통한 신경 각성',
      '전문 수련생 수준의 웰니스 한계 타파'
    ],
    capacity: 4,
    image: 'https://raw.githubusercontent.com/wnepd85-ship-it/centralcore/main/public/images/advanced-Mobility.png'
  }
];

export const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: 1,
    question: '하루 중 가장 많은 시간을 차지하는 서거나 앉아 있는 자세는 어떤 편인가요?',
    options: [
      { text: '장시간 컴퓨터 앞에서 모니터를 향해 목을 빼고 구부정하게 앉아 있습니다.', score: 3, description: '굽은 등과 일자목 정렬 불균형이 의심됩니다.' },
      { text: '다리를 꼬고 앉거나, 서 있을 때 한쪽 골반에 무게중심을 두고 짝다리를 짚는 버릇이 있습니다.', score: 2, description: '골반 비대칭 및 천장관절 불안정 경향이 보입니다.' },
      { text: '등을 곧게 펴고 밸런스 있는 자세를 유지하려고 의식하지만, 이내 금방 목이나 허리가 뻐근해집니다.', score: 1, description: '자세 유지근(코어)의 피로 누적 및 지구력 부족 상태입니다.' }
    ]
  },
  {
    id: 2,
    question: '아래 증상 중 평상시 당신에게 일어나는 육체적 통증이나 피로감은 어떤 범위인가요?',
    options: [
      { text: '안구 건조 및 만성 두통을 동반한 뒷목, 어깨의 뭉침 현상과 자고 일어나도 뻐근함이 잔존함.', score: 3, description: '상지교차증후군(대흉근 긴장 및 거북목 발달) 치료가 절실합니다.' },
      { text: '가끔 오래 걷거나 일어서면 골반 좌우 한 곳이 욱신거리거나 치마, 바지가 한쪽으로 많이 돌아감.', score: 2, description: '골반 불균형으로 인한 요추 불안정이 작용하고 있습니다.' },
      { text: '등 주변이 단단하게 뭉쳐 깊은 호흡을 쉴 때 조금 뻣뻣하다고 느끼거나 숨이 쉽게 차오름.', score: 1, description: '갈비뼈 주변 전거근과 횡격막 가동성 훈련이 지시됩니다.' }
    ]
  },
  {
    id: 3,
    question: '평소 코어 및 복부 정밀 근력 수준에 대해 어떻게 생각하시나요?',
    options: [
      { text: '바닥에 오랜 시간 눕거나 앉으면 허리 틈새가 너무 과하게 떠서 꼬리뼈나 요추 뒤편 통증이 발생함.', score: 3, description: '복횡근 약화 및 아랫배 코어 서포팅 결손 상태입니다.' },
      { text: '런지나 한 발 서기 동작 시 온몸이 바들바들 떨리거나 좌우 발목 흔들림이 유독 극심함.', score: 2, description: '하지 지지 체인의 유기적 협력 관계 및 고유수용감각 연계 누락입니다.' },
      { text: '플랭크 등을 하면 코어가 아닌 어깨 힘으로 견디며 목 앞쪽에 담이 자주 결림.', score: 1, description: '대근육 유선 사용법에 따른 코어 유치 결핍 양상입니다.' }
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r2',
    name: '이지현',
    tag: '드레스 라인/유연성',
    programName: 'Advanced Mobility',
    programEnName: 'ADVANCED MOBILITY',
    rating: 5,
    date: '2026-06-20',
    period: '2개월 수강',
    shortContent: '“결혼식을 앞두고 어깨 교정을 위해 등록했는데, 호흡부터 자세까지 세심하게 잡아주셔서 정말 만족해요...”',
    content: '결혼식을 앞두고 쇄골 라인 정리와 굽은 어깨 교정을 위해 등록했습니다. 호흡부터 자세까지 세심하게 잡아주셔서 정말 만족스럽고, 어깨 라인이 반듯하게 정돈되어 지인들에게 칭찬을 많이 받았습니다.'
  },
  {
    id: 'r3',
    name: '박준호',
    tag: '재활/척추 통증 완화',
    programName: 'Rehabilitation',
    programEnName: 'REHABILITATION',
    rating: 5,
    date: '2026-06-25',
    period: '6개월 수강',
    shortContent: '“고질적인 허리 통증으로 시작했는데, 꾸준히 수업을 받으면서 일상에서도 자세가 달라지는 게 느껴져요...”',
    content: '고질적인 허리 통증으로 시작했는데, 꾸준히 수업을 받으면서 일상에서도 자세가 달라지는 게 느껴집니다. 척추 정렬을 맞추니 통증의 근본 원인이 개선되고 유연성까지 크게 좋아졌습니다.'
  },
  {
    id: 'r4',
    name: '최서연',
    tag: '심부 코어/고난도 컨트롤',
    programName: 'Athletic Reformer',
    programEnName: 'ATHLETIC REFORMER',
    rating: 5,
    date: '2026-06-18',
    period: '5개월 수강',
    shortContent: '“기존에 수년간 그룹 필라테스를 받았지만, 여기서 처음으로 진짜 내 몸을 쓰는 법을 배운 것 같아요...”',
    content: '기존에 수년간 그룹 필라테스를 받았지만, 여기서 처음으로 진짜 내 몸을 쓰는 법을 배운 것 같습니다. 좌우 불균형을 예리하게 간파해주셔서 세션마다 한계를 넘어가는 기쁨이 있습니다.'
  },
  {
    id: 'r1',
    name: '김민아',
    tag: '거북목/체형교정',
    programName: 'Core Reformer',
    programEnName: 'CORE REFORMER',
    rating: 5,
    date: '2026-06-15',
    period: '3개월 수강',
    shortContent: '“종일 구부정한 자세로 일하며 생긴 거북목과 허리 통증이 맞춤 리포머 수업 후 씻은 듯이 사라졌어요...”',
    content: '종일 구부정한 자세로 모니터를 보며 일하다 보니 거북목과 허리 통증이 심했는데, 일대일 맞춤 리포머 정렬 수업 후 만성 통증이 사라지고 코어 중심선의 힘을 매주 실감하고 있습니다.'
  },
  {
    id: 'r5',
    name: '정수민',
    tag: '일자목/자세 불균형',
    programName: 'Core Reformer',
    programEnName: 'CORE REFORMER',
    rating: 5,
    date: '2026-06-22',
    period: '4개월 수강',
    shortContent: '“자세 분석을 통해 비대칭 체형을 짚어주셨고, 코어 호흡만으로도 복부 긴장감과 만성 뭉침이 완화되었어요...”',
    content: '자세 판독판 검사를 통해 제 비대칭 체형을 분석해 주셨는데, 짝다리를 짚는 습관과 골반 경사가 눈에 띄게 좋아졌습니다. 갈비뼈를 조이는 호흡법만으로도 복부 긴장감과 만성 뭉침이 완화되었습니다.'
  }
];

export const INITIAL_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '필라테스가 처음인데 1:1 상담 후 바로 등록해야 하나요?',
    answer: '아닙니다. 상담은 고객님의 체형 진단과 적합한 커리큘럼을 안내해 드리기 위한 절차이며, 부담 없이 상담과 스튜디오 투어만 받아보셔도 좋습니다.',
    category: '상담 및 등록',
    order: 1,
    createdAt: '2026-06-01'
  },
  {
    id: 'faq-2',
    question: '체험 레슨은 어떤 복장으로 방문해야 하나요?',
    answer: '신체 라인과 관절의 정렬을 정확하게 관찰할 수 있도록 몸에 밀착되는 편안한 운동복(레깅스, 티셔츠)과 필라테스 토삭스(미끄럼 방지 양말)를 권장합니다.',
    category: '수업 준비',
    order: 2,
    createdAt: '2026-06-01'
  },
  {
    id: 'faq-3',
    question: '주차 및 발렛 파킹이 가능한가요?',
    answer: '네, 건물 1층 전용 발렛 부스에서 무료 발렛 파킹을 상시 지원하므로 차량 방문 시에도 편리하게 이용하실 수 있습니다.',
    category: '시설 및 주차',
    order: 3,
    createdAt: '2026-06-01'
  }
];

