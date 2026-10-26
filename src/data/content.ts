import koreanImg from '@/assets/images/menu_korean.webp'
import thaiImg from '@/assets/images/menu_thai.webp'
import mexicanImg from '@/assets/images/menu_mexican.webp'
import commonImg from '@/assets/images/menu_common.webp'

export type Language = 'en' | 'ko'

export const LANGUAGES: readonly Language[] = ['en', 'ko'] as const

/** Event start (Clarksville, CST) – drives the D-day counter. */
export const EVENT_START_ISO = '2026-11-13T12:00:00-06:00'
export const EVENT_TIMEZONE = 'America/Chicago'

export interface ScheduleItem {
  id: string
  /** 24h range shown on the card, e.g. "12:20 – 12:50" */
  time: string
  title: string
  description: string
  location: string
  /** Keynote card: glowing border + badges */
  highlight?: boolean
  badge?: string
  chip?: string
}

export interface Dish {
  name: string
  note?: string
}

export interface MenuItem {
  id: 'korean' | 'thai' | 'mexican' | 'common'
  label: string
  tagline?: string
  image: string
  imageAlt: string
  dishes: Dish[]
}

export interface ContentData {
  meta: {
    title: string
    description: string
  }
  a11y: {
    switchLanguage: string
    logoAlt: string
    emblemAlt: string
    scheduleList: string
    menuCarousel: string
    goToSlide: string
    backToTop: string
  }
  header: {
    vipAccess: string
    dayPrefix: string
    dDay: string
    ended: string
  }
  hero: {
    milestoneBadge: string
    titleTop: string
    titleBottom: string
    keyMessage: string
    location: string
    date: string
    time: string
    slogan: string
    badgeText: string
  }
  schedule: {
    sectionTitle: string
    /** `{count}` is replaced with the number of items */
    sessionCount: string
    liveSync: string
    items: ScheduleItem[]
  }
  menu: {
    sectionTitle: string
    categories: MenuItem[]
  }
  footer: {
    line: string
  }
}

const en: ContentData = {
  meta: {
    title: '10 Million Production Ceremony | LG Electronics',
    description:
      'LG Electronics VIP Digital Invitation – 10 Million Production Ceremony, Clarksville, Tennessee',
  },
  a11y: {
    switchLanguage: 'Switch language',
    logoAlt: 'LG Electronics',
    emblemAlt: '10M Milestone',
    scheduleList: 'Ceremony schedule',
    menuCarousel: 'Lunch menu options',
    goToSlide: 'Go to slide',
    backToTop: 'Back to top',
  },
  header: {
    vipAccess: 'VIP ACCESS',
    dayPrefix: 'D-',
    dDay: 'D-DAY',
    ended: 'ENDED',
  },
  hero: {
    milestoneBadge: 'MILESTONE CELEBRATION',
    titleTop: '10 MILLION',
    titleBottom: 'PRODUCTION CEREMONY',
    keyMessage: 'A New Milestone in Laundry Innovation',
    location: 'Clarksville, Tennessee',
    date: 'Friday, Nov 13, 2026',
    time: '12:00 PM CST',
    slogan: 'Together We Build A Better Tomorrow',
    badgeText: 'EXCLUSIVE VIP DIGITAL INVITATION',
  },
  schedule: {
    sectionTitle: 'SCHEDULE',
    sessionCount: '{count} Sessions',
    liveSync: 'LIVE SYNC',
    items: [
      {
        id: 'welcome',
        time: '12:20 – 12:50',
        title: 'Welcome & Lunch',
        description: 'Casual networking',
        location: 'Cafeteria / Dining Hall',
      },
      {
        id: 'opening',
        time: '12:50 – 13:05',
        title: 'Opening & History',
        description: 'Kickoff showcase & Clarksville site history',
        location: 'Main Stage',
      },
      {
        id: 'reveal',
        time: '13:05 – 13:25',
        title: '10 Millionth Unit Reveal',
        description: 'Grand unveiling & VIP keynote speeches',
        location: 'Main Stage',
        highlight: true,
        badge: 'KEYNOTE • REVEAL',
        chip: 'SPECIAL MILLIONTH UNIT REVEAL',
      },
      {
        id: 'celebration',
        time: '13:25 – 14:05',
        title: 'Celebration & Awards',
        description: 'Signing, cake-cutting, contributor recognition & commemorative photo',
        location: 'Main Stage',
      },
      {
        id: 'closing',
        time: '14:05 – 15:10',
        title: 'Closing & Send-Off',
        description: 'Final announcements & VIP send-off',
        location: 'Main Entrance',
      },
    ],
  },
  menu: {
    sectionTitle: 'SPECIAL VIP LUNCHEON',
    categories: [
      {
        id: 'korean',
        label: 'Korean',
        image: koreanImg,
        imageAlt: 'Korean lunch box',
        dishes: [
          { name: 'Kimbap' },
          { name: 'Dakgangjeong', note: 'Sweet & Crispy Fried Chicken Bites' },
          { name: 'Yubu Chobap', note: 'Tofu Pocket Rice' },
          { name: 'Gyeranmari', note: 'Rolled Omelet' },
          { name: 'Pickled Radish' },
          { name: 'Fruit Cup' },
        ],
      },
      {
        id: 'thai',
        label: 'Thai',
        image: thaiImg,
        imageAlt: 'Thai lunch box',
        dishes: [
          { name: 'Pineapple Chicken Fried Rice' },
          { name: 'Chicken Wings' },
          { name: 'Egg Roll' },
          { name: 'Papaya Salad' },
          { name: 'Fresh Fruit' },
        ],
      },
      {
        id: 'mexican',
        label: 'Mexican',
        image: mexicanImg,
        imageAlt: 'Mexican lunch box',
        dishes: [
          { name: 'Burrito', note: 'Chicken or Vegi' },
          { name: 'Mexican Rice' },
          { name: 'Black Beans' },
          { name: 'Guacamole & Fruit Cup' },
          { name: 'Chips & Salsa' },
        ],
      },
      {
        id: 'common',
        label: 'Dessert & Drink',
        tagline: 'Served with every lunch box',
        image: commonImg,
        imageAlt: 'Sweet red bean bread and drinks',
        dishes: [
          { name: 'Sweet Red Bean Bread' },
          { name: 'Drink', note: 'Soda or Juice' },
        ],
      },
    ],
  },
  footer: {
    line: 'LG Electronics, Clarksville, TN · Built for Excellence',
  },
}

