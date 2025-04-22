
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
#import { mockChapterGeneration } from '@/services/mockStoryApi';
import { generateChapter } from '@/services/storyApi';

import StoryProgress from '@/components/StoryProgress';
import ChapterDisplay from '@/components/ChapterDisplay';

const Index = () => {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [userIdeas, setUserIdeas] = useState('');
  const [generatedChapters, setGeneratedChapters] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userIdeas.trim()) {
      toast({
        title: "أدخل أفكارك للفصل",
        description: "من فضلك أدخل بعض الأفكار قبل المتابعة",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      #const chapter = await mockChapterGeneration(userIdeas);
      // Call the Flask backend API instead of the mock function
      const chapter = await generateChapter(userIdeas);
      setGeneratedChapters([...generatedChapters, chapter]);
      setUserIdeas('');
      setCurrentChapter(curr => Math.min(curr + 1, 5));
      toast({
        title: "تم إنشاء الفصل بنجاح",
        description: "يمكنك الآن قراءة الفصل الجديد"
      });
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من إنشاء الفصل. حاول مرة أخرى",
        variant: "destructive"
      });
    }
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-[#FEF7CD] p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <StoryProgress currentChapter={currentChapter} />
        
        <Card className="p-6 bg-white shadow-lg">
          <h1 className="text-3xl font-bold text-right mb-6 text-[#1A1F2C]">
            {currentChapter === 1 ? "لنبدأ قصتنا" : `الفصل ${currentChapter}`}
          </h1>
          
          {currentChapter <= 5 ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-right text-lg">
                  ما هي أفكارك للفصل التالي؟
                </label>
                <Input
                  dir="rtl"
                  value={userIdeas}
                  onChange={(e) => setUserIdeas(e.target.value)}
                  className="w-full p-4 text-right"
                  placeholder="اكتب أفكارك هنا..."
                  disabled={isGenerating}
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="submit"
                  className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8"
                  disabled={isGenerating}
                >
                  {isGenerating ? "جاري الإنشاء..." : "إنشاء الفصل"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold text-[#1A1F2C]">
                أحسنت! لقد أكملت القصة
              </h2>
            </div>
          )}
        </Card>

        {generatedChapters.length > 0 && (
          <ChapterDisplay chapters={generatedChapters} />
        )}
      </div>
    </div>
  );
};

export default Index;
