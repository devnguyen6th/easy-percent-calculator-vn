
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from './LanguageProvider';

export const AdBanner = () => {
  const { t, language } = useLanguage();

  const adText = language === 'vi' 
    ? {
        title: "Công cụ tính toán khác",
        description: "Khám phá thêm nhiều máy tính hữu ích khác",
        cta: "Xem thêm"
      }
    : {
        title: "More calculation tools",
        description: "Discover more useful calculators",
        cta: "Learn more"
      };

  return (
    <Card className="w-full max-w-md mx-auto border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs mb-2">
            {language === 'vi' ? 'Quảng cáo' : 'Advertisement'}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-sm text-blue-800 dark:text-blue-200">
            {adText.title}
          </h3>
          <p className="text-xs text-blue-600 dark:text-blue-300">
            {adText.description}
          </p>
          <button className="text-xs text-blue-700 dark:text-blue-400 hover:underline">
            {adText.cta} →
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
