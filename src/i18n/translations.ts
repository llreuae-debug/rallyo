import { SupportedLanguage } from './locales';

export interface TranslationDictionary {
  tagline: string;
  brandSubtitle: string;
  nav: {
    home: string;
    play: string;
    discover: string;
    compete: string;
    chat: string;
    profile: string;
    settings: string;
    clubDashboard: string;
    adminDashboard: string;
  };
  landing: {
    heroTitle: string;
    heroSubtitle: string;
    ctaJoin: string;
    ctaExplore: string;
    statActiveMatches: string;
    statPlayers: string;
    statCourts: string;
    statFillRate: string;
    featureAi: string;
    featureAiDesc: string;
    featureBooking: string;
    featureBookingDesc: string;
    featureTournaments: string;
    featureTournamentsDesc: string;
  };
  dashboard: {
    welcome: string;
    eloRating: string;
    streak: string;
    quickHost: string;
    quickFind: string;
    quickBook: string;
    aiRecommendation: string;
    whyRecommended: string;
    joinMatch: string;
    weeklyChallenge: string;
    recommendedRivals: string;
    premierCourts: string;
  };
  play: {
    title: string;
    hostMatch: string;
    findMatch: string;
    aiMatchmaker: string;
    openMatches: string;
    myMatches: string;
    spotsLeft: string;
    fullMatch: string;
    feePerPlayer: string;
    splitPayment: string;
    submitScore: string;
  };
  discover: {
    title: string;
    searchPlaceholder: string;
    listView: string;
    mapView: string;
    allClubs: string;
    availableCourts: string;
    bookCourt: string;
    rating: string;
    distance: string;
  };
  booking: {
    title: string;
    selectDate: string;
    selectCourt: string;
    availableSlots: string;
    peakHours: string;
    splitMode: string;
    confirmAndPay: string;
    courtConfirmed: string;
    passInstructions: string;
    operatingCurrencyNotice: string;
  };
  compete: {
    title: string;
    leaderboard: string;
    challenges: string;
    achievements: string;
    tournaments: string;
    viewBracket: string;
    registerTeam: string;
    prizePool: string;
  };
  profile: {
    title: string;
    matches: string;
    wins: string;
    losses: string;
    winRate: string;
    wallet: string;
    topUp: string;
    unlockedBadges: string;
    recentHistory: string;
    editProfile: string;
  };
  settings: {
    title: string;
    language: string;
    currency: string;
    notifications: string;
    privacy: string;
    save: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    tagline: 'Find Your Rally.',
    brandSubtitle: 'The operating system for your padel life.',
    nav: {
      home: 'Home',
      play: 'Play',
      discover: 'Discover',
      compete: 'Compete',
      chat: 'Chat',
      profile: 'Profile',
      settings: 'Settings',
      clubDashboard: 'Club Hub',
      adminDashboard: 'Admin Portal'
    },
    landing: {
      heroTitle: 'Find Your Rally.',
      heroSubtitle: 'Connect with balanced players, book premier panoramic courts in seconds, and compete in verified ranked padel matches.',
      ctaJoin: 'Join the Rally — Free',
      ctaExplore: 'Explore Courts & Matches',
      statActiveMatches: 'Active Matches Today',
      statPlayers: 'Global Padel Players',
      statCourts: 'Championship Courts',
      statFillRate: 'Match Fill Rate',
      featureAi: 'AI Matchmaker',
      featureAiDesc: 'Calibrated by ELO, playstyle & distance so every 3-set match is tight and competitive.',
      featureBooking: 'Instant Court Booking',
      featureBookingDesc: 'Real-time court availability with automated split payments in your local currency.',
      featureTournaments: 'Official Tournaments',
      featureTournamentsDesc: 'Compete in verified Americano & Knockout cups with live digital brackets.'
    },
    dashboard: {
      welcome: 'Welcome back,',
      eloRating: 'ELO Rating',
      streak: 'Week Streak',
      quickHost: 'Host Match',
      quickFind: 'Find Match',
      quickBook: 'Book Court',
      aiRecommendation: 'AI Recommended Match',
      whyRecommended: 'Why Match? >',
      joinMatch: 'Join Match',
      weeklyChallenge: 'Weekly Quest',
      recommendedRivals: 'Recommended Players',
      premierCourts: 'Premier Venues'
    },
    play: {
      title: 'Play & Matchmaking',
      hostMatch: 'Host Match',
      findMatch: 'Find Match',
      aiMatchmaker: 'AI Matchmaker',
      openMatches: 'Open Matches',
      myMatches: 'My Matches',
      spotsLeft: 'spots remaining',
      fullMatch: 'Match Full',
      feePerPlayer: 'per player',
      splitPayment: 'Automated Split Payment',
      submitScore: 'Submit Match Score'
    },
    discover: {
      title: 'Discover Padel Venues',
      searchPlaceholder: 'Search clubs, courts, players, coaches...',
      listView: 'List',
      mapView: 'Map',
      allClubs: 'All Venues',
      availableCourts: 'courts available today',
      bookCourt: 'Book Court',
      rating: 'Rating',
      distance: 'Distance'
    },
    booking: {
      title: 'Court Reservation',
      selectDate: 'Select Date',
      selectCourt: 'Select Court',
      availableSlots: 'Available Time Slots',
      peakHours: 'Peak Hours',
      splitMode: 'Split Payment Option',
      confirmAndPay: 'Confirm & Pay Share',
      courtConfirmed: 'Court Confirmed!',
      passInstructions: 'Scan this digital pass at reception or automated court gate.',
      operatingCurrencyNotice: 'Club operates in'
    },
    compete: {
      title: 'Compete & Tournaments',
      leaderboard: 'Leaderboards',
      challenges: 'Challenges',
      achievements: 'Achievements',
      tournaments: 'Tournaments',
      viewBracket: 'View Bracket',
      registerTeam: 'Register Team',
      prizePool: 'Prize Pool'
    },
    profile: {
      title: 'Player Profile',
      matches: 'Matches',
      wins: 'Wins',
      losses: 'Losses',
      winRate: 'Win Rate',
      wallet: 'RALLYO Wallet',
      topUp: 'Top Up',
      unlockedBadges: 'Unlocked Badges',
      recentHistory: 'Recent Match History',
      editProfile: 'Edit Profile'
    },
    settings: {
      title: 'Global Settings',
      language: 'Language & Locale',
      currency: 'Preferred Currency',
      notifications: 'Push & SMS Notifications',
      privacy: 'Privacy & Safety',
      save: 'Save Preferences'
    }
  },

