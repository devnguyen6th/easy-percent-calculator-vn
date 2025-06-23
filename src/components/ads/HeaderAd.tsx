
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';

interface HeaderAdProps {
  onClose?: () => void;
}

export const HeaderAd: React.FC<HeaderAdProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const adText = language === 'vi' 
    ? {
        title: "🚀 Mới: Máy tính AI",
        description: "Trí tuệ nhân tạo giúp tính toán phức tạp",
        cta: "Dùng thử miễn phí"
      }
    : {
        title: "🚀 New: AI Calculator",
        description: "Artificial intelligence for complex calculations",
        cta: "Try for free"
      };

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  return (
    <div className="w-full bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 border-b border-indigo-200 dark:border-indigo-800">
      <Card className="rounded-none border-0 bg-transparent">
        <CardContent className="p-3">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                {language === 'vi' ? 'Mới' : 'New'}
              </Badge>
              <span className="font-semibold text-sm text-indigo-800 dark:text-indigo-200">
                {adText.title}
              </span>
              <span className="text-xs text-indigo-600 dark:text-indigo-300 hidden sm:inline">
                {adText.description}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-xs text-indigo-700 dark:text-indigo-400 hover:underline px-3 py-1 bg-indigo-100 dark:bg-indigo-900 rounded">
                {adText.cta}
              </button>
              <button 
                onClick={handleClose}
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
