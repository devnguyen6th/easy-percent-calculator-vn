
import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from '@/components/ui/drawer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Star, Zap, Calculator } from 'lucide-react';
import { useLanguage } from '../LanguageProvider';

interface DrawerAdProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DrawerAd: React.FC<DrawerAdProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();

  const adContent = language === 'vi' 
    ? {
        title: "Nâng cấp lên Premium",
        description: "Mở khóa tất cả tính năng cao cấp",
        features: [
          "Lịch sử tính toán không giới hạn",
          "Công thức phức tạp",
          "Xuất kết quả PDF"
        ],
        cta: "Bắt đầu dùng thử miễn phí",
        price: "9.99$/tháng"
      }
    : {
        title: "Upgrade to Premium",
        description: "Unlock all advanced features",
        features: [
          "Unlimited calculation history",
          "Complex formulas",
          "PDF export results"
        ],
        cta: "Start free trial",
        price: "$9.99/month"
      };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900">
        <DrawerHeader className="text-center">
          <div className="flex justify-between items-start">
            <Badge variant="secondary" className="text-xs">
              {language === 'vi' ? 'Ưu đãi đặc biệt' : 'Special Offer'}
            </Badge>
            <DrawerClose asChild>
              <Button variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <Calculator className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <DrawerTitle className="text-2xl font-bold text-blue-800 dark:text-blue-200">
            {adContent.title}
          </DrawerTitle>
          <DrawerDescription className="text-blue-600 dark:text-blue-300">
            {adContent.description}
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="p-6 space-y-4">
          <div className="text-center">
            <span className="text-3xl font-bold text-blue-800 dark:text-blue-200">
              {adContent.price}
            </span>
          </div>
          
          <div className="space-y-3">
            {adContent.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="bg-green-100 dark:bg-green-900 p-1 rounded-full">
                  {index === 0 ? <Star className="h-4 w-4 text-green-600" /> :
                   index === 1 ? <Zap className="h-4 w-4 text-green-600" /> :
                   <Calculator className="h-4 w-4 text-green-600" />}
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="pt-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
              {adContent.cta}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