  es: {
    tagline: 'Encuentra tu rally.',
    brandSubtitle: 'El sistema operativo para tu vida en el pádel.',
    nav: {
      home: 'Inicio',
      play: 'Jugar',
      discover: 'Descubrir',
      compete: 'Competir',
      chat: 'Chat',
      profile: 'Perfil',
      settings: 'Ajustes',
      clubDashboard: 'Club Hub',
      adminDashboard: 'Admin'
    },
    landing: {
      heroTitle: 'Encuentra tu rally.',
      heroSubtitle: 'Conéctate con jugadores equilibrados, reserva pistas panorámicas en segundos y compite en partidos oficiales de pádel con ELO.',
      ctaJoin: 'Únete al Rally — Gratis',
      ctaExplore: 'Explorar Pistas y Partidos',
      statActiveMatches: 'Partidos Activos Hoy',
      statPlayers: 'Jugadores de Pádel',
      statCourts: 'Pistas Panorámicas',
      statFillRate: 'Tasa de Ocupación',
      featureAi: 'Emparejamiento IA',
      featureAiDesc: 'Calibrado por ELO, estilo y distancia para partidos competitivos a 3 sets.',
      featureBooking: 'Reserva Instantánea',
      featureBookingDesc: 'Disponibilidad en tiempo real con división de pago en tu moneda local.',
      featureTournaments: 'Torneos Oficiales',
      featureTournamentsDesc: 'Compite en cuadros de Americano y Eliminatoria con llaves digitales.'
    },
    dashboard: {
      welcome: 'Bienvenido de nuevo,',
      eloRating: 'Rating ELO',
      streak: 'Semanas Racha',
      quickHost: 'Crear Partido',
      quickFind: 'Buscar Partido',
      quickBook: 'Reservar Pista',
      aiRecommendation: 'Partido Recomendado por IA',
      whyRecommended: '¿Por qué este partido? >',
      joinMatch: 'Unirse al Partido',
      weeklyChallenge: 'Misión Semanal',
      recommendedRivals: 'Jugadores Sugeridos',
      premierCourts: 'Clubes Destacados'
    },
    play: {
      title: 'Jugar y Emparejamiento',
      hostMatch: 'Organizar Partido',
      findMatch: 'Buscar Partido',
      aiMatchmaker: 'Emparejador IA',
      openMatches: 'Partidos Abiertos',
      myMatches: 'Mis Partidos',
      spotsLeft: 'plazas disponibles',
      fullMatch: 'Partido Completo',
      feePerPlayer: 'por jugador',
      splitPayment: 'Pago Dividido Automático',
      submitScore: 'Subir Resultado Oficial'
    },
    discover: {
      title: 'Descubrir Clubes de Pádel',
      searchPlaceholder: 'Buscar clubes, pistas, jugadores, entrenadores...',
      listView: 'Lista',
      mapView: 'Mapa',
      allClubs: 'Todos los Clubes',
      availableCourts: 'pistas libres hoy',
      bookCourt: 'Reservar Pista',
      rating: 'Valoración',
      distance: 'Distancia'
    },
    booking: {
      title: 'Reserva de Pista',
      selectDate: 'Seleccionar Fecha',
      selectCourt: 'Seleccionar Pista',
      availableSlots: 'Horarios Disponibles',
      peakHours: 'Horas Pico',
      splitMode: 'Modo Pago Dividido',
      confirmAndPay: 'Confirmar y Pagar Cuota',
      courtConfirmed: '¡Pista Confirmada!',
      passInstructions: 'Presenta este pase digital en recepción o en la puerta automática.',
      operatingCurrencyNotice: 'El club opera en'
    },
    compete: {
      title: 'Competir y Torneos',
      leaderboard: 'Clasificaciones',
      challenges: 'Desafíos',
      achievements: 'Logros',
      tournaments: 'Torneos',
      viewBracket: 'Ver Cuadro',
      registerTeam: 'Inscribir Pareja',
      prizePool: 'Premios'
    },
    profile: {
      title: 'Perfil del Jugador',
      matches: 'Partidos',
      wins: 'Victorias',
      losses: 'Derrotas',
      winRate: 'Efectividad',
      wallet: 'Billetera RALLYO',
      topUp: 'Recargar',
      unlockedBadges: 'Insignias Desbloqueadas',
      recentHistory: 'Historial de Partidos',
      editProfile: 'Editar Perfil'
    },
    settings: {
      title: 'Ajustes Globales',
      language: 'Idioma y Región',
      currency: 'Moneda Preferida',
      notifications: 'Notificaciones Push y SMS',
      privacy: 'Privacidad y Seguridad',
      save: 'Guardar Ajustes'
    }
  },

