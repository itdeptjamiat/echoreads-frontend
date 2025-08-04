import { DemoPost, demoMagazines, demoArticles, demoDigests } from './demoData';

// Simulate saved content (user bookmarked these)
export const getDemoSavedContent = (): DemoPost[] => {
  return [
    demoMagazines[0], // Tech Innovations 2024
    demoArticles[0],  // The Future of Remote Work
    demoDigests[0],   // Weekly Tech Roundup
    demoArticles[1],  // Mindful Productivity Techniques
  ];
};

// Simulate downloaded content (available offline)
export const getDemoDownloadedContent = (): DemoPost[] => {
  return [
    demoMagazines[1], // Digital Wellness Monthly
    demoDigests[1],   // Health & Wellness Digest
    demoArticles[2],  // Sustainable Living Made Simple
  ];
};

// Simulate reading history
export const getDemoReadingHistory = (): DemoPost[] => {
  return [
    demoArticles[0],  // Most recently read
    demoMagazines[0],
    demoDigests[0],
    demoArticles[1],
    demoMagazines[1],
  ];
};