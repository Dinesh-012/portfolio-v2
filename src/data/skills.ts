export type SkillGroup = {
  id: string;
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    items: ['Java', 'Python', 'JavaScript', 'TypeScript'],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: ['Spring Boot', 'Node.js', 'NestJS', 'RESTful API Design'],
  },
  {
    id: 'microservices',
    label: 'Microservices',
    items: [
      'Spring Cloud',
      'OpenFeign',
      'API Gateway',
      'Inter-Service Communication',
    ],
  },
  {
    id: 'security',
    label: 'Security',
    items: ['Spring Security', 'JWT', 'Keycloak'],
  },
  {
    id: 'databases',
    label: 'Databases',
    items: ['MySQL', 'MongoDB', 'JPA / Hibernate'],
  },
  {
    id: 'devops-tools',
    label: 'DevOps & Tools',
    items: ['Docker', 'Git', 'GitLab', 'Maven', 'Postman'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: ['React.js', 'HTML', 'CSS', 'Tailwind CSS'],
  },
];