  ar: {
    tagline: 'اعثر على راليك.',
    brandSubtitle: 'نظام التشغيل المتكامل لحياتك في البادل.',
    nav: {
      home: 'الرئيسية',
      play: 'العب',
      discover: 'اكتشف',
      compete: 'تنافس',
      chat: 'المحادثات',
      profile: 'الملف',
      settings: 'الإعدادات',
      clubDashboard: 'بوابة النادي',
      adminDashboard: 'لوحة الإدارة'
    },
    landing: {
      heroTitle: 'اعثر على راليك.',
      heroSubtitle: 'تواصل مع لاعبين من نفس مستواك، واحجز أفضل ملاعب البادل البانورامية في ثوانٍ، وتنافس في مباريات رسمية معتمدة بنقاط تصنيف ELO.',
      ctaJoin: 'انضم إلى راليو — مجاناً',
      ctaExplore: 'استكشف الملاعب والمباريات',
      statActiveMatches: 'مباريات نشطة اليوم',
      statPlayers: 'لاعبي بادل مسجلين',
      statCourts: 'ملاعب بطولة بانورامية',
      statFillRate: 'نسبة اكتمال المباريات',
      featureAi: 'التوفيق الذكي بالذكاء الاصطناعي',
      featureAiDesc: 'معايرة دقيقة وفق تصنيف ELO وأسلوب اللعب والمسافة لمباريات حماسية ومتوازنة.',
      featureBooking: 'حجز ملاعب فوري',
      featureBookingDesc: 'مواعيد ملاعب حية مع تقسيم دفع الفاتورة آلياً بين اللاعبين بعملتك المحلية.',
      featureTournaments: 'بطولات رسمية',
      featureTournamentsDesc: 'تنافس في بطولات أمريكانو وإقصائية مع جداول مباريات رقمية حية.'
    },
    dashboard: {
      welcome: 'مرحباً بك مجدداً،',
      eloRating: 'تصنيف ELO',
      streak: 'سلسلة الأسابيع',
      quickHost: 'أنشئ مباراة',
      quickFind: 'ابحث عن مباراة',
      quickBook: 'احجز ملعباً',
      aiRecommendation: 'مباراة مقترحة بالذكاء الاصطناعي',
      whyRecommended: 'لماذا هذا الاختيار؟ >',
      joinMatch: 'انضم للمباراة',
      weeklyChallenge: 'تحدي الأسبوع',
      recommendedRivals: 'لاعبون مقترحون',
      premierCourts: 'أفضل الأندية'
    },
    play: {
      title: 'اللعب والتوفيق',
      hostMatch: 'استضف مباراة',
      findMatch: 'ابحث عن مباريات',
      aiMatchmaker: 'المطابقة الذكية',
      openMatches: 'مباريات مفتوحة',
      myMatches: 'مبارياتي',
      spotsLeft: 'أماكن متبقية',
      fullMatch: 'المباراة مكتملة',
      feePerPlayer: 'لكل لاعب',
      splitPayment: 'تقسيم الدفع التلقائي',
      submitScore: 'اعتماد النتيجة والتصنيف'
    },
    discover: {
      title: 'استكشاف أندية البادل',
      searchPlaceholder: 'ابحث عن أندية، ملاعب، لاعبين، مدربين...',
      listView: 'قائمة',
      mapView: 'خريطة',
      allClubs: 'جميع الأندية',
      availableCourts: 'ملاعب متاحة اليوم',
      bookCourt: 'احجز ملعباً',
      rating: 'التقييم',
      distance: 'المسافة'
    },
    booking: {
      title: 'حجز الملاعب',
      selectDate: 'اختر التاريخ',
      selectCourt: 'اختر الملعب',
      availableSlots: 'المواعيد المتاحة',
      peakHours: 'أوقات الذروة',
      splitMode: 'خيار تقسيم الدفع',
      confirmAndPay: 'تأكيد الحجز والدفع',
      courtConfirmed: 'تم تأكيد الحجز بنجاح!',
      passInstructions: 'امسح رمز الدخول الرقمي عند مكتب الاستقبال أو البوابة الآلية.',
      operatingCurrencyNotice: 'العملة التشغيلية للنادي هي'
    },
    compete: {
      title: 'التنافس والبطولات',
      leaderboard: 'لوحة المتصدرين',
      challenges: 'التحديات',
      achievements: 'الإنجازات والأوسمة',
      tournaments: 'البطولات',
      viewBracket: 'عرض الجدول',
      registerTeam: 'تسجيل فريق',
      prizePool: 'مجموع الجوائز'
    },
    profile: {
      title: 'الملف الشخصي',
      matches: 'المباريات',
      wins: 'الفوز',
      losses: 'الخسائر',
      winRate: 'نسبة الفوز',
      wallet: 'محفظة راليو',
      topUp: 'شحن المحفظة',
      unlockedBadges: 'الأوسمة المكتسبة',
      recentHistory: 'سجل المباريات الأخير',
      editProfile: 'تعديل البيانات'
    },
    settings: {
      title: 'الإعدادات العامة',
      language: 'اللغة والمنطقة',
      currency: 'العملة المفضلة',
      notifications: 'إشعارات التطبيق والرسائل',
      privacy: 'الخصوصية والأمان',
      save: 'حفظ الإعدادات'
    }
  },

