
const generateStoryChapter = async (topic) => {
  // For now, we'll use a simple mock implementation
  // In a real application, this would integrate with an AI service
  const chapterTemplates = [
    `في يوم من الأيام، كان هناك قصة عن ${topic}. بدأت المغامرة عندما...`,
    `استمرت القصة مع ${topic} في رحلة مثيرة حيث...`,
    `وفي تطور مفاجئ، اكتشف ${topic} أن...`,
    `مع تصاعد الأحداث، وجد ${topic} نفسه في موقف صعب...`,
    `وأخيراً، تعلم ${topic} درساً مهماً عن...`
  ];

  const randomIndex = Math.floor(Math.random() * chapterTemplates.length);
  const chapter = chapterTemplates[randomIndex];

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return chapter;
};

export { generateStoryChapter };
