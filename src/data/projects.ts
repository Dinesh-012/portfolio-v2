export type Project = {
  id: string;
  title: string;
  summary: string;
  highlights: string[];
  techStack: string[];
  repoUrl: string;
  badge?: string;
};

export const projects: Project[] = [
  {
    id: 'ecommerce-microservices',
    title: 'E-Commerce Microservices Suite',
    badge: 'Microservices',
    summary:
      'A domain-driven microservices backend consisting of Order, Product, and Inventory services. Built with a focus on clean inter-service communication, centralized error handling, and production-ready practices.',
    highlights: [
      'Domain-driven design with separate Order, Product & Inventory services using Spring Boot',
      'Polyglot persistence — MySQL + MongoDB with proper data modeling',
      'Inter-service communication via OpenFeign & RestClient + API Gateway routing',
      'Centralized exception handling with @RestControllerAdvice for consistent error responses',
      'Docker containerization + exploring Keycloak for centralized auth',
    ],
    techStack: [
      'Spring Boot',
      'Spring Cloud',
      'OpenFeign',
      'MySQL',
      'MongoDB',
      'Docker',
      'Keycloak',
      'Swagger / OpenAPI',
    ],
    repoUrl: 'https://github.com/Dinesh-012/Spring/tree/main/Microservices',
  },
];
