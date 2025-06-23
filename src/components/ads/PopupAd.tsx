
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Gift } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';

interface PopupAdProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PopupAd: React.FC<PopupAdProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();

  const adContent = language === 'vi' 
    ? {
        title: "🎉 Ưu đãi giới hạn!",
        description: "Giảm 50% cho gói Premium",
        details: "Chỉ còn 24 giờ! Nâng cấp ngay để không bỏ lỡ.",
        cta: "Nhận ưu đãi ngay",
        later: "Để sau"
      }
    : {
        title: "🎉 Limited Time Offer!",
        description: "50% off Premium plan",
        details: "Only 24 hours left! Upgrade now to not miss out.",
        cta: "Claim offer now",
        later: "Maybe later"
      };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-red-900 border-orange-200 dark:border-red-800">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
              {language === 'vi' ? 'Ưu đãi đặc biệt' : 'Special Deal'}
            </Badge>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-center mb-4">
            <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
              <Gift className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl font-bold text-orange-800 dark:text-orange-200">
            {adContent.title}
          </DialogTitle>
          <DialogDescription className="text-center text-orange-600 dark:text-orange-300">
            {adContent.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-sm text-center text-gray-700 dark:text-gray-300">
            {adContent.details}
          </p>
          
          <div className="flex flex-col gap-2">
            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
              {adContent.cta}
            </Button>
            <Button variant="outline" className="w-full" onClick={onClose}>
              {adContent.later}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
