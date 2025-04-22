
export const generateChapter = async (topic: string): Promise<string> => {
  try {
    console.log(`[storyApi] calling API via proxy`);
    // Use the relative path which will be handled by Vite's proxy
    const response = await fetch('/generate-chapter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic }),
    });

    console.log(`[storyApi] Response status:`, response.status);
    
    if (!response.ok) {
      console.error(`[storyApi] Request failed with status: ${response.status}`);
      const errorText = await response.text();
      console.error(`[storyApi] Error response:`, errorText);
      throw new Error(`Failed to generate chapter: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log(`[storyApi] Response data received successfully:`, data);
    return data.chapter;
  } catch (error) {
    console.error('[storyApi] Error generating chapter:', error);
    console.error('[storyApi] Error details:', error instanceof Error ? error.message : 'Unknown error');
    console.error('[storyApi] Error stack:', error instanceof Error ? error.stack : 'No stack available');
    
    // For now, return a fallback message rather than throwing the error
    // This helps avoid breaking the UI during development
    return "Failed to generate chapter. The API server might be unavailable. This is a fallback message.";
  }
};
