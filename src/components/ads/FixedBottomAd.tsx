
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';

interface FixedBottomAdProps {
  onClose?: () => void;
  isVisible: boolean;
}

export const FixedBottomAd: React.FC<FixedBottomAdProps> = ({ onClose, isVisible }) => {
  const { language } = useLanguage();

  if (!isVisible) return null;

  const adText = language === 'vi' 
    ? {
        title: "Ưu đãi đặc biệt!",
        description: "Công cụ tính toán cao cấp",
        cta: "Nâng cấp ngay"
      }
    : {
        title: "Special Offer!",
        description: "Premium calculation tools",
        cta: "Upgrade now"
      };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-yellow-50 dark:bg-yellow-950 border-t border-yellow-200 dark:border-yellow-800 shadow-lg">
      <Card className="rounded-none border-0">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-xs">
                {language === 'vi' ? 'Quảng cáo' : 'Ad'}
              </Badge>
              <div>
                <span className="font-semibold text-sm text-yellow-800 dark:text-yellow-200">
                  {adText.title}
                </span>
                <span className="text-xs text-yellow-600 dark:text-yellow-300 ml-2">
                  {adText.description}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-xs text-yellow-700 dark:text-yellow-400 hover:underline px-2 py-1">
                {adText.cta}
              </button>
              {onClose && (
                <button 
                  onClick={onClose}
                  className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-200"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