const ko: ContentData = {
  meta: {
    title: '1,000만 대 생산 기념식 | LG전자',
    description: 'LG전자 VIP 디지털 초청장 – 1,000만 대 생산 기념식, 미국 테네시주 클락스빌',
  },
  a11y: {
    switchLanguage: '언어 전환',
    logoAlt: 'LG전자',
    emblemAlt: '1,000만 대 생산 기념 엠블럼',
    scheduleList: '기념식 식순',
    menuCarousel: '오찬 메뉴 선택지',
    goToSlide: '슬라이드 이동',
    backToTop: '맨 위로',
  },
  header: {
    vipAccess: 'VIP 초청',
    dayPrefix: 'D-',
    dDay: 'D-DAY',
    ended: '종료',
  },
  hero: {
    milestoneBadge: '마일스톤 기념',
    titleTop: '1,000만 대',
    titleBottom: '생산 기념식',
    keyMessage: '세탁 혁신의 새로운 이정표',
    location: '테네시주 클락스빌',
    date: '2026년 11월 13일 (금)',
    time: '오후 12:00 CST',
    slogan: '함께 만들어가는 더 나은 내일',
    badgeText: 'VIP 디지털 초청장',
  },
  schedule: {
    sectionTitle: '식순',
    sessionCount: '{count}개 세션',
    liveSync: '실시간 연동',
    items: [
      {
        id: 'welcome',
        time: '12:20 – 12:50',
        title: '환영 및 오찬',
        description: '자유로운 네트워킹',
        location: '구내식당',
      },
      {
        id: 'opening',
        time: '12:50 – 13:05',
        title: '개회 및 클락스빌 역사',
        description: '오프닝 영상 및 클락스빌 공장 역사 소개',
        location: '메인 무대',
      },
      {
        id: 'reveal',
        time: '13:05 – 13:25',
        title: '1,000만 번째 제품 공개',
        description: '제품 언베일링 및 VIP 기념사',
        location: '메인 무대',
        highlight: true,
        badge: '키노트 • 공개',
        chip: '1,000만 번째 제품 특별 공개',
      },
      {
        id: 'celebration',
        time: '13:25 – 14:05',
        title: '기념식 및 시상',
        description: '서명식, 케이크 커팅, 유공자 포상, 기념사진 촬영',
        location: '메인 무대',
      },
      {
        id: 'closing',
        time: '14:05 – 15:10',
        title: '폐회 및 환송',
        description: '마무리 안내 및 VIP 환송',
        location: '정문',
      },
    ],
  },
  menu: {
    sectionTitle: 'VIP 특별 오찬',
    categories: [
      {
        id: 'korean',
        label: '한식',
        image: koreanImg,
        imageAlt: '한식 도시락',
        dishes: [
          { name: '김밥' },
          { name: '닭강정', note: '달콤바삭한 치킨 바이트' },
          { name: '유부초밥' },
          { name: '계란말이' },
          { name: '단무지' },
          { name: '과일컵' },
        ],
      },
      {
        id: 'thai',
        label: '타이식',
        image: thaiImg,
        imageAlt: '타이식 도시락',
        dishes: [
          { name: '파인애플 치킨 볶음밥' },
          { name: '치킨 윙' },
          { name: '에그롤' },
          { name: '파파야 샐러드' },
          { name: '신선한 과일' },
        ],
      },
      {
        id: 'mexican',
        label: '멕시칸',
        image: mexicanImg,
        imageAlt: '멕시칸 도시락',
        dishes: [
          { name: '부리토', note: '치킨 또는 채식' },
          { name: '멕시칸 라이스' },
          { name: '블랙빈' },
          { name: '과카몰리 & 과일컵' },
          { name: '칩 & 살사' },
        ],
      },
      {
        id: 'common',
        label: '디저트 & 음료',
        tagline: '모든 도시락에 함께 제공',
        image: commonImg,
        imageAlt: '단팥빵과 음료',
        dishes: [
          { name: '단팥빵' },
          { name: '음료', note: '탄산음료 또는 주스' },
        ],
      },
    ],
  },
  footer: {
    line: 'LG전자, 테네시주 클락스빌 · Built for Excellence',
  },
}

export const content: Record<Language, ContentData> = { en, ko }
