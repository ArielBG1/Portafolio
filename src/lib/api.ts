import { about } from '../data/about';
import { education } from '../data/education';
import { experience, getTaskGroups } from '../data/experience';
import { profile } from '../data/profile';
import { stackLayers, stackTools, type Tech } from '../data/stack';
import { apiResources, heroRoles, type ApiResource, type Lang, type UiKey } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';
import type { JsonValue } from './json-tokens';
import { getProjects } from './projects';

export const API_VERSION = 'v1';

/** Orden en que se muestran los recursos en el cliente del Hero. */
export const apiResourceKeys = ['profile', 'stack', 'experience', 'projects', 'education', 'contact'] as const satisfies readonly ApiResource[];

/** URL pública del recurso, ej.: `/api/v1/es/perfil.json`. */
export function getApiUrl(lang: Lang, resource: ApiResource): string {
  return `/api/${API_VERSION}/${lang}/${apiResources[lang][resource]}.json`;
}

const names = (items: Tech[]): string[] => items.map((tech) => tech.name);

/**
 * Contenido de cada recurso de la API. Sale de los mismos datos que el sitio,
 * así la API y la página nunca se contradicen.
 */
export async function getApiResource(lang: Lang, resource: ApiResource): Promise<JsonValue> {
  const t = useTranslations(lang);

  switch (resource) {
    case 'profile':
      return {
        [t('json.name')]: profile.name,
        [t('json.role')]: profile.role,
        [t('json.location')]: profile.location,
        [t('json.profile')]: heroRoles[lang],
        [t('json.interests')]: about[lang].interests,
      };

    case 'stack': {
      const layerKeys: Partial<Record<UiKey, UiKey>> = {
        'stack.frontend': 'json.frontend',
        'stack.backend': 'json.backend',
        'stack.databases': 'json.databases',
      };
      const result: Record<string, JsonValue> = {};
      stackLayers.forEach((layer) => {
        const key = layerKeys[layer.label];
        if (key) result[t(key)] = names(layer.items);
      });
      result[t('json.tools')] = names(stackTools.items);
      return result;
    }

    case 'experience':
      return experience[lang].map((job) => ({
        [t('json.role')]: job.role,
        [t('json.company')]: job.company,
        [t('json.from')]: job.start,
        [t('json.to')]: job.end,
        // Con grupos: [{ area, tareas }]; sin grupos: la lista de tareas directa.
        [t('json.tasks')]: job.groups
          ? getTaskGroups(job).map((group) => ({ [t('json.area')]: group.title, [t('json.tasks')]: group.items }))
          : (job.tasks ?? []),
      }));

    case 'projects': {
      const projects = await getProjects(lang);
      return projects.map(({ id, data }) => {
        const item: Record<string, JsonValue> = {
          id,
          [t('json.title')]: data.title,
          [t('json.featured')]: data.featured,
          stack: names(data.stack),
          repo: data.repo,
        };
        if (data.role) item[t('json.role')] = data.role;
        if (data.team) item[t('json.team')] = data.team;
        if (data.demo) item.demo = data.demo;
        return item;
      });
    }

    case 'education': {
      const { degrees, courses, languages } = education[lang];
      return {
        [t('json.degrees')]: degrees.map((degree) => {
          const item: Record<string, JsonValue> = {
            [t('json.title')]: degree.title,
            [t('json.institution')]: degree.institution,
          };
          if (degree.detail) item[t('json.status')] = degree.detail;
          return item;
        }),
        [t('json.courses')]: courses.map((course) => ({
          [t('json.title')]: course.title,
          [t('json.institution')]: course.institution,
          [t('json.hours')]: course.hours,
        })),
        [t('json.languages')]: languages.map((language) => ({
          [t('json.language')]: language.name,
          [t('json.level')]: language.level,
        })),
      };
    }

    case 'contact':
      return {
        email: profile.email,
        linkedin: profile.linkedin,
        github: profile.github,
        [t('json.location')]: profile.location,
      };
  }
}