  fr: {
    tagline: 'Trouve ton rally.',
    brandSubtitle: "Le système d'exploitation de votre vie de padel.",
    nav: {
      home: 'Accueil',
      play: 'Jouer',
      discover: 'Découvrir',
      compete: 'Compétition',
      chat: 'Messages',
      profile: 'Profil',
      settings: 'Réglages',
      clubDashboard: 'Club Hub',
      adminDashboard: 'Admin'
    },
    landing: {
      heroTitle: 'Trouve ton rally.',
      heroSubtitle: 'Rencontrez des joueurs de votre niveau, réservez des terrains panoramiques en quelques secondes et disputez des matchs classés ELO.',
      ctaJoin: 'Rejoindre le Rally — Gratuit',
      ctaExplore: 'Explorer Terrains & Matchs',
      statActiveMatches: 'Matchs Actifs Aujourd’hui',
      statPlayers: 'Joueurs de Padel',
      statCourts: 'Terrains Panoramiques',
      statFillRate: 'Taux de Remplissage',
      featureAi: 'Matchmaking IA',
      featureAiDesc: 'Calibré par ELO, style et distance pour des matchs ultra-serrés.',
      featureBooking: 'Réservation Instantanée',
      featureBookingDesc: 'Créneaux en temps réel avec paiement partagé dans votre devise locale.',
      featureTournaments: 'Tournois Officiels',
      featureTournamentsDesc: 'Tableaux Americano et élimination directe en direct.'
    },
    dashboard: {
      welcome: 'Bon retour,',
      eloRating: 'Classement ELO',
      streak: 'Semaines consécutives',
      quickHost: 'Créer un match',
      quickFind: 'Trouver un match',
      quickBook: 'Réserver un court',
      aiRecommendation: 'Match Recommandé par IA',
      whyRecommended: 'Pourquoi ce match ? >',
      joinMatch: 'Rejoindre',
      weeklyChallenge: 'Défi de la semaine',
      recommendedRivals: 'Joueurs suggérés',
      premierCourts: 'Clubs d’exception'
    },
    play: {
      title: 'Jouer & Matchmaking',
      hostMatch: 'Créer un match',
      findMatch: 'Trouver un match',
      aiMatchmaker: 'Matchmaker IA',
      openMatches: 'Matchs Ouverts',
      myMatches: 'Mes Matchs',
      spotsLeft: 'places restantes',
      fullMatch: 'Complet',
      feePerPlayer: 'par joueur',
      splitPayment: 'Paiement partagé automatique',
      submitScore: 'Valider le score officiel'
    },
    discover: {
      title: 'Découvrir les Clubs',
      searchPlaceholder: 'Rechercher clubs, courts, joueurs, coachs...',
      listView: 'Liste',
      mapView: 'Carte',
      allClubs: 'Tous les clubs',
      availableCourts: 'courts libres aujourd’hui',
      bookCourt: 'Réserver',
      rating: 'Note',
      distance: 'Distance'
    },
    booking: {
      title: 'Réservation de Court',
      selectDate: 'Choisir la date',
      selectCourt: 'Choisir le court',
      availableSlots: 'Créneaux disponibles',
      peakHours: 'Heures pleines',
      splitMode: 'Partage de paiement',
      confirmAndPay: 'Confirmer et Payer',
      courtConfirmed: 'Court Confirmé !',
      passInstructions: 'Scannez ce pass numérique à l’accueil ou au portique automatique.',
      operatingCurrencyNotice: 'Le club opère en'
    },
    compete: {
      title: 'Compétition & Tournois',
      leaderboard: 'Classements',
      challenges: 'Défis',
      achievements: 'Succès & Badges',
      tournaments: 'Tournois',
      viewBracket: 'Voir le tableau',
      registerTeam: 'Inscrire une équipe',
      prizePool: 'Dotation'
    },
    profile: {
      title: 'Profil Joueur',
      matches: 'Matchs',
      wins: 'Victoires',
      losses: 'Défaites',
      winRate: 'Taux de victoire',
      wallet: 'Portefeuille RALLYO',
      topUp: 'Recharger',
      unlockedBadges: 'Badges débloqués',
      recentHistory: 'Historique récent',
      editProfile: 'Modifier le profil'
    },
    settings: {
      title: 'Paramètres Généraux',
      language: 'Langue & Région',
      currency: 'Devise préférée',
      notifications: 'Notifications',
      privacy: 'Confidentialité',
      save: 'Enregistrer'
    }
  },

