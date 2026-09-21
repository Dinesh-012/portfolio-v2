export type EducationItem = {
  id: string;
  institution: string;
  degree: string;
  period: string;
  detail?: string;
};

export const education: EducationItem[] = [
  {
    id: 'kcet',
    institution: 'Kamaraj College of Engineering and Technology',
    degree: 'B.Tech, Artificial Intelligence and Data Science',
    period: '2021 – 2025',
    detail: 'CGPA: 7.72',
  },
];
