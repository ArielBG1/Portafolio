import type { Lang } from '../i18n/ui';

export interface ExperienceGroup {
  /** Subtítulo del grupo (ej.: "Desarrollo"). */
  title: string;
  items: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  /** Mes de inicio en formato `YYYY-MM`. */
  start: string;
  /** Mes de fin en formato `YYYY-MM`, o `null` si es el trabajo actual. */
  end: string | null;
  /** Tareas sin agrupar. */
  tasks?: string[];
  /** Tareas agrupadas con subtítulo (opcional). Si existe, se muestra en lugar de `tasks`. */
  groups?: ExperienceGroup[];
}

/** Grupos de tareas de un puesto: los `groups` si existen; si no, `tasks` como un único grupo sin título. */
export function getTaskGroups(item: ExperienceItem): { title: string | null; items: string[] }[] {
  return item.groups ?? [{ title: null, items: item.tasks ?? [] }];
}

export const experience: Record<Lang, ExperienceItem[]> = {
  es: [
    {
      role: 'Software Developer',
      company: 'Universidad de la Integración de las Américas (UNIDA)',
      start: '2024-04',
      end: null,
      groups: [
        {
          title: 'Desarrollo',
          items: [
            'Desarrollo nuevas funcionalidades y realizo el mantenimiento de la plataforma universitaria en C# con ASP.NET MVC y ASP.NET Core (.NET 10).',
            'Construyo módulos y APIs REST a medida para distintas áreas de la universidad, desde el modelado de datos hasta la integración con otros sistemas.',
            'Modelo bases de datos en SQL Server y optimizo el acceso a datos mediante consultas SQL y LINQ.',
            'Diagnostico y corrijo incidencias en producción, y automatizo procesos internos para reducir tareas manuales.',
          ],
        },
        {
          title: 'Liderazgo y análisis',
          items: [
            'Relevo requerimientos con las distintas áreas de la universidad, los analizo y defino el alcance de cada desarrollo.',
            'Planifico y distribuyo las tareas del equipo de desarrollo según prioridades, bajo la supervisión de la Jefatura de Sistemas.',
            'Reviso el trabajo entregado por el equipo y hago seguimiento del cumplimiento de plazos.',
            'Valido las entregas con los usuarios y elaboro documentación técnica de los sistemas.',
          ],
        },
      ],
    },
  ],
  en: [
    {
      role: 'Software Developer',
      company: 'Universidad de la Integración de las Américas (UNIDA)',
      start: '2024-04',
      end: null,
      groups: [
        {
          title: 'Development',
          items: [
            'Build new features and maintain the university platform in C# with ASP.NET MVC and ASP.NET Core (.NET 10).',
            'Build custom modules and REST APIs for different university departments, from data modeling to integration with other systems.',
            'Design SQL Server databases and optimize data access with SQL queries and LINQ.',
            'Diagnose and fix production issues, and automate internal processes to reduce manual work.',
          ],
        },
        {
          title: 'Leadership & analysis',
          items: [
            'Gather requirements with different university departments, analyze them, and define the scope of each project.',
            "Plan and assign the development team's tasks based on priorities, under the supervision of the Head of IT.",
            "Review the team's deliverables and track deadlines.",
            'Validate deliverables with users and write technical documentation for the systems.',
          ],
        },
      ],
    },
  ],
};
