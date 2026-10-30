import type { UiKey } from '../i18n/ui';

export interface Tech {
  /** id de Iconify (`skill-icons:*` o `devicon:*`). */
  icon: string;
  name: string;
}

export interface StackCategory {
  /** Clave del título en `ui.ts`. */
  label: UiKey;
  /** Nombre del ícono de Lucide, sin prefijo. */
  icon: string;
  items: Tech[];
}

export interface StackLayer extends StackCategory {
  /** Protocolo que conecta esta capa con la siguiente en el diagrama (clave de `ui.ts`). */
  link?: UiKey;
}

/** Capas de la arquitectura, en el orden en que viaja un request: cliente → API → datos. */
export const stackLayers: StackLayer[] = [
  {
    label: 'stack.frontend',
    icon: 'monitor',
    link: 'stack.http',
    items: [
      { icon: 'skill-icons:react-dark', name: 'React' },
      { icon: 'skill-icons:vite-dark', name: 'Vite' },
      { icon: 'skill-icons:tailwindcss-dark', name: 'Tailwind CSS' },
      { icon: 'skill-icons:bootstrap', name: 'Bootstrap' },
      { icon: 'skill-icons:javascript', name: 'JavaScript' },
      { icon: 'skill-icons:html', name: 'HTML' },
      { icon: 'skill-icons:css', name: 'CSS' },
    ],
  },
  {
    label: 'stack.backend',
    icon: 'server',
    link: 'stack.sql',
    items: [
      { icon: 'skill-icons:cs', name: 'C#' },
      { icon: 'skill-icons:dotnet', name: '.NET' },
      { icon: 'skill-icons:nodejs-dark', name: 'Node.js' },
      { icon: 'skill-icons:expressjs-dark', name: 'Express' },
      { icon: 'skill-icons:java-dark', name: 'Java' },
      { icon: 'skill-icons:spring-dark', name: 'Spring Boot' },
      { icon: 'skill-icons:python-dark', name: 'Python' },
      { icon: 'skill-icons:flask-dark', name: 'Flask' },
      { icon: 'skill-icons:fastapi', name: 'FastAPI' },
    ],
  },
  {
    label: 'stack.databases',
    icon: 'database',
    items: [
      { icon: 'skill-icons:postgresql-dark', name: 'PostgreSQL' },
      { icon: 'skill-icons:mysql-dark', name: 'MySQL' },
      { icon: 'devicon:microsoftsqlserver', name: 'SQL Server' },
      { icon: 'devicon:oracle', name: 'Oracle' },
    ],
  },
];

/** Herramientas transversales a todas las capas. */
export const stackTools: StackCategory = {
  label: 'stack.tools',
  icon: 'wrench',
  items: [
    { icon: 'skill-icons:docker', name: 'Docker' },
    { icon: 'skill-icons:git', name: 'Git' },
    { icon: 'skill-icons:github-dark', name: 'GitHub' },
    { icon: 'skill-icons:visualstudio-dark', name: 'Visual Studio' },
    { icon: 'skill-icons:vscode-dark', name: 'VS Code' },
    { icon: 'skill-icons:postman', name: 'Postman' },
  ],
};
