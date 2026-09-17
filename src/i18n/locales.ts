export type SupportedLanguage = 'en' | 'es' | 'ar' | 'fr' | 'it' | 'de' | 'pt';

export interface LocaleConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  isRTL: boolean;
  tagline: string;
  brandSubtitle: string;
  loadingMessage: string;
  enterPlatform: string;
  replayAnimation: string;
  viewIcon: string;
  viewAnimation: string;
}

export const LOCALES: Record<SupportedLanguage, LocaleConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    isRTL: false,
    tagline: 'Find Your Rally.',
    brandSubtitle: 'The operating system for your padel life.',
    loadingMessage: 'Calibrating court network...',
    enterPlatform: 'Enter RALLYO Platform',
    replayAnimation: 'Replay Animation',
    viewIcon: 'App Icon (Vector)',
    viewAnimation: 'Loading Animation'
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    isRTL: false,
    tagline: 'Encuentra tu rally.',
    brandSubtitle: 'El sistema operativo para tu vida en el pádel.',
    loadingMessage: 'Calibrando red de pistas...',
    enterPlatform: 'Entrar a RALLYO',
    replayAnimation: 'Repetir Animación',
    viewIcon: 'Icono de la App (Vector)',
    viewAnimation: 'Animación de Carga'
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇦🇪',
    isRTL: true,
    tagline: 'اعثر على راليك.',
    brandSubtitle: 'نظام التشغيل المتكامل لحياتك في البادل.',
    loadingMessage: 'جاري معايرة شبكة الملاعب...',
    enterPlatform: 'الدخول إلى منصة راليو',
    replayAnimation: 'إعادة الحركة',
    viewIcon: 'أيقونة التطبيق (فيكتور)',
    viewAnimation: 'حركة التحميل'
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    isRTL: false,
    tagline: 'Trouve ton rally.',
    brandSubtitle: "Le système d'exploitation de votre vie de padel.",
    loadingMessage: 'Calibration du réseau de pistes...',
    enterPlatform: 'Entrer dans RALLYO',
    replayAnimation: "Rejouer l'animation",
    viewIcon: "Icône de l'app (Vectorielle)",
    viewAnimation: 'Animation de chargement'
  },
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    isRTL: false,
    tagline: 'Trova il tuo rally.',
    brandSubtitle: 'Il sistema operativo per la tua vita da padel.',
    loadingMessage: 'Calibrazione della rete di campi...',
    enterPlatform: 'Entra in RALLYO',
    replayAnimation: "Riproduci l'animazione",
    viewIcon: "Icona dell'app (Vettoriale)",
    viewAnimation: 'Animazione di caricamento'
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    isRTL: false,
    tagline: 'Finde dein Rally.',
    brandSubtitle: 'Das Betriebssystem für dein Padel-Leben.',
    loadingMessage: 'Kalibriere Platznetzwerk...',
    enterPlatform: 'Zu RALLYO wechseln',
    replayAnimation: 'Animation wiederholen',
    viewIcon: 'App-Icon (Vektor)',
    viewAnimation: 'Lade-Animation'
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    isRTL: false,
    tagline: 'Encontre seu rally.',
    brandSubtitle: 'O sistema operacional para a sua vida no padel.',
    loadingMessage: 'Calibrando rede de quadras...',
    enterPlatform: 'Entrar no RALLYO',
    replayAnimation: 'Repetir Animação',
    viewIcon: 'Ícone do App (Vetor)',
    viewAnimation: 'Animação de Carregamento'
  }
};
