import type { Lang } from '../i18n/ui';

export interface Highlight {
  /** Nombre del ícono de Lucide, sin prefijo. */
  icon: string;
  /** Admite negritas con `**texto**`. */
  text: string;
}

export interface AboutContent {
  bio: string;
  highlights: Highlight[];
  /** Versión corta de los intereses, para el JSON del Hero. */
  interests: string[];
}

export const about: Record<Lang, AboutContent> = {
  es: {
    bio: 'Desarrollador backend con más de 2 años de experiencia en C# y .NET, enfocado en el desarrollo y mantenimiento de sistemas en producción para la gestión universitaria. Experiencia en bases de datos PostgreSQL y SQL Server, APIs REST, relevamiento de requerimientos y coordinación de equipos de desarrollo, además de desarrollo frontend con React, Tailwind CSS y Bootstrap. Estudiante de 5.º año de Ingeniería Informática, con interés en IA aplicada y sistemas distribuidos.',
    highlights: [
      {
        icon: 'building-2',
        text: '**Software Developer en UNIDA**: desarrollo y mantengo la plataforma universitaria en .NET, relevo requerimientos con las áreas usuarias y lidero al equipo de desarrollo',
      },
      { icon: 'briefcase', text: 'Proyectos **freelance**: sistemas de gestión, punto de venta e inventario' },
      { icon: 'graduation-cap', text: 'Estudiante de 5.º año de **Ingeniería Informática**' },
      { icon: 'brain-circuit', text: 'Me interesan la **IA aplicada** y los **sistemas distribuidos**' },
      { icon: 'map-pin', text: 'Paraguay' },
    ],
    interests: ['IA aplicada', 'Sistemas distribuidos'],
  },
  en: {
    bio: 'Backend developer with over 2 years of experience in C# and .NET, focused on building and maintaining production systems for university management. Experienced with PostgreSQL and SQL Server databases, REST APIs, requirements gathering, and coordinating development teams, as well as frontend development with React, Tailwind CSS, and Bootstrap. Fifth-year Computer Engineering student with a strong interest in applied AI and distributed systems.',
    highlights: [
      {
        icon: 'building-2',
        text: '**Software Developer at UNIDA**: I build and maintain the university platform on .NET, gather requirements with stakeholder departments, and lead the development team',
      },
      { icon: 'briefcase', text: '**Freelance** projects: management systems, point of sale, and inventory' },
      { icon: 'graduation-cap', text: 'Fifth-year **Computer Engineering** student' },
      { icon: 'brain-circuit', text: 'Interested in **applied AI** and **distributed systems**' },
      { icon: 'map-pin', text: 'Paraguay' },
    ],
    interests: ['Applied AI', 'Distributed systems'],
  },
};
