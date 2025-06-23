
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '../LanguageProvider';

export const SidebarAds: React.FC = () => {
  const { language } = useLanguage();

  const ads = [
    {
      title: language === 'vi' ? 'Tính thuế' : 'Tax Calculator',
      description: language === 'vi' ? 'Tính thuế chính xác' : 'Calculate taxes accurately',
      color: 'green'
    },
    {
      title: language === 'vi' ? 'Máy tính vay' : 'Loan Calculator',
      description: language === 'vi' ? 'Tính lãi suất vay' : 'Calculate loan interest',
      color: 'blue'
    },
    {
      title: language === 'vi' ? 'Đầu tư' : 'Investment',
      description: language === 'vi' ? 'Công cụ đầu tư' : 'Investment tools',
      color: 'purple'
    }
  ];

  return (
    <div className="hidden xl:block fixed left-4 top-1/2 transform -translate-y-1/2 w-48 space-y-4 z-30">
      {ads.map((ad, index) => (
        <Card key={index} className={`border-${ad.color}-200 bg-${ad.color}-50 dark:bg-${ad.color}-950 dark:border-${ad.color}-800 hover:shadow-md transition-shadow cursor-pointer`}>
          <CardContent className="p-3">
            <Badge variant="secondary" className="text-xs mb-2">
              {language === 'vi' ? 'Quảng cáo' : 'Ad'}
            </Badge>
            <h3 className={`font-semibold text-sm text-${ad.color}-800 dark:text-${ad.color}-200 mb-1`}>
              {ad.title}
            </h3>
            <p className={`text-xs text-${ad.color}-600 dark:text-${ad.color}-300`}>
              {ad.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
