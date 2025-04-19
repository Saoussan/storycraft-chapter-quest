
// Mock service to simulate AraGPT responses
const mockChapterGeneration = (userIdeas: string): Promise<string> => {
  const mockResponses = {
    chapter1: "كان يا ما كان، في قديم الزمان... وهكذا بدأت المغامرة",
    chapter2: "وفي اليوم التالي، اكتشف البطل أن...",
    chapter3: "وبينما كان يستكشف المكان، وجد...",
    chapter4: "وفجأة، حدث شيء غير متوقع...",
    chapter5: "وفي النهاية، تعلم الجميع أن..."
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate "random" chapter based on input length
      const chapters = Object.values(mockResponses);
      const index = Math.min(Math.floor(userIdeas.length % 5), 4);
      resolve(chapters[index]);
    }, 1500);
  });
};

export { mockChapterGeneration };
