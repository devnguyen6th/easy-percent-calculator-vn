
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, ChevronUp } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';

export const FloatingAd: React.FC = () => {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const adContent = language === 'vi' 
    ? {
        title: "💰 Kiếm tiền",
        description: "Ứng dụng kiếm tiền online",
        cta: "Tìm hiểu thêm"
      }
    : {
        title: "💰 Earn Money",
        description: "Online earning app",
        cta: "Learn more"
      };

  return (
    <div className="fixed bottom-20 right-4 z-40">
      <Card className={`border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800 transition-all duration-300 cursor-pointer ${
        isExpanded ? 'w-64' : 'w-16'
      }`}>
        <CardContent className="p-2">
          {!isExpanded ? (
            <div 
              className="flex items-center justify-center h-12 w-12"
              onClick={() => setIsExpanded(true)}
            >
              <span className="text-2xl">💰</span>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {language === 'vi' ? 'Quảng cáo' : 'Ad'}
                </Badge>
                <div className="flex gap-1">
                  <button 
                    onClick={() => setIsExpanded(false)}
                    className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                  >
                    <ChevronUp className="h-3 w-3" />
                  </button>
                  <button 
                    onClick={() => setIsVisible(false)}
                    className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <h3 className="font-semibold text-sm text-green-800 dark:text-green-200">
                {adContent.title}
              </h3>
              <p className="text-xs text-green-600 dark:text-green-300">
                {adContent.description}
              </p>
              <button className="text-xs text-green-700 dark:text-green-400 hover:underline w-full text-left">
                {adContent.cta} →
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
