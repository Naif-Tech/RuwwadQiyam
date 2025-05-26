// Translation system for "بناة الغد" - Bunat Al-Ghad
// Supports Arabic and English with automatic browser detection

export type Language = 'ar' | 'en';

export interface Translations {
  // Game Title and Navigation
  gameTitle: string;
  gameSubtitle: string;
  mainMenu: string;
  back: string;
  next: string;
  previous: string;
  
  // Menu Items
  goodDeeds: {
    title: string;
    subtitle: string;
  };
  hadith: {
    title: string;
    subtitle: string;
  };
  values: {
    title: string;
    subtitle: string;
  };
  mosque: {
    title: string;
    subtitle: string;
  };
  
  // Actions and Buttons
  startQuiz: string;
  completeAction: string;
  collectStar: string;
  completed: string;
  
  // Feedback Messages
  wellDone: string;
  excellent: string;
  correct: string;
  incorrect: string;
  tryAgain: string;
  newStar: string;
  
  // Progress and Stats
  starsCollected: string;
  lessonsCompleted: string;
  progress: string;
  
  // Common Phrases
  whatWillYouDo: string;
  chooseCorrect: string;
  explanation: string;
  islamicTeaching: string;
  
  // Sound Controls
  soundOn: string;
  soundOff: string;
  
  // Hadith Section
  hadithTitle: string;
  hadithExplanation: string;
  
  // Good Deeds
  goodDeedComplete: string;
  
  // Values Adventure
  valuesScenario: string;
  
  // Mosque Corner
  mosqueSteps: string;
  wuduSteps: string;
  mosqueEtiquette: string;
  adhan: string;
}

export const translations: Record<Language, Translations> = {
  ar: {
    // Game Title and Navigation
    gameTitle: 'بناة الغد',
    gameSubtitle: 'تعلم القيم الإسلامية بطريقة ممتعة',
    mainMenu: 'القائمة الرئيسية',
    back: 'رجوع',
    next: 'التالي',
    previous: 'السابق',
    
    // Menu Items
    goodDeeds: {
      title: 'عمل خيري',
      subtitle: 'قم بأعمال الخير واكسب النجوم'
    },
    hadith: {
      title: 'أحاديث نبوية',
      subtitle: 'تعلم من أحاديث الرسول ﷺ'
    },
    values: {
      title: 'مغامرات القيم',
      subtitle: 'اختر القرار الصحيح'
    },
    mosque: {
      title: 'ركن المسجد',
      subtitle: 'تعلم آداب المسجد والوضوء'
    },
    
    // Actions and Buttons
    startQuiz: 'ابدأ الاختبار',
    completeAction: 'أنجز العمل',
    collectStar: 'احصل على نجمة!',
    completed: 'تم الإنجاز',
    
    // Feedback Messages
    wellDone: 'أحسنت! قدوتك النبي ﷺ',
    excellent: 'ممتاز!',
    correct: 'إجابة صحيحة!',
    incorrect: 'إجابة خاطئة',
    tryAgain: 'حاول مرة أخرى',
    newStar: 'نجمة جديدة!',
    
    // Progress and Stats
    starsCollected: 'النجوم المجمعة',
    lessonsCompleted: 'دروس مكتملة',
    progress: 'التقدم',
    
    // Common Phrases
    whatWillYouDo: 'ماذا ستفعل؟',
    chooseCorrect: 'اختر الإجابة الصحيحة',
    explanation: 'شرح للأطفال',
    islamicTeaching: 'التعليم الإسلامي',
    
    // Sound Controls
    soundOn: 'تشغيل الصوت',
    soundOff: 'إيقاف الصوت',
    
    // Hadith Section
    hadithTitle: 'أحاديث نبوية',
    hadithExplanation: 'شرح للأطفال',
    
    // Good Deeds
    goodDeedComplete: 'أنجز العمل الخيري',
    
    // Values Adventure
    valuesScenario: 'موقف أخلاقي',
    
    // Mosque Corner
    mosqueSteps: 'خطوات',
    wuduSteps: 'خطوات الوضوء',
    mosqueEtiquette: 'آداب المسجد',
    adhan: 'الأذان'
  },
  
  en: {
    // Game Title and Navigation
    gameTitle: 'Future Builders',
    gameSubtitle: 'Learn Islamic values in a fun way',
    mainMenu: 'Main Menu',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    
    // Menu Items
    goodDeeds: {
      title: 'Good Deeds',
      subtitle: 'Do good actions and earn stars'
    },
    hadith: {
      title: "Prophet's Hadith",
      subtitle: 'Learn from the sayings of Prophet ﷺ'
    },
    values: {
      title: 'Values Adventures',
      subtitle: 'Choose the right decision'
    },
    mosque: {
      title: 'Mosque Corner',
      subtitle: 'Learn mosque etiquette and wudu'
    },
    
    // Actions and Buttons
    startQuiz: 'Start Quiz',
    completeAction: 'Complete Action',
    collectStar: 'Get a Star!',
    completed: 'Completed',
    
    // Feedback Messages
    wellDone: 'Well done! You are following the Prophet ﷺ',
    excellent: 'Excellent!',
    correct: 'Correct answer!',
    incorrect: 'Incorrect answer',
    tryAgain: 'Try again',
    newStar: 'New star!',
    
    // Progress and Stats
    starsCollected: 'Stars Collected',
    lessonsCompleted: 'Lessons Completed',
    progress: 'Progress',
    
    // Common Phrases
    whatWillYouDo: 'What will you do?',
    chooseCorrect: 'Choose the correct answer',
    explanation: 'Explanation for Kids',
    islamicTeaching: 'Islamic Teaching',
    
    // Sound Controls
    soundOn: 'Sound On',
    soundOff: 'Sound Off',
    
    // Hadith Section
    hadithTitle: "Prophet's Hadith",
    hadithExplanation: 'Explanation for Kids',
    
    // Good Deeds
    goodDeedComplete: 'Complete Good Deed',
    
    // Values Adventure
    valuesScenario: 'Moral Situation',
    
    // Mosque Corner
    mosqueSteps: 'Steps',
    wuduSteps: 'Wudu Steps',
    mosqueEtiquette: 'Mosque Etiquette',
    adhan: 'Call to Prayer'
  }
};