  it: {
    tagline: 'Trova il tuo rally.',
    brandSubtitle: 'Il sistema operativo per la tua vita da padel.',
    nav: {
      home: 'Home',
      play: 'Gioca',
      discover: 'Scopri',
      compete: 'Competi',
      chat: 'Chat',
      profile: 'Profilo',
      settings: 'Impostazioni',
      clubDashboard: 'Club Hub',
      adminDashboard: 'Admin'
    },
    landing: {
      heroTitle: 'Trova il tuo rally.',
      heroSubtitle: 'Trova giocatori del tuo livello, prenota campi panoramici in pochi secondi e gareggia in partite classificate ELO.',
      ctaJoin: 'Unisciti al Rally — Gratis',
      ctaExplore: 'Esplora Campi e Partite',
      statActiveMatches: 'Partite Attive Oggi',
      statPlayers: 'Giocatori Registrati',
      statCourts: 'Campi Panoramici',
      statFillRate: 'Tasso di Riempimento',
      featureAi: 'Matchmaking IA',
      featureAiDesc: 'Calibrato su ELO, stile e distanza per partite competitive al massimo.',
      featureBooking: 'Prenotazione Immediata',
      featureBookingDesc: 'Slot in tempo reale con pagamento diviso nella tua valuta locale.',
      featureTournaments: 'Tornei Ufficiali',
      featureTournamentsDesc: 'Tabelloni Americano e ad eliminazione diretta in tempo reale.'
    },
    dashboard: {
      welcome: 'Bentornato,',
      eloRating: 'Rating ELO',
      streak: 'Settimane di fila',
      quickHost: 'Crea Partita',
      quickFind: 'Cerca Partita',
      quickBook: 'Prenota Campo',
      aiRecommendation: 'Partita Suggerita da IA',
      whyRecommended: 'Perché questa partita? >',
      joinMatch: 'Partecipa',
      weeklyChallenge: 'Missione Settimanale',
      recommendedRivals: 'Giocatori Suggeriti',
      premierCourts: 'Campi Esclusivi'
    },
    play: {
      title: 'Gioca & Matchmaking',
      hostMatch: 'Organizza Partita',
      findMatch: 'Cerca Partite',
      aiMatchmaker: 'Matchmaker IA',
      openMatches: 'Partite Aperte',
      myMatches: 'Le Mie Partite',
      spotsLeft: 'posti liberi',
      fullMatch: 'Al Completo',
      feePerPlayer: 'a persona',
      splitPayment: 'Divisione Automatica Quota',
      submitScore: 'Invia Risultato Ufficiale'
    },
    discover: {
      title: 'Scopri Club di Padel',
      searchPlaceholder: 'Cerca club, campi, giocatori, maestri...',
      listView: 'Elenco',
      mapView: 'Mappa',
      allClubs: 'Tutti i Club',
      availableCourts: 'campi disponibili oggi',
      bookCourt: 'Prenota Campo',
      rating: 'Valutazione',
      distance: 'Distanza'
    },
    booking: {
      title: 'Prenotazione Campo',
      selectDate: 'Seleziona Data',
      selectCourt: 'Seleziona Campo',
      availableSlots: 'Orari Disponibili',
      peakHours: 'Ore di Punta',
      splitMode: 'Opzione Quota Divisa',
      confirmAndPay: 'Conferma e Paga',
      courtConfirmed: 'Campo Confermato!',
      passInstructions: 'Mostra questo pass digitale alla reception o al varco automatico.',
      operatingCurrencyNotice: 'Il club opera in'
    },
    compete: {
      title: 'Competizione & Tornei',
      leaderboard: 'Classifiche',
      challenges: 'Sfide',
      achievements: 'Traguardi & Badge',
      tournaments: 'Tornei',
      viewBracket: 'Vedi Tabellone',
      registerTeam: 'Iscrivi Coppia',
      prizePool: 'Montepremi'
    },
    profile: {
      title: 'Profilo Giocatore',
      matches: 'Partite',
      wins: 'Vinte',
      losses: 'Perse',
      winRate: 'Percentuale Vittorie',
      wallet: 'Portafoglio RALLYO',
      topUp: 'Ricarica',
      unlockedBadges: 'Badge Sbloccati',
      recentHistory: 'Cronologia Recente',
      editProfile: 'Modifica Profilo'
    },
    settings: {
      title: 'Impostazioni Globali',
      language: 'Lingua e Regione',
      currency: 'Valuta Preferita',
      notifications: 'Notifiche',
      privacy: 'Privacy e Sicurezza',
      save: 'Salva Impostazioni'
    }
  },

