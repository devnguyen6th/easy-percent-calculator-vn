
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';

interface StickyScrollAdProps {
  triggerAfterSections?: number;
}

export const StickyScrollAd: React.FC<StickyScrollAdProps> = ({ triggerAfterSections = 2 }) => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight * triggerAfterSections;
      
      if (scrolled > triggerPoint && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, triggerAfterSections]);

  if (!isVisible) return null;

  const adText = language === 'vi' 
    ? {
        title: "Tính toán nâng cao",
        description: "Mở khóa tính năng pro",
        cta: "Dùng thử"
      }
    : {
        title: "Advanced calculations",
        description: "Unlock pro features",
        cta: "Try now"
      };

  return (
    <div className="fixed top-20 right-4 z-40 max-w-xs animate-slide-in-right">
      <Card className={`border-purple-200 bg-purple-50 dark:bg-purple-950 dark:border-purple-800 transition-all duration-300 ${isMinimized ? 'h-12 overflow-hidden' : ''}`}>
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="text-xs">
              {language === 'vi' ? 'Quảng cáo' : 'Sponsored'}
            </Badge>
            <div className="flex gap-1">
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200"
              >
                {isMinimized ? '□' : '_'}
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-purple-800 dark:text-purple-200">
                {adText.title}
              </h3>
              <p className="text-xs text-purple-600 dark:text-purple-300">
                {adText.description}
              </p>
              <button className="text-xs text-purple-700 dark:text-purple-400 hover:underline w-full text-left">
                {adText.cta} →
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
