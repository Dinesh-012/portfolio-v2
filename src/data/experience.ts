export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: 'skillmine',
    company: 'Skillmine Technology Private Ltd',
    role: 'Software Developer (Intern → Jr. Software Developer)',
    period: 'Jan 2025 – Sep 2025',
    bullets: [
      'Developed and maintained RESTful APIs using NestJS for scalable web applications.',
      'Integrated MongoDB schemas and optimized database queries, improving backend performance by approximately 20%.',
      'Collaborated with frontend teams using React.js to ensure seamless API integration.',
      'Participated in code reviews, debugging, and deployment, improving application stability and quality.',
      'Contributed to feature enhancements and resolved production issues on the First Credit Service project.',
    ],
  },
];
