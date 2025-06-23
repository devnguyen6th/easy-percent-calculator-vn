
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'vi' | 'en';
  setLanguage: (lang: 'vi' | 'en') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  vi: {
    // App Title
    appTitle: "Máy Tính Phần Trăm",
    appSubtitle: "Tính toán phần trăm nhanh chóng và chính xác",
    
    // Calculator Types
    percentOf: "X% của Y",
    whatPercent: "Y là bao nhiêu % của X",
    percentIncrease: "Tăng/Giảm theo phần trăm",
    percentDifference: "Chênh lệch phần trăm",
    valueFromPercent: "Tìm giá trị từ phần trăm",
    
    // Form Labels
    value: "Giá trị",
    percentage: "Phần trăm",
    originalValue: "Giá trị gốc",
    newValue: "Giá trị mới",
    firstValue: "Giá trị thứ nhất",
    secondValue: "Giá trị thứ hai",
    totalValue: "Tổng giá trị",
    partValue: "Phần giá trị",
    
    // Buttons
    calculate: "Tính toán",
    clear: "Xóa",
    speakResult: "Đọc kết quả",
    
    // Results
    result: "Kết quả",
    formula: "Công thức",
    explanation: "Giải thích",
    
    // Recent Calculations
    recentCalculations: "Tính toán gần đây",
    noRecentCalculations: "Chưa có tính toán nào",
    
    // Formulas
    formulaPercentOf: "(phần trăm ÷ 100) × giá trị",
    formulaWhatPercent: "(giá trị ÷ tổng) × 100",
    formulaIncrease: "giá trị gốc × (1 + phần trăm ÷ 100)",
    formulaDecrease: "giá trị gốc × (1 - phần trăm ÷ 100)",
    formulaDifference: "|(giá trị mới - giá trị cũ) ÷ giá trị cũ| × 100",
    formulaValueFrom: "(phần trăm ÷ 100) × tổng giá trị",
    
    // Language
    language: "Ngôn ngữ",
    vietnamese: "Tiếng Việt",
    english: "English",
    
    // Errors
    errorInvalidNumber: "Vui lòng nhập số hợp lệ",
    errorDivisionByZero: "Không thể chia cho 0",
    
    // Meta
    metaDescription: "Máy tính phần trăm online miễn phí. Tính phần trăm, tăng giảm phần trăm, chênh lệch phần trăm nhanh chóng và chính xác.",
    metaKeywords: "tính phần trăm, máy tính phần trăm online, phần trăm là bao nhiêu, tính toán phần trăm"
  },
  en: {
    // App Title
    appTitle: "Percentage Calculator",
    appSubtitle: "Fast and accurate percentage calculations",
    
    // Calculator Types
    percentOf: "X% of Y",
    whatPercent: "What percent is Y of X",
    percentIncrease: "Increase/Decrease by percentage",
    percentDifference: "Percentage difference",
    valueFromPercent: "Find value from percentage",
    
    // Form Labels
    value: "Value",
    percentage: "Percentage",
    originalValue: "Original value",
    newValue: "New value",
    firstValue: "First value",
    secondValue: "Second value",
    totalValue: "Total value",
    partValue: "Part value",
    
    // Buttons
    calculate: "Calculate",
    clear: "Clear",
    speakResult: "Speak result",
    
    // Results
    result: "Result",
    formula: "Formula",
    explanation: "Explanation",
    
    // Recent Calculations
    recentCalculations: "Recent calculations",
    noRecentCalculations: "No recent calculations",
    
    // Formulas
    formulaPercentOf: "(percentage ÷ 100) × value",
    formulaWhatPercent: "(value ÷ total) × 100",
    formulaIncrease: "original value × (1 + percentage ÷ 100)",
    formulaDecrease: "original value × (1 - percentage ÷ 100)",
    formulaDifference: "|(new value - old value) ÷ old value| × 100",
    formulaValueFrom: "(percentage ÷ 100) × total value",
    
    // Language
    language: "Language",
    vietnamese: "Tiếng Việt",
    english: "English",
    
    // Errors
    errorInvalidNumber: "Please enter a valid number",
    errorDivisionByZero: "Cannot divide by zero",
    
    // Meta
    metaDescription: "Free online percentage calculator. Calculate percentages, percentage increase/decrease, and percentage difference quickly and accurately.",
    metaKeywords: "percentage calculator, calculate percentage, percent calculator online, percentage increase decrease"
  }
};

const detectLanguage = (): 'vi' | 'en' => {
  const stored = localStorage.getItem('preferredLanguage') as 'vi' | 'en' | null;
  if (stored) return stored;
  
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  return browserLang.toLowerCase().includes('vi') ? 'vi' : 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<'vi' | 'en'>(detectLanguage);

  const setLanguage = (lang: 'vi' | 'en') => {
    setLanguageState(lang);
    localStorage.setItem('preferredLanguage', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
