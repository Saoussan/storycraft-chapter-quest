
import React from 'react';

interface StoryProgressProps {
  currentChapter: number;
}

const StoryProgress: React.FC<StoryProgressProps> = ({ currentChapter }) => {
  return (
    <div className="flex justify-between items-center bg-white rounded-lg p-4 shadow-md">
      {[1, 2, 3, 4, 5].map((chapter) => (
        <div
          key={chapter}
          className={`flex flex-col items-center ${
            chapter <= currentChapter ? 'text-[#9b87f5]' : 'text-gray-400'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
              chapter <= currentChapter
                ? 'bg-[#9b87f5] text-white'
                : 'bg-gray-200'
            }`}
          >
            {chapter}
          </div>
          <span className="text-sm">الفصل {chapter}</span>
        </div>
      ))}
    </div>
  );
};

export default StoryProgress;
