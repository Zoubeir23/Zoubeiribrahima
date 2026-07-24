const issuerDomainMap: Record<string, string> = {
  "HackerRank": "hackerrank.com",
  "Anthropic": "anthropic.com",
  "Microsoft": "microsoft.com",
  "Cisco": "cisco.com",
  "Cisco Networking Academy": "netacad.com",
  "LinkedIn": "linkedin.com",
  "LinkedIn Learning": "linkedin.com",
  "Udemy": "udemy.com",
  "Harvard CS50": "cs50.harvard.edu",
  "Coursera": "coursera.org",
  "Cursa - Cursos Online": "cursa.app",
  "Harvard University": "harvard.edu",
};

const techLogoMap: Record<string, string> = {
  "Django": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  "Spring Boot": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  "FastAPI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Laravel": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
  "PHP": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  "LLMs": "/logos/llms-local.svg",
  "OpenAI SDK": "/logos/openai-sdk-local.svg",
  "Claude API": "https://cdn.simpleicons.org/anthropic/143DFF",
  "Prompt Engineering": "https://cdn.simpleicons.org/notion/143DFF",
  "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "GitHub": "https://cdn.simpleicons.org/github/143DFF",
  "AWS": "/logos/aws-local.svg",
  "CI/CD": "https://cdn.simpleicons.org/githubactions/143DFF",
  "Supabase": "https://cdn.simpleicons.org/supabase/143DFF",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "TailwindCSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "Claude Code": "https://cdn.simpleicons.org/anthropic/143DFF",
};

export const getIssuerLogoUrl = (issuer: string): string => {
  const domain = issuerDomainMap[issuer] ?? "google.com";
  return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
};

export const getTechLogoUrl = (tech: string): string | null => {
  return techLogoMap[tech] ?? null;
};
