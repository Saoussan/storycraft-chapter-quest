
import { mockChapterGeneration } from './mockStoryApi';

export const generateChapter = async (topic: string): Promise<string> => {
  try {
    // Using relative path which will be proxied
    const response = await fetch('/generate-chapter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new Error('Failed to generate chapter');
    }

    const data = await response.json();
    return data.chapter;
  } catch (error) {
    console.error('Error generating chapter:', error);
    console.log('Using mock API as fallback...');
    return mockChapterGeneration(topic);
  }
};
