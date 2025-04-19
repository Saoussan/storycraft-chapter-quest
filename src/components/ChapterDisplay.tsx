
import React from 'react';
import { Card } from "@/components/ui/card";

interface ChapterDisplayProps {
  chapters: string[];
}

const ChapterDisplay: React.FC<ChapterDisplayProps> = ({ chapters }) => {
  return (
    <div className="space-y-4">
      {chapters.map((chapter, index) => (
        <Card key={index} className="p-6 bg-white shadow-md">
          <h3 className="text-xl font-bold text-right mb-3 text-[#1A1F2C]">
            الفصل {index + 1}
          </h3>
          <p className="text-right text-gray-700 leading-relaxed">{chapter}</p>
        </Card>
      ))}
    </div>
  );
};

export default ChapterDisplay;