  de: {
    tagline: 'Finde dein Rally.',
    brandSubtitle: 'Das Betriebssystem für dein Padel-Leben.',
    nav: {
      home: 'Home',
      play: 'Spielen',
      discover: 'Entdecken',
      compete: 'Turniere',
      chat: 'Nachrichten',
      profile: 'Profil',
      settings: 'Einstellungen',
      clubDashboard: 'Club Hub',
      adminDashboard: 'Admin'
    },
    landing: {
      heroTitle: 'Finde dein Rally.',
      heroSubtitle: 'Finde passende Spieler auf deinem Niveau, buche Panoramaplätze in Sekundenschnelle und nimm an gewerteten ELO-Matches teil.',
      ctaJoin: 'Rally beitreten — Kostenlos',
      ctaExplore: 'Plätze & Matches entdecken',
      statActiveMatches: 'Aktive Matches heute',
      statPlayers: 'Padel-Spieler weltweit',
      statCourts: 'Panoramaplätze',
      statFillRate: 'Match-Belegungsrate',
      featureAi: 'KI-Matchmaker',
      featureAiDesc: 'Abgestimmt auf ELO, Spielstil und Entfernung für packende 3-Satz-Duelle.',
      featureBooking: 'Sofortbuchung',
      featureBookingDesc: 'Echtzeit-Verfügbarkeit mit automatischer Kostenaufteilung in deiner Währung.',
      featureTournaments: 'Offizielle Turniere',
      featureTournamentsDesc: 'Americano- und K.-o.-Turniere mit digitalen Live-Turnierbäumen.'
    },
    dashboard: {
      welcome: 'Willkommen zurück,',
      eloRating: 'ELO-Wertung',
      streak: 'Wochen-Serie',
      quickHost: 'Match erstellen',
      quickFind: 'Match finden',
      quickBook: 'Platz buchen',
      aiRecommendation: 'KI-Match-Empfehlung',
      whyRecommended: 'Warum dieses Match? >',
      joinMatch: 'Match beitreten',
      weeklyChallenge: 'Wochen-Quest',
      recommendedRivals: 'Empfohlene Spieler',
      premierCourts: 'Top-Anlagen'
    },
    play: {
      title: 'Spielen & Matchmaking',
      hostMatch: 'Match hosten',
      findMatch: 'Match finden',
      aiMatchmaker: 'KI-Matchmaker',
      openMatches: 'Offene Matches',
      myMatches: 'Meine Matches',
      spotsLeft: 'Plätze frei',
      fullMatch: 'Voll belegt',
      feePerPlayer: 'pro Spieler',
      splitPayment: 'Automatische Kostenaufteilung',
      submitScore: 'Offizielles Ergebnis melden'
    },
    discover: {
      title: 'Padel-Clubs entdecken',
      searchPlaceholder: 'Suche nach Clubs, Plätzen, Spielern, Trainern...',
      listView: 'Liste',
      mapView: 'Karte',
      allClubs: 'Alle Clubs',
      availableCourts: 'Plätze heute frei',
      bookCourt: 'Platz buchen',
      rating: 'Bewertung',
      distance: 'Entfernung'
    },
    booking: {
      title: 'Platzreservierung',
      selectDate: 'Datum wählen',
      selectCourt: 'Platz wählen',
      availableSlots: 'Verfügbare Zeiten',
      peakHours: 'Hauptzeiten',
      splitMode: 'Kostenaufteilung',
      confirmAndPay: 'Anteil bestätigen & zahlen',
      courtConfirmed: 'Platz bestätigt!',
      passInstructions: 'Zeige diesen digitalen Pass am Einlass oder am automatischen Drehkreuz vor.',
      operatingCurrencyNotice: 'Club rechnet ab in'
    },
    compete: {
      title: 'Wettkampf & Turniere',
      leaderboard: 'Ranglisten',
      challenges: 'Herausforderungen',
      achievements: 'Erfolge & Abzeichen',
      tournaments: 'Turniere',
      viewBracket: 'Turnierbaum ansehen',
      registerTeam: 'Team anmelden',
      prizePool: 'Preisgeld'
    },
    profile: {
      title: 'Spielerprofil',
      matches: 'Spiele',
      wins: 'Siege',
      losses: 'Niederlagen',
      winRate: 'Siegquote',
      wallet: 'RALLYO-Guthaben',
      topUp: 'Aufladen',
      unlockedBadges: 'Freigeschaltete Abzeichen',
      recentHistory: 'Letzte Matches',
      editProfile: 'Profil bearbeiten'
    },
    settings: {
      title: 'Globale Einstellungen',
      language: 'Sprache & Region',
      currency: 'Bevorzugte Währung',
      notifications: 'Benachrichtigungen',
      privacy: 'Datenschutz & Sicherheit',
      save: 'Speichern'
    }
  },