// Language detection and management
export class LanguageManager {
  private static instance: LanguageManager;
  private currentLanguage: Language;
  private listeners: ((lang: Language) => void)[] = [];

  private constructor() {
    this.currentLanguage = this.detectBrowserLanguage();
    this.loadSavedLanguage();
  }

  static getInstance(): LanguageManager {
    if (!LanguageManager.instance) {
      LanguageManager.instance = new LanguageManager();
    }
    return LanguageManager.instance;
  }

  private detectBrowserLanguage(): Language {
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';
    
    // Check for Arabic variants
    if (browserLang.startsWith('ar') || browserLang.includes('arab')) {
      return 'ar';
    }
    
    // Default to English for all other cases
    return 'en';
  }

  private loadSavedLanguage(): void {
    const saved = localStorage.getItem('bunat-al-ghad-language');
    if (saved && (saved === 'ar' || saved === 'en')) {
      this.currentLanguage = saved as Language;
    }
  }

  public getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  public setLanguage(lang: Language): void {
    this.currentLanguage = lang;
    localStorage.setItem('bunat-al-ghad-language', lang);
    this.notifyListeners();
    this.updateDocumentDirection();
  }

  public toggleLanguage(): void {
    const newLang = this.currentLanguage === 'ar' ? 'en' : 'ar';
    this.setLanguage(newLang);
  }

  public getTranslations(): Translations {
    return translations[this.currentLanguage];
  }

  public subscribe(callback: (lang: Language) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.currentLanguage));
  }

  public updateDocumentDirection(): void {
    document.documentElement.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = this.currentLanguage;
  }

  public isRTL(): boolean {
    return this.currentLanguage === 'ar';
  }

  public getFontFamily(): string {
    return this.currentLanguage === 'ar' 
      ? "'Cairo', 'Amiri', sans-serif" 
      : "'Poppins', 'Comic Sans MS', cursive, sans-serif";
  }
}

// Hook for React components
import { useState, useEffect } from 'react';

export function useTranslations() {
  const [language, setLanguage] = useState<Language>(() => 
    LanguageManager.getInstance().getCurrentLanguage()
  );
  
  const [translations, setTranslations] = useState<Translations>(() => 
    LanguageManager.getInstance().getTranslations()
  );

  useEffect(() => {
    const manager = LanguageManager.getInstance();
    
    const unsubscribe = manager.subscribe((newLang) => {
      setLanguage(newLang);
      setTranslations(manager.getTranslations());
    });

    // Update initial state
    manager.updateDocumentDirection();

    return unsubscribe;
  }, []);

  const toggleLanguage = () => {
    LanguageManager.getInstance().toggleLanguage();
  };

  const changeLanguage = (lang: Language) => {
    LanguageManager.getInstance().setLanguage(lang);
  };

  const isRTL = LanguageManager.getInstance().isRTL();
  const fontFamily = LanguageManager.getInstance().getFontFamily();

  return {
    language,
    translations,
    toggleLanguage,
    changeLanguage,
    isRTL,
    fontFamily
  };
}