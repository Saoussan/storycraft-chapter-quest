import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import ChapterDisplay from './ChapterDisplay';
import { generateChapter } from '../services/storyApi';

const StoryGenerator: React.FC = () => {
  const [storyIdea, setStoryIdea] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [chapters, setChapters] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const handleGenerateStory = async () => {
    if (!storyIdea.trim()) {
      toast({
        title: "فكرة القصة مطلوبة",
        description: "يرجى إدخال فكرة قصة للمتابعة",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    
    try {
      // Clear existing chapters
      setChapters([]);
      
      // Generate 5 chapters sequentially
      const totalChapters = 5;
      for (let i = 0; i < totalChapters; i++) {
        // Update progress
        setProgress(((i) / totalChapters) * 100);
        
        // Generate a new chapter using the real API
        const newChapter = await generateChapter(storyIdea);
        
        // Add the new chapter to our list
        setChapters(prevChapters => [...prevChapters, newChapter]);
      }
      
      setProgress(100);
      toast({
        title: "تم إنشاء القصة",
        description: "تم إنشاء قصتك بنجاح!",
      });
    } catch (error) {
      toast({
        title: "خطأ في إنشاء القصة",
        description: "حدث خطأ أثناء إنشاء قصتك. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#1A1F2C]">مُنشئ القصص العربية</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-right text-[#1A1F2C]">ما هي فكرة قصتك؟</h2>
        <Textarea
          className="w-full h-32 mb-4 text-right"
          placeholder="أدخل فكرة قصتك هنا... على سبيل المثال: قصة عن فتى يكتشف قوى سحرية غامضة"
          value={storyIdea}
          onChange={(e) => setStoryIdea(e.target.value)}
          disabled={isGenerating}
        />
        
        <div className="flex justify-center">
          <Button 
            onClick={handleGenerateStory} 
            disabled={isGenerating}
            className="bg-[#006D77] hover:bg-[#005A61] text-white font-bold"
          >
            {isGenerating ? 'جاري إنشاء القصة...' : 'إنشاء القصة'}
          </Button>
        </div>
        
        {isGenerating && (
          <div className="mt-4">
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-sm text-center text-gray-500">جاري إنشاء الفصل {Math.min(Math.ceil(progress / 20), 5)} من 5</p>
          </div>
        )}
      </div>
      
      {chapters.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-right text-[#1A1F2C]">القصة الخاصة بك</h2>
          <Separator className="mb-6" />
          <ChapterDisplay chapters={chapters} />
        </div>
      )}
    </div>
  );
};

export default StoryGenerator;