  pt: {
    tagline: 'Encontre seu rally.',
    brandSubtitle: 'O sistema operacional para a sua vida no padel.',
    nav: {
      home: 'Início',
      play: 'Jogar',
      discover: 'Descobrir',
      compete: 'Competir',
      chat: 'Chat',
      profile: 'Perfil',
      settings: 'Configurações',
      clubDashboard: 'Club Hub',
      adminDashboard: 'Admin'
    },
    landing: {
      heroTitle: 'Encontre seu rally.',
      heroSubtitle: 'Conecte-se com jogadores compatíveis, reserve quadras panorâmicas em segundos e compita em partidas ranqueadas com ELO oficial.',
      ctaJoin: 'Junte-se ao Rally — Grátis',
      ctaExplore: 'Explorar Quadras e Partidas',
      statActiveMatches: 'Partidas Ativas Hoje',
      statPlayers: 'Jogadores de Padel',
      statCourts: 'Quadras Panorâmicas',
      statFillRate: 'Taxa de Ocupação',
      featureAi: 'Matchmaker IA',
      featureAiDesc: 'Calibrado por ELO, estilo e distância para partidas equilibradas e intensas.',
      featureBooking: 'Reserva Instantânea',
      featureBookingDesc: 'Horários em tempo real com divisão automática de pagamento na sua moeda.',
      featureTournaments: 'Torneios Oficiais',
      featureTournamentsDesc: 'Chaves de Americano e Eliminatórias ao vivo.'
    },
    dashboard: {
      welcome: 'Bem-vindo de volta,',
      eloRating: 'Classificação ELO',
      streak: 'Semanas de Sequência',
      quickHost: 'Criar Partida',
      quickFind: 'Buscar Partida',
      quickBook: 'Reservar Quadra',
      aiRecommendation: 'Partida Recomendada por IA',
      whyRecommended: 'Por que esta partida? >',
      joinMatch: 'Entrar na Partida',
      weeklyChallenge: 'Missão Semanal',
      recommendedRivals: 'Jogadores Sugeridos',
      premierCourts: 'Clubes em Destaque'
    },
    play: {
      title: 'Jogar & Matchmaking',
      hostMatch: 'Criar Partida',
      findMatch: 'Buscar Partidas',
      aiMatchmaker: 'Matchmaker IA',
      openMatches: 'Partidas Abertas',
      myMatches: 'Minhas Partidas',
      spotsLeft: 'vagas restantes',
      fullMatch: 'Partida Completa',
      feePerPlayer: 'por jogador',
      splitPayment: 'Divisão Automática de Pagamento',
      submitScore: 'Registrar Placar Oficial'
    },
    discover: {
      title: 'Descobrir Clubes de Padel',
      searchPlaceholder: 'Buscar clubes, quadras, jogadores, treinadores...',
      listView: 'Lista',
      mapView: 'Mapa',
      allClubs: 'Todos os Clubes',
      availableCourts: 'quadras livres hoje',
      bookCourt: 'Reservar Quadra',
      rating: 'Avaliação',
      distance: 'Distância'
    },
    booking: {
      title: 'Reserva de Quadra',
      selectDate: 'Selecionar Data',
      selectCourt: 'Selecionar Quadra',
      availableSlots: 'Horários Disponíveis',
      peakHours: 'Horários de Pico',
      splitMode: 'Opção de Pagamento Dividido',
      confirmAndPay: 'Confirmar e Pagar Parcela',
      courtConfirmed: 'Quadra Confirmada!',
      passInstructions: 'Apresente este passe digital na recepção ou na catraca automatizada.',
      operatingCurrencyNotice: 'O clube opera em'
    },
    compete: {
      title: 'Competição & Torneios',
      leaderboard: 'Classificações',
      challenges: 'Desafios',
      achievements: 'Conquistas & Emblemas',
      tournaments: 'Torneios',
      viewBracket: 'Ver Chave',
      registerTeam: 'Inscrever Dupla',
      prizePool: 'Premiação'
    },
    profile: {
      title: 'Perfil do Jogador',
      matches: 'Partidas',
      wins: 'Vitórias',
      losses: 'Derrotas',
      winRate: 'Aproveitamento',
      wallet: 'Carteira RALLYO',
      topUp: 'Recarregar',
      unlockedBadges: 'Emblemas Desbloqueados',
      recentHistory: 'Histórico Recente',
      editProfile: 'Editar Perfil'
    },
    settings: {
      title: 'Configurações Globais',
      language: 'Idioma e Região',
      currency: 'Moeda de Preferência',
      notifications: 'Notificações',
      privacy: 'Privacidade e Segurança',
      save: 'Salvar Configurações'
    }
  }
};
