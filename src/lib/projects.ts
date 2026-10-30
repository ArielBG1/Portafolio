import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

const collectionByLang = {
  es: 'projectsEs',
  en: 'projectsEn',
} as const satisfies Record<Lang, string>;

export type Project = CollectionEntry<'projectsEs'> | CollectionEntry<'projectsEn'>;
export type ProjectData = Project['data'];

/** Proyectos del idioma indicado, ordenados por `order`. */
export async function getProjects(lang: Lang): Promise<Project[]> {
  const projects: Project[] = await getCollection(collectionByLang[lang]);
  return projects.sort((a, b) => a.data.order - b.data.order);
}
