export interface DemoPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'magazine' | 'article' | 'digest';
  readTime: string;
  author: string;
  featured?: boolean;
  publishedAt: string;
}

export const demoMagazines: DemoPost[] = [
  {
    id: 'mag1',
    title: 'Tech Innovations 2024',
    description: 'Exploring the latest breakthroughs in artificial intelligence, quantum computing, and sustainable technology that will shape our future.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
    category: 'magazine',
    readTime: '15 min',
    author: 'Sarah Chen',
    featured: true,
    publishedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'mag2',
    title: 'Digital Wellness Monthly',
    description: 'A comprehensive guide to maintaining mental health in the digital age, featuring expert interviews and practical tips.',
    imageUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=300&fit=crop',
    category: 'magazine',
    readTime: '12 min',
    author: 'Dr. Michael Roberts',
    publishedAt: '2024-01-10T14:30:00Z'
  },
  {
    id: 'mag3',
    title: 'Climate Action Today',
    description: 'Stories of environmental champions making a difference in their communities through innovative sustainability projects.',
    imageUrl: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=300&fit=crop',
    category: 'magazine',
    readTime: '18 min',
    author: 'Elena Rodriguez',
    publishedAt: '2024-01-08T09:15:00Z'
  }
];

export const demoArticles: DemoPost[] = [
  {
    id: 'art1',
    title: 'The Future of Remote Work',
    description: 'How distributed teams are reshaping corporate culture and what it means for the next generation of professionals.',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop',
    category: 'article',
    readTime: '8 min',
    author: 'James Wilson',
    featured: true,
    publishedAt: '2024-01-14T16:45:00Z'
  },
  {
    id: 'art2',
    title: 'Mindful Productivity Techniques',
    description: 'Evidence-based strategies for improving focus and reducing stress in high-pressure work environments.',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    category: 'article',
    readTime: '6 min',
    author: 'Dr. Amanda Foster',
    publishedAt: '2024-01-12T11:20:00Z'
  },
  {
    id: 'art3',
    title: 'Sustainable Living Made Simple',
    description: 'Practical steps anyone can take to reduce their environmental footprint without breaking the bank.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
    category: 'article',
    readTime: '5 min',
    author: 'Mark Thompson',
    publishedAt: '2024-01-09T13:10:00Z'
  }
];

export const demoDigests: DemoPost[] = [
  {
    id: 'dig1',
    title: 'Weekly Tech Roundup',
    description: 'Your curated collection of the most important technology news, product launches, and industry insights from this week.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    category: 'digest',
    readTime: '4 min',
    author: 'EchoReads Editorial',
    publishedAt: '2024-01-13T08:00:00Z'
  },
  {
    id: 'dig2',
    title: 'Health & Wellness Digest',
    description: 'Latest research findings, wellness trends, and expert tips compiled into an easy-to-read weekly summary.',
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=300&fit=crop',
    category: 'digest',
    readTime: '3 min',
    author: 'Health Team',
    publishedAt: '2024-01-11T07:30:00Z'
  },
  {
    id: 'dig3',
    title: 'Business Innovation Brief',
    description: 'Key insights from the business world, including startup news, market trends, and leadership perspectives.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    category: 'digest',
    readTime: '5 min',
    author: 'Business Desk',
    publishedAt: '2024-01-07T15:45:00Z'
  }
];

export const getAllDemoPosts = (): DemoPost[] => {
  return [...demoMagazines, ...demoArticles, ...demoDigests].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};

export const getFeaturedPosts = (): DemoPost[] => {
  return getAllDemoPosts().filter(post => post.featured);
};

export const getPostsByCategory = (category: 'magazine' | 'article' | 'digest'): DemoPost[] => {
  switch (category) {
    case 'magazine':
      return demoMagazines;
    case 'article':
      return demoArticles;
    case 'digest':
      return demoDigests;
    default:
      return [];
  }
};