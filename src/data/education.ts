import type { Lang } from '../i18n/ui';

export interface Degree {
  title: string;
  institution: string;
  /** Estado o detalle opcional (ej.: "5.º año, en curso"). */
  detail?: string;
}

export interface Course {
  title: string;
  institution: string;
  hours: number;
}

export interface LanguageSkill {
  name: string;
  level: string;
}

export interface EducationContent {
  degrees: Degree[];
  courses: Course[];
  languages: LanguageSkill[];
}

export const education: Record<Lang, EducationContent> = {
  es: {
    degrees: [
      {
        title: 'Ingeniería Informática',
        institution: 'Universidad de la Integración de las Américas (UNIDA)',
        detail: '5.º año, en curso',
      },
      {
        title: 'Bachiller Técnico en Informática',
        institution: 'Centro Educativo Parroquial San Agustín',
      },
    ],
    courses: [
      { title: 'Programación con Python', institution: 'Instituto Tecnológico ITSSMAR', hours: 32 },
      { title: 'Seminario de Java Web con Spring Boot', institution: 'Instituto Tecnológico ITSSMAR', hours: 32 },
    ],
    languages: [
      { name: 'Español', level: 'Nativo' },
      { name: 'Inglés', level: 'B1, intermedio' },
    ],
  },
  en: {
    degrees: [
      {
        title: 'Computer Engineering',
        institution: 'Universidad de la Integración de las Américas (UNIDA)',
        detail: '5th year, in progress',
      },
      {
        title: 'Technical High School Diploma in Computer Science',
        institution: 'Centro Educativo Parroquial San Agustín',
      },
    ],
    courses: [
      { title: 'Python Programming', institution: 'ITSSMAR Institute of Technology', hours: 32 },
      { title: 'Java Web Development with Spring Boot (Seminar)', institution: 'ITSSMAR Institute of Technology', hours: 32 },
    ],
    languages: [
      { name: 'Spanish', level: 'Native' },
      { name: 'English', level: 'B1, intermediate' },
    ],
  },
};
